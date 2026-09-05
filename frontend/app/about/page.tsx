import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: 'About Greatodeal | AI Infrastructure for Regulated Industries',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries. A small, focused team delivering compliance-grade AI for government, healthcare, and fintech.',
  keywords: ['about Greatodeal', 'AI infrastructure company', 'agentic automation company', 'compliance AI company', 'AI development company', 'regulated industry AI partner', 'AI automation agency Lahore', 'AI agency Pakistan', 'AI agent development team', 'AI automation agency', 'AI consulting services', 'AI implementation services', 'AI integration services', 'digital transformation', 'custom software development company'],
  openGraph: {
    title: 'About Greatodeal | AI Infrastructure for Regulated Industries',
    description: 'Greatodeal: AI SaaS and agentic automation for regulated industries. A small, focused team building compliance-grade AI infrastructure.',
    url: 'https://greatodeal.com/about',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'About Greatodeal' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
