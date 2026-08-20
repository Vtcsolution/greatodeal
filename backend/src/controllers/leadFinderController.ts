import { Request, Response } from 'express';
import Contact from '../models/ContactModel';
import Prospect from '../models/Prospect';

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const FETCH_TIMEOUT_MS = 6000;
const PAGE_SIZE = 20; // Google's hard maximum per request — not configurable
const MAX_PAGES = 3; // 3 x 20 = 60 results per search. Raise with care: each extra
// page is another billed Places API call, and each result triggers an email/activity
// lookup, so higher pages make every search noticeably slower and costlier.

interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  businessStatus: string;
}

export type ActivityLevel = 'active' | 'quiet' | 'unknown';
export type SizeTier = 'small' | 'growing' | 'established' | 'large';

const ACTIVE_WITHIN_MONTHS = 18;

/**
 * Google doesn't expose revenue or headcount for arbitrary businesses (no free
 * or paid API does, for privacy reasons) — review count is the closest honest,
 * free proxy for scale/customer volume it actually gives us. Bigger, more
 * established businesses accumulate far more reviews over time than a small
 * local shop, which is what we actually want to prioritize for AI automation
 * outreach (more budget, more operational complexity to automate).
 */
function sizeTierFor(ratingCount: number): SizeTier {
  if (ratingCount >= 500) return 'large';
  if (ratingCount >= 100) return 'established';
  if (ratingCount >= 20) return 'growing';
  return 'small';
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<globalThis.Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPlacesPage(textQuery: string, pageToken?: string): Promise<{ places?: any[]; nextPageToken?: string }> {
  const res = await fetchWithTimeout(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY as string,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus,nextPageToken',
      },
      body: JSON.stringify(pageToken ? { textQuery, pageToken } : { textQuery, pageSize: PAGE_SIZE }),
    },
    FETCH_TIMEOUT_MS
  );

  if (!res || !res.ok) {
    const body = res ? await res.text().catch(() => '') : '';
    throw new Error(`Google Places API error (${res?.status ?? 'timeout'}): ${body.slice(0, 300)}`);
  }

  return (await res.json()) as { places?: any[]; nextPageToken?: string };
}

async function searchPlaces(textQuery: string): Promise<PlaceResult[]> {
  const all: any[] = [];
  let pageToken: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const data = await fetchPlacesPage(textQuery, pageToken);
    all.push(...(data.places || []));
    if (!data.nextPageToken) break;
    pageToken = data.nextPageToken;
    // A freshly issued pageToken needs a short moment before Google accepts it.
    await sleep(2000);
  }

  return all
    .map((p: any) => ({
      placeId: p.id,
      name: p.displayName?.text || 'Unknown business',
      address: p.formattedAddress || '',
      phone: p.internationalPhoneNumber || '',
      website: p.websiteUri || '',
      rating: typeof p.rating === 'number' ? p.rating : null,
      ratingCount: p.userRatingCount || 0,
      businessStatus: p.businessStatus || 'OPERATIONAL',
    }))
    // Google marks businesses it believes have shut down — dead leads look
    // unprofessional to reach out to, so drop them before they're ever shown.
    .filter((p) => p.businessStatus === 'OPERATIONAL');
}

/**
 * Uses each business's most recent customer review as a free, honest proxy
 * for "is this business still active" — real social-media activity APIs
 * (Facebook Graph, Instagram) require per-business OAuth and app review, so
 * they can't be checked for arbitrary third-party companies. Review recency
 * is the closest signal Google's own data actually gives us for free.
 */
