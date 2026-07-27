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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Green Tech AI Automation',
  serviceType: 'Green Tech AI Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'AI-driven monitoring and automation for green-tech and energy operators: smart grid integration, predictive maintenance, and automated emissions & HSE compliance reporting.',
  url: 'https://greatodeal.com/industries/green-tech',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Greatodeal build for green tech and energy operators?',
      acceptedAnswer: { '@type': 'Answer', text: 'We build AI-driven monitoring and automation for energy operators, including smart grid integration, predictive maintenance, and automated emissions and HSE compliance reporting.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal integrate with existing SCADA or field infrastructure?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We layer cloud-connected monitoring on top of existing SCADA and field systems rather than requiring a rip-and-replace.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal automate emissions and regulatory reporting?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We generate emissions and energy-usage reports automatically from live sensor data, with an audit trail mapped to the relevant regulatory framework.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal help reduce equipment downtime?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our predictive maintenance models flag equipment anomalies before failure, reducing unplanned downtime and safety incidents.' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
    </>
  );
}
