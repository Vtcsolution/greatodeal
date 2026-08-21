'use client';

import { useState, useEffect, useMemo } from 'react';
import { leadFinderApi } from '@/lib/api';
import { Search, Phone, Globe, Mail, MapPin, Star, Snowflake, Flame, Zap, Check, Loader2, AlertTriangle, Radio, Clock, HelpCircle, Building2, Linkedin, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

type Activity = 'active' | 'quiet' | 'unknown';
type SizeTier = 'small' | 'growing' | 'established' | 'large';

interface CompanyResult {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  email: string | null;
  hasLinkedIn: boolean;
  sizeTier: SizeTier;
  activity: Activity;
  lastReviewDate: string | null;
  imported?: boolean;
  keyword?: string;
  location?: string;
}

type LeadStatus = 'cold' | 'warm' | 'urgent';

const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string; icon: typeof Snowflake }> = {
  cold: { label: 'Cold', color: 'text-sky-400', bg: 'bg-sky-500/10', icon: Snowflake },
  warm: { label: 'Warm', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Flame },
  urgent: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10', icon: Zap },
};

const ACTIVITY_CONFIG: Record<Activity, { label: string; color: string; bg: string; icon: typeof Radio }> = {
  active: { label: 'Active', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: Radio },
  quiet: { label: 'Quiet', color: 'text-white/40', bg: 'bg-white/5', icon: Clock },
  unknown: { label: 'No reviews yet', color: 'text-white/30', bg: 'bg-white/5', icon: HelpCircle },
};

