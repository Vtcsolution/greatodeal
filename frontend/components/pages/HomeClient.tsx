'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code, Database, CheckCircle, ArrowRight, ChevronDown, ChevronRight,
  Zap, Cpu, Cloud, Briefcase, ShoppingCart, Banknote, GraduationCap, Activity,
  Factory, Package, Building2, Globe, Lightbulb, Shield, Users, Rocket, Award,
  Clock, Bot, Sparkles, TrendingUp, Star, MessageSquare, Layers, Play,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1] as const;
const smoothSpring = { type: 'spring' as const, stiffness: 100, damping: 30 };

/* ═══ DATA ═══ */

const services = [
  { icon: Code, title: 'Enterprise Software & App Development', accent: '#6EE7B7', description: 'At Greatodeal, we specialize in game-changing enterprise software and cross-platform mobile apps tailored to your business needs. Our focus is on scalability, security, and innovation using the latest technologies.', features: ['Custom web applications with React, Angular, or Vue.js', 'Cross-platform mobile apps using Flutter and React Native', 'AI-powered SaaS & cloud platforms designed for scalability', 'Enterprise-grade on AWS, Azure, and Google Cloud'] },
  { icon: Zap, title: 'Website & App Automation with AI', accent: '#A78BFA', description: 'Streamline workflows with intelligent automation — from AI chatbots and content personalization to predictive analytics and business process optimization.', features: ['Smart chatbots & virtual assistants', 'Business process automation', 'AI-driven analytics & insights', 'CI/CD pipeline automation'] },
  { icon: Cpu, title: 'AI & Agentic Automation Solutions', accent: '#60A5FA', description: 'Autonomous AI agents that optimize operations, deliver insights, and enable intelligent decision-making at scale across your organization.', features: ['AI agents for autonomous tasks', 'ML/DL models & forecasting', 'NLP, sentiment & voice AI', 'Ethical AI & explainability'] },
  { icon: Database, title: 'API Development, Integration & Cloud Solutions', accent: '#FB923C', description: 'Seamless connectivity with secure APIs, scalable cloud infrastructure, and modern SaaS integrations for your business.', features: ['Blockchain & Web3 integration for real-world applications', 'Third-party API integrations (Salesforce, SAP, etc.)', 'High-performance, scalable cloud architecture on AWS, Azure, and Google Cloud', 'Agile development with CI/CD & GitOps practices'] },
  { icon: Cloud, title: 'Cloud & DevOps Engineering', accent: '#22D3EE', description: 'Modern DevOps practices and cloud engineering for agility, reliability, and faster innovation across your infrastructure.', features: ['Kubernetes & Docker', 'Infrastructure as Code', 'Agile development with CI/CD & GitOps practices', 'Serverless architecture'] },
  { icon: Briefcase, title: 'IT Consulting & Digital Transformation', accent: '#F472B6', description: 'Strategic consulting to reimagine digital strategies, optimize operations, and drive measurable growth for your business.', features: ['Technology roadmapping', 'Digital transformation', 'Data strategy & governance', 'Agile/DevOps coaching'] },
];

const industries: Array<{ name: string; icon: LucideIcon; color: string }> = [
  { name: 'E-Commerce', icon: ShoppingCart, color: 'text-emerald-400' },
  { name: 'Fintech & Banking', icon: Banknote, color: 'text-blue-400' },
  { name: 'Insurance', icon: Shield, color: 'text-indigo-400' },
  { name: 'Healthcare', icon: Activity, color: 'text-rose-400' },
  { name: 'Computing & IT Industry 4.0', icon: Cpu, color: 'text-cyan-400' },
  { name: 'Automotive & Logistics', icon: Package, color: 'text-yellow-400' },
  { name: 'Aviation', icon: Globe, color: 'text-sky-400' },
  { name: 'Real Estate & Construction', icon: Building2, color: 'text-amber-400' },
  { name: 'Travel & Tourism', icon: Globe, color: 'text-teal-400' },
  { name: 'Telecommunications', icon: Zap, color: 'text-violet-400' },
  { name: 'Energy & Utilities', icon: Lightbulb, color: 'text-orange-400' },
  { name: 'SaaS Platforms', icon: Cloud, color: 'text-blue-300' },
  { name: 'AI & Automation', icon: Bot, color: 'text-green-400' },
  { name: 'Startups & SMEs', icon: Rocket, color: 'text-rose-300' },
  { name: 'Education', icon: GraduationCap, color: 'text-violet-400' },
  { name: 'Manufacturing', icon: Factory, color: 'text-orange-400' },
  { name: 'Government', icon: Building2, color: 'text-teal-400' },
  { name: 'Public Sector & Non-Profit', icon: Users, color: 'text-pink-400' },
];

