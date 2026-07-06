import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'AI Automation Company in Lahore Pakistan | Machine Learning & AI Development | Greatodeal',
  description: 'Greatodeal is Pakistan\'s leading AI automation company. Expert in machine learning, AI chatbots, LLM apps, NLP, agentic AI & computer vision. Based in Lahore, serving USA, UK, UAE & global clients.',
  keywords: ['AI automation company Pakistan', 'AI automation company Lahore', 'machine learning company Pakistan', 'AI development company Lahore', 'artificial intelligence Pakistan', 'AI chatbot development', 'LLM development Pakistan', 'agentic AI development', 'NLP company Pakistan', 'deep learning Pakistan', 'AI agents Pakistan', 'Greatodeal AI'],
  openGraph: {
    title: 'AI Automation Company in Lahore Pakistan | Machine Learning & AI Development | Greatodeal',
    description: 'Leading AI automation company in Lahore — machine learning, AI chatbots, LLM apps, NLP, agentic AI & automation. Serving USA, UK, UAE & global clients.',
    url: 'https://greatodeal.com/services/machine-learning-ai',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Machine Learning & AI Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/machine-learning-ai',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'AI Automation & Machine Learning', item: 'https://greatodeal.com/services/machine-learning-ai' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Automation & Machine Learning Development', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'AI Automation', description: 'Expert AI automation, machine learning, LLM apps, NLP, agentic AI, AI chatbots & computer vision development. Based in Lahore, Pakistan, serving global clients.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/machine-learning-ai', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
