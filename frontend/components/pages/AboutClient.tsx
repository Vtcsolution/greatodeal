'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Clock, DollarSign, Star, Shield, Zap, Settings, Award, CheckCircle, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll, AnimatedCounter } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { icon: Shield, target: 100, suffix: '%', label: 'audit-trail coverage' },
  { icon: Building2, target: 5, suffix: '', label: 'regulated industries served' },
  { icon: Star, target: 100, suffix: '%', label: 'client satisfaction rate' },
  { icon: DollarSign, target: 60, suffix: '%+', label: 'cost saved' },
];

const principles = [
  { title: 'Thorough requirements gathering', desc: 'We work closely with you to understand your needs, even if you don\'t have a detailed specification. We ask the right questions to uncover your objectives and ensure a shared understanding of the project.' },
  { title: 'Accurate cost estimation', desc: 'We provide realistic cost estimates based on a thorough analysis of your project requirements and potential risks. We aim to explore cost-optimization opportunities to maximize your budget.' },
  { title: 'Flexible project scoping', desc: 'We adapt to evolving needs and changing requirements while maintaining control over the project scope. We ensure the final product aligns with your current goals, even if they have shifted during development.' },
];

const servicesList = [
  'Agentic AI Platforms', 'Compliance-Grade Infrastructure', 'Industry-Specific SaaS',
  'Explainable AI Decision Support', 'Secure API & Data Integration', 'Zero-Trust Security Architecture',
  'Audit & Compliance Reporting Automation', 'Cloud & DevOps Engineering', 'Legacy System Modernization',
];

const processSteps = [
  { number: '01', icon: Target, title: 'Discovery & Compliance Mapping', desc: 'We map your regulatory requirements and operational workflow before writing a line of code, so compliance is a design input, not a retrofit.' },
  { number: '02', icon: Shield, title: 'Compliance-First Architecture', desc: 'Audit logging, access control, and encryption are built into the system architecture from the outset, not layered on before launch.' },
  { number: '03', icon: Award, title: 'Agile Build & Continuous Review', desc: 'Development runs in agile sprints with security and compliance review gates at every milestone, not just at the end.' },
  { number: '04', icon: CheckCircle, title: 'Audit-Ready Launch & Support', desc: 'We deliver with documentation and audit trails ready for regulatory review, plus ongoing monitoring and support post-launch.' },
];

const pricingModels: Array<{ title: string; icon: LucideIcon; desc: string; perfect: string }> = [
  { title: 'Time and materials', icon: Clock, desc: 'Ideal for projects with evolving requirements or when the scope is not fully defined upfront. This model provides flexibility to adapt to changes and ensures you only pay for the actual work done.', perfect: 'Agile software development, ongoing support and maintenance, projects with a high degree of uncertainty.' },
  { title: 'Capped time and materials', icon: Shield, desc: 'Similar to time and materials, but with a predefined maximum cost to provide budget predictability. This offers a balance between flexibility and cost control.', perfect: 'Projects with some flexibility in scope but where a budget ceiling is essential.' },
  { title: 'Fixed price', icon: DollarSign, desc: 'Best suited for well-defined projects with a clear scope and fixed requirements. This model provides cost certainty and predictability upfront.', perfect: 'Short-term projects, projects with well-documented requirements, and situations where budget certainty is critical.' },
  { title: 'Subscription-based', icon: Zap, desc: 'Ideal for ongoing services and support, providing predictable monthly costs and consistent service delivery.', perfect: 'IT support and maintenance, managed services (e.g., cloud management, security monitoring), and long-term partnerships.' },
  { title: 'Per-ticket', icon: Settings, desc: 'Suitable for support services where costs are based on the number of support tickets or requests resolved. This model provides flexibility for varying support needs.', perfect: 'Help desk support, incident management, and ad-hoc support requests.' },
  { title: 'Mixed model', icon: Award, desc: 'For complex projects that involve a combination of services or have different phases with varying requirements. This model offers the flexibility to tailor the pricing structure to each phase.', perfect: 'Large-scale digital transformation projects, projects with both fixed-scope & evolving requirements.' },
];

const techCategories = [
  { label: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'C#'] },
  { label: 'Web & Mobile', items: ['React.js', 'Next.js', 'Vue.js', 'Angular', 'React Native', 'Flutter'] },
  { label: 'AI & Automation', items: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI API', 'RPA'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch'] },
  { label: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'] },
  { label: 'Enterprise & SaaS', items: ['Stripe', 'Salesforce', 'Shopify', 'HubSpot', 'Twilio'] },
];

