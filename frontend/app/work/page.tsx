import type { Metadata } from 'next';
import PortfolioClient from '@/components/pages/PortfolioClient';

export const metadata: Metadata = {
  title: 'Work | AI Automation & Software Projects | Greatodeal',
  description: 'A showcase of AI automation and software projects Greatodeal has delivered for clients across regulated industries.',
  keywords: ['portfolio', 'work', 'AI automation projects', 'software development portfolio', 'Greatodeal projects'],
  openGraph: {
    title: 'Work | AI Automation & Software Projects | Greatodeal',
    description: 'A showcase of AI automation and software projects Greatodeal has delivered for clients across regulated industries.',
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
