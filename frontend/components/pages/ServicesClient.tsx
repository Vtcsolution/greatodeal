'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Code2, Bot, Globe, Database, Sparkles, Workflow, Smartphone, Cloud, Layers,
  ArrowRight, ArrowUpRight, CheckCircle, Target, Shield, Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface Service {
  icon: LucideIcon; name: string; desc: string; longDesc: string; tags: string[]; accent: string;
}

const FLAGSHIP_NAMES = ['Custom Software Development', 'AI Agents & Agentic Automation', 'AI-Automation SaaS Platforms'];

const services: Service[] = [
  { icon: Globe, name: 'Website Development', desc: 'Fast, conversion-focused websites and web platforms built to represent your business and generate leads.', tags: ['Custom Design & Build', 'SEO-Optimized', 'CMS & Content Tools', 'E-Commerce & Booking'], longDesc: '', accent: '#60A5FA' },
  { icon: Code2, name: 'Custom Software Development', desc: 'Bespoke software built around how your business actually operates, not a generic template stretched to fit.', longDesc: 'Off-the-shelf tools eventually hit a wall: a workflow they were never built for, a system they cannot talk to, a scale they cannot handle. We build full-stack web and desktop applications from the ground up, architected around your exact operations and designed to grow with you instead of being replaced in two years.', tags: ['Full-Stack Web Apps', 'API-First Architecture', 'Legacy Modernization', 'Cloud-Native'], accent: '#6EE7B7' },
  { icon: Layers, name: 'AI-Automation SaaS Platforms', desc: 'Multi-tenant SaaS products built with AI automation baked into the architecture, not bolted on as a chatbot widget.', longDesc: 'Most "AI-powered" SaaS is a generic model wrapped around an existing product. We build the opposite: SaaS platforms designed around AI automation from the data model up, so the intelligence is core to how the product works and how you charge for it, not a feature toggle.', tags: ['Multi-Tenant Architecture', 'AI-Native Product Design', 'API-First', 'Usage-Based Billing'], accent: '#34D399' },
  { icon: Database, name: 'ERP Systems', desc: 'Enterprise resource planning systems that unify inventory, finance, HR, and operations into one system of record.', tags: ['Custom ERP Builds', 'Workflow Automation', 'Real-Time Reporting', 'Role-Based Access'], longDesc: '', accent: '#FB923C' },
  { icon: Sparkles, name: 'AI Tools & Copilots', desc: 'Purpose-built AI tools and copilots embedded directly into the workflows your team already uses.', tags: ['LLM-Powered Tools', 'Internal Knowledge Copilots', 'Document Extraction', 'Predictive Analytics'], longDesc: '', accent: '#FB7185' },
  { icon: Bot, name: 'AI Agents & Agentic Automation', desc: 'Autonomous agents that execute multi-step operational workflows, not chatbots wrapped around a generic model.', longDesc: 'This is where "automate your business" actually happens. We build agents that carry out real, multi-step operational work inside the guardrails your business requires, with human-in-the-loop review where it matters and a full audit trail on every action, so you can trust what the agent did and why.', tags: ['Multi-Step Automation', 'Human-in-the-Loop', 'Explainable Decisions', 'System Integration'], accent: '#A78BFA' },
  { icon: Workflow, name: 'Business Process Automation', desc: 'Automate the repetitive manual work slowing your team down, from data entry to multi-step approvals.', tags: ['Approval Automation', 'Data Processing', 'Cross-System Sync', 'Alerts & Notifications'], longDesc: '', accent: '#A3E635' },
  { icon: Smartphone, name: 'Mobile App Development', desc: 'Native and cross-platform mobile apps for iOS and Android, built for real-world daily use.', tags: ['iOS & Android Native', 'React Native', 'App Store Deployment', 'Push & Offline Sync'], longDesc: '', accent: '#22D3EE' },
  { icon: Cloud, name: 'Cloud, DevOps & API Integration', desc: 'Secure API development and cloud infrastructure that connects the systems your business already depends on.', tags: ['AWS / Azure / GCP', 'CI/CD Pipelines', 'Third-Party API Integration', 'Monitoring & Incident Response'], longDesc: '', accent: '#F472B6' },
];

const primaryServices = services.filter(s => FLAGSHIP_NAMES.includes(s.name));
const secondaryServices = services.filter(s => !FLAGSHIP_NAMES.includes(s.name));

const processSteps: Array<{ number: string; icon: LucideIcon; title: string; desc: string }> = [
  { number: '01', icon: Target, title: 'Discovery & Compliance Mapping', desc: 'We map your regulatory requirements and operational workflow before writing a line of code, so compliance is a design input, not a retrofit.' },
  { number: '02', icon: Shield, title: 'Compliance-First Architecture', desc: 'Audit logging, access control, and encryption are built into the system architecture from the outset, not layered on before launch.' },
  { number: '03', icon: Award, title: 'Agile Build & Continuous Review', desc: 'Development runs in agile sprints with security and compliance review gates at every milestone, not just at the end.' },
  { number: '04', icon: CheckCircle, title: 'Audit-Ready Launch & Support', desc: 'We deliver with documentation and audit trails ready for regulatory review, plus ongoing monitoring and support post-launch.' },
];

