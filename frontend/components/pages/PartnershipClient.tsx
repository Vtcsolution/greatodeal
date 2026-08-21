'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Send, Users, Sparkles, ArrowRight, Shield, Crown, Zap, Star } from 'lucide-react';
import { partnershipApi } from '@/lib/api';
import type { PartnershipFormData } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;

const serviceTypes = ['Web Application Development', 'Mobile App Development', 'AI & Machine Learning', 'Custom Software / ERP', 'SaaS Platform Development', 'API Development & Integration', 'UI/UX Design', 'Software Testing & QA', 'IT Infrastructure & DevOps'];
const budgets = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $30,000', '$30,000 – $60,000', '$60,000 – $100,000', '$100,000+'];

const tiers = [
  { id: 'standard', name: 'Standard Partner', price: 'Project-Based', icon: Zap, color: '#6EE7B7', features: ['1–2 projects per quarter', 'Standard support', 'Basic NDA', 'Weekly updates'] },
  { id: 'silver', name: 'Silver Partner', price: '$5K–$15K/month', icon: Star, color: '#60A5FA', features: ['3–5 projects per quarter', 'Priority support', 'Enhanced NDA', 'Dedicated PM', 'Bi-weekly strategy calls'] },
  { id: 'gold', name: 'Gold Partner', price: '$15K+/month', icon: Crown, color: '#FBBF24', popular: true, features: ['Unlimited projects', '24/7 support', 'Full IP protection', 'Dedicated dev team', 'Weekly strategy sessions', 'Co-branding opportunities'] },
];

const initialForm: PartnershipFormData = { name: '', email: '', company: '', budget: '', description: '', ndaAgreed: false, serviceType: '', partnershipTier: '', phone: '', website: '', industry: '', employees: '', timeline: '', referralSource: '' };

const inputClass = "w-full px-4 py-3.5 bg-[#0D0D0D] border border-white/[0.06] rounded-xl text-[#E5E7EB] placeholder-[#555] text-[15px] focus:outline-none focus:ring-2 focus:ring-[#6EE7B7]/40 focus:border-[#6EE7B7]/40 transition-all duration-500";

