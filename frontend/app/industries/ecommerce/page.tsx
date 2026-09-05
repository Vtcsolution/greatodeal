import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation for E-Commerce | Inventory & Fulfillment Automation | Greatodeal',
  description: 'AI-driven automation for online retail: multi-channel inventory sync, order and fulfillment automation, returns workflows, and unified reporting dashboards.',
  keywords: ['ecommerce automation', 'inventory management automation', 'order fulfillment automation', 'multi-channel inventory sync', 'Greatodeal', 'automation software', 'automation tools', 'process automation software', 'operational efficiency', 'customer service automation', 'customer support automation'],
  openGraph: {
    title: 'AI Automation for E-Commerce | Inventory & Fulfillment Automation | Greatodeal',
    description: 'AI-driven automation for online retail: multi-channel inventory sync, order and fulfillment automation, and unified reporting dashboards.',
    url: 'https://greatodeal.com/industries/ecommerce',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal E-Commerce AI Solutions' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/industries/ecommerce' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'E-Commerce Automation',
  serviceType: 'E-Commerce Inventory & Fulfillment Automation',
  provider: { '@type': 'Organization', name: 'Greatodeal', url: 'https://greatodeal.com' },
  areaServed: 'Worldwide',
  description: 'AI-driven automation for online retail: multi-channel inventory sync, order and fulfillment automation, returns workflows, and unified reporting dashboards.',
  url: 'https://greatodeal.com/industries/ecommerce',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Greatodeal build for e-commerce and online retail businesses?',
      acceptedAnswer: { '@type': 'Answer', text: 'We build inventory synchronization, order and fulfillment automation, returns workflows, and unified reporting dashboards across sales channels.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal keep inventory in sync across multiple sales channels?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build real-time inventory synchronization across your storefront, marketplaces, and warehouse so you never oversell.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal handle order fulfillment automation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build automated order routing that sends each order to the right fulfillment path, with exceptions flagged for human review instead of getting lost in a queue.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal integrate with platforms like Shopify or Amazon?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We build integrations with major storefront platforms and marketplaces so orders, inventory, and customer data flow automatically between systems.' },
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