const solutions = [
  'ERP Systems', 'CRM Platforms', 'HR Software', 'Financial Management Solutions',
  'Project Management Tools', 'Document Management Systems', 'Asset Management', 'Fleet Management',
  'Custom Software Development', 'Web Application Development', 'Mobile App Development', 'AI & Automation Solutions',
  'SaaS Platforms', 'Startup MVP Development', 'Cloud Solutions & Integration', 'Business Intelligence & Data Analytics',
  'Enterprise Software Development', 'API Development & Integration',
];

const testimonials = [
  { text: 'Greatodeal team developed a highly intuitive e-commerce platform for us. Their solution enhanced our customer experience and improved our internal operations significantly.', author: 'Muhammad Naveed', position: 'Founder, E-Shop Global', rating: 5, img: '/images/naveed_marketing.png' },
  { text: 'Greatodeal exceeded our expectations. They delivered robust software solutions with strategic guidance that optimized our workflows. The team is collaborative, professional, and extremely reliable.', author: 'Tim Bakker', position: 'CEO, Tech Innovators Inc.', rating: 5, img: '/images/Tim bakker.png' },
  { text: 'Partnering with Greatodeal allowed us to streamline complex processes with AI and automation. Their attention to detail and deep technical expertise have made a tangible impact on our business.', author: 'Sarah Johnson', position: 'CTO, FinSecure', rating: 5, img: '' },
  { text: 'From SaaS platforms to mobile apps, their expertise in AI and automation has consistently delivered innovative and scalable solutions. A true game-changer for our business.', author: 'Haseeb', position: 'Product Manager, AI Dynamics', rating: 5, img: '' },
];

