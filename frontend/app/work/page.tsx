import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Work', url: 'https://greatodeal.com/work' },
]);

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Greatodeal Work',
  description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
  url: 'https://greatodeal.com/work',
};

export const metadata: Metadata = {
  title: 'Work | AI Automation & Software Projects | Greatodeal',
  description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
  keywords: [
    'portfolio', 'work', 'AI automation projects', 'software development portfolio', 'Greatodeal projects',
    'CRM software', 'CRM integration', 'CRM workflow automation', 'custom CRM', 'lead automation',
    'lead qualification automation', 'lead routing automation', 'lead management',
    'sales automation', 'sales automation software', 'sales workflow automation', 'AI sales agent', 'follow-up automation',
    'email automation', 'AI call automation', 'AI phone answering', '24/7 answering service', 'AI answering service',
    'virtual receptionist', 'AI receptionist', 'AI voice agent', 'AI appointment scheduling',
    'appointment booking automation', 'appointment scheduling automation', 'calendar automation',
    'AI chatbot', 'conversational AI', 'AI customer service', 'customer service AI', 'AI customer support',
    'customer support automation', 'customer service automation', 'API integration', 'software integration',
  ],
  openGraph: {
    title: 'Work | AI Automation & Software Projects | Greatodeal',
    description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
    url: 'https://greatodeal.com/work',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Work' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/work',
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <PortfolioClient />
    </>
  );
}
