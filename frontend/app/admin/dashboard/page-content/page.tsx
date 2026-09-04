'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { pageContentApi } from '@/lib/api';
import { PAGE_CONTENT_SCHEMAS, type PageContentSchema } from '@/lib/pageContentSchema';
import { Pencil, ExternalLink, PenSquare } from 'lucide-react';

const mainPages = PAGE_CONTENT_SCHEMAS.filter(s => !s.page.startsWith('industries-'));
const industryPages = PAGE_CONTENT_SCHEMAS.filter(s => s.page.startsWith('industries-'));

export default function PageContentListPage() {
  const [customizedPages, setCustomizedPages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageContentApi.getAll()
      .then(res => {
        const map: Record<string, number> = {};
        (res.data.data || []).forEach((entry: { page: string; fields: Record<string, string> }) => {
          const count = Object.values(entry.fields || {}).filter(v => v && v.trim()).length;
          if (count > 0) map[entry.page] = count;
        });
        setCustomizedPages(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Page Content</h1>
        <p className="text-white/50 text-sm">Edit the headline, description, and button text on each page's hero section — changes go live immediately, no deploy needed. Anything left blank keeps the site's default copy.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Main Pages</h2>
        <PageGrid schemas={mainPages} customizedPages={customizedPages} loading={loading} />
      </div>

      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Industry Pages</h2>
        <PageGrid schemas={industryPages} customizedPages={customizedPages} loading={loading} />
      </div>
    </div>
  );
}

function PageGrid({ schemas, customizedPages, loading }: { schemas: PageContentSchema[]; customizedPages: Record<string, number>; loading: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {schemas.map(schema => {
        const editedCount = customizedPages[schema.page] || 0;
        return (
          <Link key={schema.page} href={`/admin/dashboard/page-content/${schema.page}`}
            className="group bg-[#161616] rounded-2xl border border-white/10 hover:border-[#6EE7B7]/30 p-5 transition-all">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#6EE7B7]/10 flex items-center justify-center shrink-0">
                <PenSquare className="w-4.5 h-4.5 text-[#6EE7B7]" />
              </div>
              <a href={schema.path} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="p-1.5 text-white/30 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-colors" title="View live page">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <h3 className="font-bold text-white text-base mb-1">{schema.label}</h3>
            <p className="text-white/40 text-xs font-mono mb-3">{schema.path}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${editedCount > 0 ? 'text-[#6EE7B7]' : 'text-white/30'}`}>
                {loading ? '...' : editedCount > 0 ? `${editedCount} field${editedCount !== 1 ? 's' : ''} customized` : 'Using default copy'}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                <Pencil className="w-3.5 h-3.5" /> Edit
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
