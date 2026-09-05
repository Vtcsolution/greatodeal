import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';

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
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Is Greatodeal's AI HIPAA compliant?",
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our healthcare systems are built with HIPAA and HITECH compliance from the architecture up, including encrypted PHI storage, access-controlled APIs, and immutable PHI access audit logs.' },
    },
    {
      '@type': 'Question',
      name: 'What healthcare workflows can Greatodeal automate?',
      acceptedAnswer: { '@type': 'Answer', text: 'We automate scheduling, care coordination, and administrative workflows, plus AI-assisted clinical triage and diagnostic support that logs its reasoning for clinician review.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal support interoperability with existing EHR systems?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build on HL7/FHIR standards to connect patient records across EHRs, labs, and specialist systems without replacing what a hospital already runs.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal build telehealth or remote monitoring platforms?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, and we hold them to the same HIPAA and audit standards as in-person care, not a lighter compliance bar.' },
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
