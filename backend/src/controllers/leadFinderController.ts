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

async function searchPlaces(textQuery: string): Promise<PlaceResult[]> {
  const res = await fetchWithTimeout(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': PLACES_API_KEY as string,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount',
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
  return places.map((p: any) => ({
    placeId: p.id,
    name: p.displayName?.text || 'Unknown business',
    address: p.formattedAddress || '',
    phone: p.internationalPhoneNumber || '',
    website: p.websiteUri || '',
    rating: typeof p.rating === 'number' ? p.rating : null,
    ratingCount: p.userRatingCount || 0,
  }));
}

// Pulls the first plausible-looking email address out of a block of HTML.
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const JUNK_DOMAINS = ['sentry.io', 'wixpress.com', 'example.com', 'domain.com', 'yourdomain.com', 'w3.org', 'schema.org'];
const JUNK_EXT = /\.(png|jpg|jpeg|gif|svg|webp|css|js)$/i;

function extractEmail(html: string): string | null {
  const matches = html.match(EMAIL_RE);
  if (!matches) return null;
  for (const m of matches) {
    const email = m.toLowerCase();
    const domain = email.split('@')[1] || '';
    if (JUNK_EXT.test(email)) continue;
    if (JUNK_DOMAINS.some((j) => domain.includes(j))) continue;
    return email;
  }
  return null;
}

async function findEmailForWebsite(websiteUrl: string): Promise<string | null> {
  if (!websiteUrl) return null;
  const candidatePaths = ['', 'contact', 'contact-us', 'about', 'about-us'];
  let base: URL;
  try {
    base = new URL(websiteUrl);
  } catch {
    return null;
  }

  for (const path of candidatePaths) {
    try {
      const url = path ? new URL(path, base).toString() : base.toString();
      const res = await fetchWithTimeout(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GreatodealLeadFinder/1.0)' } }, FETCH_TIMEOUT_MS);
      if (!res || !res.ok) continue;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('text/html')) continue;
      const html = await res.text();
      const email = extractEmail(html.slice(0, 500_000));
      if (email) return email;
    } catch {
      // try next candidate
    }
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

    // Look up emails for each result's website in parallel, capped by timeout per-site.
    const withEmails = await Promise.all(
      places.map(async (p) => ({
        ...p,
        email: p.website ? await findEmailForWebsite(p.website) : null,
      }))
    );

    res.json({ success: true, data: withEmails });
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
