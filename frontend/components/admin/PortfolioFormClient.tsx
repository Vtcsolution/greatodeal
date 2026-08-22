'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { portfolioApi, getImageUrl } from '@/lib/api';
import type { PortfolioProject } from '@/types';
import { Save, ArrowLeft, X, ImagePlus, Loader2, Plus } from 'lucide-react';

const inputCls = 'w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 transition-all';
const labelCls = 'block text-xs font-medium text-white/50 mb-1.5';

export default function PortfolioFormClient({ project }: { project?: PortfolioProject }) {
  const router = useRouter();
  const isNew = !project;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(project?.title || '');
  const [subtitle, setSubtitle] = useState(project?.subtitle || '');
  const [description, setDescription] = useState(project?.description || '');
  const [category, setCategory] = useState(project?.category || '');
  const [year, setYear] = useState(project?.year || '');
  const [projectUrl, setProjectUrl] = useState(project?.projectUrl || '');
  const [order, setOrder] = useState(project?.order ?? 0);
  const [highlights, setHighlights] = useState<string[]>(project?.highlights || []);
  const [newHighlight, setNewHighlight] = useState('');
  const [existingImages, setExistingImages] = useState<string[]>(project?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights(prev => [...prev, newHighlight.trim()]);
    setNewHighlight('');
  };

  const removeHighlight = (index: number) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (img: string) => {
    setExistingImages(prev => prev.filter(i => i !== img));
  };

  const onSelectFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNewFiles(prev => [...prev, ...arr]);
    setNewPreviews(prev => [...prev, ...arr.map(f => URL.createObjectURL(f))]);
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Title and description are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('subtitle', subtitle.trim());
      fd.append('description', description.trim());
      fd.append('category', category.trim());
      fd.append('year', year.trim());
      fd.append('projectUrl', projectUrl.trim());
      fd.append('order', String(order));
      highlights.forEach(h => fd.append('highlights', h));
      existingImages.forEach(img => fd.append('keepImages', img));
      newFiles.forEach(f => fd.append('images', f));

      if (isNew) {
        await portfolioApi.create(fd);
      } else {
        await portfolioApi.update(project!._id, fd);
      }
      router.push('/admin/dashboard/portfolio');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <button onClick={() => router.push('/admin/dashboard/portfolio')} className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{isNew ? 'Add Portfolio Project' : 'Edit Portfolio Project'}</h1>
          <p className="text-white/50 text-sm mt-0.5">Shown on the public /portfolio page when it's turned on.</p>
        </div>
      </div>

      {error && <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>}

      <div className="bg-[#161616] rounded-2xl border border-white/10 p-5 sm:p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. NextFlow" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Subtitle (optional)</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="e.g. CRM — shown in accent color next to the title" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="What was built, for whom, and what it achieved." className={`${inputCls} resize-none`} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Category tags (optional)</label>
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. CRM · Lead Management · Payments" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Year (optional)</label>
            <input value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2026" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Project URL (optional)</label>
          <input value={projectUrl} onChange={e => setProjectUrl(e.target.value)} placeholder="https://..." className={inputCls} />
        </div>

        <div className="w-40">
          <label className={labelCls}>Display order</label>
          <input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} className={inputCls} />
          <p className="text-[11px] text-white/30 mt-1">Lower numbers show first.</p>
        </div>

        <div>
          <label className={labelCls}>Highlight pills (optional)</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F0F0F] border border-white/10 rounded-full text-sm text-white/80">
                {h}
                <button onClick={() => removeHighlight(i)} className="text-white/30 hover:text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={newHighlight}
              onChange={e => setNewHighlight(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHighlight(); } }}
              placeholder="e.g. AI Replies"
              className={inputCls}
            />
            <button onClick={addHighlight} className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 text-sm font-semibold shrink-0 transition-colors flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        <div>
          <label className={labelCls}>Images</label>
          <div className="flex flex-wrap gap-3">
            {existingImages.map(img => (
              <div key={img} className="relative w-24 h-24 rounded-xl overflow-hidden border border-white/10 group">
                <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removeExistingImage(img)} className="absolute top-1 right-1 p-1 bg-black/70 rounded-lg text-white/80 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {newPreviews.map((src, i) => (
              <div key={src} className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#6EE7B7]/30 group">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button onClick={() => removeNewFile(i)} className="absolute top-1 right-1 p-1 bg-black/70 rounded-lg text-white/80 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-1.5 text-white/40 hover:text-[#6EE7B7] hover:border-[#6EE7B7]/40 transition-colors"
            >
              <ImagePlus className="w-5 h-5" />
              <span className="text-[11px]">Add images</span>
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={e => onSelectFiles(e.target.files)} />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSubmit} disabled={saving} className="btn-primary btn-primary-sm disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Create Project' : 'Save Changes'}
          </button>
          <button onClick={() => router.push('/admin/dashboard/portfolio')} className="px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
