'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, ChevronDown, ChevronRight, Code, Monitor, Database, Cloud, Shield, Zap, Target, Clock, Settings, Search, Palette, Layers, ShoppingCart, Activity, GraduationCap, Building2, Clapperboard, Banknote } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

export interface ServicePageData {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  heroKeyword: string;
  heroImage?: string;
  heroVideo?: string;
  features: string[];
  benefits: Array<{ icon: LucideIcon; title: string; desc: string }>;
  technologies: string[];
  faqs: Array<{ q: string; a: string }>;
  relatedServices: Array<{ name: string; path: string }>;
}

const defaultIndustries: Array<{ title: string; icon: LucideIcon; desc: string }> = [
  { title: 'E-Commerce', icon: ShoppingCart, desc: 'Scalable online stores with personalized experiences' },
  { title: 'Healthcare', icon: Activity, desc: 'Secure patient portals and telemedicine solutions' },
  { title: 'Finance', icon: Banknote, desc: 'Dashboards with real-time data visualization' },
  { title: 'Education', icon: GraduationCap, desc: 'Online learning platforms with interactive features' },
  { title: 'Real Estate', icon: Building2, desc: 'Property management systems and virtual tours' },
  { title: 'Media', icon: Clapperboard, desc: 'Content delivery and streaming platforms' },
];

const defaultProcess = [
  { num: '01', title: 'Discovery & Requirements', desc: 'Understanding your business goals, target audience, and technical requirements.' },
  { num: '02', title: 'Planning & Architecture', desc: 'Defining the technical architecture, stack selection, and project roadmap.' },
  { num: '03', title: 'UI/UX Design', desc: 'Creating wireframes, prototypes, and pixel-perfect responsive designs.' },
  { num: '04', title: 'Agile Development', desc: 'Building with iterative sprints, code reviews, and continuous integration.' },
  { num: '05', title: 'Problem Solving', desc: 'Addressing compatibility, performance, and security challenges proactively.' },
  { num: '06', title: 'Innovative Solutions', desc: 'Employing best practices, automated testing, and progressive enhancement.' },
  { num: '07', title: 'Collaboration', desc: 'Regular meetings, shared tools, and transparent communication throughout.' },
  { num: '08', title: 'Tech Stack Selection', desc: 'Modern frameworks for frontend, backend, and cloud infrastructure.' },
  { num: '09', title: 'Custom Solutions', desc: 'Tailored features like real-time updates, integrations, and automation.' },
  { num: '10', title: 'Delivery & Launch', desc: 'Fully deployed application with documentation and training.' },
  { num: '11', title: 'Post-Launch Support', desc: 'Monitoring, updates, and optimizations for peak performance.' },
  { num: '12', title: 'Continuous Growth', desc: 'Feature additions, scaling, and long-term partnership for success.' },
];

