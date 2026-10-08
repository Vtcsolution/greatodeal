import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'Healthcare', url: 'https://greatodeal.com/industries/healthcare' },
]);

export const metadata: Metadata = {
  title: 'AI Automation for Healthcare | HIPAA-Compliant Systems | Greatodeal',
  description: 'HIPAA-compliant AI and agentic automation for healthcare providers, payers, and health-tech: interoperable health records, clinical workflow automation, and auditable AI clinical support.',
  keywords: ['healthcare AI automation', 'HIPAA compliant software', 'clinical workflow automation', 'HL7 FHIR integration', 'telehealth platform development', 'health-tech AI', 'Greatodeal', 'AI automation solutions', 'workflow automation', 'business process automation', 'AI integration services'],
  openGraph: {
    title: 'AI Automation for Healthcare | HIPAA-Compliant Systems | Greatodeal',
    description: 'HIPAA-compliant AI and agentic automation for healthcare: interoperable health records, clinical workflow automation, and auditable AI clinical support.',
    url: 'https://greatodeal.com/industries/healthcare',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Healthcare AI Solutions' }],
  },
  twitter: {
    card: 'summary',
    title: 'AI Automation for Healthcare | HIPAA-Compliant Systems | Greatodeal',
    description: 'HIPAA-compliant AI and agentic automation for healthcare: interoperable health records, clinical workflow automation, and auditable AI clinical support.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: { canonical: 'https://greatodeal.com/industries/healthcare' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Healthcare AI Automation',
  serviceType: 'Healthcare AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'HIPAA-compliant AI and agentic automation for healthcare providers, payers, and health-tech: interoperable health records, clinical workflow automation, and auditable AI clinical support.',
  url: 'https://greatodeal.com/industries/healthcare',
};

const faqs = [
  { question: "Is Greatodeal's AI HIPAA compliant?", answer: 'Yes. Our healthcare systems are built with HIPAA and HITECH compliance from the architecture up, including encrypted PHI storage, access-controlled APIs, and immutable PHI access audit logs.' },
  { question: 'What healthcare workflows can Greatodeal automate?', answer: 'We automate scheduling, care coordination, and administrative workflows, plus AI-assisted clinical triage and diagnostic support that logs its reasoning for clinician review.' },
  { question: 'Does Greatodeal support interoperability with existing EHR systems?', answer: 'Yes. We build on HL7/FHIR standards to connect patient records across EHRs, labs, and specialist systems without replacing what a hospital already runs.' },
  { question: 'Can Greatodeal build telehealth or remote monitoring platforms?', answer: 'Yes, and we hold them to the same HIPAA and audit standards as in-person care, not a lighter compliance bar.' },
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
