import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import BlogDetailClient from '@/components/pages/BlogDetailClient';
import { breadcrumbSchema } from '@/lib/schema';
import { founder } from '@/lib/founder';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// The route param is the post's slug; legacy links still use the Mongo id and are
// permanently redirected to the slug URL so rankings consolidate on one address.
async function getBlog(idOrSlug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/${idOrSlug}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

const blogUrl = (blog: { slug?: string; _id: string }) => `https://greatodeal.com/blog/${blog.slug || blog._id}`;

const blogImage = (image?: string) =>
  !image ? 'https://greatodeal.com/images/logo.png' : image.startsWith('http') ? image : `${API_BASE}${image}`;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlog(params.id);
  if (blog) {
    const url = blogUrl(blog);
    const imageUrl = blogImage(blog.image);
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
        url,
        images: [{ url: imageUrl, width: 1200, height: 630, alt: blog.title }],
        siteName: 'Greatodeal',
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt,
        images: [imageUrl],
      },
      alternates: { canonical: url },
    };
  }
  return {
    title: 'Blog Post | Greatodeal',
    description: 'Read the latest technology insights from Greatodeal.',
    twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  };
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);
  if (blog?.slug && params.id !== blog.slug) permanentRedirect(`/blog/${blog.slug}`);

  const url = blog ? blogUrl(blog) : `https://greatodeal.com/blog/${params.id}`;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: 'https://greatodeal.com' },
    { name: 'Blog', url: 'https://greatodeal.com/blog' },
    { name: blog?.title || 'Post', url },
  ]);

  const articleSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: blogImage(blog.image),
    author: /^(zia|muhammad zia|rana zia)/i.test(blog.author || '')
      ? { '@type': 'Person', '@id': founder.personId, name: founder.name, url: founder.url }
      : { '@type': 'Person', name: blog.author },
    publisher: { '@id': 'https://greatodeal.com/#organization' },
    datePublished: blog.date,
    dateModified: blog.updatedAt || blog.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(blog.category ? { articleSection: blog.category } : {}),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      {/* Comments and the client-side fetch are keyed by the Mongo id, not the slug. */}
      <BlogDetailClient id={blog?._id || params.id} />
    </>
  );
}