export default function PartnershipClient() {
  const [form, setForm] = useState<PartnershipFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof PartnershipFormData, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ndaAgreed) { setError('Please agree to the NDA to continue.'); return; }
    setSubmitting(true); setError('');
    try { await partnershipApi.submit(form as unknown as Record<string, unknown>); setSubmitted(true); }
    catch { setError('Submission failed. Please try again or email sales@greatodeal.com'); }
    finally { setSubmitting(false); }
  };

  if (submitted) return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center">
      <motion.div className="max-w-lg mx-auto text-center px-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
        <div className="w-16 h-16 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-2xl flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-[#6EE7B7]" /></div>
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Application Submitted!</h2>
        <p className="text-[#777] mb-8 text-[15px]">Thank you, <strong className="text-white">{form.name}</strong>! Our partnerships team will reach out within 48 hours.</p>
        <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.04] mb-8 text-sm space-y-2.5">
          {[['Company', form.company], ['Service', form.serviceType], ['Budget', form.budget], ['Tier', form.partnershipTier]].map(([l, v]) => (
            <div key={l} className="flex justify-between"><span className="text-[#555]">{l}</span><span className="text-[#bbb] capitalize">{v}</span></div>
          ))}
        </div>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10 text-center">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Users className="w-3.5 h-3.5" /><span className="text-[13px] font-medium">Partner With Us</span>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
            Build the Future{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Together</span>
          </motion.h1>
          <motion.p className="text-[17px] text-[#888] max-w-2xl mx-auto leading-[1.7]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
            Join Greatodeal&apos;s growing network. We offer white-label development, co-development, and technology licensing for agencies, consultants, and enterprises.
          </motion.p>
        </div>
      </section>

      {/* ═══ TIERS ═══ */}
      <section className="py-20 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-[1920px]">
          <motion.h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 tracking-tight" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>Choose Your Partnership Tier</motion.h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => {
              const TierIcon = tier.icon;
              const isSelected = form.partnershipTier === tier.id;
              return (
                <motion.div key={tier.id} onClick={() => set('partnershipTier', tier.id)}
                  className={`relative p-7 rounded-2xl cursor-pointer transition-all duration-700 ${isSelected ? 'bg-white/[0.04] border-2 border-[#6EE7B7] shadow-[0_0_30px_rgba(110,231,183,0.08)]' : 'bg-white/[0.02] border-2 border-white/[0.04] hover:border-white/[0.08]'}`}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.4 } }}
                >
                  {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#6EE7B7] text-[#090909] text-[10px] font-bold rounded-full uppercase tracking-wider">Most Popular</div>}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: tier.color + '12' }}>
                    <TierIcon className="w-5 h-5" style={{ color: tier.color }} />
                  </div>
                  <div className="text-lg font-bold mb-1 tracking-tight">{tier.name}</div>
                  <div className="font-semibold mb-5 text-sm" style={{ color: tier.color }}>{tier.price}</div>
                  <ul className="space-y-2.5">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="text-sm text-[#888] flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#6EE7B7] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  {isSelected && <motion.div className="mt-5 text-[#6EE7B7] text-sm font-bold text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Selected</motion.div>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FORM ═══ */}
      <section className="py-20">
        <div className="container max-w-[1920px]">
          <div className="max-w-3xl mx-auto">
            <motion.h2 className="text-2xl sm:text-3xl font-bold mb-10 tracking-tight" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Submit Your Application</motion.h2>
            {error && <motion.div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}

            <motion.form onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Full Name *</label><input type="text" required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" className={inputClass} /></div>
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Email Address *</label><input type="email" required value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.com" className={inputClass} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Company / Agency *</label><input type="text" required value={form.company} onChange={e => set('company', e.target.value)} placeholder="Acme Corp" className={inputClass} /></div>
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Phone Number</label><input type="tel" value={form.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+1 234 567 8900" className={inputClass} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Website</label><input type="url" value={form.website || ''} onChange={e => set('website', e.target.value)} placeholder="https://yoursite.com" className={inputClass} /></div>
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Industry</label><input type="text" value={form.industry || ''} onChange={e => set('industry', e.target.value)} placeholder="e.g., Healthcare, Retail" className={inputClass} /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Service Needed *</label><select required value={form.serviceType} onChange={e => set('serviceType', e.target.value)} className={inputClass}><option value="">Select service</option>{serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Budget Range *</label><select required value={form.budget} onChange={e => set('budget', e.target.value)} className={inputClass}><option value="">Select budget</option>{budgets.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Team Size</label><select value={form.employees || ''} onChange={e => set('employees', e.target.value)} className={inputClass}><option value="">Select</option>{['1–10', '11–50', '51–200', '201–500', '500+'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Timeline</label><select value={form.timeline || ''} onChange={e => set('timeline', e.target.value)} className={inputClass}><option value="">Select</option>{['Immediately', '1–3 months', '3–6 months', '6–12 months', 'Ongoing'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
              </div>
              <div><label className="block text-[13px] font-medium mb-2 text-[#999]">How did you hear about us?</label><select value={form.referralSource || ''} onChange={e => set('referralSource', e.target.value)} className={inputClass}><option value="">Select</option>{['Google Search', 'LinkedIn', 'Facebook', 'Referral', 'Blog', 'Upwork', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div><label className="block text-[13px] font-medium mb-2 text-[#999]">Project Description *</label><textarea required rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the project(s) you need help with..." className={`${inputClass} resize-none`} /></div>

              <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
                <div className="flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-[#6EE7B7]" /><h3 className="font-bold text-[15px]">Non-Disclosure Agreement</h3></div>
                <p className="text-[#777] text-sm mb-4 leading-relaxed">By checking this box, you agree that all information shared will be treated as strictly confidential. Greatodeal will not disclose or use your information for any purpose other than evaluating this partnership.</p>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.ndaAgreed} onChange={e => set('ndaAgreed', e.target.checked)} className="mt-1 w-4 h-4 accent-[#6EE7B7]" />
                  <span className="text-sm">I agree to the NDA and consent to Greatodeal contacting me. *</span>
                </label>
              </div>

              <button type="submit" disabled={submitting || !form.ndaAgreed}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                <Send className="w-5 h-5" /> {submitting ? 'Submitting...' : 'Submit Partnership Application'}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
