'use client';

import { useState } from 'react';
import { leadFinderApi } from '@/lib/api';
import { Search, Phone, Globe, Mail, MapPin, Star, Snowflake, Flame, Zap, Check, Loader2, AlertTriangle } from 'lucide-react';

interface CompanyResult {
  placeId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  rating: number | null;
  ratingCount: number;
  email: string | null;
}

type LeadStatus = 'cold' | 'warm' | 'urgent';

const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string; icon: typeof Snowflake }> = {
  cold: { label: 'Cold', color: 'text-sky-400', bg: 'bg-sky-500/10', icon: Snowflake },
  warm: { label: 'Warm', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Flame },
  urgent: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10', icon: Zap },
};

export default function LeadFinderPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [importedIds, setImportedIds] = useState<Record<string, 'importing' | 'done' | 'exists' | 'error'>>({});
  const [leadStatusPick, setLeadStatusPick] = useState<Record<string, LeadStatus>>({});

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !location.trim()) return;
    setSearching(true);
    setSearchError('');
    setResults([]);
    try {
      const res = await leadFinderApi.search(keyword.trim(), location.trim());
      setResults(res.data.data || []);
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
        Search for companies by industry and location, then import the ones with a discoverable email straight into your lead automation.
      </p>

      <form onSubmit={handleSearch} className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Industry / keyword</label>
            <input
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="e.g. dental clinics, real estate agencies"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-2">Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Lahore, Pakistan"
              className="w-full px-4 py-3 bg-[#0D0D0D] border border-white/10 rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 transition-all"
            />
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

      {searching && (
        <div className="flex items-center justify-center py-16 text-white/40 text-sm gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Searching Google Places and scanning company websites for contact emails…
        </div>
      )}

      {!searching && results.length > 0 && (
        <div className="bg-[#161616] rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-white/10 text-sm text-white/50">
            {results.length} companies found · {results.filter(r => r.email).length} with a discoverable email
          </div>
          <div className="divide-y divide-white/5">
            {results.map((c) => {
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
        </div>
      )}

      {!searching && results.length === 0 && !searchError && (
        <div className="text-center py-16 text-white/30 text-sm">Search for an industry and location above to find companies to reach out to.</div>
      )}
    </div>
  );
}
