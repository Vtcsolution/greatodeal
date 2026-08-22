import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: 'Services | Websites, Software, ERP & AI Automation | Greatodeal',
  description: 'Websites, custom software, ERP systems, AI tools, AI agents, and business process automation, everything you need to build, run, and automate your business.',
  keywords: ['services', 'website development', 'custom software development', 'ERP systems', 'AI tools', 'AI agents', 'agentic automation', 'business process automation', 'mobile app development', 'cloud and DevOps', 'API integration', 'Greatodeal services'],
  openGraph: {
    title: 'Services | Websites, Software, ERP & AI Automation | Greatodeal',
    description: 'Websites, custom software, ERP systems, AI tools, AI agents, and business process automation, everything you need to build, run, and automate your business.',
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
