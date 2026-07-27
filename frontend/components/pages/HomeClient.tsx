'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Database, CheckCircle, ArrowRight,
  Zap, Cpu, Shield, Users, Rocket, Lightbulb, Clock, Globe,
  TrendingUp, Layers, Play, Landmark, Activity, Banknote, Leaf, Home,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1] as const;
const mockupLabels = ['workflow.agent', 'access_log.audit', 'dashboard.gov', 'pipeline.sync'];

/* ═══ DATA ═══ */

const whatWeBuild = [
  { icon: Cpu, title: 'Agentic AI Platforms', accent: '#6EE7B7', description: 'Autonomous agents that execute multi-step operational workflows inside the guardrails your industry requires, not generic chatbots.', features: ['Multi-step task automation with human-in-the-loop review', 'Explainable, evidence-backed AI decisions', 'Integration with existing case-management & records systems', 'Continuous monitoring and rollback controls'] },
  { icon: Shield, title: 'Compliance-Grade Infrastructure', accent: '#60A5FA', description: 'Security, audit logging, and access control built into the architecture from the start, engineered to satisfy regulatory review, not just pass a demo.', features: ['Immutable audit trails on every automated action', 'Zero-trust access control & encryption at rest and in transit', 'Compliance reporting mapped to your regulatory framework', 'HIPAA / PCI DSS / FOIA-aligned data handling'] },
  { icon: Database, title: 'Industry-Specific SaaS', accent: '#A78BFA', description: 'Purpose-built platforms for government, healthcare, fintech, green tech, and real estate operations, not a generic template stretched to fit.', features: ['Multi-tenant, API-first architecture', 'Interoperability with legacy systems (HL7/FHIR, SCADA, core banking)', 'Role-based access for regulated user hierarchies', 'Built for audit, not just uptime'] },
  { icon: Layers, title: 'Secure Integration & Data Pipelines', accent: '#FB923C', description: 'API and data infrastructure that keeps sensitive records compliant end-to-end, connecting the systems your institution already depends on.', features: ['Secure API development & third-party integration', 'Consent-aware data sharing between systems', 'Cloud-native, scalable infrastructure on AWS, Azure, GCP', 'CI/CD with security review gates'] },
];

const industries: Array<{ name: string; icon: LucideIcon; color: string; desc: string; path: string }> = [
  { name: 'Government', icon: Landmark, color: 'text-emerald-300', desc: 'Citizen services automation with audit-ready, explainable AI decisions.', path: '/industries/government' },
  { name: 'Healthcare', icon: Activity, color: 'text-rose-400', desc: 'HIPAA-compliant clinical and operational AI for providers and payers.', path: '/industries/healthcare' },
  { name: 'Fintech', icon: Banknote, color: 'text-blue-400', desc: 'KYC/AML automation and auditable transaction infrastructure.', path: '/industries/fintech' },
  { name: 'Green Tech', icon: Leaf, color: 'text-lime-400', desc: 'Smart grid monitoring and automated emissions compliance reporting.', path: '/industries/green-tech' },
  { name: 'Real Estate', icon: Home, color: 'text-cyan-400', desc: 'Automated disclosure compliance and auditable transaction data.', path: '/industries/real-estate' },
];

const whyUs: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Shield, title: 'Compliance by Design', description: 'Audit trails, access control, and regulatory alignment are built into the architecture from day one, not retrofitted after a review flags them.' },
  { icon: Lightbulb, title: 'Client-First Approach', description: 'We place client satisfaction at the heart of everything we do, ensuring transparent communication, timely delivery, and measurable results.' },
  { icon: Zap, title: 'Agentic, Not Generic', description: 'We build autonomous agents that execute real operational workflows within your guardrails, not chatbots wrapped around a generic model.' },
  { icon: Users, title: 'Trusted Partnerships', description: 'We build long-term partnerships, offering ongoing support and maintenance so your systems remain secure, reliable, and up to date.' },
  { icon: Clock, title: 'Security & Reliability', description: 'We follow strict development standards and best practices to ensure your data is always safe and your systems are always reliable.' },
  { icon: Rocket, title: 'Proven Track Record', description: 'With a high client retention rate and successful projects across regulated industries, we deliver results institutions can stand behind.' },
];

const techCategories = [
  { label: 'Languages', items: ['Java', 'Python', '.NET', 'JavaScript', 'PHP', 'Ruby'] },
  { label: 'Mobile & Native', items: ['Swift', 'Kotlin', 'Golang', 'Node.js', 'CSS', 'HTML5'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'] },
  { label: 'AI & Data', items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'MongoDB', 'PostgreSQL'] },
];

/* ═══ HELPERS ═══ */

function RevealText({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}>{children}</motion.div>;
}

function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (<span className={className}>{text.split(' ').map((word, i) => (<span key={i} className="inline-block overflow-hidden"><motion.span className="inline-block" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}>{word}&nbsp;</motion.span></span>))}</span>);
}

