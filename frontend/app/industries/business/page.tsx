import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'Business Services', url: 'https://greatodeal.com/industries/business' },
]);

export const metadata: Metadata = {
  title: 'AI Automation for Business Services | Operations & Workflow Automation | Greatodeal',
  description: 'AI-driven automation for professional services firms: client onboarding, billing and invoicing, operational dashboards, and approval workflows with full audit trails.',
  keywords: [
    'business process automation', 'professional services automation', 'client onboarding automation', 'billing and invoicing automation', 'Greatodeal',
    'business workflow automation', 'automated workflows', 'workflow optimization', 'workflow management', 'process optimization',
    'operational efficiency', 'business efficiency', 'repetitive task automation', 'digital transformation', 'intelligent automation',
  ],
  openGraph: {
    title: 'AI Automation for Business Services | Operations & Workflow Automation | Greatodeal',
    description: 'AI-driven automation for professional services firms: client onboarding, billing and invoicing, operational dashboards, and approval workflows.',
    url: 'https://greatodeal.com/industries/business',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Business Services AI Solutions' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Automation for Business Services | Operations & Workflow Automation | Greatodeal',
    description: 'AI-driven automation for professional services firms: client onboarding, billing and invoicing, operational dashboards, and approval workflows.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: { canonical: 'https://greatodeal.com/industries/business' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business Services Automation',
  serviceType: 'Business Process Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'AI-driven automation for professional services firms: client onboarding, billing and invoicing, operational dashboards, and approval workflows with full audit trails.',
  url: 'https://greatodeal.com/industries/business',
};

const faqs = [
  { question: 'What does Greatodeal build for business and professional services firms?', answer: 'We build client onboarding automation, billing and invoicing systems, operational dashboards, and approval workflows tailored to how your firm actually operates.' },
  { question: 'Can Greatodeal automate client onboarding?', answer: 'Yes. We build structured intake workflows that move a new client from signed contract to active engagement without manual chasing.' },
  { question: 'Does Greatodeal integrate with tools we already use, like our CRM or accounting software?', answer: 'Yes. We build an integration layer connecting your CRM, accounting, and project management tools so data flows automatically instead of being re-entered by hand.' },
  { question: 'Can Greatodeal automate billing and invoicing?', answer: 'Yes. We build automated time tracking, invoice generation, and payment reconciliation tied directly to your project data.' },
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
