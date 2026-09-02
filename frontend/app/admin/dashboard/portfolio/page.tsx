'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { portfolioApi, getImageUrl } from '@/lib/api';
import type { PortfolioProject } from '@/types';
import { PlusCircle, Trash2, Pencil, Image as ImageIcon, ExternalLink, Eye, EyeOff } from 'lucide-react';

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [togglingVisibility, setTogglingVisibility] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([portfolioApi.getAll(), portfolioApi.getSettings()])
      .then(([projectsRes, settingsRes]) => {
        setProjects(projectsRes.data.data || []);
        setIsVisible(!!settingsRes.data.data?.isVisible);
      })
      .catch(() => { setProjects([]); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleVisibility = async () => {
    const next = !isVisible;
    setTogglingVisibility(true);
    setIsVisible(next);
    try {
      await portfolioApi.updateSettings(next);
    } catch {
      setIsVisible(!next);
    } finally {
      setTogglingVisibility(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this portfolio project?')) return;
    try {
      await portfolioApi.delete(id);
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch { /* ignore */ }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Portfolio</h1>
          <p className="text-white/50 text-sm">Projects shown on the public website's Portfolio page.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleVisibility}
            disabled={togglingVisibility}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all disabled:opacity-60 ${
              isVisible ? 'bg-[#6EE7B7]/10 border-[#6EE7B7]/30 text-[#6EE7B7]' : 'bg-white/5 border-white/10 text-white/50'
            }`}
          >
            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{isVisible ? 'Live on website' : 'Hidden from website'}</span>
            <span className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${isVisible ? 'bg-[#6EE7B7]' : 'bg-white/15'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#090909] transition-all ${isVisible ? 'left-4' : 'left-0.5'}`} />
            </span>
          </button>
          <Link href="/admin/dashboard/portfolio/new" className="btn-primary btn-primary-sm shrink-0">
            <PlusCircle className="w-4 h-4" /> Add Project
          </Link>
        </div>
      </div>

      {!isVisible && (
        <div className="mb-6 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-300">
          The Portfolio section is currently hidden from the public website. Turn it on above once you're ready to show it.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <ImageIcon className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">No portfolio projects yet</p>
          <p className="text-sm mt-1">Add one to get started.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map(p => (
            <div key={p._id} className="bg-[#161616] rounded-2xl border border-white/10 overflow-hidden group">
              <div className="aspect-video bg-white/5 relative">
                {p.images[0] ? (
                  <img src={getImageUrl(p.images[0])} alt={p.title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/15" />
                  </div>
                )}
                {p.images.length > 1 && (
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded-lg text-[11px] text-white/80">
                    +{p.images.length - 1} more
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-white text-sm leading-tight">{p.title}</h3>
                  <span className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full ${p.status === 'active' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-white/10 text-white/40'}`}>
                    {p.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {p.category && <span className="inline-block mb-1.5 px-2 py-0.5 bg-white/5 text-white/50 text-[10px] font-semibold rounded-full">{p.category}</span>}
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/dashboard/portfolio/${p._id}`} className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button onClick={() => remove(p._id)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {p.projectUrl && (
                    <a href={p.projectUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#6EE7B7] transition-colors" title="Visit project">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
