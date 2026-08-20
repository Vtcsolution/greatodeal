import { Request, Response } from 'express';
import Contact from '../models/ContactModel';

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const FETCH_TIMEOUT_MS = 6000;
const MAX_RESULTS = 15;

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

const ACTIVE_WITHIN_MONTHS = 18;

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

async function searchPlaces(textQuery: string): Promise<PlaceResult[]> {
  const res = await fetchWithTimeout(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY as string,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.businessStatus',
      },
      body: JSON.stringify({ textQuery, maxResultCount: MAX_RESULTS }),
    },
    FETCH_TIMEOUT_MS
  );

  if (!res || !res.ok) {
    const body = res ? await res.text().catch(() => '') : '';
    throw new Error(`Google Places API error (${res?.status ?? 'timeout'}): ${body.slice(0, 300)}`);
  }

  const data = (await res.json()) as { places?: any[] };
  const places = data.places || [];
  return places
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

async function findEmailForWebsite(websiteUrl: string): Promise<string | null> {
  if (!websiteUrl) return null;
  let base: URL;
  try {
    base = new URL(websiteUrl);
  } catch {
    return null;
  }

  try {
    const homeHtml = await fetchPage(base.toString());
    if (!homeHtml) return null;

    const homeEmail = extractEmail(homeHtml.slice(0, 500_000));
    if (homeEmail) return homeEmail;

    // Follow real links on the page (ranked by how "contact-like" they look)
    // instead of guessing fixed URLs — this finds the actual contact page
    // regardless of how the site structures its URLs.
    const links = extractPrioritizedLinks(homeHtml, base);
    for (const link of links) {
      const html = await fetchPage(link);
      if (!html) continue;
      const email = extractEmail(html.slice(0, 500_000));
      if (email) return email;
    }

    // Last resort: common fixed paths, in case the contact page exists but
    // isn't linked from the homepage nav.
    const fallbackPaths = ['contact', 'contact-us', 'about', 'about-us'];
    for (const path of fallbackPaths) {
      if (links.some((l) => l.includes(path))) continue; // already tried
      try {
        const html = await fetchPage(new URL(path, base).toString());
        if (!html) continue;
        const email = extractEmail(html.slice(0, 500_000));
        if (email) return email;
      } catch {
        // try next
      }
    }
  } catch {
    return null;
  }

  return null;
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

    // Look up each result's email and activity signal in parallel, per-place.
    const enriched = await Promise.all(
      places.map(async (p) => {
        const [email, activitySignal] = await Promise.all([
          p.website ? findEmailForWebsite(p.website) : Promise.resolve(null),
          getActivitySignal(p.placeId),
        ]);
        return { ...p, email, ...activitySignal };
      })
    );

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error('searchCompanies error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error searching companies' });
  }
};

export const importLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, website, address, leadStatus, services } = req.body;
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

    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    console.error('importLead error:', error);
    res.status(500).json({ success: false, message: error instanceof Error ? error.message : 'Error importing lead' });
  }
};
