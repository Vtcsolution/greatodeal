'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle, ArrowRight, ArrowUpRight, Star, Globe2, CalendarCheck, PhoneCall, MessageSquare,
  Database, Workflow, LineChart, RefreshCw, Landmark, Activity, Banknote, Leaf, Home, Bot,
  Sparkles, Briefcase, ShoppingCart, Search, Brain, Target, Map as MapIcon, Rocket, Lightbulb, Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
import { servicePages } from '@/lib/servicePages';
import { markets } from '@/lib/markets';
import { founder } from '@/lib/founder';
import { getImageUrl } from '@/lib/api';

const HOME_CONTENT_DEFAULTS = {
  heroBadge: 'AI Automation Agency · Since 2020',
  heroTitle: 'We build AI agents that do the work your team shouldn’t have to.',
  heroSubtitle: 'Greatodeal is an AI automation agency and custom software company. We automate your calls, leads, follow-ups, data entry and reporting with AI agents, AI voice agents, chatbots and custom software, so your team can focus on growth. Trusted by businesses in the USA, UK, Europe and the Middle East.',
  ctaText: 'Book a Free Consultation',
  whatWeBuildTitle: 'What We Build',
  whatWeBuildSubtitle: 'One team for the AI automation and the software behind it, from a single AI agent to a complete SaaS platform.',
  workTitle: 'Real Projects. Real Results.',
  processTitle: 'How We Work',
  industriesTitle: 'Industries We Serve',
  whyUsTitle: 'Why Businesses Choose Greatodeal',
  finalCtaTitle: 'Tell us what’s slowing your business down.',
  finalCtaSubtitle: 'In a free 30-minute consultation we map your workflow, find the real pain points, and show you exactly what to automate first, with a clear roadmap, timeline and price. No obligation.',
  finalCtaButtonText: 'Book a Free Consultation',
};

const ParticleSphere = dynamic(() => import('@/components/ui/ParticleSphere'), { ssr: false });

const ease = [0.25, 0.1, 0.25, 1] as const;
const WHATSAPP_URL = 'https://wa.me/923011060841';

/* ═══ DATA ═══ */

const trustPoints: Array<{ icon: LucideIcon; text: string }> = [
  { icon: Star, text: '5.0 rating on Google' },
  { icon: CalendarCheck, text: 'Building AI & software since 2020' },
  { icon: Globe2, text: 'Clients in 6 countries' },
];

const painPoints: Array<{ icon: LucideIcon; pain: string; fix: string }> = [
  { icon: MessageSquare, pain: 'Leads go cold because nobody followed up in time.', fix: 'AI follow-ups on WhatsApp, email and SMS that run until the lead replies.' },
  { icon: PhoneCall, pain: 'Hours lost listening back to sales calls.', fix: 'Every call transcribed, summarized and scored by AI, with hot leads flagged instantly.' },
  { icon: Bot, pain: 'Calls and chats after hours go unanswered.', fix: 'AI voice agents and chatbots that answer, qualify and book appointments 24/7.' },
  { icon: Database, pain: 'Data copied between tools by hand.', fix: 'Your CRM, email, calendar and apps connected into one automated workflow.' },
  { icon: LineChart, pain: 'Reports rebuilt in spreadsheets every week.', fix: 'Live dashboards that show what is happening right now, not last month.' },
  { icon: RefreshCw, pain: 'Old software that is slow and hard to change.', fix: 'A modern, scalable rebuild with AI built in, without stopping your operations.' },
];

