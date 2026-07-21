import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Real Estate | Compliance-Grade PropTech | Greatodeal',
  description: 'AI-driven platforms for real estate and PropTech: automated disclosure compliance, unified property data, portfolio reporting, and transaction fraud detection.',
  keywords: ['real estate AI automation', 'PropTech software development', 'property management platform', 'transaction fraud detection real estate', 'Greatodeal'],
  openGraph: {
    title: 'AI Automation for Real Estate | Compliance-Grade PropTech | Greatodeal',
    description: 'AI-driven platforms for real estate and PropTech: automated disclosure compliance, unified property data, and portfolio reporting.',
    url: 'https://greatodeal.com/industries/real-estate',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Real Estate AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/real-estate' },
};

export default function Page() {
  return <Content />;
}
