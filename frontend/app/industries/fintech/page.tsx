import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Fintech | Compliance-Grade Infrastructure | Greatodeal',
  description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure built for regulated financial operations.',
  keywords: ['fintech AI automation', 'KYC AML automation', 'fraud detection AI', 'PCI DSS compliant software', 'open banking API development', 'Greatodeal'],
  openGraph: {
    title: 'AI Automation for Fintech | Compliance-Grade Infrastructure | Greatodeal',
    description: 'AI-driven automation for fintech and banking: KYC/AML compliance, real-time fraud detection, and auditable transaction infrastructure.',
    url: 'https://greatodeal.com/industries/fintech',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Fintech AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/fintech' },
};

export default function Page() {
  return <Content />;
}
