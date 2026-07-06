import type { Metadata } from 'next';
import ContactClient from '@/components/pages/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Greatodeal | Software House Lahore Pakistan | Free Consultation',
  description: 'Contact Greatodeal — software house in Lahore, Pakistan. Reach us for AI automation, web development, mobile apps & custom software. WhatsApp +92 301 1060841 or email sales@greatodeal.com.',
  keywords: ['contact software house Pakistan', 'contact Greatodeal', 'hire developers Lahore', 'hire developers Pakistan', 'free IT consultation', 'software development quote', 'AI solutions consultation', 'WhatsApp software house', 'Greatodeal contact Lahore'],
  openGraph: {
    title: 'Contact Greatodeal | Software House Lahore Pakistan | Free Consultation',
    description: 'Contact Greatodeal — software house in Lahore, Pakistan. AI automation, web development, mobile apps & custom software. Free consultation.',
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