function FeatureVisual({ index, accent }: { index: number; accent: string }) {
  if (index === 0) {
    const steps = ['Case intake received', 'Compliance check (automated)', 'Agent recommendation drafted', 'Human review & approval'];
    return (
      <div className="p-6 sm:p-7 space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accent + '20', color: accent }}>
              {i < 2 ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full" style={{ background: accent }} />}
            </div>
            <span className={`text-sm ${i < 2 ? 'text-white/70' : 'text-white/40'}`}>{step}</span>
          </div>
        ))}
      </div>
    );
  }
  if (index === 1) {
    const rows = [{ u: 'agent.svc', a: 'Read case #4471' }, { u: 'reviewer.k', a: 'Approved decision' }, { u: 'system', a: 'Audit entry written' }];
    return (
      <div className="p-6 sm:p-7 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/40 uppercase tracking-wider">Access Log</span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ backgroundColor: accent + '15', color: accent }}>Zero-Trust</span>
        </div>
        {rows.map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-[#090909] border border-white/[0.05]">
            <span className="text-xs text-white/60 font-mono">{row.u}</span>
            <span className="text-xs text-white/40 flex-1 text-right">{row.a}</span>
            <CheckCircle className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} />
          </div>
        ))}
      </div>
    );
  }
  if (index === 2) {
    const bars = [40, 65, 45, 80, 55, 90, 70];
    return (
      <div className="p-6 sm:p-7">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-4 rounded-xl bg-[#090909] border border-white/[0.06]">
            <div className="text-2xl font-bold text-white">1,204</div>
            <div className="text-xs text-white/40 mt-1">Cases Processed</div>
          </div>
          <div className="p-4 rounded-xl bg-[#090909] border border-white/[0.06]">
            <div className="text-2xl font-bold" style={{ color: accent }}>100%</div>
            <div className="text-xs text-white/40 mt-1">Audit Coverage</div>
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-16">
          {bars.map((h, i) => (<div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: accent + '40' }} />))}
        </div>
      </div>
    );
  }
  const satellites: Array<{ Icon: LucideIcon; pos: string }> = [
    { Icon: Landmark, pos: 'top-0 left-6' },
    { Icon: Activity, pos: 'top-0 right-6' },
    { Icon: Banknote, pos: 'bottom-0 left-1/2 -translate-x-1/2' },
  ];
  return (
    <div className="p-8">
      <div className="relative h-40 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center z-10" style={{ backgroundColor: accent + '15', border: `1px solid ${accent}40` }}>
          <Layers className="w-7 h-7" style={{ color: accent }} />
        </div>
        {satellites.map(({ Icon, pos }, i) => (
          <div key={i} className={`absolute ${pos} w-11 h-11 rounded-xl bg-[#090909] border border-white/[0.08] flex items-center justify-center`}><Icon className="w-5 h-5 text-white/50" /></div>
        ))}
      </div>
    </div>
  );
}

/* ═══ HOME ═══ */

