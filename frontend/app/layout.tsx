import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://greatodeal.com'),
  title: {
    default: 'Greatodeal | AI Automation & Software Development Company in Pakistan',
    template: '%s | Greatodeal',
  },
  description: 'Greatodeal is a software house in Lahore, Pakistan. Expert AI automation, web development, mobile apps, ERP & SaaS platforms. 9+ years, 120+ engineers, serving global clients.',
  keywords: [
    'software house Lahore', 'software house Pakistan', 'software house in Lahore Pakistan',
    'AI automation company Pakistan', 'AI automation company Lahore',
    'web development company Pakistan', 'web development company Lahore',
    'mobile app development Pakistan', 'custom software development Lahore',
    'IT company Pakistan', 'IT company Lahore', 'Greatodeal',
    'AI development company Pakistan', 'machine learning company Pakistan',
    'SaaS development Pakistan', 'ERP development Lahore',
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
    title: 'Greatodeal AI, Automation & Web Development Solutions',
    description: 'Cutting-edge AI automation, web development, mobile apps, and SaaS platforms — serving 200+ clients globally since 2016.',
    images: [
      {
        url: 'https://greatodeal.com/images/logo.png',
        width: 512,
        height: 512,
        alt: 'Greatodeal - AI & Software Development Company',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greatodeal | AI Automation & Software Development',
    description: 'AI automation, web development, mobile apps, SaaS platforms — 9+ years, 200+ projects, 15+ countries.',
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
  description: 'AI automation, web development, mobile apps, ERP systems, SaaS platforms — premier software development company from Pakistan serving 200+ global clients.',
  foundingDate: '2016',
  foundingLocation: { '@type': 'Place', name: 'Lahore, Pakistan' },
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 100, maxValue: 150 },
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
      email: 'info@greatodeal.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu'],
    },
  ],
  sameAs: [
    'https://www.facebook.com/greatodealofficial',
    'https://www.linkedin.com/company/greatodeal',
    'https://www.instagram.com/greatodeal',
    'https://www.youtube.com/@GreatodealAI',
  ],
  knowsAbout: [
    'Artificial Intelligence', 'Machine Learning', 'Web Development', 'Mobile App Development',
    'SaaS Development', 'Cloud Computing', 'DevOps', 'ERP Systems', 'Custom Software',
    'API Development', 'UI/UX Design', 'Digital Transformation',
  ],
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: { '@type': 'GeoCoordinates', latitude: 31.5497, longitude: 74.3436 },
    geoRadius: '20000',
  },
  slogan: 'AI-Powered Software Solutions for the Future',
  award: ['Top Software Development Company - Clutch'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '6',
    bestRating: '5',
    worstRating: '1',
  },
  subjectOf: [
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_websiteanalytics-ai-automation-activity-7468536996613742592-GpPZ', headline: 'Website Analytics & AI Automation', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_ai-realestate-leadgeneration-activity-7450976606526828544-O0W3', headline: 'AI Real Estate Lead Generation', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_greatodeal-aipartnership-automation-activity-7458813802231324672-fnEv', headline: 'AI Partnership & Automation Model', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_greatodeal-aiautomation-automationagency-activity-7420773382511587328-vrV3', headline: 'AI Automation Agency Services', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_greatodeal-ai-saas-activity-7437008770100232192-r6lU', headline: 'AI SaaS Platform Development', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_aiautomation-darktechhumor-futureofwork-activity-7427946411570139136-_Uxq', headline: 'AI Automation & Future of Work', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_ai-artificialintelligence-aiautomation-activity-7431228305284046848-kp5B', headline: 'Artificial Intelligence & AI Automation', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_artificialintelligence-promptengineering-activity-7430925774486040576-cM9_', headline: 'Prompt Engineering & AI', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_automationservices-rpa-roboticprocessautomation-activity-7430608511853723648-UyiH', headline: 'RPA & Robotic Process Automation Services', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_webdevelopmentservices-mobileappdevelopment-activity-7427426982960893952-WI3q', headline: 'Web & Mobile App Development Services', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_aimobileapps-aidrivenapps-appdevelopment2026-activity-7421831715687559168-IAB2', headline: 'AI Mobile Apps Development 2026', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_greatodeal-appsolutions-businessautomation-activity-7420906020895567873-CWdd', headline: 'Business Automation App Solutions', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_greatodeal-aiautomation-automationagency-activity-7418290259291185152-x2q8', headline: 'AI Automation Agency', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_aiautomation-businessautomation-worksmarter-activity-7414481838628552704-Y6je', headline: 'Business Automation — Work Smarter', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.linkedin.com/posts/greatodeal_aiautomation-websitedevelopment-appdevelopment-activity-7414009432168374272-ZMmq', headline: 'AI Automation, Website & App Development', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZuZ6rmkQQn/', headline: 'Greatodeal AI & Tech Solutions', sharedContent: { '@type': 'WebPage', url: 'https://www.instagram.com/p/DZuZ6rmkQQn/' }, author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZtpvX_FAFg/', headline: 'Greatodeal Software Development', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZsIDQ4lW4r/', headline: 'Greatodeal AI Automation', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZsH5RvlXwg/', headline: 'Greatodeal Tech Updates', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZi0DAIlUPa/', headline: 'Greatodeal AI Solutions', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZcd9tCgRp6/', headline: 'Greatodeal Custom Software', author: { '@id': 'https://greatodeal.com/#organization' } },
    { '@type': 'SocialMediaPosting', url: 'https://www.instagram.com/p/DZUPkJGFjSb/', headline: 'Greatodeal SaaS Platform', author: { '@id': 'https://greatodeal.com/#organization' } },
  ],
  review: [
    { '@type': 'Review', author: { '@type': 'Organization', name: 'SpiritueelChatten' }, reviewBody: 'Returned for additional features, showcasing trust in Greatodeal expertise.', reviewRating: { '@type': 'Rating', ratingValue: 5 } },
    { '@type': 'Review', author: { '@type': 'Organization', name: 'PatternBulk.com' }, reviewBody: 'Returned for feature expansions, reflecting trust in technical expertise.', reviewRating: { '@type': 'Rating', ratingValue: 5 } },
    { '@type': 'Review', author: { '@type': 'Organization', name: 'KayKay LLC' }, reviewBody: 'Delivered complex IT solutions accessible online with great reliability.', reviewRating: { '@type': 'Rating', ratingValue: 5 } },
    { '@type': 'Review', author: { '@type': 'Organization', name: 'TalkToPsychics.com' }, reviewBody: 'Real-time SaaS platform with Socket.IO integration, earning trust and repeat collaborations.', reviewRating: { '@type': 'Rating', ratingValue: 5 } },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://greatodeal.com/#website',
  name: 'Greatodeal',
  url: 'https://greatodeal.com',
  description: 'AI Automation, Web Development & Software Solutions',
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
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', ratingCount: '6', bestRating: '5', worstRating: '1' },
  hasMap: 'https://maps.google.com/?cid=13357701166578108019',
  additionalType: 'https://schema.org/SoftwareApplication',
  serviceType: ['AI Automation', 'Web Development', 'Mobile App Development', 'SaaS Platform Development', 'Custom Software Development', 'AI Chatbot Development', 'Cloud & DevOps'],
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
    'https://clutch.co/profile/greatodeal',
    'https://g.co/kgs/13357701166578108019',
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
      description: 'Real talk about client management in software development. Greatodeal shares experiences from 9+ years of building AI and web solutions.',
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
      description: 'AI-powered astrology platform by Greatodeal — accurate online birth chart reading, horoscope prediction, and psychic consultation platform built with AI and SaaS technology.',
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
      <body className="min-h-screen bg-[#090909] text-[#E5E7EB]" suppressHydrationWarning>
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