const SIZE_CONFIG: Record<SizeTier, { label: string; color: string; bg: string }> = {
  large: { label: 'Large', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  established: { label: 'Established', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  growing: { label: 'Growing', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  small: { label: 'Small', color: 'text-white/30', bg: 'bg-white/5' },
};

function formatMonthYear(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function LeadFinderPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [importedIds, setImportedIds] = useState<Record<string, 'importing' | 'done' | 'exists' | 'error'>>({});
  const [leadStatusPick, setLeadStatusPick] = useState<Record<string, LeadStatus>>({});
  const [activeOnly, setActiveOnly] = useState(false);
  const [establishedOnly, setEstablishedOnly] = useState(false);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [keywordFilter, setKeywordFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [minReviews, setMinReviews] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Every company Lead Finder has ever found is saved server-side, so a
  // refresh (or coming back tomorrow) doesn't lose the list or burn more
  // Google API quota re-searching the same thing.
  useEffect(() => {
    leadFinderApi.getProspects()
      .then(res => {
        const saved: CompanyResult[] = res.data.data || [];
        setResults(saved);
        const importedState: Record<string, 'done'> = {};
        saved.forEach(p => { if (p.imported) importedState[p.placeId] = 'done'; });
        setImportedIds(importedState);
      })
      .catch(() => {})
      .finally(() => setLoadingSaved(false));
  }, []);

  // Every distinct keyword/location that's actually been searched, so the
  // dropdowns only ever show real, applied searches — never guesses.
  const keywordHistory = useMemo(
    () => Array.from(new Set(results.map(r => r.keyword).filter((k): k is string => !!k))).sort(),
    [results]
  );
  const locationHistory = useMemo(
    () => Array.from(new Set(results.map(r => r.location).filter((l): l is string => !!l))).sort(),
    [results]
  );

  const minReviewsNum = minReviews.trim() === '' ? 0 : Number(minReviews);

  const visibleResults = results
    .filter(r => !activeOnly || r.activity === 'active')
    .filter(r => !establishedOnly || r.sizeTier !== 'small')
    .filter(r => !keywordFilter || r.keyword === keywordFilter)
    .filter(r => !locationFilter || r.location === locationFilter)
    .filter(r => minRating === 0 || (r.rating !== null && r.rating >= minRating))
    .filter(r => !minReviewsNum || r.ratingCount >= minReviewsNum);

  const totalPages = Math.max(1, Math.ceil(visibleResults.length / pageSize));
  const pagedResults = visibleResults.slice((page - 1) * pageSize, page * pageSize);

  // Any filter or page-size change should snap back to page 1 rather than
  // leaving the view stuck on a now-invalid page.
  useEffect(() => { setPage(1); }, [activeOnly, establishedOnly, keywordFilter, locationFilter, minRating, minReviews, pageSize]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !location.trim()) return;
    setSearching(true);
    setSearchError('');
    try {
      const res = await leadFinderApi.search(keyword.trim(), location.trim());
      const fresh: CompanyResult[] = res.data.data || [];
      // Merge into whatever's already on screen (saved from before + earlier
      // searches this session) instead of throwing that away.
      setResults(prev => {
        const byId = new Map(prev.map(r => [r.placeId, r]));
        fresh.forEach(r => byId.set(r.placeId, { ...byId.get(r.placeId), ...r }));
        return Array.from(byId.values()).sort((a, b) => b.ratingCount - a.ratingCount);
      });
    } catch (err: any) {
      setSearchError(err?.response?.data?.message || 'Search failed. Check the server logs / API key configuration.');
    } finally {
      setSearching(false);
    }
  };

  const handleImport = async (company: CompanyResult) => {
    if (!company.email) return;
    setImportedIds(prev => ({ ...prev, [company.placeId]: 'importing' }));
    try {
      await leadFinderApi.import({
        placeId: company.placeId,
        name: company.name,
        email: company.email,
        phone: company.phone,
        website: company.website,
        address: company.address,
        services: keyword,
        leadStatus: leadStatusPick[company.placeId] || 'cold',
      });
      setImportedIds(prev => ({ ...prev, [company.placeId]: 'done' }));
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setImportedIds(prev => ({ ...prev, [company.placeId]: 'exists' }));
      } else {
        setImportedIds(prev => ({ ...prev, [company.placeId]: 'error' }));
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Lead Finder</h1>
      <p className="text-white/50 text-sm mb-6 sm:mb-8">
        Search for companies by industry and location. Results are sorted biggest-first (by review volume, the closest free signal to scale) so you reach the businesses with real budget for automation before the small ones.
      </p>

      <form onSubmit={handleSearch} className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Industry / keyword</label>
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. dental clinics, real estate agencies"
              list="keyword-history"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 transition-all"
            />
            <datalist id="keyword-history">
              {keywordHistory.map(k => <option key={k} value={k} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Lahore, Pakistan"
              list="location-history"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 transition-all"
            />
            <datalist id="location-history">
              {locationHistory.map(l => <option key={l} value={l} />)}
            </datalist>
          </div>
        </div>
        <button
          type="submit"
          disabled={searching || !keyword.trim() || !location.trim()}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-[#0D0D0D] font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
        >
          {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {searching ? 'Searching…' : 'Search companies'}
        </button>
      </form>

      {searchError && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-300 mb-6">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{searchError}</span>
        </div>
      )}

      {loadingSaved && (
        <div className="flex items-center justify-center py-16 text-white/40 text-sm gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading previously found companies…
        </div>
      )}

      {searching && (
        <div className="flex items-center justify-center py-16 text-white/40 text-sm gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Searching Google Places and scanning company websites for contact emails…
        </div>
      )}

      {!loadingSaved && !searching && results.length > 0 && (
        <div className="bg-[#161616] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-white/10">
            <div className="text-sm text-white/50 mb-4">
              Saved automatically — sorted largest business first. {results.length} operating companies found so far ·{' '}
              {results.filter(r => r.email).length} with a discoverable email · {results.filter(r => r.activity === 'active').length} recently active
              {visibleResults.length !== results.length && <> · <span className="text-[#6EE7B7]">{visibleResults.length} match current filters</span></>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-white/40 mr-1"><Filter className="w-3.5 h-3.5" />Filter by:</div>
              <select value={keywordFilter} onChange={e => setKeywordFilter(e.target.value)}
                className="px-3 py-2 bg-[#0D0D0D] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#6EE7B7]/40">
                <option value="">All industries</option>
                {keywordHistory.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
              <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
                className="px-3 py-2 bg-[#0D0D0D] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#6EE7B7]/40">
                <option value="">All locations</option>
                {locationHistory.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={minRating} onChange={e => setMinRating(Number(e.target.value))}
                className="px-3 py-2 bg-[#0D0D0D] border border-white/10 rounded-xl text-xs text-white outline-none focus:border-[#6EE7B7]/40">
                <option value={0}>Any rating</option>
                <option value={2}>2+ stars</option>
                <option value={3}>3+ stars</option>
                <option value={4}>4+ stars</option>
                <option value={4.5}>4.5+ stars</option>
              </select>
              <input
                type="number"
                min={0}
                value={minReviews}
                onChange={e => setMinReviews(e.target.value)}
                placeholder="Min reviews (e.g. 40)"
                className="w-36 px-3 py-2 bg-[#0D0D0D] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 outline-none focus:border-[#6EE7B7]/40"
              />
              <div className="w-px h-5 bg-white/10 mx-1" />
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={establishedOnly}
                  onChange={e => setEstablishedOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#6EE7B7] bg-[#0F0F0F] border-white/20"
                />
                <span className="text-xs text-white/60">Established+ only (20+ reviews)</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={activeOnly}
                  onChange={e => setActiveOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#6EE7B7] bg-[#0F0F0F] border-white/20"
                />
                <span className="text-xs text-white/60">Only recently active</span>
              </label>
            </div>
          </div>
          {visibleResults.length === 0 && (
            <div className="p-8 text-center text-white/30 text-sm">No results match these filters — try unchecking one.</div>
          )}
          <div className="divide-y divide-white/5">
            {pagedResults.map((c) => {
              const status = importedIds[c.placeId];
              const picked = leadStatusPick[c.placeId] || 'cold';
              return (
                <div key={c.placeId} className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-white text-sm sm:text-base">{c.name}</h3>
                      {c.rating !== null && (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />{c.rating} ({c.ratingCount})
                        </span>
                      )}
                      <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${SIZE_CONFIG[c.sizeTier].bg} ${SIZE_CONFIG[c.sizeTier].color}`} title="Based on review count, the closest free signal to business scale">
                        <Building2 className="w-3 h-3" />{SIZE_CONFIG[c.sizeTier].label}
                      </span>
                      {c.hasLinkedIn && (
                        <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#0A66C2]/10 text-[#4A9FE0]" title="Website links to a LinkedIn company page">
                          <Linkedin className="w-3 h-3" />LinkedIn
                        </span>
                      )}
                      {(() => {
                        const cfg = ACTIVITY_CONFIG[c.activity];
                        const Icon = cfg.icon;
                        return (
                          <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`} title={c.lastReviewDate ? `Last review: ${formatMonthYear(c.lastReviewDate)}` : undefined}>
                            <Icon className="w-3 h-3" />{cfg.label}{c.activity !== 'unknown' && c.lastReviewDate ? ` · ${formatMonthYear(c.lastReviewDate)}` : ''}
                          </span>
                        );
                      })()}
                    </div>
                    <div className="flex flex-col gap-1 mt-2 text-xs text-white/50">
                      {c.address && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" />{c.address}</span>}
                      {c.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 shrink-0" />{c.phone}</span>}
                      {c.website && (
                        <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#6EE7B7] transition-colors truncate">
                          <Globe className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{c.website}</span>
                        </a>
                      )}
                      <span className={`flex items-center gap-1.5 ${c.email ? 'text-emerald-400' : 'text-white/30'}`}>
                        <Mail className="w-3.5 h-3.5 shrink-0" />{c.email || 'No public email found'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {c.email && status !== 'done' && (
                      <div className="flex items-center gap-1 bg-[#0D0D0D] border border-white/10 rounded-xl p-1">
                        {(Object.keys(LEAD_STATUS_CONFIG) as LeadStatus[]).map((key) => {
                          const cfg = LEAD_STATUS_CONFIG[key];
                          const Icon = cfg.icon;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setLeadStatusPick(prev => ({ ...prev, [c.placeId]: key }))}
                              className={`p-2 rounded-lg transition-all ${picked === key ? `${cfg.bg} ${cfg.color}` : 'text-white/30 hover:text-white/60'}`}
                              title={cfg.label}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {!c.email ? (
                      <span className="text-xs text-white/30 px-3 py-2">Not importable</span>
                    ) : status === 'done' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 px-3 py-2">
                        <Check className="w-4 h-4" />Imported
                      </span>
                    ) : status === 'exists' ? (
                      <span className="text-xs font-medium text-amber-400 px-3 py-2">Already a contact</span>
                    ) : status === 'error' ? (
                      <span className="text-xs font-medium text-red-400 px-3 py-2">Import failed</span>
                    ) : (
                      <button
                        onClick={() => handleImport(c)}
                        disabled={status === 'importing'}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#6EE7B7]/15 text-[#6EE7B7] text-xs font-semibold rounded-xl hover:bg-[#6EE7B7]/25 transition-all disabled:opacity-50"
                      >
                        {status === 'importing' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                        Import as {LEAD_STATUS_CONFIG[picked].label} Lead
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {visibleResults.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span>Show</span>
                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}
                  className="px-2.5 py-1.5 bg-[#0D0D0D] border border-white/10 rounded-lg text-xs text-white outline-none focus:border-[#6EE7B7]/40">
                  {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <span>per page &middot; {visibleResults.length} total</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-white/50 px-2">Page {page} of {totalPages}</span>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {!loadingSaved && !searching && results.length === 0 && !searchError && (
        <div className="text-center py-16 text-white/30 text-sm">Search for an industry and location above to find companies to reach out to.</div>
      )}
    </div>
  );
}