const techCategories = [
  { label: 'Languages', items: ['Java', 'Python', '.NET', 'JavaScript', 'PHP', 'Ruby'] },
  { label: 'Mobile & Native', items: ['Swift', 'Kotlin', 'Golang', 'Node.js', 'CSS', 'HTML5'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'] },
  { label: 'AI & Data', items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'MongoDB', 'PostgreSQL'] },
];

function PrimaryServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const reverse = index % 2 === 1;
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div className={reverse ? 'lg:order-2' : ''} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease }}>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5" style={{ backgroundColor: service.accent + '15', color: service.accent, border: `1px solid ${service.accent}30` }}>
          <Sparkles className="w-3 h-3" /> Flagship Service
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: service.accent + '15' }}>
          <Icon className="w-7 h-7" style={{ color: service.accent }} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{service.name}</h3>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6">{service.longDesc}</p>
        <div className="flex flex-wrap gap-2 mb-8">
          {service.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white/60 font-medium">{tag}</span>
          ))}
        </div>
        <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-base group hover:gap-3 transition-all duration-500" style={{ color: service.accent }}>
          Discuss This Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
        </Link>
      </motion.div>

      <motion.div className={`relative ${reverse ? 'lg:order-1' : ''}`} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease }}>
        <div className="absolute -inset-6 rounded-[2rem] blur-[70px] opacity-30" style={{ background: `linear-gradient(135deg, ${service.accent}40, transparent)` }} />
        <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" /></div>
            <span className="text-white/30 text-sm ml-3 font-mono">{service.name.toLowerCase().replace(/[^a-z]+/g, '_')}.console</span>
          </div>
          <div className="p-6 sm:p-7 space-y-3">
            {[0, 1, 2, 3].map(i => (
              <motion.div key={i} className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-[#090909] border border-white/[0.05]" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i < 3 ? service.accent : 'rgba(255,255,255,0.2)' }} />
                  <div className="h-2.5 rounded bg-white/[0.08]" style={{ width: `${90 - i * 12}px` }} />
                </div>
                {i < 3 ? <CheckCircle className="w-4 h-4" style={{ color: service.accent }} /> : <span className="text-[10px] text-white/30 uppercase tracking-wider">Pending</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesClient() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10 text-center px-4 sm:px-6">
          <motion.div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-base text-[#6EE7B7] mb-8" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sparkles className="w-4 h-4" /><span className="font-medium">What We Do</span>
          </motion.div>
          <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-bold mb-6 leading-[1.1] tracking-tight">
            <SplitText text="From Startup to" delay={0.4} />
            <br />
            <SplitText text="Fully Automated" delay={0.65} className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent" />
          </h1>
          <motion.p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-[1.8] mb-10" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.9, ease }}>
            Websites, software, AI-automation SaaS, ERP, AI tools, AI agents, and agentic AI, everything you need to build, run, and automate your business, delivered by one team.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center" initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 1.1, ease }}>
            <Link href="/contact" className="btn-primary group">
              Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-12 border-y border-white/[0.04] bg-[#060606]">
        <div className="container max-w-[1920px] px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 9, suffix: '', label: 'Core Services' },
            { target: 5, suffix: '', label: 'Regulated Industries Served' },
            { target: 100, suffix: '%', label: 'Audit-Trail Coverage' },
            { target: 60, suffix: '%+', label: 'Operational Cost Saved' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
              <div className="text-white/60 text-base">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FLAGSHIP SERVICES ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-b border-white/[0.04]">
        <div className="container max-w-[1920px] px-4 sm:px-6 space-y-24 sm:space-y-32">
          {primaryServices.map((service, i) => <PrimaryServiceCard key={service.name} service={service} index={i} />)}
        </div>
      </section>

      {/* ═══ ALL SERVICES ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5 bg-white/[0.04] border border-white/[0.08] text-white/60">The Full Stack</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Every Piece, End to End</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (i % 6) * 0.08, duration: 0.6, ease }}>
                  <Link href="/contact" className="group relative bg-white/[0.02] p-7 sm:p-8 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full block hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30">
                    <div className="absolute left-0 top-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-t-2xl" style={{ backgroundColor: s.accent }} />
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-700 group-hover:scale-110" style={{ backgroundColor: s.accent + '12' }}>
                      <Icon className="w-7 h-7" style={{ color: s.accent }} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#6EE7B7] transition-colors duration-500 tracking-tight">{s.name}</h3>
                    <p className="text-base text-white/70 leading-relaxed mb-6 flex-grow">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white/60 font-medium">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-base font-semibold group-hover:gap-3 transition-all duration-500 mt-auto" style={{ color: s.accent }}>
                      Get Started <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white">How We Work</h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">The same process, whichever service you start with.</p>
          </motion.div>
          <div className="relative">
            <motion.div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#6EE7B7]/50 via-[#3B82F6]/50 to-[#6EE7B7]/50 origin-left" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease }} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 relative">
              {processSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.title} className="relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.12, duration: 0.6, ease }}>
                    <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#0D0D0D] border border-[#6EE7B7]/20 flex items-center justify-center mb-5 shadow-lg shadow-black/30">
                        <Icon className="w-7 h-7 text-[#6EE7B7]" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6EE7B7] text-[#090909] text-[11px] font-bold flex items-center justify-center">{step.number}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white">Built With Technology That Scales</h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed">No lock-in to a single stack, we use what fits the problem.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techCategories.map((cat, i) => (
              <motion.div key={cat.label} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                <h4 className="text-sm font-bold text-[#6EE7B7] uppercase tracking-wider mb-4">{cat.label}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white/70 font-medium">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="container max-w-[1920px] px-4 sm:px-6 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
              Not Sure Where to{' '}
              <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Start?</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-[1.8]">Tell us what's slowing your business down. We'll tell you honestly which service actually solves it.</p>
            <Link href="/contact" className="btn-primary group text-lg">
              Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