const caseStudies: Array<{ id: string; title: string; market: string; result: string; tags: string[] }> = [
  { id: '6a984ba6a6cc6374a91338bf', title: 'Omnira Valet: AI Call Intelligence CRM', market: 'Saudi Arabia', result: 'Every sales call is transcribed, summarized and lead-scored by AI. Hot leads trigger instant alerts and follow-ups run on autopilot, cutting the gap from call to next action from hours to minutes.', tags: ['AI Voice & Calls', 'CRM', 'Automation'] },
  { id: '6a894f15e4e8d631e90c3bc5', title: 'Sambid: AI Government Contracting SaaS', market: 'United States', result: 'US federal contractors find SAM.gov opportunities, score their fit and draft proposals and capability statements with AI, replacing days of manual research.', tags: ['AI SaaS', 'GovTech', 'OpenAI'] },
  { id: '6ab3798886a2e724501633ad', title: 'TryOnU: AI Virtual Try-On Platform', market: 'Global', result: 'Shoppers try clothes, shoes and watches on their own photo with AI, then buy from Amazon, eBay, AliExpress, Flipkart, Daraz and local stores.', tags: ['Generative AI', 'E-Commerce', 'SaaS'] },
  { id: '6a98214f351a05723e730385', title: 'Lead Finder: AI Lead Generation CRM', market: 'Global', result: 'Finds companies by industry and city, imports them into the CRM in one click, drafts outreach with GPT and follows up automatically until they reply.', tags: ['AI Agents', 'Lead Generation', 'CRM'] },
];

const processSteps: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  { icon: Search, title: 'Understand', desc: 'We learn how your business actually runs and build on the idea you already have.' },
  { icon: Brain, title: 'Think Critically', desc: 'We question what really needs to change, instead of automating a broken process.' },
  { icon: LineChart, title: 'Analyze', desc: 'We study your data, tools and workflows to see where time and money are lost.' },
  { icon: Target, title: 'Find the Pain Points', desc: 'We pinpoint the few problems that, once solved, make the biggest difference.' },
  { icon: MapIcon, title: 'Complete Roadmap', desc: 'You get a clear plan with scope, timeline and price before any code is written.' },
  { icon: Rocket, title: 'Build & Support', desc: 'We build in short sprints with demos, launch, and keep improving after go-live.' },
];

const industries: Array<{ name: string; icon: LucideIcon; color: string; desc: string; path: string }> = [
  { name: 'Healthcare', icon: Activity, color: 'text-rose-400', desc: 'AI receptionists, patient booking and HIPAA-aware automation.', path: '/industries/healthcare' },
  { name: 'Real Estate', icon: Home, color: 'text-cyan-400', desc: 'Lead follow-up, property inquiries and deal tracking on autopilot.', path: '/industries/real-estate' },
  { name: 'Fintech', icon: Banknote, color: 'text-blue-400', desc: 'KYC automation, fraud signals and auditable transaction systems.', path: '/industries/fintech' },
  { name: 'Government', icon: Landmark, color: 'text-emerald-300', desc: 'GovTech platforms and contracting tools with audit-ready AI.', path: '/industries/government' },
  { name: 'E-Commerce', icon: ShoppingCart, color: 'text-pink-400', desc: 'Abandoned-cart recovery, order automation and AI shopping tools.', path: '/industries/ecommerce' },
  { name: 'Business Services', icon: Briefcase, color: 'text-amber-400', desc: 'Client onboarding, billing and operations workflows automated.', path: '/industries/business' },
  { name: 'Green Tech', icon: Leaf, color: 'text-lime-400', desc: 'Monitoring dashboards and automated compliance reporting.', path: '/industries/green-tech' },
  { name: 'AI Automation', icon: Workflow, color: 'text-violet-400', desc: 'Agentic workflows that connect scattered tools into one system.', path: '/industries/ai-automation' },
];

const whyUs: Array<{ title: string; desc: string }> = [
  { title: 'Business first, code second', desc: 'We start with your goals and pain points, not with a tech stack.' },
  { title: 'Real AI systems, not chatbot wrappers', desc: 'Agents that take action in your CRM, inbox and tools, with human review where it matters.' },
  { title: 'Clear scope, timeline and price', desc: 'You know exactly what you get and what it costs before we start.' },
  { title: 'Secure and compliance-ready', desc: 'Access control, audit logs and HIPAA/GDPR-aware data handling built in.' },
  { title: 'You own 100% of the code', desc: 'All source code, designs and documentation are yours.' },
  { title: 'Support after launch', desc: 'Monitoring, improvements and new features as your business grows.' },
];

