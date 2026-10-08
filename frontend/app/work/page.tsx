import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Work', url: 'https://greatodeal.com/work' },
]);

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Greatodeal Work',
  description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
  url: 'https://greatodeal.com/work',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What has Greatodeal actually built for clients?',
      acceptedAnswer: { '@type': 'Answer', text: 'Real projects delivered for clients, including an AI-powered lead-generation CRM, a government contracting SaaS platform, an AI and human hybrid consultation platform, and federal IT and hardware procurement websites. Every project listed here is live client work, not a mockup.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal build SaaS platforms?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Several projects on this page are custom SaaS platforms built for specific client use cases, from CRM and lead automation to government procurement workflows.' },
    },
    {
      '@type': 'Question',
      name: 'Can I see a demo or live link for a project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Where a project is publicly accessible, its live demo URL is listed on that project\'s detail page. For internal tools without a public URL, contact Greatodeal to request a walkthrough.' },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Work | AI Automation & Software Projects | Greatodeal',
  description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
  keywords: [
    'portfolio', 'work', 'AI automation projects', 'software development portfolio', 'Greatodeal projects',
    'CRM software', 'CRM integration', 'CRM workflow automation', 'custom CRM', 'lead automation',
    'lead qualification automation', 'lead routing automation', 'lead management',
    'sales automation', 'sales automation software', 'sales workflow automation', 'AI sales agent', 'follow-up automation',
    'email automation', 'AI call automation', 'AI phone answering', '24/7 answering service', 'AI answering service',
    'virtual receptionist', 'AI receptionist', 'AI voice agent', 'AI appointment scheduling',
    'appointment booking automation', 'appointment scheduling automation', 'calendar automation',
    'AI chatbot', 'conversational AI', 'AI customer service', 'customer service AI', 'AI customer support',
    'customer support automation', 'customer service automation', 'API integration', 'software integration',
    'enterprise software projects', 'custom software development company portfolio', 'mobile app development portfolio',
    'web application development portfolio', 'ERP development portfolio',
  ],
  openGraph: {
    title: 'Work | AI Automation & Software Projects | Greatodeal',
    description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
    url: 'https://greatodeal.com/work',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Work' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/work',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PortfolioClient />
    </>
  );
}
