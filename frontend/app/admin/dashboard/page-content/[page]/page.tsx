'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { pageContentApi } from '@/lib/api';
import { PAGE_CONTENT_SCHEMAS } from '@/lib/pageContentSchema';
import { ArrowLeft, Save, ExternalLink, RotateCcw, Loader2, Check } from 'lucide-react';

const inputCls = 'w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 transition-all';
const labelCls = 'block text-xs font-semibold text-white/50 mb-1.5';

export default function PageContentEditPage() {
  const params = useParams();
  const router = useRouter();
  const pageKey = params.page as string;
  const schema = PAGE_CONTENT_SCHEMAS.find(s => s.page === pageKey);

  const [fields, setFields] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!schema) { setLoading(false); return; }
    pageContentApi.getByPage(pageKey)
      .then(res => setFields(res.data.data || {}))
      .catch(() => setFields({}))
      .finally(() => setLoading(false));
  }, [pageKey, schema]);

  if (!schema) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <p className="text-white/50">Unknown page.</p>
        <Link href="/admin/dashboard/page-content" className="text-[#6EE7B7] text-sm mt-2 inline-block">Back to Page Content</Link>
      </div>
    );
  }

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await pageContentApi.update(pageKey, fields);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Could not save changes.');
    } finally {
      setSaving(false);
    }
  };

  const resetField = (key: string) => setFields(f => ({ ...f, [key]: '' }));

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const SaveButton = (
    <button onClick={save} disabled={saving} className="btn-primary btn-primary-sm disabled:opacity-60 shrink-0">
      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
      {saved ? 'Saved' : 'Save Changes'}
    </button>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => router.push('/admin/dashboard/page-content')} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white">{schema.label} Page</h1>
            <div className="flex items-center gap-3 mt-0.5">
              <p className="text-white/50 text-sm">Edits go live immediately — no rebuild needed.</p>
              <a href={schema.path} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#6EE7B7] hover:underline shrink-0">
                View live page <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">{SaveButton}</div>
      </div>

      <div className="bg-[#161616] rounded-2xl border border-white/10 p-5 sm:p-8">
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
          {schema.fields.map(field => (
            <div key={field.key} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <div className="flex items-center justify-between mb-1.5">
                <label className={labelCls + ' mb-0'}>{field.label}</label>
                {fields[field.key]?.trim() && (
                  <button onClick={() => resetField(field.key)} className="flex items-center gap-1 text-[11px] text-white/30 hover:text-white/60 transition-colors shrink-0">
                    <RotateCcw className="w-3 h-3" /> Reset to default
                  </button>
                )}
              </div>
              {field.type === 'textarea' ? (
                <textarea
                  value={fields[field.key] || ''}
                  onChange={e => setFields(f => ({ ...f, [field.key]: e.target.value }))}
                  rows={3}
                  placeholder="Leave blank to keep the site's default text"
                  className={inputCls + ' resize-none'}
                />
              ) : (
                <input
                  value={fields[field.key] || ''}
                  onChange={e => setFields(f => ({ ...f, [field.key]: e.target.value }))}
                  placeholder="Leave blank to keep the site's default text"
                  className={inputCls}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex sm:hidden items-center gap-3 mt-6">
        {SaveButton}
      </div>
    </div>
  );
}