export default function AboutClient() {
  const [activeTech, setActiveTech] = useState(0);

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-200 overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0B1120]" />
        <div className="container max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }}>
              <span className="text-[#6EE7B7]">AI Infrastructure</span>
              <br />for Institutions That Can&apos;t Afford to Get It Wrong
            </motion.h1>
            <motion.p className="text-gray-400 max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>
              Founded in 2016, Greatodeal builds AI SaaS and agentic automation for government, healthcare, and other regulated industries. Our team of 120+ engineers designs every system around the compliance, audit, and security requirements our clients are held to, not as an afterthought but as the starting point of the architecture.
            </motion.p>
          </div>

          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease }}>
            {stats.map((s, i) => {
              const SIcon = s.icon;
              return (
                <div key={i} className="text-center p-6 rounded-xl bg-[#111827] border border-gray-700/50 hover:border-[#6EE7B7]/40 transition-all duration-500">
                  <SIcon className="w-7 h-7 text-[#6EE7B7] mx-auto mb-3" />
                  <div className="text-3xl lg:text-4xl font-bold text-[#6EE7B7] mb-1"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <RevealOnScroll direction="left">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                <span className="text-[#6EE7B7]">Our Story</span>
                <br />Driven by Innovation & Client Success
              </h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>Since <span className="text-[#6EE7B7] font-semibold">2016</span>, Greatodeal has built technology for organizations where failure isn&apos;t an inconvenience. It&apos;s a compliance incident. What began as a software team has grown into a company focused specifically on <span className="text-white">AI infrastructure for regulated industries</span>.</p>
                <p>Our approach is simple: every system starts with the question of how it will be audited, not just how it will function. Every project we deliver is built to hold up under regulatory review, not just a product demo.</p>
                <p>Today, Greatodeal partners with government agencies, healthcare providers, and financial institutions. By treating compliance as a design constraint rather than a checklist, we help our clients adopt AI without taking on risk they can&apos;t justify.</p>
              </div>
            </RevealOnScroll>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl"><Image src="/images/about1.png" alt="Greatodeal innovative solutions" width={800} height={450} className="w-full h-[400px] lg:h-[450px] object-cover" /></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ OUR MISSION ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div className="order-2 lg:order-1" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <div className="rounded-2xl overflow-hidden shadow-2xl"><Image src="/images/about2.png" alt="Greatodeal mission" width={800} height={450} className="w-full h-[400px] lg:h-[450px] object-cover" /></div>
            </motion.div>
            <RevealOnScroll direction="right" className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>We build AI infrastructure for institutions that can&apos;t afford to get it wrong. That means every system we ship is designed around <span className="text-[#6EE7B7]">auditability, explainability, and security</span> from the first architecture decision, not features added after a compliance review flags a gap.</p>
                <p>We&apos;re not a generalist vendor; we&apos;re a long-term technology partner to organizations operating under regulatory scrutiny. Our work spans agentic AI platforms, compliance-grade infrastructure, and industry-specific SaaS for government, healthcare, fintech, green tech, and real estate, built so our clients can adopt AI with confidence, not exposure.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A compliance-first process, from discovery to audit-ready launch.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div key={i} className="p-6 rounded-2xl bg-[#111827] border border-gray-700/50 hover:border-[#6EE7B7]/30 transition-all duration-500" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center"><StepIcon className="w-5 h-5 text-[#6EE7B7]" /></div>
                    <span className="text-sm font-bold text-[#6EE7B7]">{step.number}</span>
                  </div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE BUILD ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">What We Build</h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {servicesList.map((s, i) => (
              <motion.div key={s} className="px-5 py-3 rounded-lg bg-[#111827] border border-gray-700/50 hover:border-[#6EE7B7]/30 transition-all duration-500 text-sm text-gray-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}>
                {s}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Key Principles for <span className="text-[#6EE7B7]">Project Success</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We&apos;re committed to delivering successful projects that meet your goals and exceed your expectations. We achieve this through proven methodologies, best practices, and a collaborative approach.</p>
          </RevealOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div key={i} className="p-7 rounded-2xl bg-[#111827] border border-gray-700/50 hover:border-[#6EE7B7]/30 transition-all duration-500" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="w-10 h-10 rounded-lg bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center mb-5">
                  <Target className="w-5 h-5 text-[#6EE7B7]" />
                </div>
                <h3 className="font-bold text-white mb-3">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing <span className="text-[#6EE7B7]">Models</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We understand that every project is unique, and your pricing model should reflect that. We offer flexible pricing options to ensure you get the best value for your investment.</p>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pricingModels.map((m, i) => {
              const MIcon = m.icon;
              return (
                <motion.div key={i} className="p-6 rounded-2xl bg-[#111827] border border-gray-700/50 border-l-2 border-l-[#6EE7B7] hover:border-[#6EE7B7]/30 transition-all duration-500" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.5 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <MIcon className="w-5 h-5 text-[#6EE7B7]" />
                    <h3 className="font-bold text-white">{m.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{m.desc}</p>
                  <p className="text-xs text-gray-500"><span className="text-[#6EE7B7]">Perfect for:</span> {m.perfect}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technology Stack</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We leverage cutting-edge technologies and proven frameworks to build robust, scalable, and high-performance solutions.</p>
          </RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {techCategories.map((cat, i) => (
              <button key={i} onClick={() => setActiveTech(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${activeTech === i ? 'bg-[#6EE7B7] text-[#0B1120]' : 'bg-[#111827] border border-gray-700/50 text-gray-400 hover:border-[#6EE7B7]/40 hover:text-white'}`}>
                {cat.label}
              </button>
            ))}
          </div>
          <motion.div className="flex flex-wrap justify-center gap-3" key={activeTech} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {techCategories[activeTech].items.map((item, i) => (
              <motion.span key={item} className="px-5 py-2.5 bg-[#111827] border border-gray-700/50 rounded-full text-sm text-gray-300 hover:border-[#6EE7B7]/30 transition-all duration-500" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-28">
        <div className="container max-w-7xl">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Build Something<br /><span className="text-[#6EE7B7]">Amazing?</span>
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">Let&apos;s collaborate to transform your ideas into powerful software solutions that drive growth, innovation, and lasting success.</p>
            <Link href="/contact" className="btn-primary group">
              Let&apos;s Start <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
