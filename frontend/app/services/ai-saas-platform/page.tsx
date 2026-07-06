import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'SaaS Development Company in Pakistan | AI SaaS Platform Development | Greatodeal',
  description: 'Top SaaS development company in Pakistan. We build AI-powered SaaS platforms — multi-tenant, subscription billing, enterprise-grade architecture. Based in Lahore, serving global clients.',
  keywords: ['SaaS development company Pakistan', 'SaaS development Lahore', 'AI SaaS platform development', 'SaaS platform company Pakistan', 'multi-tenant SaaS Pakistan', 'SaaS MVP development', 'SaaS startup Pakistan', 'AI SaaS company', 'build SaaS Pakistan', 'Greatodeal SaaS'],
  openGraph: {
    title: 'SaaS Development Company in Pakistan | AI SaaS Platform Development | Greatodeal',
    description: 'Top SaaS development company in Pakistan — AI-powered SaaS platforms, multi-tenant architecture, subscription billing. Based in Lahore, serving global clients.',
    url: 'https://greatodeal.com/services/ai-saas-platform',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal AI SaaS Platform Development' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/ai-saas-platform',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'AI SaaS Platform Development', item: 'https://greatodeal.com/services/ai-saas-platform' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'AI SaaS Platform Development', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'SaaS Development', description: 'Build AI-powered SaaS platforms with multi-tenant architecture, subscription billing & enterprise-grade features. SaaS development company in Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/ai-saas-platform', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
