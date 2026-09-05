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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Greatodeal offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal offers custom software development, AI agents and agentic automation, AI-automation SaaS platforms, ERP systems, website development, mobile app development, cloud and DevOps, and API integration.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal build custom AI agents?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal builds custom AI agents and agentic automation that execute multi-step operational workflows within defined guardrails, with human-in-the-loop review for decisions that matter.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal integrate AI automation into an existing system?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal builds secure API integrations and custom software that connect new AI automation to your existing tools, databases, and workflows rather than requiring a full replacement.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal build ERP systems?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal builds custom ERP systems covering procurement, production, inventory, HR, payroll, and financial reporting, tailored to the client\'s operations.' },
    },
  ],
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ServicesClient />
    </>
  );
}
