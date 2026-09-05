import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: 'Services | Websites, Software, AI SaaS, ERP & AI Agents | Greatodeal',
  description: 'Websites, custom software, AI-automation SaaS, ERP systems, AI agents, and workflow automation, everything you need to build, run, and automate your business.',
  keywords: [
    'services', 'website development', 'custom software development', 'AI automation SaaS', 'AI-powered SaaS platform',
    'ERP systems', 'AI tools', 'AI agents', 'agentic AI', 'agentic automation', 'business process automation',
    'mobile app development', 'cloud and DevOps', 'API integration', 'Greatodeal services',
    'business automation software', 'custom SaaS development', 'SaaS development', 'workflow automation',
    'workflow automation software', 'workflow management software', 'business process automation software',
    'marketing automation', 'AI marketing automation', 'customer service automation', 'robotic process automation',
    'RPA software', 'no-code automation', 'low-code automation', 'software integration', 'custom CRM',
    'CRM software', 'all-in-one business software', 'business operating system', 'custom dashboard',
    'business workflows', 'business operations automation', 'unified business dashboard', 'AI workflow',
    'AI workflow automation', 'SaaS automation', 'marketing automation software', 'workflow management',
    'marketing workflow automation', 'all-in-one business system', 'custom business software',
  ],
  openGraph: {
    title: 'Services | Websites, Software, AI SaaS, ERP & AI Agents | Greatodeal',
    description: 'Websites, custom software, AI-automation SaaS, ERP systems, AI agents, and workflow automation, everything you need to build, run, and automate your business.',
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
