import { MetadataRoute } from 'next';

const BASE_URL = 'https://greatodeal.com';

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
  { url: `${BASE_URL}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/industries/government`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/industries/healthcare`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/industries/fintech`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/green-tech`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/real-estate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/ai-automation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/industries/ecommerce`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/partnership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/api/blogs?limit=500`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      blogRoutes = data.data.map((blog: { _id: string; updatedAt: string }) => ({
        url: `${BASE_URL}/blog/${blog._id}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch { /* fallback to static only */ }

  let workRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE}/api/portfolio/public`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data?.isVisible && Array.isArray(data.data.projects)) {
      workRoutes = data.data.projects.map((project: { _id: string; updatedAt: string }) => ({
        url: `${BASE_URL}/work/${project._id}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      }));
    }
  } catch { /* fallback to static only */ }

  return [...staticRoutes, ...blogRoutes, ...workRoutes];
}
