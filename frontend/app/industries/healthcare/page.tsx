import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Healthcare | HIPAA-Compliant Systems | Greatodeal',
  description: 'HIPAA-compliant AI and agentic automation for healthcare providers, payers, and health-tech: interoperable health records, clinical workflow automation, and auditable AI clinical support.',
  keywords: ['healthcare AI automation', 'HIPAA compliant software', 'clinical workflow automation', 'HL7 FHIR integration', 'telehealth platform development', 'health-tech AI', 'Greatodeal'],
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
