'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectApi } from '@/lib/api';
import type { Project, ProjectStatus } from '@/types';
import { Briefcase, DollarSign, Calendar, ArrowRight } from 'lucide-react';

const STATUS_CONFIG: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  planning: { label: 'Planning', color: 'text-white/60', bg: 'bg-white/5' },
  in_progress: { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  on_hold: { label: 'On Hold', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  cancelled: { label: 'Cancelled', color: 'text-red-400', bg: 'bg-red-500/10' },
};

function money(n: number, currency: string): string {
  return `${currency} ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectApi.getAll()
      .then(res => setProjects(res.data.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const totals = projects.reduce(
    (acc, p) => ({
      budget: acc.budget + (p.budget || 0),
      due: acc.due + Math.max(p.amountDue || 0, 0),
    }),
    { budget: 0, due: 0 }
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Projects</h1>
        <p className="text-white/50 text-sm">Closed deals become projects here — budget, milestones, and costs in one place.</p>
      </div>

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="p-4 sm:p-5 rounded-2xl border bg-white/[0.03] border-white/10">
            <div className="text-xl sm:text-2xl font-bold text-white mb-0.5">{projects.length}</div>
            <div className="text-white/40 text-xs sm:text-sm">Total Projects</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border bg-[#6EE7B7]/10 border-[#6EE7B7]/20">
            <div className="text-xl sm:text-2xl font-bold text-[#6EE7B7] mb-0.5 tabular-nums">{money(totals.budget, 'USD')}</div>
            <div className="text-white/40 text-xs sm:text-sm">Total Budget Value</div>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl border bg-blue-500/10 border-blue-500/20">
            <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-0.5 tabular-nums">{money(totals.due, 'USD')}</div>
            <div className="text-white/40 text-xs sm:text-sm">Outstanding to Collect</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-white/30 text-sm">
          <Briefcase className="w-10 h-10 mx-auto mb-3 text-white/10" />
          No projects yet. Mark a lead&apos;s deal as closed on the Leads / Emails page to set one up.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(p => {
            const cfg = STATUS_CONFIG[p.status];
            return (
              <Link key={p._id} href={`/admin/dashboard/projects/${p._id}`}
                className="group bg-[#161616] rounded-2xl border border-white/10 hover:border-[#6EE7B7]/30 p-4 sm:p-5 transition-all">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-white text-sm sm:text-base group-hover:text-[#6EE7B7] transition-colors">{p.projectName}</h3>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                </div>
                <p className="text-xs text-white/40 mb-3">{p.clientName}{p.company ? ` · ${p.company}` : ''}</p>
                <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{money(p.budget, p.currency)}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(p.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/30">{p.features.filter(f => f.done).length}/{p.features.length} features · {p.milestones.filter(m => m.status === 'done').length}/{p.milestones.length} milestones</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#6EE7B7] group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
