import type { Metadata } from 'next';
import Content from './content';
import { breadcrumbSchema } from '@/lib/schema';
import FaqSection from '@/components/ui/FaqSection';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Industries', url: 'https://greatodeal.com/industries' },
  { name: 'E-Commerce', url: 'https://greatodeal.com/industries/ecommerce' },
]);

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
  twitter: {
    card: 'summary',
    title: 'AI Automation for E-Commerce | Inventory & Fulfillment Automation | Greatodeal',
    description: 'AI-driven automation for online retail: multi-channel inventory sync, order and fulfillment automation, and unified reporting dashboards.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
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

const faqs = [
  { question: 'What does Greatodeal build for e-commerce and online retail businesses?', answer: 'We build inventory synchronization, order and fulfillment automation, returns workflows, and unified reporting dashboards across sales channels.' },
  { question: 'Can Greatodeal keep inventory in sync across multiple sales channels?', answer: 'Yes. We build real-time inventory synchronization across your storefront, marketplaces, and warehouse so you never oversell.' },
  { question: 'Does Greatodeal handle order fulfillment automation?', answer: 'Yes. We build automated order routing that sends each order to the right fulfillment path, with exceptions flagged for human review instead of getting lost in a queue.' },
  { question: 'Can Greatodeal integrate with platforms like Shopify or Amazon?', answer: 'Yes. We build integrations with major storefront platforms and marketplaces so orders, inventory, and customer data flow automatically between systems.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Content />
      <FaqSection faqs={faqs} />
    </>
  );
}
