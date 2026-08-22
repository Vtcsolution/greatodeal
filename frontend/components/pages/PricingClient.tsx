'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { pricingApi } from '@/lib/api';
import type { PricingTier } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PricingClient() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pricingApi.getPublic()
      .then(res => {
        setVisible(!!res.data.data?.isVisible);
        setTiers(res.data.data?.tiers || []);
      })
      .catch(() => setVisible(false))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="container max-w-[1920px] relative z-10 px-4 sm:px-6">
          <motion.div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#6EE7B7] mb-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Tag className="w-3.5 h-3.5" /> Choose Your Starting Point
          </motion.div>
          <motion.h1 className="italic font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F0E6] max-w-2xl leading-snug" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
            Start with what your business needs now. Launch something new, improve what you have, or add intelligence after launch.
          </motion.h1>
        </div>
      </section>

      {/* ═══ TIERS ═══ */}
      <section className="relative pb-16">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !visible || tiers.length === 0 ? (
            <div className="text-center py-20 border-t border-white/[0.06]">
              <p className="text-white/50 text-lg font-medium mt-16">Pricing is being finalized.</p>
              <p className="text-white/30 text-sm mt-1.5 max-w-sm mx-auto">Get in touch and we&apos;ll put a number to your specific project.</p>
              <Link href="/contact" className="btn-primary group mt-8 inline-flex">
                Get in Touch <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </div>
          ) : (
            <>
              <div className="border-t border-white/[0.08]">
                {tiers.map((tier, i) => (
                  <motion.div
                    key={tier._id}
                    className="group relative border-b border-white/[0.08] last:border-b-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: (i % 8) * 0.05, duration: 0.5, ease }}
                  >
                    <Link href="/contact" className="relative block">
                      <div className="absolute inset-x-0 inset-y-2 rounded-2xl bg-white/0 group-hover:bg-white/[0.035] transition-colors duration-500 pointer-events-none" />
                      <div className="relative grid lg:grid-cols-[3rem_1fr_auto] gap-4 lg:gap-10 items-start lg:items-center py-10 sm:py-12 px-2 sm:px-4">
                        <span className="hidden lg:block font-mono text-sm text-white/25 tracking-wider">{String(i + 1).padStart(2, '0')}</span>

                        <div>
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <span className="lg:hidden font-mono text-xs text-white/25 tracking-wider">{String(i + 1).padStart(2, '0')}</span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{tier.title}</h2>
                            {tier.badge && (
                              <span className="font-mono text-[11px] uppercase tracking-widest text-[#6EE7B7] px-2 py-1 border border-[#6EE7B7]/25 rounded-full">
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-xl mb-4">{tier.description}</p>
                          {tier.features.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                              {tier.features.map(f => (
                                <span key={f} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/40">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]/50 shrink-0" />
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex lg:flex-col items-end lg:items-end justify-between lg:justify-center gap-2 lg:text-right shrink-0 pt-2 lg:pt-0">
                          <div className="leading-none">
                            <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-1.5">From</span>
                            <span className="text-4xl sm:text-5xl font-bold tracking-tight">{tier.currency}{tier.price}</span>
                            {tier.priceSuffix && <span className="text-white/40 text-lg ml-1">{tier.priceSuffix}</span>}
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#6EE7B7] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/[0.08] py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="italic font-serif text-xl text-white/70">Need something custom?</p>
                <Link href="/contact" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#6EE7B7] hover:gap-3 transition-all">
                  Talk To Us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      {!loading && visible && tiers.length > 0 && (
        <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" />
          </div>
          <div className="container max-w-[1920px] px-4 sm:px-6 relative z-10">
            <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
                Not Sure Which{' '}
                <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Tier Fits?</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-[1.8]">Tell us what you&apos;re building. We&apos;ll tell you honestly what it takes and what it costs.</p>
              <Link href="/contact" className="btn-primary group text-lg">
                Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
