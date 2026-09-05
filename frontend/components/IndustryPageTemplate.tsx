'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, AlertTriangle, Layers, Code, Landmark, Activity, Banknote, Leaf, Home, Bot, ArrowUpRight, Briefcase, ShoppingCart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll, SectionBadge, StaggerContainer, StaggerItem } from '@/components/ui/Animations';
import { usePageContent } from '@/hooks/usePageContent';

const ease = [0.25, 0.1, 0.25, 1] as const;

const allIndustries: Array<{ name: string; icon: LucideIcon; color: string; path: string }> = [
  { name: 'Government', icon: Landmark, color: 'text-emerald-300', path: '/industries/government' },
  { name: 'Healthcare', icon: Activity, color: 'text-rose-400', path: '/industries/healthcare' },
  { name: 'Fintech', icon: Banknote, color: 'text-blue-400', path: '/industries/fintech' },
  { name: 'Green Tech', icon: Leaf, color: 'text-lime-400', path: '/industries/green-tech' },
  { name: 'Real Estate', icon: Home, color: 'text-cyan-400', path: '/industries/real-estate' },
  { name: 'AI Automation', icon: Bot, color: 'text-violet-400', path: '/industries/ai-automation' },
  { name: 'Business Services', icon: Briefcase, color: 'text-amber-400', path: '/industries/business' },
  { name: 'E-Commerce', icon: ShoppingCart, color: 'text-pink-400', path: '/industries/ecommerce' },
];

export interface IndustryPageData {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  heroIcon: LucideIcon;
  challenges: string[];
  solutions: Array<{ icon: LucideIcon; title: string; desc: string }>;
  features: string[];
  technologies: string[];
  stats: Array<{ value: string; label: string }>;
  caseStudy?: { title: string; result: string; desc: string };
  heroImage?: string;
  heroVideo?: string;
  /** Optional extra section rendered between Challenges and Solutions. */
  customSection?: React.ReactNode;
}

