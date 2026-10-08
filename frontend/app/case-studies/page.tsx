import type { Metadata } from 'next';
import CaseStudiesClient from '@/components/pages/CaseStudiesClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Case Studies', url: 'https://greatodeal.com/case-studies' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Greatodeal approach a client project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Requirements and compliance mapping first, then a compliance-first architecture, agile development with continuous review, and an audit-ready launch with ongoing support. The same process applies whether the project is a website, an AI agent, or a full enterprise platform.' },
    },
    {
      '@type': 'Question',
      name: 'Where can I see real projects Greatodeal has delivered?',
      acceptedAnswer: { '@type': 'Answer', text: 'Visit greatodeal.com/work for live client projects with technology details and, where available, a public demo link.' },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Case Studies | Software Development Success Stories | Greatodeal',
  description: 'How Greatodeal approaches software development and AI projects: compliance-first architecture, agile delivery, and audit-ready launches for government, healthcare, fintech, and enterprise clients.',
  keywords: ['case studies', 'software development projects', 'success stories', 'AI platform projects', 'e-commerce case study', 'fintech projects', 'ERP case study', 'mobile app case study', 'client projects', 'custom software development company', 'business process automation', 'AI automation solutions'],
  openGraph: {
    title: 'Case Studies | Software Development Success Stories | Greatodeal',
    description: 'How Greatodeal approaches software development and AI projects: compliance-first architecture, agile delivery, and audit-ready launches for government, healthcare, fintech, and enterprise clients.',
    url: 'https://greatodeal.com/case-studies',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Case Studies' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/case-studies',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CaseStudiesClient />
    </>
  );
}
