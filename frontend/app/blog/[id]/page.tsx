import type { Metadata } from 'next';
import BlogDetailClient from '@/components/pages/BlogDetailClient';
import { breadcrumbSchema } from '@/lib/schema';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/blogs/${params.id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && data.data) {
      const blog = data.data;
      const imageUrl = blog.image ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/uploads/${blog.image}` : 'https://greatodeal.com/images/logo.png';
      return {
        title: `${blog.title} | Greatodeal Blog`,
        description: blog.excerpt,
        keywords: [blog.category, blog.author, 'Greatodeal blog', 'technology insights', 'AI', 'software development', 'tech articles', 'AI automation', 'business process automation'],
        openGraph: {
          title: blog.title,
          description: blog.excerpt,
          type: 'article',
          publishedTime: blog.date,
          authors: [blog.author],
          tags: [blog.category],
          url: `https://greatodeal.com/blog/${params.id}`,
          images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
          siteName: 'Greatodeal',
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.excerpt,
          images: [imageUrl],
        },
        alternates: { canonical: `https://greatodeal.com/blog/${params.id}` },
      };
    }
  } catch { /* fallback below */ }
  return {
    title: 'Blog Post | Greatodeal',
    description: 'Read the latest technology insights from Greatodeal.',
    twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  };
}

async function getBlog(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://greatodeal.com' },
    { name: 'Blog', url: 'https://greatodeal.com/blog' },
    { name: blog?.title || 'Post', url: `https://greatodeal.com/blog/${params.id}` },
  ]);

  const articleSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image ? `${API_BASE}/uploads/${blog.image}` : 'https://greatodeal.com/images/logo.png',
    author: { '@type': 'Person', name: blog.author },
    publisher: { '@id': 'https://greatodeal.com/#organization' },
    datePublished: blog.date,
    dateModified: blog.updatedAt || blog.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://greatodeal.com/blog/${params.id}` },
    ...(blog.category ? { articleSection: blog.category } : {}),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      <BlogDetailClient id={params.id} />
    </>
  );
}
