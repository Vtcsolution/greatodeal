import type { Metadata } from 'next';
import PricingClient from '@/components/pages/PricingClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Pricing', url: 'https://greatodeal.com/pricing' },
]);

export const metadata: Metadata = {
  title: 'Pricing | Websites, AI Agents & Software Development | Greatodeal',
  description: 'Transparent pricing for websites, website care, AI agents, and custom software development from Greatodeal.',
  keywords: ['pricing', 'website pricing', 'AI agent pricing', 'software development pricing', 'Greatodeal pricing', 'custom SaaS development', 'SaaS development', 'custom software development company'],
  openGraph: {
    title: 'Pricing | Websites, AI Agents & Software Development | Greatodeal',
    description: 'Transparent pricing for websites, website care, AI agents, and custom software development from Greatodeal.',
    url: 'https://greatodeal.com/pricing',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Pricing' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/pricing' },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PricingClient />
    </>
  );
}
