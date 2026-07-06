import type { Metadata } from 'next';
import Content from './content';

export const metadata: Metadata = {
  title: 'Mobile App Development Company in Pakistan | Flutter & React Native | Greatodeal',
  description: 'Top mobile app development company in Pakistan. iOS & Android apps built with Flutter and React Native. 50+ apps delivered, on time & on budget. Based in Lahore, serving global clients.',
  keywords: ['mobile app development Pakistan', 'mobile app development Lahore', 'Flutter development Pakistan', 'React Native development Pakistan', 'iOS app development Pakistan', 'Android app development Pakistan', 'cross-platform app development', 'app development company Lahore', 'mobile app company Pakistan', 'Greatodeal mobile'],
  openGraph: {
    title: 'Mobile App Development Company in Pakistan | Flutter & React Native | Greatodeal',
    description: 'Top mobile app development company in Pakistan — iOS & Android apps with Flutter and React Native. 50+ apps delivered, based in Lahore.',
    url: 'https://greatodeal.com/services/mobile-apps',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Mobile App Development Services' }],
  },
  twitter: {
    card: 'summary',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com/services/mobile-apps',
  },
};

const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://greatodeal.com/services' }, { '@type': 'ListItem', position: 3, name: 'Mobile App Development', item: 'https://greatodeal.com/services/mobile-apps' }] };
const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'Mobile App Development', provider: { '@id': 'https://greatodeal.com/#organization' }, serviceType: 'Mobile App Development', description: 'iOS & Android mobile app development using Flutter and React Native. Top mobile app development company in Pakistan, based in Lahore, serving global clients.', areaServed: 'Worldwide', url: 'https://greatodeal.com/services/mobile-apps', offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'USD' } };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Content />
    </>
  );
}
