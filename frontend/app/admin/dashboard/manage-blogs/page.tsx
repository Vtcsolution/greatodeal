'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogApi, getImageUrl } from '@/lib/api';
import { PlusCircle, Trash2, Eye, Star, TrendingUp, Search, Pencil } from 'lucide-react';
import type { Blog } from '@/types';

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    blogApi.getAll({ limit: 100 })
      .then(res => setBlogs(res.data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await blogApi.delete(id);
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch { /* ignore */ } finally { setDeleting(null); setConfirmDelete(null); }
  };

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Manage Blogs</h1>
          <p className="text-white/50 text-sm">{blogs.length} total posts</p>
        </div>
        <Link href="/admin/dashboard/add-blog" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#6EE7B7] text-[#121212] rounded-xl font-semibold hover:bg-[#5CD7A5] transition-all text-sm shrink-0">
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input placeholder="Search blogs..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-sm text-white placeholder-white/30" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-[#161616] rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left p-4">Post</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-center p-4">Views</th>
                  <th className="text-center p-4">Flags</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(blog => (
                  <tr key={blog._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {blog.image && (
                          <img src={getImageUrl(blog.image)} alt={blog.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="font-medium text-white/90 truncate max-w-xs">{blog.title}</div>
                          <div className="text-white/30 text-xs mt-0.5">{new Date(blog.date || blog.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/60">{blog.category}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="flex items-center justify-center gap-1 text-white/40 text-xs">
                        <Eye className="w-3.5 h-3.5" />{blog.views}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {blog.featured && <span title="Featured"><Star className="w-3.5 h-3.5 text-amber-400" /></span>}
                        {blog.trending && <span title="Trending"><TrendingUp className="w-3.5 h-3.5 text-blue-400" /></span>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/blog/${blog._id}`} target="_blank"
                          className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all" title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/dashboard/edit-blog/${blog._id}`}
                          className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        {confirmDelete === blog._id ? (
                          <div className="flex items-center gap-1.5 ml-1">
                            <button onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition-all disabled:opacity-50">
                              {deleting === blog._id ? '...' : 'Yes'}
                            </button>
                            <button onClick={() => setConfirmDelete(null)} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs text-white/60">No</button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmDelete(blog._id)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-12 text-center text-white/30">No blog posts found.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.length === 0 && (
              <div className="p-12 text-center text-white/30 bg-[#161616] rounded-2xl border border-white/10">No blog posts found.</div>
            )}
            {filtered.map(blog => (
              <div key={blog._id} className="bg-[#161616] rounded-2xl border border-white/10 p-4">
                <div className="flex gap-3 mb-3">
                  {blog.image && (
                    <img src={getImageUrl(blog.image)} alt={blog.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-white/90 text-sm line-clamp-2">{blog.title}</div>
                    <div className="text-white/30 text-xs mt-1">{new Date(blog.date || blog.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-white/60">{blog.category}</span>
                  <span className="flex items-center gap-1 text-white/40 text-xs"><Eye className="w-3 h-3" />{blog.views}</span>
                  {blog.featured && <Star className="w-3.5 h-3.5 text-amber-400" />}
                  {blog.trending && <TrendingUp className="w-3.5 h-3.5 text-blue-400" />}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <Link href={`/blog/${blog._id}`} target="_blank"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-white/50 hover:text-[#6EE7B7] bg-white/5 rounded-xl text-xs font-medium transition-all">
                    <Eye className="w-3.5 h-3.5" />View
                  </Link>
                  <Link href={`/admin/dashboard/edit-blog/${blog._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-white/50 hover:text-[#6EE7B7] bg-white/5 rounded-xl text-xs font-medium transition-all">
                    <Pencil className="w-3.5 h-3.5" />Edit
                  </Link>
                  {confirmDelete === blog._id ? (
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id}
                        className="px-3 py-2 bg-red-500 text-white rounded-xl text-xs font-semibold disabled:opacity-50">
                        {deleting === blog._id ? '...' : 'Delete'}
                      </button>
                      <button onClick={() => setConfirmDelete(null)} className="px-3 py-2 bg-white/10 rounded-xl text-xs text-white/60">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(blog._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-white/50 hover:text-red-400 bg-white/5 rounded-xl text-xs font-medium transition-all">
                      <Trash2 className="w-3.5 h-3.5" />Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
