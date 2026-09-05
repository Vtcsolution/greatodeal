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

export const metadata: Metadata = {
  title: 'About Greatodeal | AI Infrastructure for Regulated Industries',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries. A small, focused team delivering compliance-grade AI for government, healthcare, and fintech.',
  keywords: ['about Greatodeal', 'AI infrastructure company', 'agentic automation company', 'compliance AI company', 'AI development company', 'regulated industry AI partner', 'AI automation agency Lahore', 'AI agency Pakistan', 'AI agent development team', 'AI automation agency', 'AI consulting services', 'AI implementation services', 'AI integration services', 'digital transformation', 'custom software development company'],
  openGraph: {
    title: 'About Greatodeal | AI Infrastructure for Regulated Industries',
    description: 'Greatodeal: AI SaaS and agentic automation for regulated industries. A small, focused team building compliance-grade AI infrastructure.',
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
      <AboutClient />
    </>
  );
}