const whyUs: Array<{ icon: LucideIcon; title: string; description: string }> = [
  { icon: Lightbulb, title: 'Client-First Approach', description: 'We place client satisfaction at the heart of everything we do, ensuring transparent communication, timely delivery, and measurable results.' },
  { icon: Zap, title: 'Future-Ready Tech', description: 'We leverage cutting-edge technologies like AI, SaaS, blockchain, and automation to build solutions that grow with your business.' },
  { icon: Users, title: 'Trusted Partnerships', description: 'We build long-term partnerships, offering ongoing support and maintenance so your systems remain secure, reliable, and up to date.' },
  { icon: Shield, title: 'Tailored Solutions', description: 'Every business is unique. Our websites, apps, and software are custom-built to match your exact goals and industry requirements.' },
  { icon: Clock, title: 'Security & Reliability', description: 'We follow strict development standards and best practices to ensure your data is always safe and your solutions are always reliable.' },
  { icon: Rocket, title: 'Proven Track Record', description: 'With a high client retention rate and successful projects across industries, we deliver excellence that businesses can count on.' },
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

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2200; const start = performance.now();
    const tick = (now: number) => { const p = Math.min((now - start) / duration, 1); setCount(Math.round((1 - Math.pow(1 - p, 4)) * target)); if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function TypingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');
  useEffect(() => {
    const word = words[index]; let timeout: ReturnType<typeof setTimeout>;
    if (phase === 'typing') { if (text.length < word.length) timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 70); else timeout = setTimeout(() => setPhase('pause'), 100); }
    else if (phase === 'pause') { timeout = setTimeout(() => setPhase('deleting'), 2000); }
    else { if (text.length > 0) timeout = setTimeout(() => setText(t => t.slice(0, -1)), 35); else { setIndex(i => (i + 1) % words.length); setPhase('typing'); } }
    return () => clearTimeout(timeout);
  }, [text, phase, index, words]);
  return (<span className="relative"><span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">{text}</span><motion.span className="inline-block w-[3px] h-[0.85em] bg-[#6EE7B7] ml-0.5 align-middle rounded-full" animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }} /></span>);
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (<span>{text.split(' ').map((word, i) => (<span key={i} className="inline-block overflow-hidden"><motion.span className="inline-block" initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}>{word}&nbsp;</motion.span></span>))}</span>);
}

/* ═══ HOME ═══ */

export default function HomeClient() {
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5500);
    return () => clearInterval(interval);
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
                  <SplitText text="We Build Custom Software &" delay={0.4} />
                  <br /><TypingText words={['SaaS Solutions', 'AI Automation', 'Mobile Apps', 'Cloud Systems', 'Enterprise Software']} />
                </h1>
                <motion.p className="text-base sm:text-lg text-white/80 max-w-lg leading-[1.8]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
                  Your trusted technology partner in the digital age. We build solutions for today and tomorrow, ensuring your business stays ahead of the curve and achieves lasting success.
                </motion.p>
              </div>

              <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1, ease }}>
                <Link href="/contact" className="btn-primary group">
                  Get a cost estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
              </motion.div>

              <motion.div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }}>
                {[{ target: 9, suffix: '+', label: 'Years' }, { target: 120, suffix: '+', label: 'Engineers' }, { target: 200, suffix: '+', label: 'Projects' }, { target: 98, suffix: '%', label: 'Satisfaction' }].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight"><AnimatedCounter target={s.target} suffix={s.suffix} /></div>
                    <div className="text-xs sm:text-sm text-white/80 mt-1.5 uppercase tracking-[0.12em] font-medium">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Code editor */}
            <motion.div className="relative hidden lg:block" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, ease }}>
              <div className="absolute -inset-8 bg-gradient-to-r from-[#6EE7B7]/10 to-[#3B82F6]/10 rounded-[2rem] blur-[80px] opacity-50" />
              <div className="relative bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0A0A0A]/80">
                  <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" /></div>
                  <span className="text-white/30 text-sm ml-3 font-mono">greatodeal_solution.ts</span>
                </div>
                <div className="p-7 font-mono text-sm leading-[2] space-y-0.5">
                  <motion.div className="text-white/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>{'// Empowering businesses with technology'}</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><span className="text-[#C084FC]">const</span> <span className="text-[#7DD3FC]">innovate</span> = <span className="text-[#C084FC]">function</span> <span className="text-[#FCD34D]">{'() {'}</span></motion.div>
                  <motion.div className="pl-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}><span className="text-white/80">return</span> <span className="text-[#F97316]">&quot;AI. Cloud. Security. Innovation.&quot;</span><span className="text-white/40">;</span></motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}><span className="text-[#FCD34D]">{'}'}</span></motion.div>
                </div>
              </div>

              <motion.div className="absolute -left-10 top-[28%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, y: [0, -8, 0] }} transition={{ opacity: { delay: 1.5, duration: 0.6 }, y: { delay: 2, duration: 4, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center"><TrendingUp className="w-4 h-4 text-[#6EE7B7]" /></div><div><div className="text-sm font-bold text-white">99.9% Uptime</div><div className="text-xs text-white/40">SLA Guaranteed</div></div></div>
              </motion.div>
              <motion.div className="absolute -right-8 bottom-[30%] px-4 py-3 bg-[#0D0D0D]/90 border border-white/[0.08] rounded-xl shadow-xl backdrop-blur-md" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, y: [0, 8, 0] }} transition={{ opacity: { delay: 1.8, duration: 0.6 }, y: { delay: 2.5, duration: 5, repeat: Infinity, ease: 'easeInOut' } }}>
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center"><Globe className="w-4 h-4 text-[#3B82F6]" /></div><div><div className="text-sm font-bold text-white">15+ Countries</div><div className="text-xs text-white/40">Global Reach</div></div></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-14 sm:mb-20">
            <RevealText>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white">Services We Offer</h2>
            </RevealText>
            <RevealText delay={0.2}>
              <p className="text-white/80 max-w-md lg:text-right text-base leading-relaxed">Reduce your IT costs and achieve your business goals with our efficient and affordable software solutions.</p>
            </RevealText>
          </div>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 sm:gap-8">
            <div className="space-y-2">
              {services.map((service, i) => {
                const SIcon = service.icon; const isActive = activeService === i;
                return (
                  <motion.div key={i} onClick={() => setActiveService(i)} className={`group relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-700 ${isActive ? 'bg-white/[0.04] shadow-lg' : 'hover:bg-white/[0.02]'}`} layout>
                    {isActive && <motion.div className="absolute inset-0 rounded-2xl border border-white/[0.08]" layoutId="activeServiceBorder" transition={{ ...smoothSpring, duration: 0.5 }} />}
                    <div className="relative flex items-center gap-4">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-700" style={{ backgroundColor: isActive ? service.accent + '15' : 'rgba(255,255,255,0.04)', color: isActive ? service.accent : 'rgba(255,255,255,0.4)' }}><SIcon className="w-5 h-5 sm:w-6 sm:h-6" /></div>
                      <h3 className={`font-semibold text-base transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white/80'}`}>{service.title}</h3>
                      <ChevronDown className={`w-5 h-5 text-white/30 transition-transform duration-500 ml-auto lg:hidden ${isActive ? 'rotate-180' : ''}`} />
                      <ChevronRight className={`w-5 h-5 hidden lg:block ml-auto transition-all duration-500 ${isActive ? 'text-[#6EE7B7] translate-x-1' : 'text-white/20'}`} />
                    </div>
                    <AnimatePresence>{isActive && (<motion.div className="lg:hidden mt-5 pt-5 border-t border-white/[0.06]" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p className="text-base text-white/80 mb-4 leading-relaxed">{service.description}</p><div className="grid gap-3">{service.features.map((f, fi) => (<div key={fi} className="flex items-start gap-2.5"><CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: service.accent }} /><span className="text-base text-white/80">{f}</span></div>))}</div></motion.div>)}</AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div key={activeService} className="h-full bg-white/[0.02] rounded-2xl border border-white/[0.06] p-9 flex flex-col" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease }}>
                  <motion.div className="w-14 h-14 rounded-xl flex items-center justify-center mb-7" style={{ backgroundColor: services[activeService].accent + '15' }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{React.createElement(services[activeService].icon, { className: 'w-7 h-7', style: { color: services[activeService].accent } })}</motion.div>
                  <p className="text-white/80 leading-relaxed mb-8 text-base">{services[activeService].description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8 flex-1">{services[activeService].features.map((f, fi) => (<motion.div key={fi} className="flex items-start gap-2.5 p-4 rounded-xl bg-[#090909] border border-white/[0.06]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: fi * 0.08, duration: 0.4 }}><CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: services[activeService].accent }} /><span className="text-sm text-white/80">{f}</span></motion.div>))}</div>
                  <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-base group hover:gap-3 transition-all duration-500" style={{ color: services[activeService].accent }}>Discuss This Service <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" /></Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="py-20 sm:py-28 bg-[#090909]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-5 tracking-tight text-white">Industries We Serve</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">Industry-specific IT solutions tailored to your sector&apos;s unique challenges and opportunities. We have a proven track record of success across a diverse range of industries.</p>
          </RevealText>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
            {industries.map((ind, i) => {
              const IIcon = ind.icon;
              return (<div key={i} className="group bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/[0.05] text-center hover:border-[#6EE7B7]/20 transition-all duration-500 cursor-default"><div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/[0.04] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#6EE7B7]/[0.06] transition-all duration-500"><IIcon className={`w-6 h-6 ${ind.color}`} /></div><div className="text-xs sm:text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-500 leading-tight">{ind.name}</div></div>);
            })}
          </div>
        </div>
      </section>

      {/* ═══ SOLUTIONS WE DELIVER ═══ */}
      <section className="py-16 sm:py-20 bg-[#090909] border-t border-white/[0.04]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Solutions We Deliver</h2>
          </RevealText>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {solutions.map((sol, i) => (
              <span key={i} className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm sm:text-base text-white/80 font-medium hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7] transition-all duration-500 cursor-default">{sol}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-20 sm:py-28 bg-[#060606] border-y border-white/[0.04]">
        <div className="container max-w-7xl px-4 sm:px-6">
          <RevealText className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-white">Greatodeal in the Eyes of Clients</h2>
          </RevealText>
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial} className="bg-white/[0.03] p-6 sm:p-10 rounded-2xl border border-white/[0.06]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
                <div className="text-center mb-6">
                  <span className="text-xl sm:text-2xl font-bold text-[#6EE7B7]">{testimonials[activeTestimonial].position.split(', ').pop()}</span>
                </div>
                <blockquote className="text-white/80 leading-[1.8] mb-8 text-base sm:text-lg text-center">&ldquo;{testimonials[activeTestimonial].text}&rdquo;</blockquote>
                <div className="flex items-center justify-center gap-4">
                  {testimonials[activeTestimonial].img ? (
                    <Image src={testimonials[activeTestimonial].img} alt={testimonials[activeTestimonial].author} width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] flex items-center justify-center text-white text-lg font-bold shrink-0">{testimonials[activeTestimonial].author[0]}</div>
                  )}
                  <div>
                    <div className="font-semibold text-white text-base">{testimonials[activeTestimonial].author}</div>
                    <div className="text-sm text-white/40">{testimonials[activeTestimonial].position}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2.5 mt-6">{testimonials.map((_, i) => (<button key={i} onClick={() => setActiveTestimonial(i)} aria-label={`View testimonial ${i + 1}`} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === activeTestimonial ? 'bg-[#6EE7B7] scale-110' : 'bg-white/15 hover:bg-white/25'}`} />))}</div>
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
              <h3 className="text-2xl sm:text-3xl font-bold mb-5 tracking-tight text-white">Your Strategic Technology Partner</h3>
              <p className="text-white/80 leading-[1.8] text-base sm:text-lg mb-6">
                <span className="text-xl sm:text-2xl font-semibold text-[#6EE7B7]">Greatodeal</span> is more than just a service provider — we&apos;re your long-term technology partner. Our mission is to deliver scalable websites, mobile apps, SaaS platforms, and AI-driven automation tools that not only meet but exceed your expectations. With a proven track record of client satisfaction, we combine innovation, reliability, and dedicated support to help your business grow faster and stronger.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {['AI & Automation', 'SaaS Platforms', 'Custom Software', 'Mobile Apps', 'Cloud & DevOps'].map(tag => (
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
            <p className="text-base sm:text-lg text-white/80 mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.8]">We specialize in <strong className="text-white/80">enterprise software, AI-driven automation and cloud solutions</strong>. Whether you&apos;re looking to modernize existing systems or launch an innovative digital product, our expert team delivers scalable, secure, and future-ready solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary group">Schedule a Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" /></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
