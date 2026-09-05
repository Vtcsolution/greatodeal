import type { Metadata } from 'next';
import CaseStudiesClient from '@/components/pages/CaseStudiesClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Case Studies', url: 'https://greatodeal.com/case-studies' },
]);

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | Software Development Success Stories | Greatodeal',
  description: 'Explore Greatodeal\'s portfolio of successful software development projects: AI platforms, e-commerce systems, fintech solutions, ERP systems, and mobile apps.',
  keywords: ['case studies', 'portfolio', 'software development projects', 'success stories', 'AI platform projects', 'e-commerce case study', 'fintech projects', 'ERP case study', 'mobile app portfolio', 'client projects', 'Greatodeal portfolio', 'custom software development company', 'business process automation', 'AI automation solutions'],
  openGraph: {
    title: 'Case Studies & Portfolio | Software Development Success Stories | Greatodeal',
    description: 'Explore Greatodeal\'s portfolio of successful software development projects: AI platforms, e-commerce systems, fintech solutions, ERP systems, and mobile apps.',
    url: 'https://greatodeal.com/case-studies',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Case Studies & Portfolio' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/case-studies',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <CaseStudiesClient />
    </>
  );
}
