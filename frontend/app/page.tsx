import type { Metadata } from 'next';
import HomeClient from '@/components/pages/HomeClient';

export const metadata: Metadata = {
  title: 'Greatodeal | AI Automation & Software Development Company in Pakistan',
  description: 'Greatodeal is Pakistan\'s leading AI automation and software development company. Expert in web development, mobile apps, SaaS platforms, ERP & enterprise software. 9+ years, 120+ engineers, 200+ global projects. Free consultation.',
  keywords: [
    'software house Lahore', 'software house Pakistan', 'software house in Lahore Pakistan',
    'AI automation company Pakistan', 'AI automation company Lahore',
    'web development company Pakistan', 'web development company Lahore',
    'mobile app development Pakistan', 'custom software development Lahore',
    'IT company Pakistan', 'IT company Lahore', 'software development company Pakistan',
    'AI development company Pakistan', 'machine learning company Pakistan',
    'SaaS development company', 'ERP development Pakistan', 'hire developers Pakistan',
    'offshore software development Pakistan', 'Greatodeal',
  ],
  openGraph: {
    title: 'Software House in Lahore, Pakistan | AI Automation & Web Development | Greatodeal',
    description: 'Top software house in Lahore — AI automation, web development, mobile apps, ERP & SaaS platforms. 9+ years, 120+ engineers, 200+ projects across 15+ countries.',
    url: 'https://greatodeal.com',
    type: 'website',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal Software House Lahore Pakistan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software House in Lahore, Pakistan | AI & Web Development | Greatodeal',
    description: 'Top software house in Lahore — AI automation, web development, mobile apps & SaaS. 9+ years, 120+ engineers, 200+ projects.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com',
    languages: {
      'en-US': 'https://greatodeal.com',
      'en-GB': 'https://greatodeal.com',
      'en': 'https://greatodeal.com',
    },
  },
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://greatodeal.com/#webpage',
  url: 'https://greatodeal.com',
  name: 'Greatodeal | AI Automation, Custom Software & SaaS Development Company',
  description: 'Pakistan\'s leading AI automation and software development company. Building AI chatbots, LLM apps, SaaS platforms, web & mobile apps for USA, UK, Europe, Middle East clients.',
  isPartOf: { '@id': 'https://greatodeal.com/#website' },
  about: { '@id': 'https://greatodeal.com/#organization' },
  breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }] },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.hero-description'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Greatodeal offer?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal offers AI automation, custom software development, web application development (React, Next.js), mobile app development (Flutter, React Native), SaaS platform development, ERP/CRM systems, API development, UI/UX design, cloud & DevOps, machine learning, LLM/RAG development, AI chatbot development, and IT consulting. We serve clients in USA, UK, Europe, Middle East, and worldwide.' },
    },
    {
      '@type': 'Question',
      name: 'Where is Greatodeal located?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal is headquartered in Lahore, Pakistan. We serve clients globally across 15+ countries including USA, UK, Germany, UAE, Saudi Arabia, and more.' },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Greatodeal use?',
      acceptedAnswer: { '@type': 'Answer', text: 'We use React, Next.js, Angular, Vue.js, Node.js, Python, Java, .NET, Flutter, React Native, AWS, Azure, GCP, Docker, Kubernetes, Terraform, TensorFlow, PyTorch, OpenAI GPT, LangChain, MongoDB, PostgreSQL, and more. Our AI stack includes LLM development, RAG pipelines, agentic AI, NLP, and computer vision.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal build AI chatbots and LLM applications?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, Greatodeal specializes in AI chatbot development, LLM (Large Language Model) applications, RAG (Retrieval-Augmented Generation) pipelines, agentic AI systems, and autonomous AI agents. We integrate OpenAI GPT, Claude, and custom models for businesses worldwide.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal build a SaaS platform?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, we are experts in SaaS platform development. We build multi-tenant SaaS applications with subscription billing, API-first architecture, white-label solutions, and cloud-native deployment. Our portfolio includes AI SaaS platforms, psychics platforms, e-commerce SaaS, and more.' },
    },
    {
      '@type': 'Question',
      name: 'How much does software development cost at Greatodeal?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal offers 60%+ cost savings compared to US/UK agencies while delivering premium quality. Project costs vary based on scope — a simple web app starts from $3,000, while complex enterprise systems range $15,000-$100,000+. We offer free consultations and detailed estimates at greatodeal.com/estimate.' },
    },
    {
      '@type': 'Question',
      name: 'Does Greatodeal work with clients in the USA and UK?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, Greatodeal serves clients across 15+ countries including USA, UK, Germany, UAE, Saudi Arabia, Qatar, Australia, and more. We offer dedicated teams, NDA protection, and timezone-flexible communication for international clients.' },
    },
    {
      '@type': 'Question',
      name: 'What industries does Greatodeal serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'Greatodeal serves 18+ industries including E-Commerce, Fintech & Banking, Healthcare, Education, Manufacturing, Logistics, Real Estate, SaaS, AI & Automation, Insurance, Travel, Telecommunications, Energy, Gaming, Government, and Startups. Each solution is tailored to industry-specific regulatory and business requirements.' },
    },
    {
      '@type': 'Question',
      name: 'Can Greatodeal build psychics and astrology platforms?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, Greatodeal has experience building AI-powered psychics platforms, astrology apps, and spiritual consultation SaaS products. We developed TalkToPsychics.com and SpiritueelChatten — real-time platforms with AI integration, payment systems, and video consultations.' },
    },
    {
      '@type': 'Question',
      name: 'How can I contact Greatodeal?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can contact Greatodeal via email at sales@greatodeal.com, phone at +92 301 1060841, WhatsApp, or through our website contact form at greatodeal.com/contact. We offer free consultations and respond within 24 hours. Visit our LinkedIn, Instagram, Facebook, and YouTube for latest updates.' },
    },
  ],
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Greatodeal IT Services',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'AI Automation & Agentic AI', url: 'https://greatodeal.com/services/machine-learning-ai' },
    { '@type': 'ListItem', position: 2, name: 'Web Application Development', url: 'https://greatodeal.com/services/web-apps' },
    { '@type': 'ListItem', position: 3, name: 'Mobile App Development', url: 'https://greatodeal.com/services/mobile-apps' },
    { '@type': 'ListItem', position: 4, name: 'AI SaaS Platform Development', url: 'https://greatodeal.com/services/ai-saas-platform' },
    { '@type': 'ListItem', position: 5, name: 'Custom Software & ERP', url: 'https://greatodeal.com/services/custom-software' },
    { '@type': 'ListItem', position: 6, name: 'API Development & Integration', url: 'https://greatodeal.com/services/api-development' },
    { '@type': 'ListItem', position: 7, name: 'UI/UX Design', url: 'https://greatodeal.com/services/ui-ux-design' },
    { '@type': 'ListItem', position: 8, name: 'Software Testing & QA', url: 'https://greatodeal.com/services/software-testing' },
    { '@type': 'ListItem', position: 9, name: 'IT Infrastructure & DevOps', url: 'https://greatodeal.com/services/it-infrastructure' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HomeClient />
    </>
  );
}
