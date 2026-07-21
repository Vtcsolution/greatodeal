import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for Government Agencies | Greatodeal',
  description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, explainable AI decisions, and audit-ready compliance built in from day one.',
  keywords: ['government AI automation', 'public sector AI', 'citizen services automation', 'government case management software', 'explainable AI government', 'GovCloud AI infrastructure', 'Greatodeal'],
  openGraph: {
    title: 'AI Automation for Government Agencies | Greatodeal',
    description: 'Agentic automation and AI infrastructure for government: citizen services, secure case management, and audit-ready compliance built in from day one.',
    url: 'https://greatodeal.com/industries/government',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Government AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/government' },
};

export default function Page() {
  return <Content />;
}