export default function HomeClient() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) { videoRef.current.pause(); setIsVideoPlaying(false); }
      else { videoRef.current.play(); setIsVideoPlaying(true); }
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white/90 overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {isDesktop && (
            <video autoPlay loop muted playsInline preload="none" aria-hidden="true" className="w-full h-full object-cover opacity-[0.15]">
              <source src="/images/video_home.webm" type="video/webm" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]" />
        </div>

        <motion.div className="container max-w-7xl relative z-10 pt-28 pb-20 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-5">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-white">
                  <SplitText text="AI Systems &" delay={0.4} />
                  <br />
                  <SplitText
                    text="Agentic Automation for Regulated Industries"
                    delay={0.7}
                    className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent"
                  />
                </h1>
                <motion.p className="text-base sm:text-lg text-white/80 max-w-lg leading-[1.8]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                  We build AI SaaS and agentic automation for government, healthcare, and other regulated industries, with compliance, security, and auditability engineered in from day one, not bolted on after a breach. As an AI automation company in Lahore, we hold every system we ship to that same standard, whether the client is down the street or on the other side of the world.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1, ease }}>
                <Link href="/contact" className="btn-primary group">
                  Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
              </motion.div>
            </div>

            {/* Code editor */}
            <motion.div className="relative hidden lg:block" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
              <div className="absolute -inset-8 bg-gradient-to-r from-[#6EE7B7]/10 to-[#3B82F6]/10 rounded-[2rem] blur-[80px] opacity-50" />
              <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" /></div>
                  <span className="text-white/30 text-sm ml-3 font-mono">greatodeal_agent.ts</span>
                </div>
                <div className="p-7 font-mono text-sm leading-[2] space-y-0.5">
                  <motion.div className="text-white/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{'// Compliance-grade AI, audited by default'}</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><span className="text-[#C084FC]">const</span> <span className="text-[#7DD3FC]">agent</span> = <span className="text-[#C084FC]">function</span> <span className="text-[#FCD34D]">{'() {'}</span></motion.div>
                  <motion.div className="pl-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}><span className="text-white/80">return</span> <span className="text-[#F97316]">&quot;Audited. Explainable. Secure.&quot;</span><span className="text-white/40">;</span></motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span className="text-[#FCD34D]">{'}'}</span></motion.div>
                </div>
              </div>

              <motion.div className="absolute -left-10 top-[28%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, y: [0, -8, 0] }} transition={{ opacity: { delay: 1.5, duration: 0.6 }, y: { delay: 2, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-[#6EE7B7]" /></div><div><div className="text-sm font-bold text-white">99.9% Uptime</div><div className="text-xs text-white/40">SLA Guaranteed</div></div></div>
              </motion.div>
              <motion.div className="absolute -right-8 bottom-[30%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, y: [0, 8, 0] }} transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2.5, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center"><Globe className="w-4 h-4 text-[#3B82F6]" /></div><div><div className="text-sm font-bold text-white">15+ Countries</div><div className="text-xs text-white/40">Global Reach</div></div></div>
              </motion.div>
              <motion.div className="absolute -right-6 -top-8 px-4 py-2.5 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md max-w-[220px]" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.6 }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center shrink-0"><Cpu className="w-4 h-4 text-[#6EE7B7]" /></div>
                  <span className="text-xs text-white/70 leading-tight">Verify KYC, Case #4471</span>
                </div>
              </motion.div>
              <motion.div className="absolute -left-6 -bottom-6 px-4 py-2.5 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3, duration: 0.6 }}>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#6EE7B7]" />
                  <span className="text-xs font-semibold text-white">Audit trail logged</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ WHAT WE BUILD ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white mb-4">What We Build</h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">Product capabilities, not a service-line menu, built for institutions that answer to regulators and auditors.</p>
          </RevealText>

          <div className="space-y-20 sm:space-y-28">
            {whatWeBuild.map((item, i) => {
              const Icon = item.icon;
              const reverse = i % 2 === 1;
              return (
                <div key={i} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <RevealText className={reverse ? 'lg:order-2' : ''}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: item.accent + '15' }}>
                      <Icon className="w-6 h-6" style={{ color: item.accent }} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6">{item.description}</p>
                    <div className="space-y-3 mb-8">
                      {item.features.map((f, fi) => (
                        <div key={fi} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: item.accent }} />
                          <span className="text-sm sm:text-base text-white/70">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-base group hover:gap-3 transition-all duration-500" style={{ color: item.accent }}>
                      Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                    </Link>
                  </RevealText>
                  <motion.div className={`relative ${reverse ? 'lg:order-1' : ''}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
                    <div className="absolute -inset-6 rounded-[2rem] blur-[70px] opacity-40" style={{ background: `linear-gradient(135deg, ${item.accent}30, transparent)` }} />
                    <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
                      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" /></div>
                        <span className="text-white/30 text-sm ml-3 font-mono">{mockupLabels[i]}</span>
                      </div>
                      <FeatureVisual index={i} accent={item.accent} />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight text-white">Industries We Serve</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">We focus on <Link href="/industries" className="text-[#6EE7B7] hover:underline">five industries</Link> where compliance, audit, and security aren&apos;t optional.</p>
          </RevealText>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {industries.map((ind, i) => {
              const IIcon = ind.icon;
              return (
                <Link key={i} href={ind.path} className="group bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/[0.05] hover:border-[#6EE7B7]/20 transition-all duration-500 block">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] flex items-center justify-center mb-4 group-hover:bg-[#6EE7B7]/[0.06] transition-all duration-500"><IIcon className={`w-6 h-6 ${ind.color}`} /></div>
                  <div className="text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-500 mb-1.5">{ind.name}</div>
                  <p className="text-sm text-white/60 leading-relaxed mb-3">{ind.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#6EE7B7] group-hover:gap-2.5 transition-all duration-500">Learn more <ArrowRight className="w-4 h-4" /></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6EE7B7]/[0.03] blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-[#3B82F6]/[0.03] blur-[100px]" />
        </div>
        <div className="container max-w-7xl px-4 sm:px-6 relative z-10">
          <RevealText className="mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Why Choose Us</h2>
          </RevealText>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
            {/* Video Section */}
            <motion.div className="relative group" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
              <div className="bg-white/[0.02] p-2 sm:p-3 rounded-2xl border border-white/[0.06] hover:border-[#6EE7B7]/20 transition-all duration-700 overflow-hidden relative">
                <div className="aspect-video rounded-xl overflow-hidden relative bg-black">
                  {isDesktop ? (
                    <video ref={videoRef} className="w-full h-full object-cover" loop muted playsInline autoPlay preload="none" aria-hidden="true">
                      <source src="/images/video_home.webm" type="video/webm" />
                    </video>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6EE7B7]/10 to-[#3B82F6]/10" />
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 cursor-pointer ${isVideoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`} onClick={handlePlayVideo}>
                    <div className="w-16 h-16 bg-[#6EE7B7] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(110,231,183,0.3)] hover:scale-110 transition-transform duration-500">
                      <Play className="w-7 h-7 text-[#090909] ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <RevealText delay={0.2}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight text-white">AI Infrastructure for Institutions That Can&apos;t Afford to Get It Wrong</h3>
              <p className="text-white/80 leading-[1.8] text-base sm:text-lg mb-6">
                <span className="text-xl sm:text-2xl font-semibold text-[#6EE7B7]">Greatodeal</span> builds AI SaaS and agentic automation for government, healthcare, and other regulated sectors, where a broken audit trail or an unexplainable AI decision is a compliance failure, not just a bug. We combine technical depth with a compliance-first engineering process, so every system we ship is ready for the scrutiny it will face.
              </p>
              <p className="text-white/80 leading-[1.8] text-base sm:text-lg mb-6">
                Based in Lahore, Pakistan, we&apos;ve grown from a <Link href="/about" className="text-[#6EE7B7] hover:underline">local engineering team</Link> into an AI automation agency in Pakistan trusted by institutions that answer to regulators, not just customers. The location hasn&apos;t changed the bar: every system still has to survive the audit it will eventually face.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {['Agentic Automation', 'Compliance-Grade Infrastructure', 'Audit-Ready AI', 'Secure Integrations', 'Cloud & DevOps'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white/80 hover:text-[#6EE7B7] hover:border-[#6EE7B7]/20 transition-all duration-500 cursor-default">{tag}</span>
                ))}
              </div>
            </RevealText>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {whyUs.map((item, i) => {
              const WIcon = item.icon;
              return (
                <motion.div key={i} className="group bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.05] hover:border-[#6EE7B7]/15 transition-all duration-700" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease }} whileHover={{ y: -4, transition: { duration: 0.4 } }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mb-5 group-hover:shadow-[0_0_20px_rgba(110,231,183,0.08)] transition-all duration-700"><WIcon className="w-6 h-6 text-[#6EE7B7]" /></div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight text-white">Our Technology Stack</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg">We work with a wide range of technologies to deliver the best solutions for your business needs.</p>
          </RevealText>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {techCategories.map((cat, ci) => (
              <motion.div key={ci} className="bg-white/[0.02] rounded-2xl border border-white/[0.05] p-5 sm:p-6" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.1, duration: 0.5, ease }}>
                <h3 className="text-xs sm:text-sm font-bold text-[#6EE7B7] uppercase tracking-[0.15em] mb-5">{cat.label}</h3>
                <div className="flex flex-wrap gap-2.5">{cat.items.map((item, ii) => (<motion.span key={ii} className="px-3.5 py-2 bg-[#090909] border border-white/[0.06] rounded-lg text-sm text-white/80 font-medium hover:border-[#6EE7B7]/20 hover:text-[#6EE7B7] transition-all duration-500 cursor-default" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: ci * 0.1 + ii * 0.04 }}>{item}</motion.span>))}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" /><div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" /></div>
        <div className="container max-w-7xl px-4 sm:px-6 relative z-10">
          <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight text-white">Partner with Greatodeal for Your Next Project</h2>
            <p className="text-base sm:text-lg text-white/80 mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">We specialize in <strong className="text-white/80">agentic AI, compliance-grade infrastructure, and secure cloud systems</strong>. Whether you&apos;re modernizing legacy systems or launching a new platform, our team builds for the audit you&apos;ll face, not just the demo. Read more on <Link href="/blog" className="text-[#6EE7B7] hover:underline">our blog</Link>.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" /></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
