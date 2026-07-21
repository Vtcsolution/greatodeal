import type { Metadata } from 'next';
import IndustriesClient from '@/components/pages/IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | AI SaaS & Agentic Automation | Greatodeal',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries: government, healthcare, fintech, green tech, and real estate, with compliance and audit built in.',
  keywords: ['AI automation by industry', 'government AI solutions', 'healthcare AI compliance', 'fintech AI automation', 'green tech AI', 'real estate AI platform', 'regulated industry AI'],
  openGraph: {
    title: 'Industries We Serve | Greatodeal',
    description: 'AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate.',
    url: 'https://greatodeal.com/industries',
  },
  twitter: { card: 'summary', title: 'Industries We Serve | Greatodeal', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries' },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
