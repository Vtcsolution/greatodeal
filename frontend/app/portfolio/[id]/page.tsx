'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, ExternalLink, PlayCircle, Layers, FileText,
  TrendingUp, Sparkles, Wrench, ImageOff, ArrowRight, Home as HomeIcon,
} from 'lucide-react';
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

export default function PortfolioDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [allProjects, setAllProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    Promise.all([portfolioApi.getPublicById(id), portfolioApi.getPublic()])
      .then(([projectRes, listRes]) => {
        setProject(projectRes.data.data);
        setAllProjects(listRes.data.data?.projects || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const { index, prev, next } = useMemo(() => {
    const i = allProjects.findIndex(p => p._id === id);
    if (i === -1) return { index: -1, prev: null as PortfolioProject | null, next: null as PortfolioProject | null };
    const prevP = allProjects[(i - 1 + allProjects.length) % allProjects.length];
    const nextP = allProjects[(i + 1) % allProjects.length];
    return { index: i, prev: prevP, next: nextP };
  }, [allProjects, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-white/50 text-lg font-medium mb-4">This project isn&apos;t available.</p>
          <Link href="/portfolio" className="btn-primary inline-flex">Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const cat = categoryColor(project.category);

  return (
    <div className="min-h-screen bg-[#090909] text-white pt-28 pb-24">
      <div className="container max-w-[1100px] px-4 sm:px-6">
        {/* Breadcrumb + pagination */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><HomeIcon className="w-3.5 h-3.5" /> Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white/70 truncate max-w-[160px] sm:max-w-none">{project.title}</span>
          </div>
          {allProjects.length > 1 && index !== -1 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button onClick={() => router.push(`/portfolio/${prev?._id}`)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors" aria-label="Previous project">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-white/30 w-12 text-center">{index + 1}/{allProjects.length}</span>
              <button onClick={() => router.push(`/portfolio/${next?._id}`)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors" aria-label="Next project">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Banner + meta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden mb-6">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-[16/10] lg:aspect-auto bg-white/[0.03] relative">
              {project.images[0] ? (
                <img src={getImageUrl(project.images[0])} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center min-h-[220px]"><ImageOff className="w-8 h-8 text-white/10" /></div>
              )}
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{project.title}</h1>
                {project.subtitle && <span className="text-white/40 text-sm">{project.subtitle}</span>}
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span className="px-2.5 py-1 rounded-full bg-violet-500/15 text-violet-300 text-xs font-semibold">View Only</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${project.status === 'active' ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' : 'bg-white/10 text-white/40'}`}>
                  {project.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                {project.category && <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cat.bg} ${cat.text}`}>{project.category}</span>}
              </div>
              {project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-white/60 font-medium">{t}</span>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                {project.projectUrl && (
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#6EE7B7] transition-colors group">
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <span className="text-white/30">Demo URL:</span>
                    <span className="truncate group-hover:underline">{project.projectUrl}</span>
                  </a>
                )}
                {project.videoUrl && (
                  <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#6EE7B7] transition-colors group">
                    <PlayCircle className="w-4 h-4 shrink-0" />
                    <span className="text-white/30">Video URL:</span>
                    <span className="truncate group-hover:underline">{project.videoUrl}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-[#6EE7B7]" /></div>
            <h2 className="text-lg font-bold text-white">Project Overview</h2>
          </div>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{project.description}</p>
        </motion.div>

        {/* Strategic Impact */}
        {project.strategicImpact && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center shrink-0"><TrendingUp className="w-4 h-4 text-blue-300" /></div>
              <h2 className="text-lg font-bold text-white">Strategic Impact</h2>
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{project.strategicImpact}</p>
          </motion.div>
        )}

        {/* Key Features */}
        {project.keyFeatures.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0"><Sparkles className="w-4 h-4 text-amber-300" /></div>
              <h2 className="text-lg font-bold text-white">Key Features</h2>
            </div>
            <div className="space-y-4">
              {project.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/[0.05] last:border-b-0 last:pb-0">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 mt-0.5"><Wrench className="w-3.5 h-3.5 text-white/40" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{f.title}</h3>
                    {f.description && <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="text-center pt-4">
          <Link href="/contact" className="btn-primary group inline-flex">
            Discuss a Project Like This <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
