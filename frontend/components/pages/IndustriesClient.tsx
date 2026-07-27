'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Landmark, Activity, Banknote, Leaf, Home, Bot, ArrowRight, ArrowUpRight, Sparkles,
  Search, ShieldCheck, Layers, FileCheck, CheckCircle, Eye, Lock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

interface Industry {
  icon: LucideIcon; name: string; desc: string; longDesc: string; path: string; tags: string[]; color: string; accent: string;
}

const industries: Industry[] = [
  { icon: Landmark, name: 'Government', desc: 'Citizen services automation, secure case management, and explainable AI decisions, built for audit and public accountability.', longDesc: 'Government agencies run on public trust, not uptime alone. We build agentic workflows for permits, benefits, and inter-agency operations where every automated decision is logged, explainable, and reviewable, so it holds up under FOIA requests and public scrutiny.', path: '/industries/government', tags: ['Citizen Services', 'Zero-Trust', 'Explainable AI', 'Audit Trails'], color: 'text-emerald-300', accent: '#6EE7B7' },
  { icon: Activity, name: 'Healthcare', desc: 'HIPAA-compliant clinical and operational systems for providers, payers, and health-tech, auditable from day one.', longDesc: 'A mistake in a healthcare system is a patient outcome, not a bug ticket. We build clinical and operational AI for providers and payers with HIPAA compliance, data integrity, and full auditability engineered in from the first line of code.', path: '/industries/healthcare', tags: ['HIPAA', 'HL7/FHIR', 'Clinical AI', 'Telehealth'], color: 'text-rose-400', accent: '#FB7185' },
  { icon: Banknote, name: 'Fintech', desc: 'KYC/AML automation and auditable transaction infrastructure.', longDesc: 'Financial platforms engineered for KYC/AML compliance, real-time fraud detection, and full transaction auditability.', path: '/industries/fintech', tags: ['KYC/AML', 'Fraud Detection', 'PCI DSS', 'Open Banking'], color: 'text-blue-400', accent: '#60A5FA' },
  { icon: Leaf, name: 'Green Tech', desc: 'Smart grid monitoring and automated emissions compliance reporting.', longDesc: 'Monitoring and automation for energy operators, built around emissions reporting and HSE compliance.', path: '/industries/green-tech', tags: ['Smart Grid', 'Predictive Maintenance', 'HSE', 'IoT'], color: 'text-lime-400', accent: '#A3E635' },
  { icon: Home, name: 'Real Estate', desc: 'Automated disclosure compliance and auditable transaction data.', longDesc: 'Disclosure automation, unified property data, and portfolio reporting for real estate and PropTech platforms.', path: '/industries/real-estate', tags: ['PropTech', 'Disclosure Automation', 'Portfolio Reporting', 'Fraud Detection'], color: 'text-cyan-400', accent: '#22D3EE' },
  { icon: Bot, name: 'AI Automation', desc: 'Agentic workflow automation that connects scattered tools into one operational system.', longDesc: 'Most businesses are not short on effort, they are short on connected systems. We build agentic automation, operational dashboards, and connected data pipelines with full audit logging on every automated action.', path: '/industries/ai-automation', tags: ['Agentic Automation', 'Connected Systems', 'Operational Visibility', 'Audit Logging'], color: 'text-violet-400', accent: '#A78BFA' },
];

const primaryIndustries = industries.filter(i => i.name === 'Government' || i.name === 'Healthcare');
const secondaryIndustries = industries.filter(i => i.name !== 'Government' && i.name !== 'Healthcare');

const approachSteps: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  { icon: Search, title: 'Map Regulatory Requirements', desc: 'We start with your compliance framework (HIPAA, FOIA, PCI DSS, or sector-specific mandates) before any architecture decision is made.' },
  { icon: ShieldCheck, title: 'Design Compliance-First Architecture', desc: 'Audit logging, access control, and encryption are built into the system design from day one, not layered on before launch.' },
  { icon: Layers, title: 'Build & Integrate', desc: 'We connect to the systems you already run (core banking, EHR, case management) without disrupting live operations.' },
  { icon: FileCheck, title: 'Deploy with Full Audit Trail', desc: 'Every automated decision ships with logging and explainability built in, ready for the review it will eventually face.' },
];

const trustPoints: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Eye, label: 'Explainable AI' },
  { icon: Lock, label: 'Zero-Trust Security' },
  { icon: CheckCircle, label: '100% Audit Coverage' },
];