const techStack = ['OpenAI', 'Anthropic Claude', 'LangChain', 'n8n', 'Python', 'Node.js', 'Next.js', 'React', 'React Native', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Twilio', 'WhatsApp API', 'AWS', 'Docker'];

const marqueeItems = ['AI Agents', 'AI Voice Agents', 'AI Chatbots', 'Workflow Automation', 'Custom Software', 'SaaS Development', 'CRM & ERP', 'Mobile Apps'];

/* ═══ HELPERS ═══ */

function MarqueeStrip() {
  return (
    <div className="relative py-10 sm:py-14 border-y border-white/[0.08] overflow-hidden bg-[#090909]">
      <motion.div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap w-max" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}>
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="font-serif italic text-3xl sm:text-5xl text-[#F5F0E6]">{item}</span>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#6EE7B7] shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}>{children}</motion.div>;
}

function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (<span className={className}>{text.split(' ').map((word, i) => (<span key={i} className="inline-block overflow-hidden"><motion.span className="inline-block" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}>{word}&nbsp;</motion.span></span>))}</span>);
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: React.ReactNode }) {
  return (
    <RevealText className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6EE7B7] mb-4">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white mb-4">{title}</h2>
      {subtitle && <p className="text-white/75 text-base sm:text-lg leading-relaxed">{subtitle}</p>}
    </RevealText>
  );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="px-8 py-4 border border-white/[0.1] text-white rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
      {children}
    </Link>
  );
}

/* ═══ HOME ═══ */

