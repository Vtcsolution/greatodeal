import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'Fintech', url: 'https://greatodeal.com/industries/fintech' },
]);

export const metadata: Metadata = {
  title: 'AI Automation for Fintech | Compliance-Grade Infrastructure | Greatodeal',
  description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure built for regulated financial operations.',
  keywords: ['fintech AI automation', 'KYC AML automation', 'fraud detection AI', 'PCI DSS compliant software', 'open banking API development', 'Greatodeal', 'AI automation solutions', 'business process automation', 'workflow automation', 'AI integration services', 'API integration'],
  openGraph: {
    title: 'AI Automation for Fintech | Compliance-Grade Infrastructure | Greatodeal',
    description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure.',
    url: 'https://greatodeal.com/industries/fintech',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Fintech AI Solutions' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Automation for Fintech | Compliance-Grade Infrastructure | Greatodeal',
    description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: { canonical: 'https://greatodeal.com/industries/fintech' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fintech AI Automation',
  serviceType: 'Fintech AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure built for regulated financial operations.',
  url: 'https://greatodeal.com/industries/fintech',
};

const faqs = [
  { question: "Is Greatodeal's fintech infrastructure PCI DSS compliant?", answer: 'Yes. Our payment and transaction systems are built to PCI DSS requirements with end-to-end encryption and immutable transaction audit logs.' },
  { question: 'Can Greatodeal automate KYC and AML compliance?', answer: 'Yes. We build automated identity verification and AML screening workflows that log every compliance decision for audit and regulatory review.' },
  { question: 'Does Greatodeal offer real-time fraud detection?', answer: 'Yes. Our machine-learning fraud detection flags and can block suspicious transactions in real time, with explainable alerts for compliance teams to review.' },
  { question: 'Can Greatodeal integrate with core banking and open banking APIs?', answer: 'Yes. We build PSD2-compliant open banking APIs and integrate directly with core banking systems, card networks, and payment rails.' },
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