function StepCard({ step, index }: { step: { icon: LucideIcon; title: string; desc: string }; index: number }) {
  const Icon = step.icon;
  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * 0.12, duration: 0.6, ease }}>
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0D0D0D] border border-[#6EE7B7]/20 flex items-center justify-center mb-5 shadow-lg shadow-black/30">
          <Icon className="w-7 h-7 text-[#6EE7B7]" />
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6EE7B7] text-[#090909] text-[11px] font-bold flex items-center justify-center">{index + 1}</span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
        <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

function PrimaryIndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon;
  const reverse = index % 2 === 1;
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div className={reverse ? 'lg:order-2' : ''} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ backgroundColor: industry.accent + '15', color: industry.accent, border: `1px solid ${industry.accent}30` }}>
          <Sparkles className="w-3 h-3" /> Primary Focus
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: industry.accent + '15' }}>
          <Icon className="w-7 h-7" style={{ color: industry.accent }} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{industry.name}</h3>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">{industry.longDesc}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {industry.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white/60 font-medium">{tag}</span>
          ))}
        </div>
        <Link href={industry.path} className="inline-flex items-center gap-2 font-semibold text-base group hover:gap-3 transition-all duration-500" style={{ color: industry.accent }}>
          Explore {industry.name} Solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
        </Link>
      </motion.div>

      <motion.div className={`relative ${reverse ? 'lg:order-1' : ''}`} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }}>
        <div className="absolute -inset-6 rounded-[2rem] blur-[70px] opacity-30" style={{ background: `linear-gradient(135deg, ${industry.accent}40, transparent)` }} />
        <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" /></div>
            <span className="text-white/30 text-sm ml-3 font-mono">{industry.name.toLowerCase().replace(/\s+/g, '_')}.console</span>
          </div>
          <div className="p-6 sm:p-7 space-y-3">
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-[#090909] border border-white/[0.05]" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i < 3 ? industry.accent : 'rgba(255,255,255,0.2)' }} />
                  <div className="h-2.5 rounded bg-white/[0.08]" style={{ width: `${90 - i * 12}px` }} />
                </div>
                {i < 3 ? <CheckCircle className="w-4 h-4" style={{ color: industry.accent }} /> : <span className="text-[10px] text-white/30 uppercase tracking-wider">Pending</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function IndustriesClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-7xl relative z-10 text-center px-4 sm:px-6">
          <motion.div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-base text-[#6EE7B7] mb-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sparkles className="w-4 h-4" /><span className="font-medium">Built for Regulated Industries</span>
          </motion.div>
          <motion.h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4, ease }}>
            Industries We{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Serve</span>
          </motion.h1>
          <motion.p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-[1.8] mb-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6, ease }}>
            We focus on sectors where compliance, audit, and security aren&apos;t optional. Government and healthcare above all, with fintech, green tech, real estate, and AI automation as our secondary focus.
          </motion.p>
          <motion.div className="flex flex-wrap items-center justify-center gap-3 mb-10" initial={{ opacity: 0, y: 15 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.75 }}>
            {trustPoints.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-white/60"><Icon className="w-3.5 h-3.5 text-[#6EE7B7]" />{label}</span>
            ))}
          </motion.div>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.9, ease }}>
            <Link href="/contact" className="btn-primary group">
              Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-12 border-y border-white/[0.04] bg-[#060606]">
        <div className="container max-w-7xl px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 6, suffix: '', label: 'Focus Industries' },
            { target: 6, suffix: '+', label: 'Years in Operation' },
            { target: 100, suffix: '%', label: 'Audit-Trail Coverage' },
            { target: 98, suffix: '%', label: 'Client Satisfaction' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
              <div className="text-white/60 text-base">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ OUR APPROACH ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white">How We Approach Every Industry</h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">The same compliance-first process, whichever sector you operate in.</p>
          </motion.div>
          <div className="relative">
            <motion.div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#6EE7B7]/50 via-[#3B82F6]/50 to-[#6EE7B7]/50 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 relative">
              {approachSteps.map((step, i) => <StepCard key={step.title} step={step} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRIMARY FOCUS ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-7xl px-4 sm:px-6 space-y-24 sm:space-y-32">
          {primaryIndustries.map((industry, i) => <PrimaryIndustryCard key={industry.name} industry={industry} index={i} />)}
        </div>
      </section>

      {/* ═══ SECONDARY FOCUS ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/60">Secondary Focus</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Also Built for These Sectors</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryIndustries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1, duration: 0.6, ease }}>
                  <Link href={ind.path} className="group relative bg-white/[0.02] p-7 sm:p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full block hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30">
                    <div className="absolute left-0 top-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-t-2xl" style={{ backgroundColor: ind.accent }} />
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-700 group-hover:scale-110" style={{ backgroundColor: ind.accent + '12' }}>
                      <Icon className={`w-7 h-7 ${ind.color}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#6EE7B7] transition-colors duration-500 tracking-tight">{ind.name}</h3>
                    <p className="text-base text-white/70 leading-relaxed mb-6 flex-grow">{ind.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {ind.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white/60 font-medium">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-base font-semibold group-hover:gap-3 transition-all duration-500 mt-auto" style={{ color: ind.accent }}>
                      Explore Solutions <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="container max-w-7xl px-4 sm:px-6 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
              Not Seeing Your{' '}
              <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Industry?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-[1.8]">If your organization operates under regulatory or compliance requirements, we can likely help. Tell us about your use case.</p>
            <Link href="/contact" className="btn-primary group text-lg">
              Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
