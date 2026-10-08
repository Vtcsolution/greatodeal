import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Contact', url: 'https://greatodeal.com/contact' },
]);

const faqs = [
  { question: 'How quickly does Greatodeal respond to inquiries?', answer: 'Greatodeal replies within 24 hours to every demo request or inquiry submitted through the contact form, email, or WhatsApp.' },
  { question: 'Does Greatodeal sign NDAs?', answer: 'Yes, an NDA is available for clients who want confidentiality in place before discussing project details.' },
  { question: 'How can I reach Greatodeal?', answer: 'You can reach Greatodeal via the contact form at greatodeal.com/contact, by email at sales@greatodeal.com, or via WhatsApp at +92-301-1060841.' },
  { question: 'Where is Greatodeal located?', answer: 'Greatodeal is headquartered at 16 Jail Rd, Shadman 2, Lahore, Pakistan, and serves clients internationally, including in the United States, United Kingdom, United Arab Emirates, Netherlands, Saudi Arabia, and Germany.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

export const metadata: Metadata = {
  title: 'Request a Demo | Contact Greatodeal, Software Company in Lahore',
  description: 'Request a demo of Greatodeal\'s custom software and AI development for regulated industries. Reach our Lahore, Pakistan team for government, healthcare, or fintech software. WhatsApp +92 301 1060841 or email sales@greatodeal.com.',
  keywords: [
    'request a demo AI SaaS', 'contact Greatodeal', 'government AI demo', 'healthcare AI demo', 'fintech AI demo',
    'agentic automation consultation', 'Greatodeal contact', 'AI automation agency', 'AI consulting services',
    'AI automation services', 'software company in Lahore', 'software development company in Lahore',
    'software house in Lahore', 'software developers in Lahore', 'IT company in Lahore', 'technology company in Lahore',
  ],
  openGraph: {
    title: 'Request a Demo | Contact Greatodeal',
    description: 'Request a demo of Greatodeal\'s AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate.',
    url: 'https://greatodeal.com/contact',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Contact Greatodeal' }],
  },
  twitter: {
    card: 'summary',
    title: 'Request a Demo | Contact Greatodeal',
    description: 'Request a demo of Greatodeal\'s AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate.',
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
      <FaqSection faqs={faqs} />
    </>
  );
}
