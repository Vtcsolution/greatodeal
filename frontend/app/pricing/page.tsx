import type { Metadata } from 'next';
import PricingClient from '@/components/pages/PricingClient';

export const metadata: Metadata = {
  title: 'Pricing | Websites, AI Agents & Software Development | Greatodeal',
  description: 'Transparent pricing for websites, website care, AI agents, and custom software development from Greatodeal.',
  keywords: ['pricing', 'website pricing', 'AI agent pricing', 'software development pricing', 'Greatodeal pricing'],
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
  return <PricingClient />;
}