const defaultTechCategories = [
  { category: 'Frontend Technologies', icon: Code, items: ['React, Vue.js, Angular', 'HTML5, CSS3, Tailwind CSS', 'JavaScript/TypeScript'] },
  { category: 'Backend Technologies', icon: Monitor, items: ['Node.js, Express', 'Python (Django/Flask)', 'PHP (Laravel), Ruby on Rails'] },
  { category: 'Databases & Storage', icon: Database, items: ['MongoDB, PostgreSQL', 'Redis for caching', 'Firebase for real-time'] },
  { category: 'DevOps & Cloud', icon: Cloud, items: ['AWS, Heroku, Vercel', 'Docker, Kubernetes', 'CI/CD with GitHub Actions'] },
];

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const HeroIcon = data.icon;

  return (
    <div className="min-h-screen bg-[#0B1120] text-gray-200 overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0B1120]" />
        <div className="container max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div className="text-[#6EE7B7] text-xs font-bold tracking-[0.2em] uppercase mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                SERVICES
              </motion.div>
              <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
                {data.title}<br /><span className="text-[#6EE7B7]">{data.subtitle}</span>
              </motion.h1>
              <motion.p className="text-gray-400 leading-relaxed mb-8 max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
                {data.description}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                <Link href="/contact" className="btn-primary">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            {(data.heroVideo || data.heroImage) && (
              <motion.div className="hidden lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>
                <div className="rounded-xl overflow-hidden shadow-2xl h-[400px] sm:h-[450px]">
                  {data.heroVideo ? (
                    <video autoPlay loop muted playsInline aria-hidden="true" className="w-full h-full object-cover"><source src={data.heroVideo} type="video/mp4" /></video>
                  ) : (
                    <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Greatodeal</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Key advantages of partnering with our expert team.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.benefits.map((b, i) => {
              const BIcon = b.icon;
              return (
                <motion.div key={i} className="group bg-[#111827] p-7 rounded-xl border border-gray-700/50 hover:border-[#6EE7B7]/30 transition-all duration-500 overflow-hidden relative" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6EE7B7]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <BIcon className="w-6 h-6 text-[#6EE7B7]" />
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#6EE7B7] transition-colors duration-300">{b.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS (features as pills) ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Solutions for Your Business Needs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive solutions covering every aspect of your requirements.</p>
          </RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {data.features.map((f, i) => (
              <motion.span key={i} className="px-5 py-2.5 bg-[#111827] border border-gray-700/50 rounded-lg text-sm text-gray-300 hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all duration-500 cursor-default" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                {f}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Expertise Across Industries</h2>
            <p className="text-gray-400">We deliver specialized solutions for various sectors.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {defaultIndustries.map((ind, i) => {
              const IndIcon = ind.icon;
              return (
                <motion.div key={i} className="group bg-[#111827] p-6 rounded-xl border border-gray-700/50 hover:border-[#6EE7B7]/30 transition-all duration-500" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <IndIcon className="w-8 h-8 text-[#6EE7B7] mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-bold text-[#6EE7B7] mb-1">{ind.title}</h3>
                  <p className="text-sm text-gray-400">{ind.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ DEVELOPMENT PROCESS ═══ */}
      <section className="py-20">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <span className="text-[#6EE7B7] text-xs font-bold tracking-[0.2em] uppercase block mb-3">PROCESS</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Development Process</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A structured approach ensuring high-quality delivery, efficiently.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {defaultProcess.map((step, i) => (
              <motion.div key={i} className="group bg-gradient-to-br from-[#111827] to-[#0B1120] p-6 rounded-xl border border-gray-700/50 hover:border-[#6EE7B7]/40 transition-all duration-500 overflow-hidden relative" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#6EE7B7]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6EE7B7]/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative z-10">
                  <div className="text-3xl font-bold text-[#6EE7B7]/30 mb-2">{step.num}</div>
                  <h3 className="font-bold text-white mb-2 text-sm group-hover:text-[#6EE7B7] transition-colors duration-300">{step.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="py-20 bg-[#111827]/50">
        <div className="container max-w-7xl">
          <RevealOnScroll className="text-center mb-14">
            <span className="text-[#6EE7B7] text-xs font-bold tracking-[0.2em] uppercase block mb-3">TECHNOLOGY STACK</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technologies We Use</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We leverage the best tools to build fast, secure, and scalable applications.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {defaultTechCategories.map((cat, i) => {
              const CatIcon = cat.icon;
              return (
                <motion.div key={i} className="bg-[#111827] p-6 rounded-xl border border-gray-700/50" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-center gap-3 mb-4">
                    <CatIcon className="w-6 h-6 text-[#6EE7B7]" />
                    <h3 className="font-bold text-[#6EE7B7]">{cat.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      {data.faqs.length > 0 && (
        <section className="py-20">
          <div className="container max-w-7xl">
            <RevealOnScroll className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            </RevealOnScroll>
            <div className="max-w-3xl mx-auto space-y-3">
              {data.faqs.map((faq, i) => {
                const isOpen = activeFaq === i;
                return (
                  <motion.div key={i} className="bg-gradient-to-br from-[#111827] to-[#0B1120] rounded-xl border border-gray-700/50 overflow-hidden" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <button onClick={() => setActiveFaq(isOpen ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#6EE7B7]/5 transition-colors duration-300">
                      <span className="font-medium text-sm pr-4">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#6EE7B7] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6 pb-5">
                          <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ RELATED ═══ */}
      {data.relatedServices.length > 0 && (
        <section className="py-14 bg-[#111827]/50">
          <div className="container max-w-7xl text-center">
            <h3 className="text-lg font-bold mb-6">Related Services</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.relatedServices.map((s, i) => (
                <Link key={i} href={s.path} className="px-5 py-2.5 border border-gray-700/50 rounded-lg hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all duration-500 text-sm text-gray-400">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="py-28">
        <div className="container max-w-7xl">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Elevate your business with Greatodeal.<br />Let&apos;s create your digital solution <span className="text-[#6EE7B7]">today.</span>
            </h2>
            <Link href="/contact" className="btn-primary group">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
