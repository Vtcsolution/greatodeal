import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'About', url: 'https://greatodeal.com/about' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When was Greatodeal founded and where is it based?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal was founded in 2020 and is headquartered in Lahore, Pakistan, serving clients internationally.' },
    },
    {
      '@type': 'Question',
      name: "What is Greatodeal's engineering process?",
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal follows a compliance-first process: discovery and compliance mapping, compliance-first architecture, agile build with continuous security review, and an audit-ready launch with documentation and ongoing support.' },
    },
    {
      '@type': 'Question',
      name: 'What industries does Greatodeal serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal serves government and healthcare as its primary industries, with fintech, green tech, real estate, AI automation, business services, and e-commerce as secondary focus areas, eight industries in total.' },
    },
    {
      '@type': 'Question',
      name: 'What pricing models does Greatodeal offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal offers time and materials, capped time and materials, fixed price, subscription-based, per-ticket, and mixed pricing models, chosen based on project scope and requirements.' },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: "Greatodeal's Compliance-First Development Process",
  description: 'How Greatodeal builds AI SaaS and agentic automation systems for regulated industries, from discovery to audit-ready launch.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Discovery & Compliance Mapping', text: 'We map your regulatory requirements and operational workflow before writing a line of code, so compliance is a design input, not a retrofit.' },
    { '@type': 'HowToStep', position: 2, name: 'Compliance-First Architecture', text: 'Audit logging, access control, and encryption are built into the system architecture from the outset, not layered on before launch.' },
    { '@type': 'HowToStep', position: 3, name: 'Agile Build & Continuous Review', text: 'Development runs in agile sprints with security and compliance review gates at every milestone, not just at the end.' },
    { '@type': 'HowToStep', position: 4, name: 'Audit-Ready Launch & Support', text: 'We deliver with documentation and audit trails ready for regulatory review, plus ongoing monitoring and support post-launch.' },
  ],
};

export const metadata: Metadata = {
  title: 'About Greatodeal | AI Software Development Company in Lahore',
  description: 'Greatodeal is a software development company and AI development partner in Lahore, Pakistan, building custom software and compliance-grade AI for government, healthcare, fintech, and enterprise clients internationally.',
  keywords: [
    'about Greatodeal', 'AI infrastructure company', 'agentic automation company', 'compliance AI company',
    'AI development company', 'regulated industry AI partner', 'AI automation agency Lahore', 'AI agency Pakistan',
    'AI agent development team', 'AI automation agency', 'AI consulting services', 'AI implementation services',
    'AI integration services', 'digital transformation', 'custom software development company',
    'software development company', 'software development company in Lahore', 'software company in Lahore',
    'software development agency in Lahore', 'software house Lahore', 'technology company in Lahore',
    'enterprise software development company', 'AI development partner', 'AI product studio',
    'digital transformation company', 'software development company Netherlands', 'software development company Europe',
  ],
  openGraph: {
    title: 'About Greatodeal | AI Software Development Company in Lahore',
    description: 'Greatodeal is a software development company and AI development partner in Lahore, Pakistan, building custom software and compliance-grade AI for enterprise clients internationally.',
    url: 'https://greatodeal.com/about',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'About Greatodeal' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <AboutClient />
    </>
  );
}
