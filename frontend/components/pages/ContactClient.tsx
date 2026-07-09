'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactApi } from '@/lib/api';

const ease = [0.25, 0.1, 0.25, 1] as const;

const countries = [
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' }, { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+1', name: 'United States', flag: '🇺🇸' }, { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' }, { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' }, { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' }, { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+91', name: 'India', flag: '🇮🇳' }, { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' }, { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' }, { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' }, { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' }, { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' }, { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' }, { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' }, { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' }, { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳' }, { code: '+63', name: 'Philippines', flag: '🇵🇭' },
];

const serviceOptions = [
  'Web Application Development', 'Mobile App Development (iOS/Android)',
  'AI & Machine Learning Solutions', 'Custom Software / ERP / CRM',
  'AI SaaS Platform Development', 'API Development & Integration',
  'UI/UX Design', 'Software Testing & QA',
  'Cloud & DevOps Services', 'IT Consulting & Digital Transformation', 'Other',
];

const contactInfo = [
  { icon: Mail, label: 'Sales', value: 'sales@greatodeal.com', href: 'mailto:sales@greatodeal.com' },
  { icon: Mail, label: 'General Info', value: 'info@greatodeal.com', href: 'mailto:info@greatodeal.com' },
  { icon: Mail, label: 'Support', value: 'support@greatodeal.com', href: 'mailto:support@greatodeal.com' },
  { icon: Phone, label: 'Pakistan', value: '+92 301 1060841', href: 'tel:+923011060841' },
  { icon: MapPin, label: 'HQ Address', value: '16 Jail Rd, Shadman 2, Lahore, Pakistan', href: '#' },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({ fullName: '', company: '', countryCode: '+92', phone: '', email: '', services: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCountrySearch, setShowCountrySearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.includes(searchTerm));
  const selectedCountry = countries.find(c => c.code === formData.countryCode) || countries[0];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (!formData.services) e.services = 'Please select a service';
    if (!formData.message.trim() || formData.message.length < 20) e.message = 'Message must be at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await contactApi.send({ ...formData, phone: `${formData.countryCode}${formData.phone}` });
      setIsSuccess(true);
      setFormData({ fullName: '', company: '', countryCode: '+92', phone: '', email: '', services: '', message: '' });
    } catch {
      setErrors({ submit: 'Failed to send message. Please try again or email us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-5 py-4 bg-[#0D0D0D] border rounded-xl text-white placeholder-white/30 text-base focus:outline-none focus:ring-2 focus:ring-[#6EE7B7]/40 transition-all duration-500 ${errors[field] ? 'border-red-500/50' : focusedField === field ? 'border-[#6EE7B7]/40' : 'border-white/[0.08]'}`;

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-7xl relative z-10 px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease }}>
                Let&apos;s Build Your AI Vision{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Together</span>
              </motion.h1>
              <motion.p className="text-lg sm:text-xl text-white/70 max-w-xl leading-[1.8] mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>
                Have a project in mind or want to discuss a custom AI, automation, or web solution? Fill out the form below or reach us directly — our team will get back to you within 24 hours.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease }}>
                <a href="#contact-form" className="btn-primary group">
                  <Send className="w-5 h-5" /> Get Started
                </a>
              </motion.div>
            </div>
            <motion.div className="hidden lg:block" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }}>
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-[#6EE7B7]/10 shadow-2xl">
                <img src="/images/contact.jpg" alt="Contact Greatodeal" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FORM + SIDEBAR ═══ */}
      <section id="contact-form" className="pb-28">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease }}>
              <div className="bg-white/[0.02] p-6 sm:p-10 rounded-2xl border border-white/[0.06]">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">Send Us a Message</h2>
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-20 h-20 bg-[#6EE7B7]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#6EE7B7]" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3 tracking-tight">Message Sent!</h3>
                    <p className="text-white/60 mb-8 text-lg">Thank you for reaching out. We&apos;ll get back within 24 hours.</p>
                    <button onClick={() => setIsSuccess(false)} className="btn-primary">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-base font-medium mb-2.5 text-white/80">Full Name *</label>
                        <input type="text" placeholder="John Doe" value={formData.fullName} onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))} onFocus={() => setFocusedField('fullName')} onBlur={() => setFocusedField('')} className={inputClass('fullName')} />
                        {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="block text-base font-medium mb-2.5 text-white/80">Company</label>
                        <input type="text" placeholder="Acme Corp." value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField('')} className={inputClass('company')} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-medium mb-2.5 text-white/80">Email Address *</label>
                      <input type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')} className={inputClass('email')} />
                      {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-base font-medium mb-2.5 text-white/80">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="relative" ref={dropdownRef}>
                          <button type="button" onClick={() => setShowCountrySearch(!showCountrySearch)}
                            className="flex items-center gap-2 px-4 py-4 bg-[#0D0D0D] border border-white/[0.08] rounded-xl hover:border-[#6EE7B7]/30 transition-all duration-500 whitespace-nowrap text-base">
                            <span className="text-lg">{selectedCountry.flag}</span><span>{formData.countryCode}</span><ChevronDown className="w-4 h-4 text-white/40" />
                          </button>
                          <AnimatePresence>
                            {showCountrySearch && (
                              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                                className="absolute top-full mt-2 left-0 bg-[#111] border border-white/[0.08] rounded-xl shadow-2xl z-50 w-80 overflow-hidden">
                                <div className="p-3 border-b border-white/[0.06] flex items-center gap-2">
                                  <Search className="w-5 h-5 text-white/40" />
                                  <input type="text" placeholder="Search country..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-transparent text-base w-full outline-none text-white" autoFocus />
                                  {searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Clear search"><X className="w-5 h-5 text-white/40" /></button>}
                                </div>
                                <div className="max-h-56 overflow-y-auto">
                                  {filteredCountries.map((c, i) => (
                                    <button key={i} type="button" onClick={() => { setFormData(p => ({ ...p, countryCode: c.code })); setShowCountrySearch(false); setSearchTerm(''); }}
                                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors text-left text-base">
                                      <span className="text-lg">{c.flag}</span><span className="flex-1 text-white/80">{c.name}</span><span className="text-sm text-white/40">{c.code}</span>
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <input type="tel" placeholder="123 456 7890" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} className={`${inputClass('phone')} flex-1`} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-base font-medium mb-2.5 text-white/80">Service Required *</label>
                      <select value={formData.services} onChange={e => setFormData(p => ({ ...p, services: e.target.value }))} className={`${inputClass('services')} cursor-pointer`}>
                        <option value="">Select a service...</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.services && <p className="text-red-400 text-sm mt-2">{errors.services}</p>}
                    </div>

                    <div>
                      <label className="block text-base font-medium mb-2.5 text-white/80">Project Description *</label>
                      <textarea rows={5} placeholder="Tell us about your project, goals, timeline, and budget range..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField('')} className={`${inputClass('message')} resize-none`} />
                      <div className="flex justify-between mt-2">
                        {errors.message ? <p className="text-red-400 text-sm">{errors.message}</p> : <span />}
                        <p className="text-white/40 text-sm">{formData.message.length}/500</p>
                      </div>
                    </div>

                    {errors.submit && <p className="text-red-400 text-base p-4 bg-red-500/10 rounded-xl border border-red-500/20">{errors.submit}</p>}

                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? (
                        <><div className="w-5 h-5 border-2 border-[#090909]/30 border-t-[#090909] rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-5 h-5" /> Send Message</>
                      )}
                    </button>
                    <p className="text-white/40 text-sm text-center">By submitting, you agree to our <Link href="/privacy-policy" className="text-[#6EE7B7] hover:underline">Privacy Policy</Link>.</p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease }}>
              <div className="bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.06]">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 tracking-tight">Get In Touch</h2>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                    <a key={i} href={href} className="flex items-start gap-4 p-4 bg-[#090909] rounded-xl border border-white/[0.06] hover:border-[#6EE7B7]/20 transition-all duration-700 group">
                      <div className="w-11 h-11 bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] rounded-lg flex items-center justify-center shrink-0 group-hover:shadow-[0_0_12px_rgba(110,231,183,0.1)] transition-all duration-700">
                        <Icon className="w-5 h-5 text-[#6EE7B7]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/40 uppercase tracking-wider font-medium mb-0.5">{label}</p>
                        <p className="text-base font-medium text-white/90 group-hover:text-[#6EE7B7] transition-colors duration-500">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.06]">
                <h3 className="text-xl font-bold mb-5 tracking-tight">Why Contact Us?</h3>
                <div className="space-y-3.5">
                  {['Free consultation & estimate', 'Response within 24 hours', 'NDA signing available', 'Dedicated project manager', 'Flexible engagement models', '9+ years proven expertise'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#6EE7B7] shrink-0" />
                      <p className="text-base text-white/70">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#6EE7B7]/[0.04] p-6 sm:p-7 rounded-2xl border border-[#6EE7B7]/[0.1]">
                <h3 className="text-xl font-bold mb-2 tracking-tight">Prefer WhatsApp?</h3>
                <p className="text-white/60 text-base mb-5">Chat with us directly for quick responses.</p>
                <a href="https://wa.me/923011060841?text=Hi%20Greatodeal!%20I%27d%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.106.546 4.084 1.503 5.81L0 24l6.352-1.469C8.01 23.478 9.959 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.926 0-3.73-.516-5.283-1.416l-.379-.224-3.781.875.9-3.674-.247-.389A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  WhatsApp Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
