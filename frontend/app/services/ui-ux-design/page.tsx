import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'UI/UX Design Services | Figma, Prototyping, Design Systems | Greatodeal',
  description: 'Professional UI/UX design services: user research, wireframing, prototyping, design systems, and pixel-perfect UI. Greatodeal delivers designs that convert and delight users across web and mobile.',
  keywords: ['UI/UX design', 'Figma design', 'user experience design', 'user interface design', 'wireframing', 'prototyping', 'design systems', 'mobile app design', 'web design', 'UX research', 'interaction design', 'UI design company Pakistan', 'Greatodeal'],
  openGraph: {
    title: 'UI/UX Design Services | Figma, Prototyping, Design Systems | Greatodeal',
    description: 'Professional UI/UX design services: user research, wireframing, prototyping, design systems, and pixel-perfect UI. Designs that convert and delight users.',
    url: 'https://greatodeal.com/services/ui-ux-design',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal UI/UX Design Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/ui-ux-design',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'UI/UX Design', item: 'https://greatodeal.com/services/ui-ux-design' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'UI/UX Design Services', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'UI/UX Design', description: 'Professional UI/UX design services: Figma, user research, prototyping, wireframing & responsive design. UI/UX design company in Lahore, Pakistan.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/ui-ux-design', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
