import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: 'Services | Websites, Software, AI SaaS, ERP & AI Agents | Greatodeal',
  description: 'Websites, custom software, AI-automation SaaS, ERP systems, AI tools, AI agents, and agentic AI, everything you need to build, run, and automate your business.',
  keywords: ['services', 'website development', 'custom software development', 'AI automation SaaS', 'AI-powered SaaS platform', 'ERP systems', 'AI tools', 'AI agents', 'agentic AI', 'agentic automation', 'business process automation', 'mobile app development', 'cloud and DevOps', 'API integration', 'Greatodeal services'],
  openGraph: {
    title: 'Services | Websites, Software, AI SaaS, ERP & AI Agents | Greatodeal',
    description: 'Websites, custom software, AI-automation SaaS, ERP systems, AI tools, AI agents, and agentic AI, everything you need to build, run, and automate your business.',
    url: 'https://greatodeal.com/services',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services',
  },
};

export default function Page() {
  return <ServicesClient />;
}
