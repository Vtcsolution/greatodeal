import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'Government', url: 'https://greatodeal.com/industries/government' },
]);

export const metadata: Metadata = {
  title: 'AI Automation for Government Agencies | Greatodeal',
  description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, explainable AI decisions, and audit-ready compliance built in from day one.',
  keywords: ['government AI automation', 'public sector AI', 'citizen services automation', 'government case management software', 'explainable AI government', 'GovCloud AI infrastructure', 'Greatodeal', 'AI automation solutions', 'AI integration services', 'business process automation', 'workflow automation'],
  openGraph: {
    title: 'AI Automation for Government Agencies | Greatodeal',
    description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, and audit-ready compliance built in from day one.',
    url: 'https://greatodeal.com/industries/government',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Government AI Solutions' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Automation for Government Agencies | Greatodeal',
    description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, and audit-ready compliance built in from day one.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: { canonical: 'https://greatodeal.com/industries/government' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Government AI Automation',
  serviceType: 'Government AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, explainable AI decisions, and audit-ready compliance built in from day one.',
  url: 'https://greatodeal.com/industries/government',
};

const faqs = [
  { question: "Is Greatodeal's AI usable in government agencies with strict compliance requirements?", answer: 'Yes. Every automated decision we build for government clients is logged, explainable, and reviewable, engineered to hold up under FOIA requests, records-retention rules, and public audit, not just internal review.' },
  { question: 'What government workflows can Greatodeal automate?', answer: 'We automate citizen-facing workflows like permit processing, benefits applications, and service requests, with a human review step built in wherever a decision affects a citizen.' },
  { question: 'How does Greatodeal handle AI decision transparency for public accountability?', answer: 'Our AI-assisted recommendations show their reasoning and supporting evidence, so any automated decision can be reviewed, explained, and appealed rather than treated as a black box.' },
  { question: 'Does Greatodeal offer zero-trust infrastructure for government systems?', answer: 'Yes. We build with zero-trust access control and full audit logging as the default architecture, not an add-on requested after the fact.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
      <FaqSection faqs={faqs} />
    </>
  );
}
