'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Database, Eye, Users, Cookie, Lock, FileText, Mail, CheckCircle, ArrowRight, AlertTriangle, Globe, Server } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealOnScroll } from '@/components/ui/Animations';

const ease = [0.25, 0.1, 0.25, 1] as const;

const sections = [
  { id: 'introduction', title: 'Introduction', icon: FileText },
  { id: 'information-collection', title: 'Information We Collect', icon: Database },
  { id: 'usage', title: 'How We Use Your Information', icon: Eye },
  { id: 'sharing', title: 'Information Sharing', icon: Users },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'data-security', title: 'Data Security', icon: Lock },
  { id: 'your-rights', title: 'Your Rights', icon: Shield },
  { id: 'contact', title: 'Contact Us', icon: Mail },
];

export default function PrivacyClient() {
  const [activeSection, setActiveSection] = useState(0);

  const scrollTo = (id: string, index: number) => {
    setActiveSection(index);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-7xl relative z-10">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Shield className="w-3.5 h-3.5" /><span className="text-[13px] font-medium">Privacy & Security</span>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
            <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Privacy Policy</span>
          </motion.h1>
          <motion.p className="text-[17px] text-[#888] max-w-2xl leading-[1.7]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </motion.p>
        </div>
      </section>

      {/* ═══ STICKY NAV TABS ═══ */}
      <section className="sticky top-[64px] lg:top-[80px] z-20 bg-[#090909]/95 backdrop-blur-md border-y border-white/[0.04] py-3">
        <div className="container max-w-7xl">
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-1 scrollbar-thin scrollbar-thumb-[#333]">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => scrollTo(s.id, i)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-500 shrink-0 ${activeSection === i ? 'bg-[#6EE7B7] text-[#090909] font-semibold' : 'bg-white/[0.04] text-[#777] hover:bg-white/[0.08] hover:text-white'}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <div className="container max-w-7xl py-16">
        <div className="max-w-4xl mx-auto space-y-20">

          {/* 1. Introduction */}
          <section id="introduction" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#6EE7B7]/10 flex items-center justify-center"><FileText className="w-5 h-5 text-[#6EE7B7]" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#6EE7B7]">1. Introduction</h2>
              </div>
              <div className="space-y-4 text-[#888] leading-relaxed">
                <p>Welcome to Greatodeal (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our AI automation and software solutions.</p>
                <p>We are committed to protecting your privacy and ensuring the security of your personal information. By using our website and services, you consent to the data practices described in this policy.</p>
                <div className="bg-white/[0.02] border-l-4 border-[#6EE7B7] p-6 rounded-r-xl mt-6">
                  <p className="text-[#bbb]"><strong className="text-[#6EE7B7]">Our Commitment:</strong> Greatodeal complies with applicable data protection laws, including GDPR for our European users and other regional regulations where we operate.</p>
                </div>
              </div>
            </RevealOnScroll>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-collection" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Database className="w-5 h-5 text-blue-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-400">2. Information We Collect</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Personal Information You Provide</h3>
                  <div className="space-y-2">
                    {[
                      { l: 'Contact Information', d: 'Name, email address, phone number, company name, job title' },
                      { l: 'Account Credentials', d: 'Username, password, and authentication data for our platforms' },
                      { l: 'Payment Information', d: 'Billing address, payment method details (processed securely via third-party payment processors)' },
                      { l: 'Project Data', d: 'Information you share about your business, requirements, and project specifications' },
                      { l: 'Communication', d: 'Messages, feedback, and support requests you send to us' },
                    ].map(item => (
                      <div key={item.l} className="flex items-start gap-2.5 text-[#888]">
                        <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-1" />
                        <span><strong className="text-white">{item.l}:</strong> {item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Information Automatically Collected</h3>
                  <div className="space-y-2">
                    {[
                      { l: 'Device Information', d: 'IP address, browser type, operating system, service identifiers' },
                      { l: 'Usage Data', d: 'Pages visited, time spent, click patterns, and interaction with our services' },
                      { l: 'Location Data', d: 'Approximate geographic location based on IP address' },
                    ].map(item => (
                      <div key={item.l} className="flex items-start gap-2.5 text-[#888]">
                        <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0 mt-1" />
                        <span><strong className="text-white">{item.l}:</strong> {item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/[0.04]">
                  <h3 className="text-base font-semibold text-[#6EE7B7] mb-2">Information from Third Parties</h3>
                  <p className="text-[#888] text-sm">We may receive information about you from third-party sources, such as business partners, analytics providers, or publicly available databases, to enhance our services and improve your experience.</p>
                </div>
              </div>
            </RevealOnScroll>
          </section>

          {/* 3. How We Use Your Information */}
          <section id="usage" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center"><Eye className="w-5 h-5 text-cyan-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-cyan-400">3. How We Use Your Information</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Service Delivery', color: 'text-cyan-400', border: 'hover:border-cyan-500/30', items: ['Provide and maintain our services', 'Process transactions and manage accounts', 'Respond to inquiries and support requests', 'Deliver project deliverables and updates'] },
                  { title: 'Business Operations', color: 'text-cyan-400', border: 'hover:border-cyan-500/30', items: ['Improve and optimize our services', 'Analyze usage patterns and trends', 'Develop new features and solutions', 'Conduct market research'] },
                  { title: 'Communication', color: 'text-cyan-400', border: 'hover:border-cyan-500/30', items: ['Send service notifications and updates', 'Share marketing communications (with consent)', 'Provide customer support', 'Send invoices and payment reminders'] },
                  { title: 'Security & Compliance', color: 'text-cyan-400', border: 'hover:border-cyan-500/30', items: ['Protect against fraud and unauthorized access', 'Enforce our terms of service', 'Comply with legal obligations', 'Resolve disputes'] },
                ].map(cat => (
                  <div key={cat.title} className={`p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] ${cat.border} transition-all duration-700`}>
                    <h3 className={`text-base font-semibold ${cat.color} mb-4`}>{cat.title}</h3>
                    <ul className="space-y-2">
                      {cat.items.map(item => (
                        <li key={item} className="flex items-start gap-2 text-[#888] text-sm">
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" /><span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* 4. Information Sharing */}
          <section id="sharing" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center"><Users className="w-5 h-5 text-purple-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-400">4. Information Sharing</h2>
              </div>
              <p className="text-[#888] mb-6">We do not sell your personal information. We may share your information in the following circumstances:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Service Providers', desc: 'Third-party vendors who assist with hosting, payment processing, analytics, and customer support.' },
                  { title: 'Business Partners', desc: 'With your consent, we may share information with partners for joint offerings.' },
                  { title: 'Legal Requirements', desc: 'When required by law, court order, or to protect our rights and safety.' },
                  { title: 'Business Transfers', desc: 'In connection with mergers, acquisitions, or asset sales.' },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-purple-500/20 transition-all duration-700">
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-[#777]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </section>

          {/* 5. Cookies & Tracking */}
          <section id="cookies" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Cookie className="w-5 h-5 text-orange-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-orange-400">5. Cookies & Tracking Technologies</h2>
              </div>
              <p className="text-[#888] mb-6">We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 font-semibold text-white">Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Purpose</th>
                      <th className="text-left py-3 px-4 font-semibold text-white">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#888]">
                    {[
                      { type: 'Essential', purpose: 'Required for core website functionality', duration: 'Session' },
                      { type: 'Analytics', purpose: 'Collect usage data to improve our services', duration: 'Up to 2 years' },
                      { type: 'Preference', purpose: 'Remember your settings and preferences', duration: 'Up to 1 year' },
                      { type: 'Marketing', purpose: 'Deliver relevant advertisements', duration: 'Up to 90 days' },
                    ].map(row => (
                      <tr key={row.type} className="border-b border-white/[0.04]">
                        <td className="py-3 px-4 font-medium text-white">{row.type}</td>
                        <td className="py-3 px-4">{row.purpose}</td>
                        <td className="py-3 px-4">{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                <p className="text-sm text-[#888]"><strong className="text-orange-400">Manage Cookies:</strong> You can control cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.</p>
              </div>
            </RevealOnScroll>
          </section>

          {/* 6. Data Security */}
          <section id="data-security" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-red-400">6. Data Security</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Lock, title: 'Encryption', desc: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit' },
                  { icon: Shield, title: 'Access Control', desc: 'Strict role-based access and multi-factor authentication' },
                  { icon: Eye, title: 'Monitoring', desc: '24/7 security monitoring and regular penetration testing' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
                      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-3"><Icon className="w-5 h-5 text-red-400" /></div>
                      <h3 className="font-semibold text-white mb-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-[#777]">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
                <p className="text-sm text-[#888]">While we implement industry-standard security measures, no method of transmission over the Internet is 100% secure. We are committed to protecting your information to the best of our ability.</p>
              </div>
            </RevealOnScroll>
          </section>

          {/* 7. Your Rights */}
          <section id="your-rights" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#6EE7B7]/10 flex items-center justify-center"><Globe className="w-5 h-5 text-[#6EE7B7]" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#6EE7B7]">7. Your Rights</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  'Right to Access your personal data',
                  'Right to Rectification of inaccurate data',
                  'Right to Erasure (Right to be Forgotten)',
                  'Right to Restrict Processing',
                  'Right to Data Portability',
                  'Right to Object to processing',
                  'Right to Withdraw Consent',
                  'Right to Lodge a Complaint',
                ].map(right => (
                  <div key={right} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <CheckCircle className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                    <span className="text-sm text-[#bbb]">{right}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-[#6EE7B7]/[0.04] rounded-2xl border border-[#6EE7B7]/[0.1]">
                <h3 className="font-semibold text-[#6EE7B7] mb-2">Exercising Your Rights</h3>
                <p className="text-sm text-[#888]">To exercise any of your privacy rights, please contact us at <a href="mailto:privacy@greatodeal.com" className="text-[#6EE7B7] hover:underline">privacy@greatodeal.com</a>. We will respond to your request within 30 days.</p>
                <p className="text-xs text-[#666] mt-2">We may need to verify your identity before processing certain requests.</p>
              </div>
            </RevealOnScroll>
          </section>

          {/* 8. Contact Us */}
          <section id="contact" className="scroll-mt-32">
            <RevealOnScroll>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Mail className="w-5 h-5 text-blue-400" /></div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-400">8. Contact Us</h2>
              </div>
              <p className="text-[#888] mb-6">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="p-6 rounded-2xl bg-[#6EE7B7]/[0.03] border border-[#6EE7B7]/[0.1]">
                <div className="text-[#6EE7B7] font-bold text-lg mb-4">Greatodeal</div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div><div className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Privacy Email</div><a href="mailto:privacy@greatodeal.com" className="text-[#6EE7B7] hover:underline">privacy@greatodeal.com</a></div>
                  <div><div className="text-[#555] text-[10px] uppercase tracking-wider mb-1">General Email</div><a href="mailto:sales@greatodeal.com" className="text-[#6EE7B7] hover:underline">sales@greatodeal.com</a></div>
                  <div><div className="text-[#555] text-[10px] uppercase tracking-wider mb-1">Pakistan Office</div><span className="text-[#bbb]">16 Jail Rd, Shadman 2, Lahore</span></div>
                </div>
              </div>
            </RevealOnScroll>
          </section>
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" /></div>
        <div className="container max-w-7xl relative z-10">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">Have Questions About Your Privacy?</h2>
            <p className="text-[15px] text-[#777] mb-8">Our data protection team is here to help. Contact us for any privacy concerns or data requests.</p>
            <Link href="/contact" className="btn-primary group">
              Contact Privacy Team <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
