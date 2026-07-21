import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Green Tech | Energy & Compliance Infrastructure | Greatodeal',
  description: 'AI-driven monitoring and automation for green-tech and energy operators: smart grid integration, predictive maintenance, and automated emissions & HSE compliance reporting.',
  keywords: ['green tech AI automation', 'smart grid software', 'predictive maintenance AI', 'emissions reporting automation', 'HSE compliance software', 'Greatodeal'],
  openGraph: {
    title: 'AI Automation for Green Tech | Energy & Compliance Infrastructure | Greatodeal',
    description: 'AI-driven monitoring and automation for green-tech and energy operators: smart grid integration, predictive maintenance, and compliance reporting.',
    url: 'https://greatodeal.com/industries/green-tech',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Green Tech AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/green-tech' },
};

export default function Page() {
  return <Content />;
}
