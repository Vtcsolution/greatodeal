import type { Metadata } from 'next';
import ServicesClient from '@/components/pages/ServicesClient';

export const metadata: Metadata = {
  title: 'IT Services in Lahore Pakistan | AI, Web, Mobile & Enterprise Software | Greatodeal',
  description: 'Greatodeal offers complete IT services in Lahore, Pakistan: AI automation, web development, mobile apps, SaaS platforms, ERP/CRM, API development, UI/UX & DevOps. 9+ years expertise.',
  keywords: ['IT services Pakistan', 'IT services Lahore', 'IT company Lahore Pakistan', 'software services Pakistan', 'AI automation services Pakistan', 'web development services Lahore', 'mobile app services Pakistan', 'SaaS development Pakistan', 'enterprise software services', 'Greatodeal services'],
  openGraph: {
    title: 'IT Services in Lahore Pakistan | AI, Web, Mobile & Enterprise Software | Greatodeal',
    description: 'Complete IT services in Lahore, Pakistan — AI automation, web development, mobile apps, SaaS, ERP & DevOps. 9+ years, 200+ projects worldwide.',
    url: 'https://greatodeal.com/services',
  },
  twitter: { card: 'summary', title: 'IT Services | Greatodeal', images: ['https://greatodeal.com/images/logo.png'] },
  alternates: { canonical: 'https://greatodeal.com/services' },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
