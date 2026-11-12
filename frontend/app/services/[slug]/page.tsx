import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicePages, getServicePage } from '@/lib/servicePages';
import { breadcrumbSchema } from '@/lib/schema';

const BASE_URL = 'https://greatodeal.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  const url = `${BASE_URL}/services/${page.slug}`;
  return {
    title: `${page.metaTitle} | Greatodeal`,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: 'website',
      images: [{ url: `${BASE_URL}/images/logo.png`, width: 512, height: 512, alt: `${page.name} by Greatodeal` }],
    },
    twitter: {
      card: 'summary',
      title: page.metaTitle,
      description: page.metaDescription,
      images: [`${BASE_URL}/images/logo.png`],
    },
    alternates: { canonical: url },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug);
  if (!page) notFound();
  const url = `${BASE_URL}/services/${page.slug}`;

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', url: BASE_URL },
    { name: 'Services', url: `${BASE_URL}/services` },
    { name: page.name, url },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: page.h1,
    serviceType: page.name,
    description: page.metaDescription,
    url,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: page.offeringsTitle,
      itemListElement: page.offerings.map(o => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: o.title, description: o.desc },
      })),
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServicePageTemplate page={page} />
    </>
  );
}
