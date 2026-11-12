import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import FaqSection from '@/components/ui/FaqSection';
import { breadcrumbSchema } from '@/lib/schema';
import { founder, founderSchema } from '@/lib/founder';
import { servicePages } from '@/lib/servicePages';

const title = 'Zia Shafique (Muhammad Zia ul Rehman) | CEO & Founder of Greatodeal';
const description = 'Zia Shafique (Muhammad Zia ul Rehman) is the CEO & Founder of Greatodeal, an AI automation expert, business analyst, and critical thinker building AI agents and software since 2020.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Zia Shafique', 'Muhammad Zia ul Rehman', 'Zia ul Rehman', 'Rana Zia', 'Zia Shafique Greatodeal',
    'Greatodeal CEO', 'Greatodeal founder', 'AI automation expert', 'AI automation expert Pakistan',
    'business analyst', 'AI agent developer',
  ],
  authors: [{ name: founder.name, url: founder.url }],
  openGraph: {
    type: 'profile',
    title,
    description,
    url: founder.url,
    firstName: 'Zia',
    lastName: 'Shafique',
    username: 'ziashafique',
    images: [{ url: founder.image, width: 400, height: 400, alt: 'Zia Shafique, CEO & Founder of Greatodeal' }],
  },
  twitter: {
    card: 'summary',
    title,
    description,
    images: [founder.image],
  },
  alternates: { canonical: founder.url },
};

const breadcrumbs = breadcrumbSchema([
  { name: 'Home', url: 'https://greatodeal.com' },
  { name: 'About', url: 'https://greatodeal.com/about' },
  { name: founder.name, url: founder.url },
]);

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${founder.url}#profilepage`,
  url: founder.url,
  name: title,
  mainEntity: { '@id': founder.personId },
  isPartOf: { '@id': 'https://greatodeal.com/#website' },
};

const faqs = [
  { question: 'Who is Zia Shafique?', answer: 'Zia Shafique, whose full name is Muhammad Zia ul Rehman, is the CEO and Founder of Greatodeal, an AI automation and software development company founded in 2020 in Lahore, Pakistan. He is known as an AI automation expert, business analyst, and critical thinker.' },
  { question: 'Is Zia Shafique the same person as Muhammad Zia ul Rehman?', answer: 'Yes. Muhammad Zia ul Rehman is his full name, and Zia Shafique is the name he uses professionally. Both refer to the CEO and Founder of Greatodeal.' },
  { question: 'What company did Zia Shafique found?', answer: 'Zia Shafique founded Greatodeal in 2020. Greatodeal builds AI agents, AI automation, voice agents, chatbots, SaaS platforms, and custom software for businesses in the United States, the United Kingdom, Europe, and the Middle East.' },
  { question: 'What does Zia Shafique specialize in?', answer: 'He specializes in AI automation, AI agents, business process automation, business analytics, and turning complex business problems into practical software, combining technical engineering with business analysis and critical thinking.' },
  { question: 'How can I contact Zia Shafique?', answer: 'You can reach Zia Shafique through the Greatodeal contact page at greatodeal.com/contact, by email at zia@greatodeal.com, or through his Instagram, YouTube, Upwork, and Fiverr profiles.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
};

const profileLinks = [
  { label: 'Instagram', href: founder.sameAs[0] },
  { label: 'YouTube', href: founder.sameAs[1] },
  { label: 'Upwork', href: founder.sameAs[2] },
  { label: 'Fiverr', href: founder.sameAs[3] },
  { label: 'Skool', href: founder.sameAs[4] },
];

export default function FounderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
            <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          </div>
          <div className="container max-w-[1920px] relative z-10">
            <nav aria-label="Breadcrumb" className="text-sm text-[#777] mb-10">
              <Link href="/" className="hover:text-[#6EE7B7]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/about" className="hover:text-[#6EE7B7]">About</Link>
              <span className="mx-2">/</span>
              <span className="text-[#aaa]">{founder.name}</span>
            </nav>
            <div className="grid lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/30 max-w-[360px]">
                <Image src="/images/zia-shafique.jpg" alt="Zia Shafique (Muhammad Zia ul Rehman), CEO & Founder of Greatodeal" width={400} height={400} priority className="w-full h-auto" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6">
                  CEO &amp; Founder, Greatodeal
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-[1.1] tracking-tight">{founder.name}</h1>
                <p className="text-xl text-[#aaa] mb-8">Muhammad Zia ul Rehman</p>
                <p className="text-2xl font-semibold bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent mb-8">
                  AI Automation Expert · Business Analyst · Critical Thinker
                </p>
                <p className="text-lg text-[#999] leading-[1.7] mb-5">
                  Zia Shafique (Muhammad Zia ul Rehman) is the CEO and Founder of{' '}
                  <Link href="/" className="text-[#6EE7B7] hover:underline">Greatodeal</Link>, an AI automation and software
                  development company he started in 2020 in Lahore, Pakistan. He leads the company&apos;s strategy, client
                  relationships, and the design of the AI agents and automation systems Greatodeal builds for businesses in the
                  United States, the United Kingdom, Europe, and the Middle East.
                </p>
                <p className="text-lg text-[#999] leading-[1.7] mb-8">
                  His work sits where business analysis meets engineering: understanding how a business actually operates,
                  finding the manual work and blind spots that slow it down, and replacing them with AI automation, data-driven
                  dashboards, and custom software that teams can trust.
                </p>
                <div className="flex flex-wrap gap-3">
                  {profileLinks.map(l => (
                    <a key={l.label} href={l.href} target="_blank" rel="me noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/[0.08] rounded-xl text-sm text-[#ccc] hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all duration-500">
                      {l.label} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#060606] border-y border-white/[0.04]">
          <div className="container max-w-[1920px] grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Roles &amp; Strengths</h2>
              <ul className="space-y-3">
                {founder.roles.map(r => (
                  <li key={r} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    <span className="text-base text-[#ccc]">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2.5">
                {founder.expertise.map(e => (
                  <span key={e} className="px-4 py-2 bg-white/[0.02] border border-white/[0.04] rounded-xl text-sm text-[#999] font-medium">{e}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#090909]">
          <div className="container max-w-[1920px]">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">What Zia Builds at Greatodeal</h2>
            <p className="text-[#999] text-base mb-10 max-w-2xl">Services Greatodeal delivers under his leadership.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicePages.map(p => (
                <Link key={p.slug} href={`/services/${p.slug}`} className="group bg-white/[0.02] p-6 rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/20 transition-all duration-500">
                  <span className="flex items-center justify-between font-semibold text-white/90 group-hover:text-white">
                    {p.name} <ArrowUpRight className="w-4 h-4 text-[#6EE7B7]" />
                  </span>
                  <span className="block text-sm text-[#888] mt-2">{p.h1Accent}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection title={`About ${founder.name}`} faqs={faqs} />

        <section className="py-24 text-center">
          <div className="container max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Work With Zia &amp; the Greatodeal Team</h2>
            <p className="text-lg text-[#999] mb-10">Have a process to automate or a product to build? Get a free consultation.</p>
            <Link href="/contact" className="btn-primary group inline-flex">
              Book a Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
