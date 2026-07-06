import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'Software Testing & QA Services | Selenium, Jest, Cypress | Greatodeal',
  description: 'Comprehensive software testing and QA services: manual testing, automated testing, performance testing, security testing, and API testing. Ensuring software quality for global clients from Lahore, Pakistan.',
  keywords: ['software testing', 'QA services', 'automated testing', 'Selenium testing', 'Jest testing', 'Cypress testing', 'manual testing', 'performance testing', 'security testing', 'API testing', 'quality assurance', 'test automation', 'QA company Pakistan', 'Greatodeal'],
  openGraph: {
    title: 'Software Testing & QA Services | Selenium, Jest, Cypress | Greatodeal',
    description: 'Comprehensive software testing and QA services: manual testing, automated testing, performance testing, security testing, and API testing.',
    url: 'https://greatodeal.com/services/software-testing',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Software Testing & QA Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/software-testing',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'Software Testing & QA', item: 'https://greatodeal.com/services/software-testing' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Software Testing & QA Services', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'Software Testing', description: 'Comprehensive software testing & QA: manual, automated, performance, security & regression testing. Expert QA company in Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/software-testing', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
