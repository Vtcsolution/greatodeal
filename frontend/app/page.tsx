import type { Metadata } from 'next';
import HomeClient from '@/components/pages/HomeClient';

export const metadata: Metadata = {
  title: 'Greatodeal | AI Automation Agency in Lahore, Pakistan',
  description: 'Greatodeal builds AI automation and SaaS platforms for government, healthcare, and fintech, based in Lahore, Pakistan.',
  keywords: [
    'AI SaaS for regulated industries', 'agentic automation', 'compliance-grade AI infrastructure',
    'government AI automation', 'healthcare AI HIPAA compliant', 'fintech AI compliance',
    'AI automation company', 'explainable AI', 'audit-ready AI systems', 'Greatodeal',
    'AI agent development company', 'agentic AI services', 'AI automation agency Lahore',
    'AI services provider Pakistan', 'top AI companies Pakistan', 'business automation AI',
  ],
  openGraph: {
    title: 'Greatodeal | AI Automation Agency in Lahore, Pakistan',
    description: 'Greatodeal builds AI automation and SaaS platforms for government, healthcare, and fintech, based in Lahore, Pakistan.',
    url: 'https://greatodeal.com',
    type: 'website',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greatodeal | AI Automation Agency in Lahore, Pakistan',
    description: 'Greatodeal builds AI automation and SaaS platforms for government, healthcare, and fintech, based in Lahore, Pakistan.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com',
    languages: {
      'en-US': 'https://greatodeal.com',
      'en-GB': 'https://greatodeal.com',
      'en': 'https://greatodeal.com',
    },
  },
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://greatodeal.com/#webpage',
  url: 'https://greatodeal.com',
  name: 'Greatodeal | AI SaaS & Agentic Automation for Regulated Industries',
  description: 'AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate, built with compliance, security, and auditability from day one.',
  isPartOf: { '@id': 'https://greatodeal.com/#website' },
  about: { '@id': 'https://greatodeal.com/#organization' },
  breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }] },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.hero-description'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Greatodeal build?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal builds AI SaaS platforms and agentic automation, including autonomous AI agents, compliance-grade infrastructure, industry-specific software, and secure integrations, for institutions operating under regulatory and audit requirements.' },
    },
    {
      '@type': 'Question',
      name: 'Which industries does Greatodeal focus on?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal focuses on government and healthcare as its primary industries, with fintech, green tech, real estate, and AI automation as secondary areas of focus. These are all sectors where compliance, audit, and security are core requirements, not optional extras.' },
    },
    {
      '@type': 'Question',
      name: 'How does Greatodeal handle compliance and audit requirements?',
      acceptedAnswer: { '@type': 'Answer', text: 'Compliance is built into the architecture from the start: immutable audit trails, zero-trust access control, encryption at rest and in transit, and explainable AI decisions that can be reviewed and appealed rather than treated as a black box.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal build agentic AI systems?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal builds agentic AI systems that execute multi-step operational workflows within defined guardrails, with human-in-the-loop review for decisions that affect people, and full logging of every automated action.' },
    },
    {
      '@type': 'Question',
      name: 'How can I request a demo from Greatodeal?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can request a demo via the contact form at greatodeal.com/contact, by email at sales@greatodeal.com, or via WhatsApp. Our team responds within 24 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Is Greatodeal an AI automation agency based in Lahore, Pakistan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal is an AI automation agency headquartered in Lahore, Pakistan, providing AI agent development, agentic automation, and AI services to clients in Pakistan and internationally.' },
    },
    {
      '@type': 'Question',
      name: 'What is an AI agent, and does Greatodeal build them?',
      acceptedAnswer: { '@type': 'Answer', text: 'An AI agent is a system that can plan and execute multi-step tasks toward a goal, rather than just responding to a single prompt. Greatodeal builds AI agents and agentic automation that connect a business\'s tools and workflows into one operational system, with human review built in for actions that matter.' },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'What Greatodeal Builds',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Agentic AI Platforms', url: 'https://greatodeal.com' },
    { '@type': 'ListItem', position: 2, name: 'AI Agent Development', url: 'https://greatodeal.com/industries/ai-automation' },
    { '@type': 'ListItem', position: 3, name: 'Compliance-Grade Infrastructure', url: 'https://greatodeal.com' },
    { '@type': 'ListItem', position: 4, name: 'Industry-Specific SaaS', url: 'https://greatodeal.com/industries' },
    { '@type': 'ListItem', position: 5, name: 'Secure Integration & Data Pipelines', url: 'https://greatodeal.com' },
  ],
};

// Organization and LocalBusiness entities are declared once, in the root
// layout (rendered on every page including this one) — duplicating a second,
// less complete copy here just gives Google two conflicting descriptions of
// the same business, which hurts entity recognition rather than helping it.

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HomeClient />
    </>
  );
}
