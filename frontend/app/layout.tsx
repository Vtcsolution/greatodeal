import type { Metadata } from 'next';
import Script from 'next/script';
import { Fraunces, Space_Mono } from 'next/font/google';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap' });
const spaceMono = Space_Mono({ subsets: ['latin'], variable: '--font-space-mono', weight: ['400', '700'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://greatodeal.com'),
  title: 'Greatodeal | AI SaaS & Agentic Automation for Regulated Industries',
  description: 'Greatodeal builds AI SaaS and agentic automation for regulated industries: government, healthcare, fintech, green tech, and real estate. Founded 2020, compliance built in.',
  keywords: [
    'AI SaaS for regulated industries', 'agentic automation company', 'compliance-grade AI infrastructure',
    'government AI automation', 'healthcare AI HIPAA compliant', 'fintech AI compliance',
    'AI automation company', 'Greatodeal', 'explainable AI', 'audit-ready AI systems',
    'AI agent development', 'agentic AI services', 'AI automation agency', 'AI automation Pakistan',
    'AI services Lahore', 'AI services Pakistan', 'AI agencies Pakistan', 'business process automation',
    'AI agents', 'AI agent', 'workflow automation', 'digital transformation', 'AI automation solutions',
    'AI-powered automation', 'intelligent automation', 'custom software development company',
  ],
  authors: [{ name: 'Greatodeal', url: 'https://greatodeal.com' }],
  creator: 'Greatodeal',
  publisher: 'Greatodeal',
  formatDetection: { email: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/favicon.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://greatodeal.com',
    siteName: 'Greatodeal',
    title: 'Greatodeal | AI SaaS & Agentic Automation for Regulated Industries',
    description: 'AI SaaS and agentic automation for government, healthcare, fintech, green tech, and real estate, serving clients globally since 2020.',
    images: [
      {
        url: 'https://greatodeal.com/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Greatodeal - AI Infrastructure for Regulated Industries',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greatodeal | AI SaaS & Agentic Automation',
    description: 'AI SaaS and agentic automation for regulated industries. Founded 2020, 7 countries served.',
    images: ['https://greatodeal.com/images/logo.png'],
    creator: '@greatodeal',
    site: '@greatodeal',
  },
  alternates: {
    canonical: 'https://greatodeal.com',
    languages: {
      'en-US': 'https://greatodeal.com',
      'en-GB': 'https://greatodeal.com',
      'en-AU': 'https://greatodeal.com',
      'en': 'https://greatodeal.com',
      'x-default': 'https://greatodeal.com',
    },
  },
  category: 'technology',
  other: {
    'geo.region': 'PK-PB',
    'geo.placename': 'Lahore',
    'geo.position': '31.5497;74.3436',
    'ICBM': '31.5497, 74.3436',
    'distribution': 'global',
    'rating': 'general',
    'revisit-after': '3 days',
    'language': 'English',
    'google-site-verification': 'google88add5fb276729b4',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://greatodeal.com/#organization',
  name: 'Greatodeal',
  legalName: 'Greatodeal Software',
  url: 'https://greatodeal.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://greatodeal.com/images/logo.png',
    width: 512,
    height: 512,
  },
  image: 'https://greatodeal.com/images/logo.png',
  description: 'AI SaaS and agentic automation for regulated industries: government, healthcare, fintech, green tech, and real estate.',
  foundingDate: '2020',
  foundingLocation: { '@type': 'Place', name: 'Lahore, Pakistan' },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 10 },
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '16 Jail Rd, Shadman 2',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      postalCode: '54000',
      addressCountry: 'PK',
    },
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+92-301-1060841',
      contactType: 'sales',
      email: 'sales@greatodeal.com',
      availableLanguage: ['English', 'Urdu'],
      areaServed: 'Worldwide',
    },
    {
      '@type': 'ContactPoint',
      email: 'hello@greatodeal.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu'],
    },
  ],
  sameAs: [
    'https://www.facebook.com/greatodealofficial',
    'https://www.linkedin.com/company/greatodeal',
    'https://www.instagram.com/greatodeal',
    'https://www.youtube.com/@GreatodealAI',
    'https://x.com/Greatodeal',
    'https://www.reddit.com/user/Greatodeal/',
    'https://www.goodfirms.co/company/greatodeal-ai-automation-solutions',
    'https://clutch.co/profile/greatodeal',
    'https://share.google/YhrMvJp0M0Q2fxsV1',
  ],
  knowsAbout: [
    'Agentic AI', 'Artificial Intelligence', 'Machine Learning', 'Compliance-Grade Infrastructure',
    'SaaS Development', 'Cloud Computing', 'DevOps', 'Regulatory Compliance', 'Explainable AI',
    'API Development', 'HIPAA Compliance', 'Government Technology', 'AI Agents', 'AI Agent Development',
    'Agentic AI Services', 'AI Automation Agency Services', 'Business Process Automation',
  ],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 31.5497, longitude: 74.3436 },
    geoRadius: '20000',
  },
  slogan: 'AI Infrastructure for Institutions That Can\'t Afford to Get It Wrong',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://greatodeal.com/#website',
  name: 'Greatodeal',
  url: 'https://greatodeal.com',
  description: 'AI SaaS & Agentic Automation for Regulated Industries',
  publisher: { '@id': 'https://greatodeal.com/#organization' },
  inLanguage: 'en-US',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://greatodeal.com/blog?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://greatodeal.com/#localbusiness',
  name: 'Greatodeal AI Automation Solutions',
  alternateName: 'Greatodeal',
  image: 'https://greatodeal.com/images/logo.png',
  url: 'https://greatodeal.com',
  telephone: '+92-301-1060841',
  email: 'sales@greatodeal.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16 Jail Rd, Shadman 2',
    addressLocality: 'Lahore',
    addressRegion: 'Punjab',
    postalCode: '54000',
    addressCountry: 'PK',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 31.5497, longitude: 74.3436 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', ratingCount: '10', bestRating: '5', worstRating: '1' },
  hasMap: 'https://maps.google.com/?cid=13357701166578108019',
  additionalType: 'https://schema.org/SoftwareApplication',
  serviceType: ['Agentic AI Platforms', 'AI Agent Development', 'Agentic AI Services', 'AI Automation Agency Services', 'Compliance-Grade Infrastructure', 'Government AI Automation', 'Healthcare AI (HIPAA)', 'Fintech AI Automation', 'Secure Integration & Data Pipelines'],
  areaServed: [
    { '@type': 'Country', name: 'Pakistan' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Netherlands' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'Germany' },
  ],
  sameAs: [
    'https://www.facebook.com/greatodealofficial',
    'https://www.linkedin.com/company/greatodeal',
    'https://www.instagram.com/greatodeal',
    'https://www.youtube.com/@GreatodealAI',
    'https://x.com/Greatodeal',
    'https://www.reddit.com/user/Greatodeal/',
    'https://www.goodfirms.co/company/greatodeal-ai-automation-solutions',
    'https://clutch.co/profile/greatodeal',
    'https://g.co/kgs/13357701166578108019',
    'https://share.google/YhrMvJp0M0Q2fxsV1',
  ],
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Greatodeal YouTube Videos',
  itemListElement: [
    {
      '@type': 'VideoObject',
      position: 1,
      name: 'Grow Business Online Free | We Invest You Get',
      description: 'Learn how Greatodeal helps businesses grow online with AI automation, web development, and SaaS platform solutions. Free consultation available.',
      thumbnailUrl: 'https://i.ytimg.com/vi/-d8CZrpO01w/hqdefault.jpg',
      uploadDate: '2025-01-01',
      contentUrl: 'https://youtube.com/shorts/-d8CZrpO01w',
      embedUrl: 'https://www.youtube.com/embed/-d8CZrpO01w',
      publisher: { '@id': 'https://greatodeal.com/#organization' },
      keywords: 'AI automation, business growth, online business, SaaS platform, Greatodeal',
    },
    {
      '@type': 'VideoObject',
      position: 2,
      name: 'Toxic Clients & Productivity - Software Development Reality',
      description: 'Real talk about client management in software development. Greatodeal shares experiences from building AI and web solutions since 2020.',
      thumbnailUrl: 'https://i.ytimg.com/vi/Lbi4vw7_5xo/hqdefault.jpg',
      uploadDate: '2025-01-01',
      contentUrl: 'https://youtube.com/shorts/Lbi4vw7_5xo',
      embedUrl: 'https://www.youtube.com/embed/Lbi4vw7_5xo',
      publisher: { '@id': 'https://greatodeal.com/#organization' },
      keywords: 'software development, client management, IT company Pakistan, Greatodeal',
    },
    {
      '@type': 'VideoObject',
      position: 3,
      name: 'Portfolio Reveal: Agentic AI Systems by Greatodeal',
      description: 'Explore Greatodeal portfolio of agentic AI systems, autonomous agents, LLM integrations, RAG pipelines, and AI chatbot solutions built for enterprises.',
      thumbnailUrl: 'https://i.ytimg.com/vi/8ej-adqhOy4/hqdefault.jpg',
      uploadDate: '2025-01-01',
      contentUrl: 'https://youtube.com/shorts/8ej-adqhOy4',
      embedUrl: 'https://www.youtube.com/embed/8ej-adqhOy4',
      publisher: { '@id': 'https://greatodeal.com/#organization' },
      keywords: 'agentic AI, AI agents, LLM, RAG, AI chatbot, AI portfolio, Greatodeal, autonomous AI',
    },
    {
      '@type': 'VideoObject',
      position: 4,
      name: 'How We Replace Textile Industry - AI Tracing Tools',
      description: 'Greatodeal developed AI-powered tracing tools for the textile industry. Custom software development and AI automation for manufacturing.',
      thumbnailUrl: 'https://i.ytimg.com/vi/BX2oFDIXelM/hqdefault.jpg',
      uploadDate: '2025-01-01',
      contentUrl: 'https://youtube.com/shorts/BX2oFDIXelM',
      embedUrl: 'https://www.youtube.com/embed/BX2oFDIXelM',
      publisher: { '@id': 'https://greatodeal.com/#organization' },
      keywords: 'AI textile, AI tracing tools, manufacturing AI, custom software, Industry 4.0, Greatodeal',
    },
    {
      '@type': 'VideoObject',
      position: 5,
      name: 'AI Astrology vs Human Astrologer | Online Birth Chart & Horoscope',
      description: 'AI-powered astrology platform by Greatodeal: accurate online birth chart reading, horoscope prediction, and psychic consultation platform built with AI and SaaS technology.',
      thumbnailUrl: 'https://i.ytimg.com/vi/VmQdoPmLLGA/hqdefault.jpg',
      uploadDate: '2025-01-01',
      contentUrl: 'https://youtube.com/shorts/VmQdoPmLLGA',
      embedUrl: 'https://www.youtube.com/embed/VmQdoPmLLGA',
      publisher: { '@id': 'https://greatodeal.com/#organization' },
      keywords: 'AI astrology, psychic platform, horoscope AI, birth chart, AI SaaS, psychics platform, Greatodeal',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
        <meta name="theme-color" content="#090909" />
        <meta name="msapplication-TileColor" content="#090909" />
        {/* Social profile verification links */}
        <link rel="me" href="https://www.facebook.com/greatodealofficial" />
        <link rel="me" href="https://www.linkedin.com/company/greatodeal" />
        <link rel="me" href="https://www.instagram.com/greatodeal" />
        <link rel="me" href="https://www.youtube.com/@GreatodealAI" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={`min-h-screen bg-[#090909] text-[#E5E7EB] ${fraunces.variable} ${spaceMono.variable}`} suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>

        {/* Google Analytics — lazy loaded */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-35XV4Q1GQQ" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-35XV4Q1GQQ');`}
        </Script>
      </body>
    </html>
  );
}
