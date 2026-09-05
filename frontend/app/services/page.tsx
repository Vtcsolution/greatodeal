import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Services', url: 'https://greatodeal.com/services' },
]);

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'AI Automation, Custom Software & SaaS Development',
  provider: { '@id': 'https://greatodeal.com/#organization' },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Greatodeal Services',
    itemListElement: [
      'Custom Software Development', 'AI Agents & Agentic Automation', 'AI-Automation SaaS Platforms',
      'ERP Systems', 'Website Development', 'Mobile App Development', 'Cloud & DevOps', 'API Integration',
    ].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
};

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServicesClient />
    </>
  );
}
