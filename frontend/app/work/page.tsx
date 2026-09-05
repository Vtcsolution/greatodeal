import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';

export const metadata: Metadata = {
  title: 'Work | AI Automation & Software Projects | Greatodeal',
  description: 'A showcase of AI automation, CRM, and AI receptionist/chatbot projects Greatodeal has delivered for clients across regulated industries.',
  keywords: [
    'portfolio', 'work', 'AI automation projects', 'software development portfolio', 'Greatodeal projects',
    'CRM software', 'CRM integration', 'CRM workflow automation', 'custom CRM', 'lead automation',
    'lead qualification automation', 'lead routing automation', 'lead management', 'sales automation',
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
  return <PortfolioClient />;
}
