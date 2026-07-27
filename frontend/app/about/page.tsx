import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: 'About Greatodeal | AI Infrastructure for Regulated Industries Since 2020',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries since 2020. A small, focused team delivering compliance-grade AI for government, healthcare, and fintech.',
  keywords: ['about Greatodeal', 'AI infrastructure company', 'agentic automation company', 'compliance AI company', 'AI development company', 'regulated industry AI partner', 'Greatodeal since 2020'],
  openGraph: {
    title: 'About Greatodeal | AI Infrastructure for Regulated Industries Since 2020',
    description: 'Greatodeal: AI SaaS and agentic automation for regulated industries since 2020. A small, focused team building compliance-grade AI infrastructure.',
    url: 'https://greatodeal.com/about',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'About Greatodeal' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
