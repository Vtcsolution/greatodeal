import type { Metadata } from 'next';
import IndustriesClient from '@/components/pages/IndustriesClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
]);

const industryListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Industries Greatodeal Serves',
  itemListElement: [
    { name: 'Government', url: 'https://greatodeal.com/industries/government' },
    { name: 'Healthcare', url: 'https://greatodeal.com/industries/healthcare' },
    { name: 'Fintech', url: 'https://greatodeal.com/industries/fintech' },
    { name: 'Green Tech', url: 'https://greatodeal.com/industries/green-tech' },
    { name: 'Real Estate', url: 'https://greatodeal.com/industries/real-estate' },
    { name: 'AI Automation', url: 'https://greatodeal.com/industries/ai-automation' },
    { name: 'Business Services', url: 'https://greatodeal.com/industries/business' },
    { name: 'E-Commerce', url: 'https://greatodeal.com/industries/ecommerce' },
  ].map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, url: item.url })),
};

export const metadata: Metadata = {
  title: 'Industries We Serve | AI SaaS & Agentic Automation | Greatodeal',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries: government, healthcare, fintech, green tech, and real estate, with compliance and audit built in.',
  keywords: ['AI automation by industry', 'government AI solutions', 'healthcare AI compliance', 'fintech AI automation', 'green tech AI', 'real estate AI platform', 'regulated industry AI', 'business process automation', 'digital transformation', 'AI automation solutions', 'AI integration services'],
  openGraph: {
    title: 'Industries We Serve | Greatodeal',
    description: 'AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate.',
    url: 'https://greatodeal.com/industries',
  },
  twitter: { card: 'summary', title: 'Industries We Serve | Greatodeal', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(industryListSchema) }} />
      <IndustriesClient />
    </>
  );
}
