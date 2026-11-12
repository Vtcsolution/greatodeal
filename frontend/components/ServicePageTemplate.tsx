import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle, Target, Shield, Award, Rocket } from 'lucide-react';
import FaqSection from '@/components/ui/FaqSection';
import { servicePages, type ServicePage } from '@/lib/servicePages';

// Rendered on the server (no 'use client') so every heading, paragraph, and link
// is in the initial HTML that search engines and AI crawlers read.

const processSteps = [
  { icon: Target, title: 'Discovery & Scoping', desc: 'We map your workflow, systems, and goals, then agree on a clear scope, timeline, and quote.' },
  { icon: Shield, title: 'Architecture & Security', desc: 'Data access, permissions, and audit logging are designed in from the start, not added before launch.' },
  { icon: Award, title: 'Agile Build & Demos', desc: 'Short sprints with working demos, so you see progress and steer priorities throughout the build.' },
  { icon: Rocket, title: 'Launch & Ongoing Support', desc: 'Production launch, monitoring, documentation, and continued improvements after go-live.' },
];

const whyUs = [
  'Building AI and custom software since 2020',
  'Senior engineers, direct communication, no hand-offs',
  'Compliance-grade security, audit logs, and access control',
  'You own 100% of the code and IP',
  'Fixed-price, milestone, or monthly engagement options',
  'Clients across the US, UK, Europe, and the Middle East',
];

export default function ServicePageTemplate({ page }: { page: ServicePage }) {
  const related = page.related
    .map(slug => servicePages.find(p => p.slug === slug))
    .filter((p): p is ServicePage => Boolean(p));

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">
      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10">
          <nav aria-label="Breadcrumb" className="text-sm text-[#777] mb-8">
            <Link href="/" className="hover:text-[#6EE7B7]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-[#6EE7B7]">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-[#aaa]">{page.name}</span>
          </nav>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-8">
              {page.eyebrow}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight">
              {page.h1}
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">
                {page.h1Accent}
              </span>
            </h1>
            {page.intro.map((p, i) => (
              <p key={i} className="text-lg text-[#999] leading-[1.7] mb-5">{p}</p>
            ))}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link href="/contact" className="btn-primary group">
                Get a Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
              </Link>
              <Link href="/work" className="px-8 py-4 border border-white/[0.08] text-[#E5E7EB] rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-700 flex items-center justify-center gap-2">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="py-24 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight text-center">{page.offeringsTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.offerings.map(o => {
              const Icon = o.icon;
              return (
                <div key={o.title} className="bg-white/[0.02] p-7 rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/15 transition-all duration-700 h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-[#6EE7B7]" />
                  </div>
                  <h3 className="font-bold text-white mb-2 tracking-tight">{o.title}</h3>
                  <p className="text-base text-[#999] leading-relaxed">{o.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-24 bg-[#090909]">
        <div className="container max-w-[1920px]">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight">{page.useCasesTitle}</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {page.useCases.map(u => (
              <li key={u} className="flex items-center gap-3 p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                <span className="text-base text-[#ccc]">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight text-center">How We Deliver {page.name}</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className="bg-white/[0.02] p-7 rounded-2xl border border-white/[0.04] h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm text-[#6EE7B7]">0{i + 1}</span>
                    <Icon className="w-5 h-5 text-[#6EE7B7]" />
                  </div>
                  <h3 className="font-bold text-white mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-base text-[#999] leading-relaxed">{s.desc}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* WHY + TECH */}
      <section className="py-24 bg-[#090909]">
        <div className="container max-w-[1920px] grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Why Choose Greatodeal</h2>
            <ul className="space-y-3">
              {whyUs.map(w => (
                <li key={w} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                  <span className="text-base text-[#ccc]">{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 tracking-tight">Technologies We Use</h2>
            <div className="flex flex-wrap gap-2.5">
              {page.tech.map(t => (
                <span key={t} className="px-4 py-2 bg-white/[0.02] border border-white/[0.04] rounded-xl text-sm text-[#999] font-medium">{t}</span>
              ))}
            </div>
            <p className="text-base text-[#999] mt-8">
              Industries we often build this for:{' '}
              {page.industries.map((ind, i) => (
                <span key={ind.path}>
                  <Link href={ind.path} className="text-[#6EE7B7] hover:underline">{ind.name}</Link>
                  {i < page.industries.length - 1 ? ', ' : '.'}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <FaqSection title={`${page.name} FAQs`} faqs={page.faqs} />

      {/* RELATED SERVICES */}
      <section className="py-20 bg-[#090909]">
        <div className="container max-w-[1920px]">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-10">Related Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(r => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="group bg-white/[0.02] p-6 rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/20 transition-all duration-500">
                <span className="flex items-center justify-between font-semibold text-white/90 group-hover:text-white">
                  {r.name} <ArrowUpRight className="w-4 h-4 text-[#6EE7B7]" />
                </span>
                <span className="block text-sm text-[#888] mt-2">{r.h1Accent}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden border-t border-white/[0.04]">
        <div className="container max-w-[1920px] relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
            Ready to Start Your {page.name} Project?
          </h2>
          <p className="text-lg text-[#999] mb-10 leading-[1.7]">
            Tell us what you want to build or automate. We reply within 24 hours with honest advice and next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary group">
              Book a Free Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
            <Link href="/pricing" className="px-8 py-4 border border-white/[0.08] text-white rounded-xl font-bold text-[15px] hover:border-[#6EE7B7]/30 transition-all duration-700 flex items-center justify-center">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
