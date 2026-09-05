import type { Metadata } from 'next';
import PricingClient from '@/components/pages/PricingClient';
import { breadcrumbSchema } from '@/lib/schema';

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'Pricing', url: 'https://greatodeal.com/pricing' },
]);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does Greatodeal price a project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pricing depends on project scope — whether it is a website, an AI agent, or a full custom software build. Greatodeal offers time and materials, capped time and materials, fixed price, subscription-based, per-ticket, and mixed pricing models depending on what fits the project.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal offer a free consultation before pricing a project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Greatodeal reviews project requirements during a free initial consultation before proposing a pricing model and estimate.' },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Pricing | Websites, AI Agents & Software Development | Greatodeal',
  description: 'Transparent pricing for websites, website care, AI agents, and custom software development from Greatodeal.',
  keywords: ['pricing', 'website pricing', 'AI agent pricing', 'software development pricing', 'Greatodeal pricing', 'custom SaaS development', 'SaaS development', 'custom software development company'],
  openGraph: {
    title: 'Pricing | Websites, AI Agents & Software Development | Greatodeal',
    description: 'Transparent pricing for websites, website care, AI agents, and custom software development from Greatodeal.',
    url: 'https://greatodeal.com/pricing',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Pricing' }],
  },
  twitter: { card: 'summary', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/pricing' },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PricingClient />
    </>
  );
}