async function getActivitySignal(placeId: string): Promise<{ activity: ActivityLevel; lastReviewDate: string | null }> {
  const res = await fetchWithTimeout(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': PLACES_API_KEY as string,
        'X-Goog-FieldMask': 'reviews.publishTime',
      },
    },
    FETCH_TIMEOUT_MS
  );

  if (!res || !res.ok) return { activity: 'unknown', lastReviewDate: null };

  const data = (await res.json().catch(() => null)) as { reviews?: { publishTime?: string }[] } | null;
  const dates = (data?.reviews || []).map((r) => (r.publishTime ? new Date(r.publishTime).getTime() : 0)).filter(Boolean);
  if (dates.length === 0) return { activity: 'unknown', lastReviewDate: null };

  const mostRecent = new Date(Math.max(...dates));
  const monthsAgo = (Date.now() - mostRecent.getTime()) / (1000 * 60 * 60 * 24 * 30);
  return {
    activity: monthsAgo <= ACTIVE_WITHIN_MONTHS ? 'active' : 'quiet',
    lastReviewDate: mostRecent.toISOString(),
  };
}

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const MAILTO_RE = /href\s*=\s*["']mailto:([^"'?]+)/gi;
const JSONLD_EMAIL_RE = /"email"\s*:\s*"([^"]+)"/i;
const JUNK_DOMAINS = ['sentry.io', 'wixpress.com', 'example.com', 'domain.com', 'yourdomain.com', 'w3.org', 'schema.org', 'godaddy.com', 'wordpress.com'];
const JUNK_EXT = /\.(png|jpg|jpeg|gif|svg|webp|css|js)$/i;
const CONTACT_KEYWORDS = ['contact', 'about', 'reach', 'support', 'connect', 'get-in-touch', 'getintouch', 'enquiry', 'inquiry', 'team'];
const PER_SITE_PAGE_BUDGET = 5;

function isJunkEmail(email: string): boolean {
  const domain = email.split('@')[1] || '';
  return JUNK_EXT.test(email) || JUNK_DOMAINS.some((j) => domain.includes(j));
}

// Tries the strongest signals first: an explicit mailto: link, then structured
// data (schema.org JSON-LD, which many business sites embed for SEO), then a
// plain-text scan as the last resort.
function extractEmail(html: string): string | null {
  const mailtoMatches = [...html.matchAll(MAILTO_RE)].map((m) => decodeURIComponent(m[1]).toLowerCase());
  for (const email of mailtoMatches) {
    if (!isJunkEmail(email)) return email;
  }

  const jsonLdMatch = html.match(JSONLD_EMAIL_RE);
  if (jsonLdMatch) {
    const email = jsonLdMatch[1].toLowerCase();
    if (!isJunkEmail(email)) return email;
  }

  const textMatches = html.match(EMAIL_RE);
  if (textMatches) {
    for (const m of textMatches) {
      const email = m.toLowerCase();
      if (!isJunkEmail(email)) return email;
    }
  }
  return null;
}

