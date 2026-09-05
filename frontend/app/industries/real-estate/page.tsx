import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'Real Estate', url: 'https://greatodeal.com/industries/real-estate' },
]);

export const metadata: Metadata = {
  title: 'AI Automation for Real Estate | Compliance-Grade PropTech | Greatodeal',
  description: 'AI-driven platforms for real estate and PropTech: automated disclosure compliance, unified property data, portfolio reporting, and transaction fraud detection.',
  keywords: ['real estate AI automation', 'PropTech software development', 'property management platform', 'transaction fraud detection real estate', 'Greatodeal', 'AI automation solutions', 'workflow automation', 'business process automation', 'CRM software', 'lead management'],
  openGraph: {
    title: 'AI Automation for Real Estate | Compliance-Grade PropTech | Greatodeal',
    description: 'AI-driven platforms for real estate and PropTech: automated disclosure compliance, unified property data, and portfolio reporting.',
    url: 'https://greatodeal.com/industries/real-estate',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Real Estate AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/real-estate' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Real Estate AI Automation',
  serviceType: 'Real Estate AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'AI-driven platforms for real estate and PropTech: automated disclosure compliance, unified property data, portfolio reporting, and transaction fraud detection.',
  url: 'https://greatodeal.com/industries/real-estate',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Greatodeal build for real estate and PropTech companies?',
      acceptedAnswer: { '@type': 'Answer', text: 'We build platforms for automated disclosure compliance, unified property data, portfolio reporting, and transaction fraud detection.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal automate real estate disclosure requirements?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build transaction workflows that generate and log required disclosures automatically, reducing manual review and legal exposure.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal offer fraud detection for property transactions?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We use AI-based anomaly detection on high-value transactions and wire transfers to flag fraud risk before funds move.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal integrate with existing property management systems?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build an integration layer connecting listings, title, escrow, and financing data into a single auditable record per property, on top of the systems you already use.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
    </>
  );
}
