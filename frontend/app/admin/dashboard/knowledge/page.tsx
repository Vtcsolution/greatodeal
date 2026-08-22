'use client';

import { useState, useEffect } from 'react';
import { knowledgeApi } from '@/lib/api';
import { PlusCircle, Trash2, Link2, FolderOpen, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface PortfolioLink {
  url: string;
  description: string;
  previewImage?: string;
}

interface Category {
  name: string;
  links: PortfolioLink[];
}

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState('');
  const [addingLink, setAddingLink] = useState<string | null>(null);
  const [linkForm, setLinkForm] = useState({ url: '', description: '', previewImage: '' });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    knowledgeApi.getAll()
      .then(res => setCategories(res.data.data?.categories || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    setSaving(true);
    try {
      await knowledgeApi.addCategory({ name: newCatName.trim(), links: [] });
      setNewCatName('');
      load();
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const deleteCategory = async (name: string) => {
    if (!confirm(`Delete category "${name}" and all its links?`)) return;
    try { await knowledgeApi.deleteCategory(name); load(); } catch { /* ignore */ }
  };

  const addLink = async (categoryName: string) => {
    if (!linkForm.url.trim() || !linkForm.description.trim()) return;
    setSaving(true);
    try {
      await knowledgeApi.addLink(categoryName, linkForm);
      setLinkForm({ url: '', description: '', previewImage: '' });
      setAddingLink(null);
      load();
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const removeLink = async (catIndex: number, linkIndex: number) => {
    const updated = [...categories];
    updated[catIndex].links.splice(linkIndex, 1);
    setSaving(true);
    try { await knowledgeApi.update({ categories: updated }); load(); } catch { /* ignore */ } finally { setSaving(false); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">AI Knowledge Base</h1>
          <p className="text-white/50 text-sm">Reference categories and links AI Greato draws on when answering questions. The public Portfolio page is managed separately, under Portfolio in the sidebar.</p>
        </div>
      </div>

      {/* Add Category */}
      <div className="flex gap-3 mb-8">
        <input
          value={newCatName}
          onChange={e => setNewCatName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCategory()}
          placeholder="New category name (e.g. Web Development, AI Projects)"
          className="flex-1 px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:border-[#6EE7B7] outline-none"
        />
        <button onClick={addCategory} disabled={saving || !newCatName.trim()}
          className="btn-primary btn-primary-sm shrink-0 disabled:opacity-50">
          <PlusCircle className="w-4 h-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-white/30">
          <FolderOpen className="w-12 h-12 mx-auto mb-4" />
          <p className="text-lg">No portfolio categories yet</p>
          <p className="text-sm mt-1">Add a category above to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((cat, ci) => (
            <div key={cat.name} className="bg-[#161616] rounded-2xl border border-white/10 overflow-hidden">
              {/* Category Header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#6EE7B7]/10 rounded-xl flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-[#6EE7B7]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{cat.name}</h3>
                    <p className="text-white/40 text-sm">{cat.links.length} project{cat.links.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setAddingLink(addingLink === cat.name ? null : cat.name)}
                    className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all" title="Add link">
                    <PlusCircle className="w-5 h-5" />
                  </button>
                  <button onClick={() => deleteCategory(cat.name)}
                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete category">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add Link Form */}
              {addingLink === cat.name && (
                <div className="p-4 sm:p-5 bg-white/[0.02] border-b border-white/5">
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    <input value={linkForm.url} onChange={e => setLinkForm(p => ({ ...p, url: e.target.value }))}
                      placeholder="Project URL" className="px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:border-[#6EE7B7] outline-none" />
                    <input value={linkForm.description} onChange={e => setLinkForm(p => ({ ...p, description: e.target.value }))}
                      placeholder="Description" className="px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:border-[#6EE7B7] outline-none" />
                    <input value={linkForm.previewImage} onChange={e => setLinkForm(p => ({ ...p, previewImage: e.target.value }))}
                      placeholder="Preview image URL (optional)" className="px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl text-white placeholder-white/25 text-sm focus:border-[#6EE7B7] outline-none" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => addLink(cat.name)} disabled={saving || !linkForm.url.trim()}
                      className="btn-primary btn-primary-sm disabled:opacity-50">
                      <Link2 className="w-4 h-4" /> Add Link
                    </button>
                    <button onClick={() => { setAddingLink(null); setLinkForm({ url: '', description: '', previewImage: '' }); }}
                      className="px-4 py-2 text-white/40 hover:text-white text-sm transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Links List */}
              {cat.links.length > 0 && (
                <div className="divide-y divide-white/5">
                  {cat.links.map((link, li) => (
                    <div key={li} className="flex items-center gap-4 p-4 sm:p-5 hover:bg-white/[0.02] transition-colors">
                      {link.previewImage ? (
                        <img src={link.previewImage} alt={link.description || 'Portfolio project preview'} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-6 h-6 text-white/20" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-sm font-medium truncate">{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#6EE7B7] text-sm truncate flex items-center gap-1 hover:underline">
                          {link.url} <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                      <button onClick={() => removeLink(ci, li)}
                        className="p-2 text-white/30 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
