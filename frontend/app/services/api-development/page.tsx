import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'API Development & Integration Services | REST, GraphQL | Greatodeal',
  description: 'Professional API development and integration: REST APIs, GraphQL, third-party integrations (Stripe, HubSpot, Salesforce), microservices, and middleware. Expert API developers in Lahore, Pakistan.',
  keywords: ['API development', 'REST API', 'GraphQL development', 'API integration', 'third-party integration', 'Stripe integration', 'microservices', 'middleware development', 'API design', 'backend development', 'API developers Pakistan', 'Greatodeal'],
  openGraph: {
    title: 'API Development & Integration Services | REST, GraphQL | Greatodeal',
    description: 'Professional API development and integration: REST APIs, GraphQL, third-party integrations, microservices, and middleware. Expert API developers at Greatodeal.',
    url: 'https://greatodeal.com/services/api-development',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal API Development Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/api-development',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'API Development', item: 'https://greatodeal.com/services/api-development' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'API Development & Integration', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'API Development', description: 'REST & GraphQL API development, third-party integrations, payment gateways & microservices. Expert API development company in Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/api-development', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
