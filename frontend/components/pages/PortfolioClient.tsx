'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ExternalLink, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { portfolioApi, getImageUrl } from '@/lib/api';
import type { PortfolioProject } from '@/types';
import { RevealOnScroll, SectionBadge } from '@/components/ui/Animations';

export default function PortfolioClient() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
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

  const openProject = (p: PortfolioProject) => {
    setActive(p);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (!active) return;
    setActiveImage(i => (i + 1) % active.images.length);
  };
  const prevImage = () => {
    if (!active) return;
    setActiveImage(i => (i - 1 + active.images.length) % active.images.length);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white/90 overflow-x-hidden">
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/60 via-transparent to-[#090909]" />
        <div className="container max-w-[1400px] relative z-10 px-4 sm:px-6">
          <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge icon={Briefcase} text="Our Work" />
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 tracking-tight text-white">Portfolio</h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">A selection of AI automation and software projects we've delivered for clients across regulated industries.</p>
          </RevealOnScroll>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !visible || projects.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase className="w-12 h-12 text-white/15 mx-auto mb-4" />
              <p className="text-white/40 text-lg">Our portfolio is being updated.</p>
              <p className="text-white/25 text-sm mt-1">Check back soon, or get in touch to discuss your project directly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.button
                  key={p._id}
                  onClick={() => openProject(p)}
                  className="text-left bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-[#6EE7B7]/25 overflow-hidden transition-all duration-500 group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
                >
                  <div className="aspect-video bg-white/[0.03] relative overflow-hidden">
                    {p.images[0] ? (
                      <img src={getImageUrl(p.images[0])} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-8 h-8 text-white/10" />
                      </div>
                    )}
                    {p.images.length > 1 && (
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-[11px] text-white/80 font-medium">
                        {p.images.length} photos
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    {p.category && <span className="inline-block px-2.5 py-0.5 bg-[#6EE7B7]/10 text-[#6EE7B7] text-[11px] font-semibold rounded-full mb-2.5">{p.category}</span>}
                    <h3 className="font-bold text-white text-base mb-1.5 leading-snug">{p.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
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
              <div className="relative aspect-video bg-white/[0.03]">
                {active.images.length > 0 ? (
                  <img src={getImageUrl(active.images[activeImage])} alt={active.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="w-10 h-10 text-white/10" />
                  </div>
                )}
                <button onClick={() => setActive(null)} className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-lg text-white/80 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                {active.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white transition-colors">
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
