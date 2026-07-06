import type { Metadata } from 'next';
import AboutClient from '@/components/pages/AboutClient';

export const metadata: Metadata = {
  title: 'About Greatodeal | Software House in Lahore, Pakistan Since 2016',
  description: 'Greatodeal is a software house in Lahore, Pakistan founded in 2016. 120+ engineers, 9+ years expertise in AI automation, web development, mobile apps & enterprise software. Serving global clients.',
  keywords: ['about Greatodeal', 'software house Lahore', 'software company Pakistan', 'IT company Lahore', 'AI development company Pakistan', 'technology company Pakistan', 'offshore development Pakistan', 'dedicated developers Pakistan', 'software house since 2016'],
  openGraph: {
    title: 'About Greatodeal | Software House in Lahore, Pakistan Since 2016',
    description: 'Greatodeal — software house in Lahore, Pakistan since 2016. 120+ engineers, AI automation, web development, mobile apps & enterprise software for global clients.',
    url: 'https://greatodeal.com/about',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'About Greatodeal' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
