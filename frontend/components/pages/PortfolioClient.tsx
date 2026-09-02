'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Link2, Check, ArrowRight, Search, LayoutGrid } from 'lucide-react';
import { portfolioApi, getImageUrl } from '@/lib/api';
import type { PortfolioProject } from '@/types';

const CATEGORY_PALETTE = [
  { bg: 'bg-violet-500/15', text: 'text-violet-300' },
  { bg: 'bg-[#6EE7B7]/15', text: 'text-[#6EE7B7]' },
  { bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
  { bg: 'bg-amber-500/15', text: 'text-amber-300' },
  { bg: 'bg-pink-500/15', text: 'text-pink-300' },
  { bg: 'bg-blue-500/15', text: 'text-blue-300' },
];

function categoryColor(category?: string) {
  if (!category) return CATEGORY_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length];
}

function ProjectCard({ project, index }: { project: PortfolioProject; index: number }) {
  const [copied, setCopied] = useState(false);
  const cat = categoryColor(project.category);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/portfolio/${project._id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 9) * 0.05, duration: 0.5 }}
    >
      <Link href={`/portfolio/${project._id}`} className="group block bg-white/[0.02] rounded-2xl border border-white/[0.06] hover:border-white/[0.14] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 h-full flex flex-col">
        <div className="aspect-[16/10] bg-white/[0.03] relative overflow-hidden shrink-0">
          {project.images[0] ? (
            <img src={getImageUrl(project.images[0])} alt={project.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"><LayoutGrid className="w-8 h-8 text-white/10" /></div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <h3 className="font-bold text-white text-base leading-snug">{project.title}</h3>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 text-[10px] font-semibold whitespace-nowrap">View Only</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${project.status === 'active' ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' : 'bg-white/10 text-white/40'}`}>
                {project.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3 text-xs">
            {project.category && <span className={`px-2.5 py-1 rounded-full font-semibold ${cat.bg} ${cat.text}`}>{project.category}</span>}
            {project.keyFeatures.length > 0 && <span className="text-white/40">• {project.keyFeatures.length} Feature{project.keyFeatures.length !== 1 ? 's' : ''}</span>}
          </div>
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2 flex-1">{project.description}</p>
          <div className="flex items-center justify-end gap-1.5 mt-4 pt-3 border-t border-white/[0.05]">
            {project.projectUrl && (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="p-1.5 text-white/30 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-colors" title="Open demo">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button onClick={copyLink} className="p-1.5 text-white/30 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-colors" title="Copy link">
              {copied ? <Check className="w-4 h-4 text-[#6EE7B7]" /> : <Link2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PortfolioClient() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    portfolioApi.getPublic()
      .then(res => {
        setVisible(!!res.data.data?.isVisible);
        setProjects(res.data.data?.projects || []);
      })
      .catch(() => setVisible(false))
      .finally(() => setLoading(false));
  }, []);

  const visibleProjects = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.trim().toLowerCase();
    return projects.filter(p => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
  }, [projects, search]);

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">
      <section className="relative pt-32 pb-20">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <motion.div className="text-center max-w-2xl mx-auto mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-[#6EE7B7] mb-5">
              <Briefcase className="w-3.5 h-3.5" /><span className="font-medium">Our Work</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Work</h1>
          </motion.div>

          {!loading && visible && projects.length > 0 && (
            <motion.div className="flex items-center gap-3 max-w-2xl mx-auto mb-12 px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] rounded-2xl" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <Search className="w-4 h-4 text-white/30 shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects by name..."
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none" />
              <span className="text-xs text-white/30 shrink-0 font-mono">{visibleProjects.length} project{visibleProjects.length !== 1 ? 's' : ''}</span>
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
          ) : visibleProjects.length === 0 ? (
            <p className="text-center text-white/30 text-sm py-16">No projects match "{search}".</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
