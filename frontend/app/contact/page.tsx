import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: 'Request a Demo | Contact Greatodeal',
  description: 'Request a demo of Greatodeal\'s AI SaaS and agentic automation for regulated industries. Reach us for government, healthcare, or fintech AI infrastructure. WhatsApp +92 301 1060841 or email sales@greatodeal.com.',
  keywords: ['request a demo AI SaaS', 'contact Greatodeal', 'government AI demo', 'healthcare AI demo', 'fintech AI demo', 'agentic automation consultation', 'Greatodeal contact'],
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
  return <ContactClient />;
}