// Pulls same-domain links off a page and ranks ones that look like a contact
// or about page higher, so we follow real navigation instead of guessing URLs.
function extractPrioritizedLinks(html: string, base: URL): string[] {
  const hrefRe = /<a\s+[^>]*href\s*=\s*["']([^"'#]+)["'][^>]*>(.*?)<\/a>/gis;
  const seen = new Set<string>();
  const scored: { url: string; score: number }[] = [];

  for (const m of html.matchAll(hrefRe)) {
    const rawHref = m[1];
    const anchorText = m[2].replace(/<[^>]+>/g, ' ').toLowerCase();
    if (!rawHref || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) continue;

    let url: URL;
    try {
      url = new URL(rawHref, base);
    } catch {
      continue;
    }
    if (url.hostname !== base.hostname) continue;

    const key = url.toString();
    if (seen.has(key)) continue;
    seen.add(key);

    const haystack = `${url.pathname.toLowerCase()} ${anchorText}`;
    const score = CONTACT_KEYWORDS.some((kw) => haystack.includes(kw)) ? 1 : 0;
    scored.push({ url: key, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, PER_SITE_PAGE_BUDGET - 1)
    .map((s) => s.url);
}

async function fetchPage(url: string): Promise<string | null> {
  const res = await fetchWithTimeout(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GreatodealLeadFinder/1.0)' } }, FETCH_TIMEOUT_MS);
  if (!res || !res.ok) return null;
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return null;
  return res.text();
}

const LINKEDIN_COMPANY_RE = /linkedin\.com\/(company|showcase)\//i;

interface WebsiteScan {
  email: string | null;
  hasLinkedIn: boolean;
}

async function scanWebsite(websiteUrl: string): Promise<WebsiteScan> {
  const result: WebsiteScan = { email: null, hasLinkedIn: false };
  if (!websiteUrl) return result;
  let base: URL;
  try {
    base = new URL(websiteUrl);
  } catch {
    return result;
  }

  const checkPage = (html: string) => {
    if (!result.hasLinkedIn && LINKEDIN_COMPANY_RE.test(html)) result.hasLinkedIn = true;
    if (!result.email) result.email = extractEmail(html.slice(0, 500_000));
  };

  try {
    const homeHtml = await fetchPage(base.toString());
    if (!homeHtml) return result;
    checkPage(homeHtml);
    if (result.email && result.hasLinkedIn) return result;

    // Follow real links on the page (ranked by how "contact-like" they look)
    // instead of guessing fixed URLs — this finds the actual contact page
    // regardless of how the site structures its URLs. A LinkedIn link, when
    // present, is usually in the header/footer of every page, so the
    // homepage scan above already catches it in almost all cases.
    const links = extractPrioritizedLinks(homeHtml, base);
    for (const link of links) {
      if (result.email && result.hasLinkedIn) break;
      const html = await fetchPage(link);
      if (!html) continue;
      checkPage(html);
    }

    if (result.email) return result;

    // Last resort: common fixed paths, in case the contact page exists but
    // isn't linked from the homepage nav.
    const fallbackPaths = ['contact', 'contact-us', 'about', 'about-us'];
    for (const path of fallbackPaths) {
      if (result.email) break;
      if (links.some((l) => l.includes(path))) continue; // already tried
      try {
        const html = await fetchPage(new URL(path, base).toString());
        if (!html) continue;
        checkPage(html);
      } catch {
        // try next
      }
    }
  } catch {
    return result;
  }

  return result;
}

export const searchCompanies = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!PLACES_API_KEY) {
      res.status(500).json({
        success: false,
        message: 'GOOGLE_PLACES_API_KEY is not configured on the server. Add it to .env to use Lead Finder.',
      });
      return;
    }

    const { keyword, location } = req.body;
    if (!keyword || !location) {
      res.status(400).json({ success: false, message: 'keyword and location are required' });
      return;
    }

    const places = await searchPlaces(`${keyword} in ${location}`);

    // Look up each result's website scan (email + LinkedIn presence) and
    // activity signal in parallel, per-place.
    const enriched = await Promise.all(
      places.map(async (p) => {
        const [scan, activitySignal] = await Promise.all([
          p.website ? scanWebsite(p.website) : Promise.resolve<WebsiteScan>({ email: null, hasLinkedIn: false }),
          getActivitySignal(p.placeId),
        ]);
        return { ...p, ...scan, sizeTier: sizeTierFor(p.ratingCount), ...activitySignal };
      })
    );

    // Biggest, most established businesses first — they're the ones with the
    // budget and operational complexity that make AI automation worthwhile.
    enriched.sort((a, b) => b.ratingCount - a.ratingCount);

    // Persist every result so it survives a page refresh and doesn't need
    // re-fetching (and re-billing) from Google on next visit. Upsert by
    // placeId so re-running the same search refreshes stale data in place.
    if (enriched.length > 0) {
      await Prospect.bulkWrite(
        enriched.map((p) => ({
          updateOne: {
            filter: { placeId: p.placeId },
            update: {
              $set: {
                name: p.name, address: p.address, phone: p.phone, website: p.website,
                rating: p.rating, ratingCount: p.ratingCount, businessStatus: p.businessStatus,
                email: p.email, hasLinkedIn: p.hasLinkedIn, sizeTier: p.sizeTier,
                activity: p.activity, lastReviewDate: p.lastReviewDate ? new Date(p.lastReviewDate) : null, keyword, location,
              },
            },
            upsert: true,
          },
        }))
      );
    }

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error('searchCompanies error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error searching companies' });
  }
};

export const getProspects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const prospects = await Prospect.find().sort({ ratingCount: -1 });
    res.json({ success: true, data: prospects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching saved prospects', error });
  }
};

export const importLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { placeId, name, email, phone, website, address, leadStatus, services } = req.body;
    if (!name || !email) {
      res.status(400).json({ success: false, message: 'name and email are required to import a lead' });
      return;
    }

    const existing = await Contact.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({ success: false, message: 'A contact with this email already exists', data: existing });
      return;
    }

    const contact = await Contact.create({
      fullName: name,
      company: name,
      email: email.toLowerCase(),
      phone: phone || undefined,
      website: website || undefined,
      address: address || undefined,
      services: services || 'AI automation & software development',
      message: `Sourced via Lead Finder (Google Places). Business found at ${address || website || 'N/A'}.`,
      leadStatus: leadStatus || 'cold',
      source: 'lead_finder',
    });

    if (placeId) {
      await Prospect.updateOne({ placeId }, { $set: { imported: true, importedContactId: contact._id } });
    }

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error('importLead error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error importing lead' });
  }
};
