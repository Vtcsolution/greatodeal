import type { Metadata } from 'next';
import PartnershipClient from '@/components/pages/PartnershipClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Partnership', url: 'https://greatodeal.com/partnership' },
]);

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
      <PartnershipClient />
    </>
  );
}
