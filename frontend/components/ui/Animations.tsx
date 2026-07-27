'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.1, 0.25, 1] as const;

export function RevealOnScroll({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dirs = { up: { y: 30 }, down: { y: -30 }, left: { x: 30 }, right: { x: -30 } };
  const initial = { opacity: 0, ...dirs[direction] };
  const animate = inView ? { opacity: 1, x: 0, y: 0 } : {};
  return (
    <motion.div ref={ref} className={className} initial={initial} animate={animate} transition={{ duration: 0.7, delay, ease: [0.33, 1, 0.68, 1] }}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.05, ease } } }}>
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({ target, suffix = '', className = '' }: { target: number; suffix?: string; className?: string }) {
  const [count, setCount] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 2200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref} className={className}>{count}{suffix}</span>;
}

export function SectionBadge({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-[#6EE7B7] font-medium mb-4">
      <Icon className="w-3 h-3" /> {text}
    </div>
  );
}

export function SectionHeading({ badge, badgeIcon, title, subtitle }: {
  badge: string; badgeIcon: React.ComponentType<{ className?: string }>; title: string; subtitle?: string;
}) {
  return (
    <RevealOnScroll className="text-center mb-16">
      <SectionBadge icon={badgeIcon} text={badge} />
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
      {subtitle && <p className="text-[#777] max-w-2xl mx-auto text-[15px]">{subtitle}</p>}
    </RevealOnScroll>
  );
}

export function HoverCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={`bg-white/[0.02] rounded-2xl border border-white/[0.04] hover:border-[#6EE7B7]/15 transition-all duration-700 ${className}`} whileHover={{ y: -4, transition: { duration: 0.4 } }}>
      {children}
    </motion.div>
  );
}

export function FadeInStagger({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.5, ease }}>
      {children}
    </motion.div>
  );
}
