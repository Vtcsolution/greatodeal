'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Eye, TrendingUp, Star, FileText, ArrowRight, Sparkles, X } from 'lucide-react';
import { blogApi, getImageUrl } from '@/lib/api';
import type { Blog } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;
const categories = ['All', 'Artificial Intelligence', 'Blockchain', 'Data Science and Analytics', 'Enterprise', 'Industry', 'Software Development', 'Technology', 'UI/UX Design'];

export default function BlogListClient() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filter, setFilter] = useState<'all' | 'featured' | 'trending'>('all');

  useEffect(() => {
    const params: Record<string, unknown> = { limit: 50 };
    if (activeCategory !== 'All') params.category = activeCategory;
    if (filter === 'featured') params.featured = true;
    if (filter === 'trending') params.trending = true;
    setLoading(true);
    blogApi.getAll(params)
      .then(res => { if (res.data.success) setBlogs(res.data.data || []); })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [activeCategory, filter]);

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredBlog = filtered.find(b => b.featured);
  const restBlogs = featuredBlog ? filtered.filter(b => b._id !== featuredBlog._id) : filtered;

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-7xl relative z-10 text-center">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sparkles className="w-3.5 h-3.5" /><span className="text-[13px] font-medium">Tech Insights & Articles</span>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
            Blog &{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Insights</span>
          </motion.h1>
          <motion.p className="text-[17px] text-[#888] max-w-2xl mx-auto leading-[1.7] mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
            Expert articles on AI, software development, cloud, and technology trends from Greatodeal&apos;s engineering team.
          </motion.p>
          <motion.div className="max-w-xl mx-auto relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
            <input type="search" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-[#E5E7EB] placeholder-[#555] focus:ring-2 focus:ring-[#6EE7B7]/40 focus:border-transparent outline-none text-[15px] transition-all duration-500" />
            {searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white"><X className="w-4 h-4" /></button>}
          </motion.div>
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="sticky top-[64px] lg:top-[80px] z-20 bg-[#090909]/95 backdrop-blur-md border-y border-white/[0.04] py-3">
        <div className="container max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-2">
              {['all', 'featured', 'trending'].map(f => (
                <button key={f} onClick={() => setFilter(f as 'all' | 'featured' | 'trending')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-500 ${filter === f ? 'bg-[#6EE7B7] text-[#090909]' : 'bg-white/[0.03] border border-white/[0.06] text-[#777] hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7]'}`}>
                  {f === 'featured' && <Star className="w-3.5 h-3.5" />}
                  {f === 'trending' && <TrendingUp className="w-3.5 h-3.5" />}
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all duration-500 ${activeCategory === cat ? 'bg-[#6EE7B7] text-[#090909]' : 'border border-white/[0.06] text-[#666] hover:border-[#6EE7B7]/30 hover:text-[#6EE7B7]'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BLOG GRID ═══ */}
      <section className="py-16">
        <div className="container max-w-7xl">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.04] animate-pulse">
                  <div className="h-52 bg-white/[0.04]" />
                  <div className="p-6 space-y-3"><div className="h-3 bg-white/[0.04] rounded w-1/4" /><div className="h-5 bg-white/[0.04] rounded" /><div className="h-3 bg-white/[0.04] rounded w-3/4" /></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-16 h-16 rounded-2xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-[#6EE7B7]" /></div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">No articles found</h3>
              <p className="text-[#777] text-[15px]">Try a different search term or category.</p>
            </motion.div>
          ) : (
            <>
              {/* Featured article — large card */}
              {featuredBlog && filter !== 'trending' && (
                <motion.div className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
                  <Link href={`/blog/${featuredBlog._id}`} className="group grid md:grid-cols-2 gap-0 bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-[#6EE7B7]/20 transition-all duration-700">
                    <div className="relative h-64 md:h-auto overflow-hidden bg-white/[0.04]">
                      {featuredBlog.image && <img src={getImageUrl(featuredBlog.image)} alt={featuredBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-[#6EE7B7] text-[#090909] text-xs font-bold rounded-lg">Featured</span>
                        {featuredBlog.trending && <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs font-bold rounded-lg">Trending</span>}
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-[#6EE7B7] text-xs font-bold tracking-[0.15em] uppercase mb-3">{featuredBlog.category}</span>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-[#6EE7B7] transition-colors duration-500 tracking-tight leading-tight">{featuredBlog.title}</h2>
                      <p className="text-[#777] text-[15px] leading-relaxed mb-6 line-clamp-3">{featuredBlog.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-[#555]">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredBlog.readTime}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featuredBlog.views} views</span>
                        <span>{new Date(featuredBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              <div className="text-[#555] text-xs uppercase tracking-[0.15em] font-medium mb-6">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restBlogs.map((blog, i) => (
                  <motion.div key={blog._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.5, ease }}>
                    <Link href={`/blog/${blog._id}`} className="group bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.04] hover:border-[#6EE7B7]/20 transition-all duration-700 flex flex-col h-full block">
                      <div className="relative h-52 overflow-hidden bg-white/[0.04]">
                        {blog.image && <img src={getImageUrl(blog.image)} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {blog.featured && <span className="px-2.5 py-1 bg-[#6EE7B7] text-[#090909] text-[10px] font-bold rounded-lg uppercase tracking-wider">Featured</span>}
                          {blog.trending && <span className="px-2.5 py-1 bg-[#3B82F6] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">Trending</span>}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#090909]/80 backdrop-blur-sm rounded-lg text-[10px] text-[#6EE7B7] font-medium">{blog.category}</div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-[15px] font-bold mb-2 line-clamp-2 group-hover:text-[#6EE7B7] transition-colors duration-500 leading-snug tracking-tight">{blog.title}</h2>
                        <p className="text-[#777] text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{blog.excerpt}</p>
                        <div className="flex items-center justify-between text-[11px] text-[#555] border-t border-white/[0.04] pt-4">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views}</span>
                          </div>
                          <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
