import type { Metadata } from 'next';
import PortfolioDetailClient from '@/components/pages/PortfolioDetailClient';

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

export default function Page() {
  return <PortfolioDetailClient />;
}
