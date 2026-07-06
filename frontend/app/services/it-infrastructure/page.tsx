import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'IT Infrastructure & Cloud DevOps Services | AWS, Azure, Docker | Greatodeal',
  description: 'Expert IT infrastructure and DevOps services: cloud migration (AWS/Azure/GCP), Kubernetes, Docker, CI/CD pipelines, Infrastructure as Code, and 24/7 monitoring. Greatodeal, Pakistan.',
  keywords: ['IT infrastructure', 'DevOps services', 'cloud migration', 'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code', 'Terraform', 'cloud monitoring', 'DevOps company Pakistan', 'Greatodeal'],
  openGraph: {
    title: 'IT Infrastructure & Cloud DevOps Services | AWS, Azure, Docker | Greatodeal',
    description: 'Expert IT infrastructure and DevOps services: cloud migration, Kubernetes, Docker, CI/CD pipelines, Infrastructure as Code, and 24/7 monitoring.',
    url: 'https://greatodeal.com/services/it-infrastructure',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal IT Infrastructure & DevOps Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/it-infrastructure',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'IT Infrastructure & DevOps', item: 'https://greatodeal.com/services/it-infrastructure' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'IT Infrastructure & DevOps Services', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'IT Infrastructure & DevOps', description: 'Cloud infrastructure, DevOps, CI/CD pipelines, AWS, Azure, GCP, Docker & Kubernetes. Expert DevOps & cloud company in Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/it-infrastructure', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
