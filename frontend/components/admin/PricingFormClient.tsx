'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { pricingApi } from '@/lib/api';
import type { PricingTier } from '@/types';
import { Save, ArrowLeft, X, Plus, Loader2 } from 'lucide-react';

const inputCls = 'w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 transition-all';
const labelCls = 'block text-xs font-medium text-white/50 mb-1.5';

export default function PricingFormClient({ tier }: { tier?: PricingTier }) {
  const router = useRouter();
  const isNew = !tier;

  const [title, setTitle] = useState(tier?.title || '');
  const [badge, setBadge] = useState(tier?.badge || '');
  const [description, setDescription] = useState(tier?.description || '');
  const [currency, setCurrency] = useState(tier?.currency || '$');
  const [price, setPrice] = useState(tier?.price || '');
  const [priceSuffix, setPriceSuffix] = useState(tier?.priceSuffix || '');
  const [order, setOrder] = useState(tier?.order ?? 0);
  const [features, setFeatures] = useState<string[]>(tier?.features || []);
  const [newFeature, setNewFeature] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures(prev => [...prev, newFeature.trim()]);
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !price.trim()) {
      setError('Title, description, and price are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: title.trim(),
        badge: badge.trim(),
        description: description.trim(),
        currency: currency.trim() || '$',
        price: price.trim(),
        priceSuffix: priceSuffix.trim(),
        order,
        features,
      };
      if (isNew) {
        await pricingApi.create(payload);
      } else {
        await pricingApi.update(tier!._id, payload);
      }
      router.push('/admin/dashboard/pricing');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save pricing tier.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <button onClick={() => router.push('/admin/dashboard/pricing')} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{isNew ? 'Add Pricing Tier' : 'Edit Pricing Tier'}</h1>
          <p className="text-white/50 text-sm mt-0.5">Shown on the public /pricing page when it's turned on.</p>
        </div>
      </div>

      {error && <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>}

      <div className="bg-[#161616] rounded-2xl border border-white/10 p-5 sm:p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Website" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Badge (optional)</label>
            <input value={badge} onChange={e => setBadge(e.target.value)} placeholder="e.g. Most Chosen" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="One or two sentences describing what's included." className={`${inputCls} resize-none`} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Currency</label>
            <input value={currency} onChange={e => setCurrency(e.target.value)} placeholder="$" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price</label>
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 1,000 or Custom" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Price suffix (optional)</label>
            <input value={priceSuffix} onChange={e => setPriceSuffix(e.target.value)} placeholder="e.g. /mo, +, /sprint" className={inputCls} />
          </div>
        </div>

        <div className="w-40">
          <label className={labelCls}>Display order</label>
          <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className={inputCls} />
          <p className="text-[11px] text-white/30 mt-1">Lower numbers show first.</p>
        </div>

        <div>
          <label className={labelCls}>Features included</label>
          <div className="space-y-2 mb-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 px-3 py-2 bg-[#0F0F0F] border border-white/10 rounded-lg text-sm text-white/80">{f}</span>
                <button onClick={() => removeFeature(i)} className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newFeature}
              onChange={e => setNewFeature(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              placeholder="e.g. CMS + SEO Foundation"
              className={inputCls}
            />
            <button onClick={addFeature} className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm font-semibold shrink-0 transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSubmit} disabled={saving} className="btn-primary btn-primary-sm disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Create Tier' : 'Save Changes'}
          </button>
          <button onClick={() => router.push('/admin/dashboard/pricing')} className="px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
