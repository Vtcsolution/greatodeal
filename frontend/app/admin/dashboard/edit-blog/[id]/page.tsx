'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { blogApi, getImageUrl } from '@/lib/api';
import { Upload, X, Loader2 } from 'lucide-react';

const categories = [
  'Artificial Intelligence', 'Blockchain', 'Data Science and Analytics',
  'Enterprise', 'Industry', 'Software Development', 'Technology', 'UI/UX Design',
];

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '', excerpt: '', fullContent: '', category: categories[0],
    author: '', authorBio: '', readTime: '',
    featured: false, trending: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    blogApi.getByIdAdmin(id)
      .then(res => {
        const blog = res.data.data;
        setForm({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          fullContent: blog.fullContent || '',
          category: blog.category || categories[0],
          author: blog.author || '',
          authorBio: blog.authorBio || '',
          readTime: blog.readTime || '',
          featured: blog.featured || false,
          trending: blog.trending || false,
        });
        if (blog.image) setExistingImage(blog.image);
      })
      .catch(() => setError('Failed to load blog post.'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }));

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.fullContent) {
      setError('Title, excerpt, and content are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (imageFile) fd.append('image', imageFile);
      await blogApi.update(id, fd);
      router.push('/admin/dashboard/manage-blogs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update blog post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="w-8 h-8 text-[#6EE7B7] animate-spin" />
      </div>
    );
  }

  const previewSrc = imagePreview || (existingImage ? getImageUrl(existingImage) : '');

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Edit Blog Post</h1>
      <p className="text-white/50 text-sm mb-6 sm:mb-8">Update your article details and content.</p>

      {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Featured Image</label>
          <div onClick={() => fileRef.current?.click()} className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 cursor-pointer hover:border-[#6EE7B7]/50 transition-all text-center bg-[#161616]">
            {previewSrc ? (
              <div className="relative">
                <img src={previewSrc} alt="Preview" className="max-h-48 mx-auto rounded-xl object-cover" />
                <button type="button" onClick={e => { e.stopPropagation(); clearImage(); setExistingImage(''); }} className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/30">
                <Upload className="w-8 h-8" />
                <span className="text-sm">Click to upload featured image</span>
                <span className="text-xs">PNG, JPG up to 5MB</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Read Time</label>
            <input value={form.readTime} onChange={e => set('readTime', e.target.value)} placeholder="5 min read"
              className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm placeholder-white/25 transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Title *</label>
          <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Your article title..."
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-base sm:text-lg placeholder-white/25 transition-all" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Excerpt (Meta Description) *</label>
          <textarea rows={3} required value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Brief summary (shown in cards and SEO description)..."
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm placeholder-white/25 transition-all resize-none" />
          <div className="text-xs text-white/30 mt-1.5">{form.excerpt.length}/160 chars recommended for SEO</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Full Content *</label>
          <p className="text-xs text-white/30 mb-2">Supports Markdown or HTML</p>
          <textarea rows={12} required value={form.fullContent} onChange={e => set('fullContent', e.target.value)} placeholder="Write your article content here..."
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm placeholder-white/25 transition-all resize-none font-mono" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Author Name</label>
            <input value={form.author} onChange={e => set('author', e.target.value)}
              className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm placeholder-white/25 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Author Bio</label>
            <input value={form.authorBio} onChange={e => set('authorBio', e.target.value)} placeholder="CEO & Co-Founder at Greatodeal"
              className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-white text-sm placeholder-white/25 transition-all" />
          </div>
        </div>

        <div className="flex gap-6 sm:gap-8">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-[#6EE7B7]" />
            <span className="text-sm text-white/70">Mark as Featured</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.trending} onChange={e => set('trending', e.target.checked)} className="w-4 h-4 accent-[#6EE7B7]" />
            <span className="text-sm text-white/70">Mark as Trending</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" disabled={submitting}
            className="px-8 py-3 bg-[#6EE7B7] text-[#121212] rounded-xl font-semibold hover:bg-[#5CD7A5] transition-all disabled:opacity-50 text-sm">
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => router.back()}
            className="px-8 py-3 border border-white/10 rounded-xl font-semibold text-white/60 hover:border-[#6EE7B7] hover:text-white transition-all text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
