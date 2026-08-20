'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { analyticsApi } from '@/lib/api';
import { Globe2, Clock, MousePointerClick, Users, Monitor, Smartphone, Tablet, TrendingUp } from 'lucide-react';

interface Summary {
  range: string;
  totalVisits: number;
  uniqueVisitors: number;
  avgDuration: number;
  avgScrollDepth: number;
  byCountry: { country: string; countryCode: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byPage: { path: string; count: number; avgDuration: number }[];
  byBrowser: { browser: string; count: number }[];
  byDay: { date: string; count: number }[];
}

const RANGES = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
  { key: 'all', label: 'All time' },
];

const DEVICE_COLOR: Record<string, string> = { desktop: '#3987e5', mobile: '#199e70', tablet: '#d95926' };
const DEVICE_ICON: Record<string, typeof Monitor> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const ACCENT = '#6EE7B7';

function formatDuration(sec: number): string {
  if (!sec) return '0s';
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

function countryFlag(code: string): string {
  if (!code || code === 'XX' || code.length !== 2) return '\u{1F310}';
  const points = code.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0));
  return String.fromCodePoint(...points);
}

function shortPath(path: string): string {
  if (path === '/') return 'Home';
  return path.length > 40 ? path.slice(0, 40) + '…' : path;
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 ${className}`}>{children}</div>;
}

function CardTitle({ icon: Icon, children }: { icon: typeof Globe2; children: React.ReactNode }) {
  return (
    <h2 className="font-semibold text-white text-sm sm:text-base mb-5 flex items-center gap-2">
      <Icon className="w-4 h-4 text-[#6EE7B7]" />
      {children}
    </h2>
  );
}

function BarList({
  items,
  renderLabel,
  renderIcon,
  color = ACCENT,
}: {
  items: { key: string; value: number; sub?: string }[];
  renderLabel: (key: string) => React.ReactNode;
  renderIcon?: (key: string) => React.ReactNode;
  color?: string | ((key: string) => string);
}) {
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="text-white/40 text-sm py-4">No data yet for this range.</p>;
  return (
    <div className="space-y-3.5">
      {items.map((item) => {
        const pct = Math.max(3, Math.round((item.value / max) * 100));
        const barColor = typeof color === 'function' ? color(item.key) : color;
        return (
          <div key={item.key}>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 min-w-0 text-sm text-white/80">
                {renderIcon && <span className="shrink-0">{renderIcon(item.key)}</span>}
                <span className="truncate">{renderLabel(item.key)}</span>
              </div>
              <span className="text-xs text-white/40 tabular-nums shrink-0">{item.value.toLocaleString()}{item.sub ? ` · ${item.sub}` : ''}</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: barColor }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VisitsLineChart({ data }: { data: { date: string; count: number }[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const W = 800;
  const H = 220;
  const PAD = 24;

  const max = Math.max(1, ...data.map((d) => d.count));
  const points = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, i) => {
      const x = data.length === 1 ? W / 2 : PAD + (i / (data.length - 1)) * (W - PAD * 2);
      const y = H - PAD - (d.count / max) * (H - PAD * 2 - 20);
      return { x, y, ...d };
    });
  }, [data, max]);

  if (data.length === 0) {
    return <div className="h-[220px] flex items-center justify-center text-white/40 text-sm">No visits recorded yet for this range.</div>;
  }

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H - PAD} L ${points[0].x} ${H - PAD} Z`;

  const handleMove: React.MouseEventHandler<SVGSVGElement> = (e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - relX);
      if (dist < best) { best = dist; nearest = i; }
    });
    setHoverIdx(nearest);
  };

  const hp = hoverIdx !== null ? points[hoverIdx] : null;

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[220px]"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={PAD} x2={W - PAD} y1={PAD + f * (H - PAD * 2 - 20)} y2={PAD + f * (H - PAD * 2 - 20)} stroke="#2c2c2a" strokeWidth={1} />
        ))}
        <path d={areaPath} fill="url(#visitsFill)" />
        <path d={linePath} fill="none" stroke={ACCENT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        {hp && <line x1={hp.x} x2={hp.x} y1={PAD} y2={H - PAD} stroke="#ffffff" strokeOpacity={0.15} strokeWidth={1} />}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={hoverIdx === i ? 5 : 3} fill={ACCENT} stroke="#161616" strokeWidth={hoverIdx === i ? 2 : 0} />
        ))}
      </svg>
      {hp && (
        <div
          className="absolute top-2 -translate-x-1/2 bg-[#0D0D0D] border border-white/10 rounded-lg px-3 py-2 text-xs pointer-events-none shadow-xl"
          style={{ left: `${(hp.x / W) * 100}%` }}
        >
          <div className="text-white/40 mb-0.5">{new Date(hp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
          <div className="text-white font-semibold tabular-nums">{hp.count.toLocaleString()} visits</div>
        </div>
      )}
    </div>
  );
}