export default function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const HeroIcon = data.heroIcon;
  const relatedIndustries = allIndustries.filter(ind => ind.name !== data.title);

  const pathname = usePathname();
  const pageKey = (pathname || '/industries/x').replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-');
  const defaults = {
    heroBadge: data.subtitle,
    heroTitle: `${data.title} IT Solutions`,
    heroDescription: data.description,
    stat1Label: data.stats[0]?.label || '',
    stat2Label: data.stats[1]?.label || '',
    stat3Label: data.stats[2]?.label || '',
    stat4Label: data.stats[3]?.label || '',
    challengesTitle: 'Industry Challenges We Solve',
    challengesSubtitle: 'We understand the unique challenges in your industry and build technology to overcome them.',
    solutionsTitle: 'Our Technology Solutions',
    solutionsSubtitle: "Custom IT solutions designed for your industry's needs.",
    featuresTitle: 'Key Features We Deliver',
    techTitle: 'Technologies We Use',
    relatedTitle: 'Related Industries',
    relatedSubtitle: 'We build compliance-grade AI automation for these sectors too.',
    finalCtaTitle: `Transform Your ${data.title} Business`,
    finalCtaSubtitle: `Join leading ${data.title.toLowerCase()} companies that trust Greatodeal for their technology needs.`,
    finalCtaButtonText: 'Request a Demo',
    finalCtaSecondaryButtonText: 'Become a Partner',
  };
  const content = usePageContent(pageKey, defaults);
  const heroTitleEdited = content.heroTitle !== defaults.heroTitle;
  const finalCtaTitleEdited = content.finalCtaTitle !== defaults.finalCtaTitle;
  const statLabels = [content.stat1Label, content.stat2Label, content.stat3Label, content.stat4Label];

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <HeroIcon className="w-4 h-4" /> {content.heroBadge}
              </motion.div>
              <motion.h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
                {heroTitleEdited ? content.heroTitle : (
                  <>{data.title}{' '}<span className="block mt-2 bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">IT Solutions</span></>
                )}
              </motion.h1>
              <motion.p className="text-lg text-[#999] leading-[1.7] mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
                {content.heroDescription}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                <Link href="/contact" className="btn-primary group">
                  Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
                </Link>
                <Link href="/industries" className="px-8 py-4 border border-white/[0.08] text-[#E5E7EB] rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
                  All Industries
                </Link>
              </motion.div>
            </div>
            <motion.div className="hidden lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>
              {data.heroVideo ? (
                <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                  <video autoPlay loop muted playsInline aria-hidden="true" className="w-full h-full object-cover">
                    <source src={data.heroVideo} type="video/mp4" />
                  </video>
                </div>
              ) : data.heroImage ? (
                <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                  <Image src={data.heroImage} alt={`${data.title} AI automation solutions by Greatodeal`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                </div>
              ) : (
                <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/[0.04]">
                  <div className="w-16 h-16 rounded-2xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.1] flex items-center justify-center mx-auto mb-6">
                    <HeroIcon className="w-8 h-8 text-[#6EE7B7]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {data.stats.map((s, i) => (
                      <div key={i} className="text-center p-4 bg-[#090909] rounded-xl border border-white/[0.04]">
                        <div className="text-xl font-bold text-[#6EE7B7] tracking-tight">{s.value}</div>
                        <div className="text-[11px] text-[#777] mt-1">{statLabels[i] || s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CHALLENGES ═══ */}
      <section className="py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <RevealOnScroll className="text-center mb-16">
            <SectionBadge icon={AlertTriangle} text="Pain Points" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{content.challengesTitle}</h2>
            <p className="text-[#999] max-w-2xl mx-auto text-base">{content.challengesSubtitle}</p>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-3">
            {data.challenges.map((c, i) => (
              <motion.div key={i} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:border-red-500/15 transition-all duration-700" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }}>
                <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /></div>
                <span className="text-base text-white/80">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {data.customSection}

      {/* ═══ SOLUTIONS ═══ */}
      <section className="py-28 bg-[#090909]">
        <div className="container max-w-[1920px]">
          <RevealOnScroll className="text-center mb-16">
            <SectionBadge icon={Sparkles} text="Solutions" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{content.solutionsTitle}</h2>
            <p className="text-[#999] max-w-2xl mx-auto text-base">{content.solutionsSubtitle}</p>
          </RevealOnScroll>
          <StaggerContainer className="grid md:grid-cols-3 gap-5">
            {data.solutions.map((s, i) => {
              const SIcon = s.icon;
              return (
                <StaggerItem key={i} index={i}>
                  <motion.div className="group bg-white/[0.02] p-7 rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/15 transition-all duration-700 h-full" whileHover={{ y: -4, transition: { duration: 0.4 } }}>
                    <div className="w-12 h-12 rounded-xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mb-5">
                      <SIcon className="w-5 h-5 text-[#6EE7B7]" />
                    </div>
                    <h3 className="font-bold text-white mb-2 tracking-tight">{s.title}</h3>
                    <p className="text-base text-[#999] leading-relaxed">{s.desc}</p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <RevealOnScroll>
            <SectionBadge icon={Layers} text="Features" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">{content.featuresTitle}</h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-3">
            {data.features.map((f, i) => (
              <motion.div key={i} className="flex items-center gap-3 p-3 rounded-xl" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}>
                <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                <span className="text-base text-[#ccc]">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH ═══ */}
      <section className="py-28 bg-[#090909]">
        <div className="container max-w-[1920px]">
          <RevealOnScroll className="text-center mb-12">
            <SectionBadge icon={Code} text="Tech Stack" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{content.techTitle}</h2>
          </RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-2.5">
            {data.technologies.map((tech, i) => (
              <motion.span key={i} className="px-4 py-2 bg-white/[0.02] border border-white/[0.04] rounded-xl text-sm text-[#999] font-medium hover:border-[#6EE7B7]/20 hover:text-[#6EE7B7] transition-all duration-500 cursor-default" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RELATED INDUSTRIES ═══ */}
      <section className="py-20 bg-[#060606] border-t border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{content.relatedTitle}</h2>
            <p className="text-[#999] text-base mt-3">{content.relatedSubtitle}</p>
          </RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedIndustries.map(ind => {
              const Icon = ind.icon;
              return (
                <Link key={ind.name} href={ind.path} className="group bg-white/[0.02] p-5 rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/20 transition-all duration-500 flex flex-col items-center text-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center group-hover:bg-[#6EE7B7]/[0.06] transition-all duration-500">
                    <Icon className={`w-5 h-5 ${ind.color}`} />
                  </div>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-500">{ind.name}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-[#6EE7B7] opacity-0 group-hover:opacity-100 transition-opacity duration-500">View <ArrowUpRight className="w-3 h-3" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
              {finalCtaTitleEdited ? content.finalCtaTitle : (
                <>Transform Your {data.title}{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Business</span></>
              )}
            </h2>
            <p className="text-lg text-[#999] mb-12 max-w-xl mx-auto leading-[1.7]">{content.finalCtaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">
                {content.finalCtaButtonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
              <Link href="/partnership" className="px-10 py-4 border border-white/[0.08] text-white rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
                {content.finalCtaSecondaryButtonText}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
