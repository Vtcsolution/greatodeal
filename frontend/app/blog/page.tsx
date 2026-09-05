import type { Metadata } from 'next';
import BlogListClient from '@/components/pages/BlogListClient';
import type { Blog } from '@/types';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Blog', url: 'https://greatodeal.com/blog' },
]);

export const metadata: Metadata = {
  title: 'Blog & Insights | AI, Software Development, Technology Trends | Greatodeal',
  description: 'Read Greatodeal\'s tech blog: expert insights on AI, machine learning, software development, SaaS, cloud computing, UI/UX, blockchain, and digital transformation trends.',
  keywords: ['tech blog', 'AI insights', 'software development blog', 'machine learning articles', 'SaaS trends', 'cloud computing', 'UI/UX design blog', 'digital transformation', 'technology trends', 'developer blog', 'Greatodeal blog', 'AI automation', 'AI agents', 'business process automation', 'intelligent automation'],
  openGraph: {
    title: 'Blog & Insights | AI, Software Development, Technology Trends | Greatodeal',
    description: 'Read Greatodeal\'s tech blog: expert insights on AI, machine learning, software development, SaaS, cloud computing, and digital transformation trends.',
    url: 'https://greatodeal.com/blog',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Blog & Insights' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/blog',
  },
};

async function getInitialBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/blogs?limit=50`, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.success ? data.data || [] : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const initialBlogs = await getInitialBlogs();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <BlogListClient initialBlogs={initialBlogs} />
    </>
  );
}