export default function HomeClient({ projectImages = {} }: { projectImages?: Record<string, string> }) {
  const content = usePageContent('home', HOME_CONTENT_DEFAULTS);
  const heroTitleEdited = content.heroTitle !== HOME_CONTENT_DEFAULTS.heroTitle;

  return (
    <div className="min-h-screen bg-[#090909] text-white/90 overflow-x-hidden">

      {/* ═══ HERO: the whole message in one screen ═══ */}
      <section className="relative min-h-screen flex items-start overflow-hidden">
        <div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]" /></div>
        <div className="container max-w-[1920px] relative z-10 pt-24 sm:pt-28 pb-20 px-6 sm:px-10 lg:px-[60px]">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="space-y-8">
              <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6EE7B7]/20 bg-[#6EE7B7]/[0.06]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}>
                <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span className="text-xs font-semibold text-[#6EE7B7] tracking-wide uppercase">{content.heroBadge}</span>
              </motion.div>

              <div className="space-y-5">
                <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.12] tracking-tight text-white">
                  {heroTitleEdited ? (
                    <SplitText text={content.heroTitle} delay={0.3} />
                  ) : (
                    <>
                      <SplitText text="We build" delay={0.3} />{' '}
                      <SplitText text="AI agents" delay={0.45} className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent" />{' '}
                      <SplitText text="that do the work your team shouldn’t have to." delay={0.6} />
                    </>
                  )}
                </h1>
                <motion.p className="text-base sm:text-lg text-white/80 max-w-xl leading-[1.8]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
                  {content.heroSubtitle}
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1, ease }}>
                <Link href="/contact" className="btn-primary group justify-center">
                  {content.ctaText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
                <SecondaryButton href="#work">See Real Projects</SecondaryButton>
              </motion.div>

              <motion.ul className="flex flex-wrap gap-x-7 gap-y-3 pt-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1, ease }}>
                {trustPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-sm text-white/70">
                    <Icon className="w-4 h-4 text-[#6EE7B7]" /> {text}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.div className="relative hidden lg:block" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
              <ParticleSphere />
              <motion.div className="absolute left-0 top-[8%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, y: [0, -8, 0] }} transition={{ opacity: { delay: 1.5, duration: 0.6 }, y: { delay: 2, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center"><PhoneCall className="w-4 h-4 text-[#6EE7B7]" /></div><div><div className="text-sm font-bold text-white">Call summarized by AI</div><div className="text-xs text-white/40">Intent: high · Budget: confirmed</div></div></div>
              </motion.div>
              <motion.div className="absolute right-0 bottom-[10%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, y: [0, 8, 0] }} transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2.5, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-[#3B82F6]" /></div><div><div className="text-sm font-bold text-white">WhatsApp follow-up sent</div><div className="text-xs text-white/40">Hot lead · 2 minutes after the call</div></div></div>
              </motion.div>
              <motion.div className="absolute right-4 top-0 px-4 py-2.5 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md max-w-[230px]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.6 }}>
                <div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center shrink-0"><Database className="w-4 h-4 text-[#6EE7B7]" /></div><span className="text-xs text-white/70 leading-tight">CRM updated automatically</span></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ PROBLEM → FIX ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="Sound familiar?" title="Most businesses don’t need more people. They need fewer manual steps." subtitle="These are the problems we solve every week with AI automation and custom software." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {painPoints.map(({ icon: Icon, pain, fix }, i) => (
              <motion.div key={pain} className="bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.05] hover:border-[#6EE7B7]/15 transition-all duration-700" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease }}>
                <div className="w-11 h-11 rounded-xl bg-red-500/[0.08] border border-red-500/15 flex items-center justify-center mb-5"><Icon className="w-5 h-5 text-red-300" /></div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">{pain}</h3>
                <p className="flex items-start gap-2 text-sm sm:text-base text-white/75 leading-relaxed"><CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-1" /> {fix}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="AI automation & software services" title={content.whatWeBuildTitle} subtitle={content.whatWeBuildSubtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {servicePages.map((p, i) => {
              const Icon = p.offerings[0].icon;
              return (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease }}>
                  <Link href={`/services/${p.slug}`} className="group block h-full bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.05] hover:border-[#6EE7B7]/20 hover:-translate-y-1 transition-all duration-500">
                    <div className="w-11 h-11 rounded-xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.1] flex items-center justify-center mb-5"><Icon className="w-5 h-5 text-[#6EE7B7]" /></div>
                    <h3 className="text-lg font-bold text-white mb-2">{p.name}</h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">{p.h1Accent}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6EE7B7] group-hover:gap-2.5 transition-all duration-500">Learn more <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROOF ═══ */}
      <section id="work" className="py-20 sm:py-28 bg-[#090909] scroll-mt-24">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="Client work" title={content.workTitle} subtitle="AI systems we have built and shipped for clients in the USA, the Middle East, Europe and beyond." />
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {caseStudies.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease }}>
                <Link href={`/work/${c.id}`} className="group flex flex-col h-full bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-[#6EE7B7]/20 overflow-hidden transition-all duration-500">
                  <div className="relative aspect-[16/10] bg-[#0D0D0D] border-b border-white/[0.06]">
                    {projectImages[c.id] && (
                      <Image src={getImageUrl(projectImages[c.id])} alt={`${c.title} — built by Greatodeal`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-contain group-hover:scale-[1.02] transition-transform duration-700" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <p className="text-[11px] uppercase tracking-wider text-[#6EE7B7] mb-1.5">{c.market}</p>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed mb-4">{c.result}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-1.5">
                      {c.tags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/65">{t}</span>)}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#6EE7B7]">Case study <ArrowUpRight className="w-4 h-4" /></span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/work" className="inline-flex items-center gap-2 font-semibold text-[#6EE7B7] hover:gap-3 transition-all duration-500">View all projects <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CTA ═══ */}
      <section className="py-14 sm:py-16 bg-[#6EE7B7]/[0.04] border-y border-[#6EE7B7]/10">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px] flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Want results like these for your business?</h2>
            <p className="text-white/75 text-base">Book a free consultation. We reply within 24 hours.</p>
          </div>
          <Link href="/contact" className="btn-primary group shrink-0">{content.ctaText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" /></Link>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="Our process" title={content.processTitle} subtitle="We don’t start with code. We start with your business." />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {processSteps.map(({ icon: Icon, title, desc }, i) => (
              <motion.li key={title} className="relative bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.05]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.1] flex items-center justify-center"><Icon className="w-5 h-5 text-[#6EE7B7]" /></div>
                  <span className="font-mono text-3xl font-bold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">{desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="Industries" title={content.industriesTitle} subtitle={<>AI automation built around how your industry works. <Link href="/industries" className="text-[#6EE7B7] hover:underline">See all industries</Link>.</>} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {industries.map(({ name, icon: Icon, color, desc, path }) => (
              <Link key={name} href={path} className="group bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/[0.05] hover:border-[#6EE7B7]/20 transition-all duration-500 block">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:bg-[#6EE7B7]/[0.06] transition-all duration-500"><Icon className={`w-6 h-6 ${color}`} /></div>
                <h3 className="text-base font-semibold text-white mb-1.5">{name}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOUNDER + WHY US ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px]">
          <SectionHeading eyebrow="Why Greatodeal" title={content.whyUsTitle} />
          <div className="grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
            <RevealText className="bg-white/[0.02] rounded-2xl border border-white/[0.06] overflow-hidden">
              <Image src="/images/zia-shafique.jpg" alt="Zia Shafique, CEO & Founder of Greatodeal" width={400} height={400} className="w-full h-auto" />
              <div className="p-6 sm:p-7">
                <p className="text-xs uppercase tracking-wider text-[#6EE7B7] mb-2">Work directly with the founder</p>
                <h3 className="text-xl font-bold text-white">{founder.name}</h3>
                <p className="text-sm text-white/60 mb-4">CEO &amp; Founder · AI Automation Expert</p>
                <blockquote className="text-white/80 leading-relaxed italic mb-5">
                  “Before we write a line of code, we understand your business, think critically about what really needs to change, and only then automate it.”
                </blockquote>
                <Link href={founder.path} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6EE7B7] hover:underline">Read Zia’s profile <ArrowUpRight className="w-4 h-4" /></Link>
              </div>
            </RevealText>

            <div>
              <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
                {whyUs.map(({ title, desc }, i) => (
                  <motion.li key={title} className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5, ease }}>
                    <h3 className="flex items-start gap-2 font-bold text-white mb-2"><CheckCircle className="w-5 h-5 text-[#6EE7B7] shrink-0 mt-0.5" /> {title}</h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">{desc}</p>
                  </motion.li>
                ))}
              </ul>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">Clients we serve</h3>
              <div className="flex flex-wrap gap-2.5 mb-8">
                {markets.map(m => <span key={m.country} className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white/80">{m.country}</span>)}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-3">Built with</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map(t => <span key={t} className="px-3 py-1.5 bg-[#0D0D0D] border border-white/[0.06] rounded-lg text-sm text-white/70">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA: repeat the whole message ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.05] rounded-full blur-[180px]" /></div>
        <div className="container max-w-[1920px] px-6 sm:px-10 lg:px-[60px] relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <Lightbulb className="w-10 h-10 text-[#6EE7B7] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight text-white">{content.finalCtaTitle}</h2>
            <p className="text-base sm:text-lg text-white/80 mb-10 leading-[1.8]">{content.finalCtaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact" className="btn-primary group">{content.finalCtaButtonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" /></Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/[0.1] text-white rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
            <p className="text-sm text-white/55">
              Or email <a href="mailto:sales@greatodeal.com" className="inline-flex items-center gap-1 text-[#6EE7B7] hover:underline"><Mail className="w-3.5 h-3.5" />sales@greatodeal.com</a> · We reply within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
