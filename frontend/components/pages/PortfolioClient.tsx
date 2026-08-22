'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ExternalLink, X, ChevronLeft, ChevronRight, ImageOff, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';
import { portfolioApi, getImageUrl } from '@/lib/api';
import type { PortfolioProject } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;

function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.33, 1, 0.68, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function PortfolioClient() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    portfolioApi.getPublic()
      .then(res => {
        setVisible(!!res.data.data?.isVisible);
        setProjects(res.data.data?.projects || []);
      })
      .catch(() => setVisible(false))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.category) set.add(p.category); });
    return ['All', ...Array.from(set)];
  }, [projects]);

  const visibleProjects = useMemo(
    () => (activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)),
    [projects, activeCategory]
  );

  const openProject = (p: PortfolioProject) => {
    setActive(p);
    setActiveImage(0);
  };

  const nextImage = useCallback(() => {
    setActiveImage(i => (active ? (i + 1) % Math.max(active.images.length, 1) : 0));
  }, [active]);

  const prevImage = useCallback(() => {
    setActiveImage(i => (active ? (i - 1 + active.images.length) % Math.max(active.images.length, 1) : 0));
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, nextImage, prevImage]);

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1400px] relative z-10 text-center px-4 sm:px-6">
          <motion.div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-base text-[#6EE7B7] mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Briefcase className="w-4 h-4" /><span className="font-medium">Our Work</span>
          </motion.div>
          <h1 className="text-4xl sm:text-6xl lg:text-[3.75rem] font-bold mb-6 leading-[1.1] tracking-tight">
            <SplitText text="Real Projects," delay={0.4} />
            <br />
            <SplitText text="Real Results" delay={0.65} className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent" />
          </h1>
          <motion.p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-[1.8] mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}>
            A selection of AI automation and software projects we&apos;ve delivered for clients across regulated industries.
          </motion.p>

          {!loading && visible && projects.length > 0 && (
            <motion.div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-white/60 mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}>
              <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />{projects.length} project{projects.length !== 1 ? 's' : ''} delivered
            </motion.div>
          )}

          {/* ═══ CATEGORY FILTERS ═══ */}
          {!loading && visible && categories.length > 2 && (
            <motion.div className="flex flex-wrap items-center justify-center gap-2.5 mb-14" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#6EE7B7] text-[#090909]'
                      : 'bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:border-white/[0.16]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !visible || projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-5">
                <LayoutGrid className="w-7 h-7 text-white/20" />
              </div>
              <p className="text-white/50 text-lg font-medium">Our portfolio is being updated.</p>
              <p className="text-white/30 text-sm mt-1.5 max-w-sm mx-auto">Check back soon, or get in touch to discuss your project directly.</p>
              <Link href="/contact" className="btn-primary group mt-8 inline-flex">
                Get in Touch <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((p, i) => (
                  <motion.button
                    key={p._id}
                    layout
                    onClick={() => openProject(p)}
                    className="text-left bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-[#6EE7B7]/30 overflow-hidden transition-colors duration-500 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40"
                    style={{ transition: 'transform 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease' }}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: (i % 6) * 0.06, duration: 0.5, ease }}
                  >
                    <div className="aspect-video bg-white/[0.03] relative overflow-hidden">
                      {p.images[0] ? (
                        <img src={getImageUrl(p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff className="w-8 h-8 text-white/10" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {p.images.length > 1 && (
                        <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-[11px] text-white/80 font-medium">
                          {p.images.length} photos
                        </span>
                      )}
                    </div>
                    <div className="p-5 sm:p-6">
                      {p.category && <span className="inline-block px-2.5 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[11px] font-semibold rounded-full mb-2.5">{p.category}</span>}
                      <h3 className="font-bold text-white text-lg mb-1.5 leading-snug group-hover:text-[#6EE7B7] transition-colors duration-500">{p.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-[#6EE7B7] group-hover:gap-2.5 transition-all duration-500">
                        View Project <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      {!loading && visible && projects.length > 0 && (
        <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#6EE7B7]/[0.04] rounded-full blur-[180px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>
          <div className="container max-w-[1400px] px-4 sm:px-6 relative z-10">
            <motion.div className="text-center max-w-3xl mx-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
                Want Your Project{' '}
                <span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Here Next?</span>
              </h2>
              <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-xl mx-auto leading-[1.8]">Tell us what you&apos;re building. We&apos;ll tell you honestly what it takes.</p>
              <Link href="/contact" className="btn-primary group text-lg">
                Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="bg-[#0D0D0D] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-white/[0.03] overflow-hidden">
                <AnimatePresence mode="wait">
                  {active.images.length > 0 ? (
                    <motion.img
                      key={activeImage}
                      src={getImageUrl(active.images[activeImage])}
                      alt={active.title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageOff className="w-10 h-10 text-white/10" />
                    </div>
                  )}
                </AnimatePresence>
                <button onClick={() => setActive(null)} className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white/80 hover:text-white transition-colors" aria-label="Close">
                  <X className="w-4 h-4" />
                </button>
                {active.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-colors" aria-label="Previous image">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-colors" aria-label="Next image">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {active.images.map((_, i) => (
                        <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImage ? 'bg-[#6EE7B7]' : 'bg-white/30'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                {active.category && <span className="inline-block px-2.5 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[11px] font-semibold rounded-full mb-3">{active.category}</span>}
                <h3 className="font-bold text-white text-xl mb-3">{active.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap mb-4">{active.description}</p>
                {active.projectUrl && (
                  <a href={active.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#6EE7B7] text-sm font-semibold hover:gap-2.5 transition-all">
                    Visit project <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
