import type { Metadata } from 'next';
import PartnershipClient from '@/components/pages/PartnershipClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Partnership', url: 'https://greatodeal.com/partnership' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What does Greatodeal's partnership program offer?",
      acceptedAnswer: { '@type': 'Answer', text: 'White-label software development, co-development, and technology licensing for agencies, consultants, and enterprises worldwide.' },
    },
    {
      '@type': 'Question',
      name: 'What partnership tiers does Greatodeal offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three tiers: Standard Partner (project-based, 1-2 projects per quarter), Silver Partner ($5K-$15K/month, 3-5 projects per quarter with a dedicated project manager), and Gold Partner ($15K+/month, unlimited projects with a dedicated development team and co-branding opportunities).' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal sign an NDA for partnership applicants?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every partnership application includes an NDA agreement, and all information shared is treated as strictly confidential and used only to evaluate the partnership.' },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to hear back after submitting a partnership application?',
      acceptedAnswer: { '@type': 'Answer', text: "Greatodeal's partnerships team reaches out within 48 hours of a submitted application." },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Partner With Us | White-Label & Co-Development | Greatodeal',
  description: 'Apply to become a Greatodeal partner. We offer white-label software development, co-development, and technology licensing for agencies, consultants, and enterprises worldwide.',
  keywords: ['partnership', 'white-label development', 'co-development', 'technology licensing', 'software partner', 'outsourcing partner', 'agency partnership', 'development partner Pakistan', 'Greatodeal partner', 'reseller program', 'AI automation agency', 'custom software development company', 'AI integration services'],
  openGraph: {
    title: 'Partner With Us | White-Label & Co-Development | Greatodeal',
    description: 'Apply to become a Greatodeal partner. We offer white-label software development, co-development, and technology licensing for agencies and enterprises.',
    url: 'https://greatodeal.com/partnership',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Partnership Program' }],
  },
  twitter: {
    card: 'summary',
    title: 'Partner With Us | White-Label & Co-Development | Greatodeal',
    description: 'White-label software development, co-development, and technology licensing for agencies, consultants, and enterprises worldwide.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/partnership',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PartnershipClient />
    </>
  );
}
