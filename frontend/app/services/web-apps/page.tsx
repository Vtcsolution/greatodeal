import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'Web Development Company in Lahore Pakistan | React, Next.js & Node.js | Greatodeal',
  description: 'Top web development company in Lahore, Pakistan. Expert React, Next.js, Node.js & full-stack web development. Custom web apps, SaaS platforms & e-commerce built for global clients. Free consultation.',
  keywords: ['web development company Lahore', 'web development company Pakistan', 'website development Lahore', 'React development Pakistan', 'Next.js development Pakistan', 'custom web application Lahore', 'full stack development Pakistan', 'SaaS development company', 'e-commerce development Pakistan', 'Greatodeal web development'],
  openGraph: {
    title: 'Web Development Company in Lahore Pakistan | React, Next.js & Node.js | Greatodeal',
    description: 'Top web development company in Lahore — React, Next.js, Node.js & full-stack development. Custom web apps, SaaS & e-commerce for global clients.',
    url: 'https://greatodeal.com/services/web-apps',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Web App Development Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/web-apps',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'Web Development', item: 'https://greatodeal.com/services/web-apps' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Web Application Development', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'Web Development', description: 'Expert web development using React, Next.js, Node.js, Vue.js & Angular. Custom web apps, SaaS platforms & e-commerce. Web development company in Lahore, Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/web-apps', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
