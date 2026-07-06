import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'Custom Software Development Company Lahore Pakistan | ERP, CRM & SaaS | Greatodeal',
  description: 'Leading custom software development company in Lahore, Pakistan. Expert ERP, CRM, HRM, SaaS & enterprise software. Tailored solutions for businesses worldwide. 9+ years, 200+ projects.',
  keywords: ['custom software development Pakistan', 'custom software development Lahore', 'software house Pakistan', 'software house Lahore', 'ERP development Pakistan', 'CRM development Lahore', 'enterprise software Pakistan', 'bespoke software development', 'SaaS development Lahore', 'HRM software Pakistan', 'inventory management software Pakistan', 'Greatodeal custom software'],
  openGraph: {
    title: 'Custom Software Development Company Lahore Pakistan | ERP, CRM & SaaS | Greatodeal',
    description: 'Leading custom software development company in Lahore — ERP, CRM, HRM, SaaS & enterprise software. 9+ years, 200+ global projects.',
    url: 'https://greatodeal.com/services/custom-software',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Custom Software Development' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/custom-software',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'Custom Software Development', item: 'https://greatodeal.com/services/custom-software' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Custom Software Development', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'Custom Software Development', description: 'Custom enterprise software development: ERP, CRM, HRM, SaaS & bespoke business applications. Leading software house in Lahore, Pakistan with 9+ years experience.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/custom-software', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
