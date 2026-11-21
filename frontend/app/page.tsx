import type { Metadata } from 'next';
import HomeClient from '@/components/pages/HomeClient';
import FaqSection from '@/components/ui/FaqSection';
import { servicePages } from '@/lib/servicePages';
import { marketsFaq } from '@/lib/markets';

export const metadata: Metadata = {
  title: 'Greatodeal | AI Agent Development & Custom Software Company',
  description: 'Custom AI agents, AI automation, voice agents, SaaS, and custom software for US and global businesses. Compliance-grade engineering for healthcare, fintech, and government since 2020.',
  keywords: [
    'AI agent development company', 'AI automation agency', 'AI voice agents', 'AI receptionist',
    'AI chatbot development company', 'generative AI development services', 'MCP server development',
    'SaaS development company', 'hire AI developers', 'autonomous AI agents', 'AI agents for business',
    'AI SaaS for regulated industries', 'agentic automation', 'compliance-grade AI infrastructure',
    'government AI automation', 'healthcare AI HIPAA compliant', 'fintech AI compliance',
    'AI automation company', 'explainable AI', 'audit-ready AI systems', 'Greatodeal',
    'AI agent development company', 'agentic AI services', 'AI automation agency Lahore',
    'AI services provider Pakistan', 'top AI companies Pakistan', 'business automation AI',
    'AI agents', 'AI agent', 'AI automation agency', 'AI automation', 'workflow automation',
    'business process automation', 'custom software development company', 'digital transformation',
    'AI-powered automation', 'intelligent automation', 'AI automation solutions',
    'software company', 'software development company', 'software development company in Lahore',
    'software company in Lahore', 'software house in Lahore', 'AI development company',
    'AI software development company', 'AI software development', 'enterprise software development company',
    'enterprise software solutions', 'technology solutions company', 'software engineering company',
    'full stack development company', 'custom software company', 'digital transformation company',
    'AI product studio', 'software development company Netherlands', 'software development company UK',
    'software development company USA', 'software development company UAE', 'software development company Canada',
  ],
  openGraph: {
    title: 'Greatodeal | AI Agent Development & Custom Software Company',
    description: 'Custom AI agents, AI automation, voice agents, SaaS, and custom software for US and global businesses. Compliance-grade engineering for healthcare, fintech, and government since 2020.',
    url: 'https://greatodeal.com',
    type: 'website',
    images: [{ url: 'https://greatodeal.com/images/logo.png', width: 512, height: 512, alt: 'Greatodeal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greatodeal | AI Agent Development & Custom Software Company',
    description: 'Greatodeal builds custom AI agents, AI automation, voice agents, SaaS, and custom software for businesses in the US, UK, and worldwide.',
    images: ['https://greatodeal.com/images/logo.png'],
  },
  alternates: {
    canonical: 'https://greatodeal.com',
    languages: {
      'en': 'https://greatodeal.com',
      'x-default': 'https://greatodeal.com',
    },
  },
};

const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://greatodeal.com/#webpage',
  url: 'https://greatodeal.com',
  name: 'Greatodeal | AI Agent Development & Custom Software Company',
  description: 'Greatodeal is an AI automation agency building AI agents, AI voice agents, chatbots, SaaS and custom software for businesses in the USA, UK, Europe and the Middle East.',
  isPartOf: { '@id': 'https://greatodeal.com/#website' },
  about: { '@id': 'https://greatodeal.com/#organization' },
  breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greatodeal.com' }] },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2'],
  },
};

const faqs = [
  { question: 'What does Greatodeal do?', answer: 'Greatodeal is an AI automation agency and custom software company. We build AI agents, AI voice agents and receptionists, AI chatbots, workflow automation, SaaS platforms, CRMs and mobile apps that take repetitive work off your team, from call follow-ups and lead qualification to data entry and reporting.' },
  { question: 'What is an AI automation agency?', answer: 'An AI automation agency finds the manual, repetitive work in a business and replaces it with automated systems, using AI for steps that need reading, writing or judgment, and integrations to move data between your tools. The goal is fewer manual steps, faster response times and lower operating costs.' },
  { question: 'What is an AI agent?', answer: 'An AI agent is software that plans and carries out multi-step tasks toward a goal, such as qualifying a lead, updating your CRM and sending a follow-up, instead of only answering one question like a chatbot. We build AI agents with human review for actions that matter and a full log of everything they do.' },
  { question: 'How much does AI automation cost?', answer: 'It depends on how many systems are connected and how complex the workflow is. A single automated workflow costs far less than a full AI platform. In a free consultation we map your workflow and give you a clear roadmap with scope, timeline and a fixed or milestone-based price before any work starts.' },
  { question: 'How long does it take to build?', answer: 'A focused AI agent or automation for one workflow can often go live in a few weeks. Larger platforms are delivered in phases, so you start seeing results early instead of waiting for everything to be finished.' },
  { question: 'Will AI automation replace my team?', answer: 'No. It removes the repetitive work so your team can spend time on clients, sales and decisions. Every system we build keeps a human in control of the actions that matter.' },
  marketsFaq,
  { question: 'Who founded Greatodeal?', answer: 'Greatodeal was founded in 2020 by Zia Shafique (Muhammad Zia ul Rehman), who leads the company as CEO. He is an AI automation expert and business analyst who works directly with clients on strategy and roadmaps.' },
  { question: 'How do I get started?', answer: 'Book a free 30-minute consultation at greatodeal.com/contact, message us on WhatsApp, or email sales@greatodeal.com. We reply within 24 hours.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'What Greatodeal Builds',
  itemListElement: [
    ...servicePages.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: `https://greatodeal.com/services/${p.slug}` })),
    { '@type': 'ListItem', position: servicePages.length + 1, name: 'Industry-Specific SaaS', url: 'https://greatodeal.com/industries' },
  ],
};

// Organization and LocalBusiness entities are declared once, in the root
// layout (rendered on every page including this one) — duplicating a second,
// less complete copy here just gives Google two conflicting descriptions of
// the same business, which hurts entity recognition rather than helping it.

// First image of each public portfolio project, keyed by project id, for the home
// page case-study cards. Cards still render (without a screenshot) if this fails.
async function getProjectImages(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/portfolio/public`, { next: { revalidate: 3600 } });
    const data = await res.json();
    const projects: Array<{ _id: string; images?: string[] }> = data?.data?.projects || [];
    return Object.fromEntries(projects.filter(p => p.images?.[0]).map(p => [p._id, p.images![0]]));
  } catch {
    return {};
  }
}

export default async function HomePage() {
  const projectImages = await getProjectImages();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <HomeClient projectImages={projectImages} />
      <FaqSection faqs={faqs} />
    </>
  );
}
