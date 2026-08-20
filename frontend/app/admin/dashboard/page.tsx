'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { adminApi, blogApi, contactApi } from '@/lib/api';
import type { BusinessOverview } from '@/types';
import {
  FileText, MessageSquare, Mail, Eye, Users, TrendingUp, DollarSign, Trophy,
  Snowflake, Flame, Zap, ArrowUpRight, MailCheck, MailOpen, Wallet, Wrench,
} from 'lucide-react';

const ACCENT = '#6EE7B7';
const LEAD_STATUS_COLOR: Record<string, string> = { cold: '#38BDF8', warm: '#FBBF24', urgent: '#F87171' };
const LEAD_STATUS_ICON: Record<string, typeof Snowflake> = { cold: Snowflake, warm: Flame, urgent: Zap };

function money(n: number, compact = false): string {
  if (compact && Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function monthLabel(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString('en-US', { month: 'short' });
}

function RevenueChart({ data }: { data: { month: string; revenue: number; count: number }[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const W = 800;
  const H = 240;
  const PAD_X = 16;
  const PAD_TOP = 16;
  const PAD_BOTTOM = 28;
  const max = Math.max(1, ...data.map(d => d.revenue));
  const barW = (W - PAD_X * 2) / data.length;

  const hp = hoverIdx !== null ? data[hoverIdx] : null;

  const handleMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    const idx = Math.min(data.length - 1, Math.max(0, Math.floor((relX - PAD_X) / barW)));
    setHoverIdx(idx);
  };

  if (data.every(d => d.revenue === 0)) {
    return <div className="h-[240px] flex items-center justify-center text-white/30 text-sm">No revenue recorded yet — close a deal and set up its project to see it here.</div>;
  }

  return (
    <div className="relative">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-[240px]" onMouseMove={handleMove} onMouseLeave={() => setHoverIdx(null)}>
        {[0.25, 0.5, 0.75].map(f => (
          <line key={f} x1={PAD_X} x2={W - PAD_X} y1={PAD_TOP + f * (H - PAD_TOP - PAD_BOTTOM)} y2={PAD_TOP + f * (H - PAD_TOP - PAD_BOTTOM)} stroke="#2c2c2a" strokeWidth={1} />
        ))}
        {data.map((d, i) => {
          const barH = (d.revenue / max) * (H - PAD_TOP - PAD_BOTTOM);
          const x = PAD_X + i * barW;
          const y = H - PAD_BOTTOM - barH;
          const isHover = hoverIdx === i;
          return (
            <g key={d.month}>
              <rect x={x + barW * 0.18} y={y} width={barW * 0.64} height={Math.max(barH, d.revenue > 0 ? 2 : 0)} rx={4}
                fill={isHover ? ACCENT : d.revenue > 0 ? `${ACCENT}CC` : 'transparent'} />
              <text x={x + barW / 2} y={H - 10} textAnchor="middle" fontSize="11" fill={isHover ? '#fff' : 'rgba(255,255,255,0.35)'}>{monthLabel(d.month)}</text>
            </g>
          );
        })}
        {hp && (
          <line x1={PAD_X + (hoverIdx as number) * barW + barW / 2} x2={PAD_X + (hoverIdx as number) * barW + barW / 2}
            y1={PAD_TOP} y2={H - PAD_BOTTOM} stroke="#ffffff" strokeOpacity={0.1} strokeWidth={1} />
        )}
      </svg>
      {hp && hoverIdx !== null && (
        <div className="absolute top-2 -translate-x-1/2 bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs pointer-events-none shadow-xl z-10"
          style={{ left: `${((PAD_X + hoverIdx * barW + barW / 2) / W) * 100}%` }}>
          <div className="text-white/40 mb-0.5">{new Date(Number(hp.month.split('-')[0]), Number(hp.month.split('-')[1]) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
          <div className="text-white font-semibold tabular-nums">{money(hp.revenue)}{hp.count ? ` · ${hp.count} deal${hp.count > 1 ? 's' : ''}` : ''}</div>
        </div>
      )}
    </div>
  );
}

function BarRow({ label, count, max, color, icon: Icon }: { label: string; count: number; max: number; color: string; icon?: typeof Snowflake }) {
  const pct = Math.max(3, Math.round((count / max) * 100));
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-sm text-white/80 capitalize">{Icon && <Icon className="w-3.5 h-3.5" style={{ color }} />}{label}</span>
        <span className="text-xs text-white/40 tabular-nums">{count}</span>
      </div>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<BusinessOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState<Array<{ _id: string; title: string; views: number; date: string; category: string }>>([]);
  const [recentContacts, setRecentContacts] = useState<Array<{ _id: string; fullName: string; email: string; services: string; status: string; createdAt: string }>>([]);

  useEffect(() => {
    Promise.all([
      adminApi.getBusinessOverview().catch(() => ({ data: { data: null } })),
      blogApi.getAll({ limit: 5 }).catch(() => ({ data: { data: [] } })),
      contactApi.getAll().catch(() => ({ data: { data: [] } })),
    ]).then(([overviewRes, blogsRes, contactsRes]) => {
      setOverview(overviewRes.data.data);
      setRecentBlogs((blogsRes.data.data || []).slice(0, 5));
      setRecentContacts((contactsRes.data.data || []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const maxLeadStatus = useMemo(() => Math.max(1, ...(overview?.leads.byStatus.map(s => s.count) || [1])), [overview]);
  const maxSource = useMemo(() => Math.max(1, ...(overview?.leads.bySource.map(s => s.count) || [1])), [overview]);

  if (loading) return (
    <div className="p-6 sm:p-8 flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const sourceLabel = (s: string) => (s === 'lead_finder' ? 'Lead Finder' : 'Contact Form');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Business Overview</h1>
      <p className="text-white/50 text-sm mb-6 sm:mb-8">Leads, email performance, and revenue at a glance.</p>

      {overview && (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { icon: Users, label: 'Total Leads', value: overview.leads.total, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
              { icon: Trophy, label: 'Closed Deals', value: overview.leads.closedDeals, color: 'text-[#6EE7B7]', bg: 'bg-[#6EE7B7]/10 border-[#6EE7B7]/20' },
              { icon: DollarSign, label: 'Total Revenue', value: money(overview.revenue.totalRevenue, true), color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { icon: Wallet, label: 'Outstanding', value: money(overview.revenue.totalOutstanding, true), color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
              { icon: MailCheck, label: 'Emails Sent', value: overview.emails.sent, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
              { icon: MailOpen, label: 'Open Rate', value: `${overview.emails.openRate}%`, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`p-4 sm:p-5 rounded-2xl border ${bg}`}>
                <Icon className={`w-5 h-5 ${color} mb-2 sm:mb-3`} />
                <div className={`text-lg sm:text-2xl font-bold ${color} mb-0.5 tabular-nums`}>{value}</div>
                <div className="text-white/40 text-xs sm:text-sm">{label}</div>
              </div>
            ))}
          </div>

          {/* Revenue */}
          <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <h2 className="font-semibold text-white text-sm sm:text-base flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#6EE7B7]" />Revenue — Last 12 Months</h2>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
                <span className="text-white/40">Collected <span className="text-emerald-400 font-semibold tabular-nums">{money(overview.revenue.totalCollected)}</span></span>
                <span className="text-white/40">Expenses <span className="text-amber-400 font-semibold tabular-nums">{money(overview.revenue.totalExpenses)}</span></span>
                <span className="text-white/40">Net Profit <span className={`font-semibold tabular-nums ${overview.revenue.netProfit >= 0 ? 'text-[#6EE7B7]' : 'text-red-400'}`}>{money(overview.revenue.netProfit)}</span></span>
              </div>
            </div>
            <RevenueChart data={overview.revenue.monthly} />
            {overview.revenue.yearly.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                {overview.revenue.yearly.map(y => (
                  <div key={y.year} className="px-3 py-2 bg-white/[0.03] rounded-xl">
                    <div className="text-xs text-white/40">{y.year}</div>
                    <div className="text-sm font-bold text-white tabular-nums">{money(y.revenue)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Leads breakdown */}
            <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
              <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-[#6EE7B7]" />Leads</h2>
              <div className="space-y-3 mb-5">
                {overview.leads.byStatus.map(s => (
                  <BarRow key={s.status} label={s.status} count={s.count} max={maxLeadStatus} color={LEAD_STATUS_COLOR[s.status] || ACCENT} icon={LEAD_STATUS_ICON[s.status]} />
                ))}
              </div>
              <div className="text-xs font-medium text-white/40 mb-2">By Source</div>
              <div className="space-y-3">
                {overview.leads.bySource.map(s => (
                  <BarRow key={s.source} label={sourceLabel(s.source)} count={s.count} max={maxSource} color="#3987e5" />
                ))}
              </div>
            </div>

            {/* Email engagement */}
            <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
              <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2"><Mail className="w-4 h-4 text-[#6EE7B7]" />Email Engagement</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 bg-white/[0.03] rounded-xl text-center">
                  <div className="text-lg font-bold text-white tabular-nums">{overview.emails.sent}</div>
                  <div className="text-[11px] text-white/40">Sent</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-xl text-center">
                  <div className="text-lg font-bold text-[#6EE7B7] tabular-nums">{overview.emails.opened}</div>
                  <div className="text-[11px] text-white/40">Opened</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-xl text-center">
                  <div className="text-lg font-bold text-blue-400 tabular-nums">{overview.leads.replied}</div>
                  <div className="text-[11px] text-white/40">Replied</div>
                </div>
              </div>
              <BarRow label="Opened" count={overview.emails.opened} max={Math.max(1, overview.emails.sent)} color={ACCENT} />
              <p className="text-[11px] text-white/30 mt-4">{overview.emails.openRate}% of sent emails have been opened at least once.</p>
            </div>
          </div>

          {/* Top projects */}
          {overview.topProjects.length > 0 && (
            <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
              <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2"><Wrench className="w-4 h-4 text-[#6EE7B7]" />Top Projects by Value</h2>
              <div className="space-y-1">
                {overview.topProjects.map(p => (
                  <Link key={p._id} href={`/admin/dashboard/projects/${p._id}`} className="flex items-center justify-between gap-3 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-2 px-2 rounded-lg transition-colors group">
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white/90 truncate group-hover:text-[#6EE7B7] transition-colors">{p.projectName}</div>
                      <div className="text-xs text-white/40">{p.clientName} · {new Date(p.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-white tabular-nums">{money(p.budget)}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#6EE7B7] transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Blogs */}
        <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
          <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#6EE7B7]" />Recent Blogs
          </h2>
          <div className="space-y-1">
            {recentBlogs.length === 0 && <p className="text-white/40 text-sm py-4">No blogs yet.</p>}
            {recentBlogs.map(b => (
              <div key={b._id} className="flex items-start justify-between gap-3 py-3 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90 truncate">{b.title}</div>
                  <div className="text-xs text-white/40 flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">{b.category}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{b.views}</span>
                  </div>
                </div>
                <div className="text-xs text-white/30 shrink-0">{new Date(b.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
          <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#6EE7B7]" />Recent Inquiries
          </h2>
          <div className="space-y-1">
            {recentContacts.length === 0 && <p className="text-white/40 text-sm py-4">No contacts yet.</p>}
            {recentContacts.map(c => (
              <div key={c._id} className="flex items-start justify-between gap-3 py-3 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90">{c.fullName}</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">{c.email}</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">{c.services}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full shrink-0 font-medium ${c.status === 'new' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
