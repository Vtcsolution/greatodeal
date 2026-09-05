import type { Metadata } from 'next';
import PortfolioDetailClient from '@/components/pages/PortfolioDetailClient';
import { breadcrumbSchema } from '@/lib/schema';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio/public/${params.id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      const project = data.data;
      const imageUrl = project.images?.[0] ? `${API_BASE}${project.images[0]}` : 'https://greatodeal.com/images/logo.png';
      const description: string = project.subtitle || (project.description ? `${project.description.slice(0, 150)}...` : `${project.title} — a project delivered by Greatodeal.`);
      const title = `${project.title} | Case Study | Greatodeal`;
      return {
        title,
        description,
        keywords: [
          project.title, project.category, 'Greatodeal case study', 'AI automation projects',
          'custom software development company', 'CRM software', 'workflow automation', 'AI automation solutions',
          ...(Array.isArray(project.techStack) ? project.techStack : []),
        ].filter(Boolean),
        openGraph: {
          title,
          description,
          type: 'article',
          url: `https://greatodeal.com/work/${params.id}`,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: project.title }],
          siteName: 'Greatodeal',
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [imageUrl],
        },
        alternates: { canonical: `https://greatodeal.com/work/${params.id}` },
      };
    }
  } catch { /* fallback below */ }
  return {
    title: 'Project Case Study | Greatodeal',
    description: 'A software and AI automation project delivered by Greatodeal.',
    twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  };
}

// Next.js deduplicates identical fetch() calls (same URL + options) made during
// the same render pass, so this doesn't cost a second network round trip beyond
// the one generateMetadata already makes above.
async function getProject(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/portfolio/public/${id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  const schema = project ? {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.subtitle || project.description,
    creator: { '@id': 'https://greatodeal.com/#organization' },
    url: `https://greatodeal.com/work/${params.id}`,
    ...(project.category ? { about: project.category } : {}),
    ...(Array.isArray(project.techStack) && project.techStack.length ? { keywords: project.techStack.join(', ') } : {}),
  } : null;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://greatodeal.com' },
    { name: 'Work', url: 'https://greatodeal.com/work' },
    { name: project?.title || 'Project', url: `https://greatodeal.com/work/${params.id}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <PortfolioDetailClient />
    </>
  );
}
