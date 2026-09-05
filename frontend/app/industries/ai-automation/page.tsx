import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'AI Automation', url: 'https://greatodeal.com/industries/ai-automation' },
]);

export const metadata: Metadata = {
  title: 'AI Automation Solutions | Agentic Workflows | Greatodeal',
  description: 'Agentic AI automation that connects scattered tools into one operational system: workflow automation, operational dashboards, and automated customer response with full audit logging.',
  keywords: [
    'AI automation company', 'agentic workflow automation', 'business process automation AI', 'operational automation software',
    'connected systems automation', 'Greatodeal', 'AI agent development', 'agentic AI services', 'AI automation agency Pakistan',
    'automate business with AI', 'AI agents', 'AI agent', 'AI assistant', 'AI virtual assistant', 'conversational AI', 'AI chatbot',
    'intelligent automation', 'AI-powered automation', 'automated workflows', 'workflow optimization', 'process automation software',
    'AI agent platform', 'AI agents for business', 'AI workflow tools', 'AI automation tools', 'automate repetitive tasks',
    'AI automation services', 'AI receptionist', 'AI voice agent',
  ],
  openGraph: {
    title: 'AI Automation Solutions | Agentic Workflows | Greatodeal',
    description: 'Agentic AI automation that connects scattered tools into one operational system, with full audit logging on every automated action.',
    url: 'https://greatodeal.com/industries/ai-automation',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal AI Automation Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/ai-automation' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'AI Automation',
  serviceType: 'AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'Agentic AI automation that connects scattered tools into one operational system: workflow automation, operational dashboards, and automated customer response with full audit logging.',
  url: 'https://greatodeal.com/industries/ai-automation',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is agentic AI automation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Agentic AI automation uses autonomous agents to execute multi-step tasks end to end, rather than a single chatbot reply. We build these with a human review step wherever a decision matters, and full logging of every automated action.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal automate workflows across our existing tools?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We connect the systems you already run into one operational picture instead of asking you to replace them, so automation works with your existing stack, not around it.' },
    },
    {
      '@type': 'Question',
      name: 'Does automation replace our team or reduce oversight?',
      acceptedAnswer: { '@type': 'Answer', text: "No. Every automated action stays reviewable, with a human-in-the-loop step wherever it matters, so speed doesn't come at the cost of control." },
    },
    {
      '@type': 'Question',
      name: 'How is this different from generic no-code automation tools?',
      acceptedAnswer: { '@type': 'Answer', text: 'Generic tools trigger simple if-this-then-that actions. We build custom agentic systems that handle multi-step operational workflows, integrate with your specific systems, and log every action for audit and review.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
    </>
  );
}
