import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Government Agencies | Greatodeal',
  description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, explainable AI decisions, and audit-ready compliance built in from day one.',
  keywords: ['government AI automation', 'public sector AI', 'citizen services automation', 'government case management software', 'explainable AI government', 'GovCloud AI infrastructure', 'Greatodeal'],
  openGraph: {
    title: 'AI Automation for Government Agencies | Greatodeal',
    description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, and audit-ready compliance built in from day one.',
    url: 'https://greatodeal.com/industries/government',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Government AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Is Greatodeal's AI usable in government agencies with strict compliance requirements?",
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every automated decision we build for government clients is logged, explainable, and reviewable, engineered to hold up under FOIA requests, records-retention rules, and public audit, not just internal review.' },
    },
    {
      '@type': 'Question',
      name: 'What government workflows can Greatodeal automate?',
      acceptedAnswer: { '@type': 'Answer', text: 'We automate citizen-facing workflows like permit processing, benefits applications, and service requests, with a human review step built in wherever a decision affects a citizen.' },
    },
    {
      '@type': 'Question',
      name: 'How does Greatodeal handle AI decision transparency for public accountability?',
      acceptedAnswer: { '@type': 'Answer', text: 'Our AI-assisted recommendations show their reasoning and supporting evidence, so any automated decision can be reviewed, explained, and appealed rather than treated as a black box.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal offer zero-trust infrastructure for government systems?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build with zero-trust access control and full audit logging as the default architecture, not an add-on requested after the fact.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
    </>
  );
}