export default function AnalyticsDashboardClient() {
  const [range, setRange] = useState('7d');
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    analyticsApi
      .getSummary(range)
      .then((res) => { if (!cancelled) setData(res.data.data); })
      .catch(() => { if (!cancelled) setData(null); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [range]);

  const statCards = [
    { icon: Users, label: 'Total Visits', value: data?.totalVisits ?? 0, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: TrendingUp, label: 'Unique Visitors', value: data?.uniqueVisitors ?? 0, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: Clock, label: 'Avg. Time on Page', value: formatDuration(data?.avgDuration ?? 0), color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { icon: MousePointerClick, label: 'Avg. Scroll Depth', value: `${data?.avgScrollDepth ?? 0}%`, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Traffic Analytics</h1>
          <p className="text-white/50 text-sm">Where visitors come from, what they read, and how they browse.</p>
        </div>
        <div className="flex items-center gap-1 bg-[#161616] border border-white/10 rounded-xl p-1 w-fit">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${range === r.key ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' : 'text-white/50 hover:text-white/80'}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-10 h-10 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Stat tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {statCards.map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`p-4 sm:p-5 rounded-2xl border ${bg}`}>
                <Icon className={`w-5 h-5 ${color} mb-2 sm:mb-3`} />
                <div className={`text-xl sm:text-2xl font-bold ${color} mb-0.5 tabular-nums`}>{value}</div>
                <div className="text-white/40 text-xs sm:text-sm">{label}</div>
              </div>
            ))}
          </div>

          {/* Visits over time */}
          <Card className="mb-6 sm:mb-8">
            <CardTitle icon={TrendingUp}>Visits over time</CardTitle>
            <VisitsLineChart data={data?.byDay || []} />
          </Card>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Top countries */}
            <Card>
              <CardTitle icon={Globe2}>Top Countries</CardTitle>
              <BarList
                items={(data?.byCountry || []).map((c) => ({ key: c.country, value: c.count }))}
                renderLabel={(key) => key}
                renderIcon={(key) => {
                  const c = data?.byCountry.find((x) => x.country === key);
                  return <span className="text-base leading-none">{countryFlag(c?.countryCode || '')}</span>;
                }}
              />
            </Card>

            {/* Device breakdown */}
            <Card>
              <CardTitle icon={Monitor}>Devices</CardTitle>
              <BarList
                items={(data?.byDevice || []).map((d) => ({ key: d.device, value: d.count }))}
                renderLabel={(key) => key.charAt(0).toUpperCase() + key.slice(1)}
                renderIcon={(key) => {
                  const Icon = DEVICE_ICON[key] || Monitor;
                  return <Icon className="w-4 h-4 text-white/40" />;
                }}
                color={(key) => DEVICE_COLOR[key] || ACCENT}
              />
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Top pages */}
            <Card>
              <CardTitle icon={MousePointerClick}>Most Visited Pages</CardTitle>
              <BarList
                items={(data?.byPage || []).map((p) => ({ key: p.path, value: p.count, sub: formatDuration(Math.round(p.avgDuration)) }))}
                renderLabel={(key) => shortPath(key)}
              />
            </Card>

            {/* Browsers */}
            <Card>
              <CardTitle icon={Globe2}>Browsers</CardTitle>
              <BarList
                items={(data?.byBrowser || []).map((b) => ({ key: b.browser, value: b.count }))}
                renderLabel={(key) => key}
                color="#3987e5"
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
