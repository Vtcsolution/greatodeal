import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Contact', url: 'https://greatodeal.com/contact' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly does Greatodeal respond to inquiries?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal replies within 24 hours to every demo request or inquiry submitted through the contact form, email, or WhatsApp.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal sign NDAs?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, an NDA is available for clients who want confidentiality in place before discussing project details.' },
    },
    {
      '@type': 'Question',
      name: 'How can I reach Greatodeal?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can reach Greatodeal via the contact form at greatodeal.com/contact, by email at sales@greatodeal.com, or via WhatsApp at +92-301-1060841.' },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Request a Demo | Contact Greatodeal',
  description: 'Request a demo of Greatodeal\'s AI SaaS and agentic automation for regulated industries. Reach us for government, healthcare, or fintech AI infrastructure. WhatsApp +92 301 1060841 or email sales@greatodeal.com.',
  keywords: ['request a demo AI SaaS', 'contact Greatodeal', 'government AI demo', 'healthcare AI demo', 'fintech AI demo', 'agentic automation consultation', 'Greatodeal contact', 'AI automation agency', 'AI consulting services', 'AI automation services'],
  openGraph: {
    title: 'Request a Demo | Contact Greatodeal',
    description: 'Request a demo of Greatodeal\'s AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate.',
    url: 'https://greatodeal.com/contact',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Contact Greatodeal' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/contact',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ContactClient />
    </>
  );
}
