'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scale, ShoppingCart, Banknote, Factory, GraduationCap, Activity, ArrowRight, Sparkles, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll, AnimatedCounter, SectionBadge } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

const caseStudies: Array<{ icon: LucideIcon; title: string; client: string; industry: string; services: string[]; challenge: string; solution: string; results: Array<{ metric: string; label: string }>; tech: string[]; accent: string }> = [
  { icon: Scale, title: 'AI-Powered Legal Document Analysis', client: 'LegalTech Startup, Netherlands', industry: 'Legal Technology', services: ['Machine Learning', 'Web App', 'API'], challenge: 'A Netherlands-based firm needed to review thousands of contracts daily, requiring 50+ paralegal hours/week.', solution: 'Built a custom NLP platform using Python and OpenAI that extracts clauses, identifies risks, and summarizes contracts.', results: [{ metric: '94%', label: 'Time Reduction' }, { metric: '99.2%', label: 'Clause Accuracy' }, { metric: '€200K+', label: 'Annual Savings' }, { metric: '3 mo', label: 'Dev Time' }], tech: ['Python', 'FastAPI', 'OpenAI GPT-4', 'React', 'PostgreSQL', 'AWS'], accent: '#A78BFA' },
  { icon: ShoppingCart, title: 'Multi-Vendor E-Commerce Marketplace', client: 'Retail Group, Pakistan', industry: 'E-Commerce', services: ['Web App', 'Mobile App', 'API'], challenge: 'A retail conglomerate wanted a multi-vendor marketplace with real-time inventory and mobile-first experience.', solution: 'Built a full-stack marketplace with React + Node.js backend, Flutter mobile apps, Stripe payments, and real-time tracking.', results: [{ metric: '500+', label: 'Active Vendors' }, { metric: '50K+', label: 'Monthly Orders' }, { metric: '4.8★', label: 'App Rating' }, { metric: '6 mo', label: 'Time to Market' }], tech: ['React', 'Node.js', 'Flutter', 'MongoDB', 'Redis', 'Stripe'], accent: '#34D399' },
  { icon: Banknote, title: 'Islamic Banking Digital Platform', client: 'Financial Institution, Gulf Region', industry: 'Banking & Finance', services: ['Web App', 'Mobile App', 'Custom Software'], challenge: 'A Gulf-based Islamic bank needed a fully digital Shariah-compliant platform with KYC and financing.', solution: 'Developed a secure platform with real-time transactions, biometric KYC, and Murabaha financing calculator.', results: [{ metric: '100K+', label: 'Digital Users' }, { metric: '99.9%', label: 'Uptime SLA' }, { metric: '60%', label: 'Less Branch Visits' }, { metric: 'PCI DSS', label: 'Compliance' }], tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Kubernetes'], accent: '#60A5FA' },
  { icon: Factory, title: 'Manufacturing ERP & Supply Chain', client: 'Industrial Manufacturer, Pakistan', industry: 'Manufacturing', services: ['Custom Software', 'ERP', 'API'], challenge: 'A textile manufacturer with 3 factories managing operations through spreadsheets, costing PKR 5M+ monthly.', solution: 'Built a custom ERP covering procurement, production, inventory, HR, payroll, and financial reporting.', results: [{ metric: 'PKR 5M+', label: 'Monthly Savings' }, { metric: '99.5%', label: 'Inventory Accuracy' }, { metric: '12→1', label: 'Tools Replaced' }, { metric: '1,200+', label: 'Daily Users' }], tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Chart.js'], accent: '#FB923C' },
  { icon: GraduationCap, title: 'University Learning Management System', client: 'Private University, Pakistan', industry: 'EdTech', services: ['Web App', 'Mobile App', 'Custom Software'], challenge: 'A university with 15,000 students needed online learning with live classes, assignments, and parent portals.', solution: 'Built an LMS with video lectures (WebRTC), assignments, automated grading, parent portals, and Flutter apps.', results: [{ metric: '15K+', label: 'Active Students' }, { metric: '95%', label: 'Adoption Rate' }, { metric: '40%', label: 'Admin Time Saved' }, { metric: '4.7★', label: 'Student Rating' }], tech: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Flutter', 'AWS S3'], accent: '#22D3EE' },
  { icon: Activity, title: 'Hospital Management & Telemedicine', client: 'Hospital Network, Pakistan', industry: 'Healthcare', services: ['Web App', 'Mobile App', 'Custom Software'], challenge: 'A 5-hospital network needed to unify patient records, appointments, billing, and add telemedicine.', solution: 'Built an integrated HMIS with patient records, video consultations, e-prescriptions, and insurance billing.', results: [{ metric: '200+', label: 'Daily Teleconsults' }, { metric: '5', label: 'Hospitals Unified' }, { metric: '35%', label: 'Revenue Increase' }, { metric: 'HL7', label: 'FHIR Compliant' }], tech: ['Next.js', 'Node.js', 'PostgreSQL', 'WebRTC', 'Flutter', 'Twilio'], accent: '#F472B6' },
];

export default function CaseStudiesClient() {
  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -left-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10 text-center">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <BarChart3 className="w-3.5 h-3.5" /><span className="text-[13px] font-medium">Our Portfolio</span>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
            Real Projects.{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Real Results.</span>
          </motion.h1>
          <motion.p className="text-[17px] text-[#888] max-w-2xl mx-auto leading-[1.7] mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
            Explore how we&apos;ve helped businesses across Pakistan, the Gulf, and Europe transform with custom software solutions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
            <Link href="/contact" className="btn-primary group">
              Discuss Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-10 border-y border-white/[0.04] bg-[#060606]">
        <div className="container max-w-[1920px] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ target: 200, suffix: '+', label: 'Projects Completed' }, { target: 50, suffix: '+', label: 'Industries Served' }, { target: 98, suffix: '%', label: 'Client Satisfaction' }, { target: 15, suffix: '+', label: 'Countries Served' }].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-white tracking-tight mb-1"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
              <div className="text-[#777] text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CASE STUDIES ═══ */}
      <section className="py-28 bg-[#090909]">
        <div className="container max-w-[1920px] space-y-8">
          {caseStudies.map((cs, i) => {
            const CsIcon = cs.icon;
            return (
              <motion.div
                key={i}
                className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-7 lg:p-9 hover:border-white/[0.08] transition-all duration-700"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease }}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cs.accent + '12' }}>
                        <CsIcon className="w-6 h-6" style={{ color: cs.accent }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold mb-1" style={{ color: cs.accent }}>{cs.industry}</div>
                        <h2 className="text-xl font-bold leading-tight tracking-tight">{cs.title}</h2>
                        <div className="text-[#777] text-sm mt-1">{cs.client}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cs.services.map(s => (
                        <span key={s} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.04] rounded-lg text-[11px] text-[#888]">{s}</span>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div><h3 className="text-xs font-semibold text-[#bbb] uppercase tracking-wider mb-2">Challenge</h3><p className="text-sm text-[#777] leading-relaxed">{cs.challenge}</p></div>
                      <div><h3 className="text-xs font-semibold text-[#bbb] uppercase tracking-wider mb-2">Solution</h3><p className="text-sm text-[#777] leading-relaxed">{cs.solution}</p></div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-[#bbb] uppercase tracking-wider mb-4">Results</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {cs.results.map((r, ri) => (
                          <div key={ri} className="bg-[#090909] rounded-xl p-4 text-center border border-white/[0.04]">
                            <div className="text-xl font-bold mb-1" style={{ color: cs.accent }}>{r.metric}</div>
                            <div className="text-[#777] text-[11px]">{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-[#bbb] uppercase tracking-wider mb-3">Tech Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {cs.tech.map(t => (
                          <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.04] rounded-lg text-[12px] text-[#999] font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
              Your Success Story{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Starts Here</span>
            </h2>
            <p className="text-[17px] text-[#777] mb-12 max-w-xl mx-auto leading-[1.7]">Join 200+ companies that have transformed their business with Greatodeal.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">
                Start Your Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
              <Link href="/contact" className="px-10 py-4 border border-white/[0.08] text-white rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
                Request a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
