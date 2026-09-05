'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Eye, TrendingUp, Star, FileText, ArrowRight, ArrowUpRight, Sparkles, X, RotateCcw, Layers } from 'lucide-react';
import { blogApi, getImageUrl } from '@/lib/api';
import type { Blog } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;
const categories = ['All', 'Artificial Intelligence', 'Blockchain', 'Data Science and Analytics', 'Enterprise', 'Industry', 'Software Development', 'Technology', 'UI/UX Design'];

const categoryColors: Record<string, string> = {
  'Artificial Intelligence': '#6EE7B7',
  'Blockchain': '#A78BFA',
  'Data Science and Analytics': '#60A5FA',
  'Enterprise': '#FB923C',
  'Industry': '#F472B6',
  'Software Development': '#22D3EE',
  'Technology': '#34D399',
  'UI/UX Design': '#FBBF24',
};
const categoryColor = (cat: string) => categoryColors[cat] || '#6EE7B7';

function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  const accent = categoryColor(blog.category);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: (index % 6) * 0.06, duration: 0.55, ease }}>
      <Link href={`/blog/${blog._id}`} className="group relative bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full block hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/40">
        <div className="relative h-52 overflow-hidden bg-white/[0.04]">
          {blog.image ? (
            <Image src={getImageUrl(blog.image)} alt={blog.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accent}15, transparent)` }}>
              <FileText className="w-10 h-10" style={{ color: accent + '60' }} />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {blog.featured && <span className="px-2.5 py-1 bg-[#6EE7B7] text-[#090909] text-[10px] font-bold rounded-lg uppercase tracking-wider">Featured</span>}
            {blog.trending && <span className="px-2.5 py-1 bg-[#3B82F6] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1"><TrendingUp className="w-2.5 h-2.5" />Trending</span>}
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-sm" style={{ backgroundColor: '#090909CC', color: accent, border: `1px solid ${accent}30` }}>{blog.category}</div>
        </div>
        <div className="p-6 flex flex-col flex-grow relative">
          <div className="absolute left-0 top-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" style={{ backgroundColor: accent }} />
          <h2 className="text-[15px] font-bold mb-2 line-clamp-2 group-hover:text-[#6EE7B7] transition-colors duration-500 leading-snug tracking-tight">{blog.title}</h2>
          <p className="text-[#777] text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">{blog.excerpt}</p>
          <div className="flex items-center justify-between text-[11px] text-[#555] border-t border-white/[0.04] pt-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime}</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views}</span>
            </div>
            <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500 font-semibold" style={{ color: accent }}>
              Read <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogListClient({ initialBlogs = [] }: { initialBlogs?: Blog[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filter, setFilter] = useState<'all' | 'featured' | 'trending'>('all');
  const isFirstRun = useRef(true);

  useEffect(() => {
    // The server already fetched the default (All / all) list for the initial HTML.
    // Skip the redundant client fetch on mount so real content isn't briefly replaced by the skeleton.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (activeCategory === 'All' && filter === 'all' && initialBlogs.length > 0) return;
    }
    const params: Record<string, unknown> = { limit: 50 };
    if (activeCategory !== 'All') params.category = activeCategory;
    if (filter === 'featured') params.featured = true;
    if (filter === 'trending') params.trending = true;
    setLoading(true);
    blogApi.getAll(params)
      .then(res => { if (res.data.success) setBlogs(res.data.data || []); })
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, [activeCategory, filter, initialBlogs]);

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredBlog = filtered.find(b => b.featured);
  const restBlogs = featuredBlog ? filtered.filter(b => b._id !== featuredBlog._id) : filtered;
  const usedCategories = useMemo(() => new Set(blogs.map(b => b.category)).size, [blogs]);

  const resetFilters = () => { setSearchTerm(''); setActiveCategory('All'); setFilter('all'); };

  return (
    <div className="min-h-screen bg-[#090909] text-[#E5E7EB] overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#6EE7B7]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-20 -right-40 w-[400px] h-[400px] bg-[#3B82F6]/[0.05] rounded-full blur-[150px]" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(110,231,183,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(110,231,183,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>
        <div className="container max-w-[1920px] relative z-10 text-center px-4 sm:px-6">
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-sm text-[#6EE7B7] mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Sparkles className="w-3.5 h-3.5" /><span className="text-[13px] font-medium">Tech Insights & Articles</span>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease }}>
            Blog &{' '}<span className="bg-gradient-to-r from-[#6EE7B7] via-[#34D399] to-[#3B82F6] bg-clip-text text-transparent">Insights</span>
          </motion.h1>
          <motion.p className="text-lg text-[#999] max-w-2xl mx-auto leading-[1.7] mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6, ease }}>
            Expert articles on AI, software development, cloud, and technology trends from Greatodeal&apos;s engineering team.
          </motion.p>
          <motion.div className="max-w-xl mx-auto relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8, ease }}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#555]" />
            <input type="search" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-[#E5E7EB] placeholder-[#555] focus:ring-2 focus:ring-[#6EE7B7]/40 focus:border-transparent outline-none text-[15px] transition-all duration-500" />
            {searchTerm && <button onClick={() => setSearchTerm('')} aria-label="Clear search" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-white"><X className="w-4 h-4" /></button>}
          </motion.div>
          {!loading && blogs.length > 0 && (
            <motion.div className="flex items-center justify-center gap-6 mt-8 text-[13px] text-[#666]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }}>
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#6EE7B7]" />{blogs.length} article{blogs.length !== 1 ? 's' : ''}</span>
              <span className="w-1 h-1 rounded-full bg-[#333]" />
              <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-[#3B82F6]" />{usedCategories} categories</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══ FILTERS ═══ */}
      <section className="sticky top-[64px] lg:top-[80px] z-20 bg-[#090909]/95 backdrop-blur-md border-y border-white/[0.04] py-3">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-1.5">
              {(['all', 'featured', 'trending'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300">
                  {filter === f && <motion.span layoutId="filterPill" className="absolute inset-0 bg-[#6EE7B7] rounded-xl" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10 flex items-center gap-1.5" style={{ color: filter === f ? '#090909' : '#777' }}>
                    {f === 'featured' && <Star className="w-3.5 h-3.5" />}
                    {f === 'trending' && <TrendingUp className="w-3.5 h-3.5" />}
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="relative px-3.5 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors duration-300">
                  {activeCategory === cat && <motion.span layoutId="categoryPill" className="absolute inset-0 rounded-full" style={{ backgroundColor: categoryColor(cat) }} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative z-10" style={{ color: activeCategory === cat ? '#090909' : '#666' }}>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BLOG GRID ═══ */}
      <section className="py-16">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.04]">
                  <div className="h-52 animate-shimmer" />
                  <div className="p-6 space-y-3"><div className="h-3 animate-shimmer rounded w-1/4" /><div className="h-5 animate-shimmer rounded" /><div className="h-3 animate-shimmer rounded w-3/4" /></div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div className="text-center py-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-16 h-16 rounded-2xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mx-auto mb-4"><FileText className="w-8 h-8 text-[#6EE7B7]" /></div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">No articles found</h3>
              <p className="text-[#777] text-[15px] mb-6">Try a different search term or category.</p>
              <button onClick={resetFilters} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm font-medium text-[#6EE7B7] hover:border-[#6EE7B7]/30 transition-all duration-500">
                <RotateCcw className="w-4 h-4" /> Reset filters
              </button>
            </motion.div>
          ) : (
            <>
              {/* Featured article — large card */}
              <AnimatePresence mode="wait">
                {featuredBlog && filter !== 'trending' && (
                  <motion.div key={featuredBlog._id} className="mb-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>
                    <Link href={`/blog/${featuredBlog._id}`} className="group grid md:grid-cols-2 gap-0 bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[#6EE7B7]/25 transition-all duration-700">
                      <div className="relative h-64 md:h-auto overflow-hidden bg-white/[0.04]">
                        {featuredBlog.image && <Image src={getImageUrl(featuredBlog.image)} alt={featuredBlog.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 bg-[#6EE7B7] text-[#090909] text-xs font-bold rounded-lg flex items-center gap-1.5"><Star className="w-3 h-3" />Featured</span>
                          {featuredBlog.trending && <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs font-bold rounded-lg">Trending</span>}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <span className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: categoryColor(featuredBlog.category) }}>{featuredBlog.category}</span>
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-[#6EE7B7] transition-colors duration-500 tracking-tight leading-tight">{featuredBlog.title}</h2>
                        <p className="text-[#999] text-base leading-relaxed mb-6 line-clamp-3">{featuredBlog.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs text-[#555] mb-5">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredBlog.readTime}</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{featuredBlog.views} views</span>
                          <span>{new Date(featuredBlog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-[#6EE7B7] font-semibold text-sm group-hover:gap-3 transition-all duration-500 w-fit">Read full article <ArrowRight className="w-4 h-4" /></span>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-[#555] text-xs uppercase tracking-[0.15em] font-medium mb-6">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</div>

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restBlogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} index={i} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
