'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Clock, Eye, ArrowLeft, Heart, Send, FileText, ArrowRight, ArrowUpRight, BookOpen, Link2, Check, List, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogApi, commentApi, getImageUrl } from '@/lib/api';
import type { Blog, Comment } from '@/types';

const ease = [0.25, 0.1, 0.25, 1] as const;

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

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

function XIcon({ className }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
}

export default function BlogDetailClient({ id }: { id: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [related, setRelated] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ username: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    setLoading(true);
    Promise.all([blogApi.getById(id), commentApi.getAll(id)])
      .then(([blogRes, commentRes]) => {
        if (blogRes.data.success) setBlog(blogRes.data.data);
        if (commentRes.data.success) setComments(commentRes.data.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { setPageUrl(window.location.href); }, [id]);

  useEffect(() => {
    if (!blog) return;
    blogApi.getAll({ category: blog.category, limit: 4 })
      .then(res => { if (res.data.success) setRelated((res.data.data || []).filter((b: Blog) => b._id !== blog._id).slice(0, 3)); })
      .catch(() => setRelated([]));
  }, [blog]);

  const toc = useMemo(() => {
    if (!blog?.fullContent || blog.fullContent.startsWith('<')) return [];
    const matches = Array.from(blog.fullContent.matchAll(/^(#{2,3})\s+(.+)$/gm));
    return matches.map(m => ({ level: m[1].length, text: m[2].trim(), id: slugify(m[2].trim()) }));
  }, [blog]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.username.trim() || !commentForm.comment.trim()) return;
    setSubmitting(true);
    try {
      await commentApi.add(id, commentForm);
      const res = await commentApi.getAll(id);
      if (res.data.success) setComments(res.data.data || []);
      setCommentForm({ username: '', comment: '' });
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    } catch (err) { console.error(err); } finally { setSubmitting(false); }
  };

  const handleLike = async (commentId: string) => {
    try {
      await commentApi.like(commentId);
      setComments(prev => prev.map(c => c._id === commentId ? { ...c, likes: c.likes + 1 } : c));
    } catch { /* ignore */ }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center">
      <motion.div className="w-12 h-12 border-4 border-[#6EE7B7] border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen bg-[#090909] flex items-center justify-center text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-20 h-20 rounded-2xl bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/[0.08] flex items-center justify-center mx-auto mb-6"><FileText className="w-10 h-10 text-[#6EE7B7]" /></div>
        <h2 className="text-3xl font-bold mb-4 tracking-tight text-white">Article Not Found</h2>
        <Link href="/blog" className="text-[#6EE7B7] hover:underline text-base font-medium">← Back to Blog</Link>
      </motion.div>
    </div>
  );

  const accent = categoryColor(blog.category);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(pageUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">

      {/* ═══ READING PROGRESS ═══ */}
      <motion.div className="fixed top-[64px] lg:top-[80px] left-0 right-0 h-[3px] z-40 origin-left" style={{ scaleX: progressWidth, background: `linear-gradient(90deg, ${accent}, #3B82F6)` }} />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ backgroundColor: accent + '0A' }} />
        </div>
        <div className="container max-w-[1920px] relative z-10 px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-[#6EE7B7] hover:gap-3 transition-all duration-500 mb-8 text-base font-medium">
              <ArrowLeft className="w-5 h-5" /> Back to Blog
            </Link>
          </motion.div>

          <motion.div className="flex flex-wrap gap-2.5 mb-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="px-4 py-1.5 rounded-xl text-sm font-medium" style={{ backgroundColor: accent + '15', border: `1px solid ${accent}30`, color: accent }}>{blog.category}</span>
            {blog.featured && <span className="px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-400 font-medium">Featured</span>}
            {blog.trending && <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-400 font-medium">Trending</span>}
          </motion.div>

          <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.15] tracking-tight text-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }}>
            {blog.title}
          </motion.h1>

          <motion.p className="text-lg sm:text-xl text-white/60 leading-[1.8] mb-8" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease }}>
            {blog.excerpt}
          </motion.p>

          <motion.div className="flex flex-wrap items-center justify-between gap-5 sm:gap-6 pb-8 border-b border-white/[0.06]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {blog.author[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-base">{blog.author}</div>
                  {blog.authorBio && <div className="text-sm text-white/40 line-clamp-1 max-w-xs">{blog.authorBio}</div>}
                </div>
              </div>
              <div className="flex items-center gap-5 text-sm text-white/50">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{blog.readTime}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{blog.views} views</span>
                <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {blog.updatedAt && (
                  <span className="flex items-center gap-1.5 text-white/40"><RefreshCw className="w-3.5 h-3.5" />Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={tweetUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-all duration-500"><XIcon className="w-4 h-4" /></a>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all duration-500">in</a>
              <button onClick={handleCopyLink} aria-label="Copy link" className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-[#6EE7B7] hover:border-[#6EE7B7]/30 transition-all duration-500">
                {copied ? <Check className="w-4 h-4 text-[#6EE7B7]" /> : <Link2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ COVER IMAGE ═══ */}
      {blog.image && (
        <motion.div className="container max-w-[1400px] mx-auto px-4 sm:px-6 py-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/40">
            <motion.img src={getImageUrl(blog.image)} alt={blog.title} className="w-full h-auto aspect-video object-cover" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }} />
          </div>
        </motion.div>
      )}

      {/* ═══ CONTENT ═══ */}
      <article className="py-8 sm:py-12">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">
            {/* Main content */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="
                prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:tracking-tight prose-headings:font-bold prose-headings:mt-12 prose-headings:mb-5
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/[0.06] prose-h2:pb-4
                prose-h3:text-xl sm:prose-h3:text-2xl
                prose-p:text-white/75 prose-p:leading-[1.9] prose-p:text-base sm:prose-p:text-lg prose-p:mb-6
                prose-a:text-[#6EE7B7] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-[#6EE7B7] prose-code:bg-white/[0.04] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-base
                prose-pre:bg-[#0D0D0D] prose-pre:border prose-pre:border-white/[0.08] prose-pre:rounded-2xl prose-pre:p-6
                prose-li:text-white/75 prose-li:text-base sm:prose-li:text-lg prose-li:leading-[1.8] prose-li:mb-2
                prose-ul:my-6 prose-ol:my-6
                prose-blockquote:border-l-[3px] prose-blockquote:border-[#6EE7B7] prose-blockquote:bg-white/[0.02] prose-blockquote:rounded-r-2xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-white/70 prose-blockquote:not-italic
                prose-img:rounded-2xl prose-img:border prose-img:border-white/[0.06]
                prose-table:border-collapse prose-th:bg-white/[0.04] prose-th:text-white prose-th:p-4 prose-th:text-left prose-td:p-4 prose-td:border-t prose-td:border-white/[0.06] prose-td:text-white/70
                prose-hr:border-white/[0.06] prose-hr:my-10
              ">
                {blog.fullContent?.startsWith('<') ? (
                  <div dangerouslySetInnerHTML={{ __html: blog.fullContent }} />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
                      h3: ({ children }) => <h3 id={slugify(String(children))}>{children}</h3>,
                    }}
                  >
                    {blog.fullContent || ''}
                  </ReactMarkdown>
                )}
              </div>

              {/* Backlinks */}
              {blog.backlinks && blog.backlinks.length > 0 && (
                <div className="mt-12 p-6 sm:p-8 bg-white/[0.02] rounded-2xl border border-white/[0.06]">
                  <h3 className="font-bold mb-5 text-[#6EE7B7] text-sm uppercase tracking-wider">Related Resources</h3>
                  <ul className="space-y-3">
                    {blog.backlinks.map((link, i) => (
                      <li key={i}><a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#6EE7B7] hover:underline text-base flex items-center gap-2"><ArrowRight className="w-4 h-4" />{link.text}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside className="hidden lg:block" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <div className="sticky top-24 space-y-5">
                {toc.length > 0 && (
                  <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6">
                    <div className="flex items-center gap-2 text-sm text-white/40 uppercase tracking-wider font-medium mb-4"><List className="w-4 h-4" />On this page</div>
                    <ul className="space-y-2.5">
                      {toc.map((h, i) => (
                        <li key={i} style={{ paddingLeft: h.level === 3 ? '0.75rem' : 0 }}>
                          <a href={`#${h.id}`} className="text-sm text-white/60 hover:text-[#6EE7B7] transition-colors duration-300 leading-snug block">{h.text}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-white/[0.02] rounded-2xl border border-white/[0.06] p-6 sm:p-7">
                  <div className="text-sm text-white/40 uppercase tracking-wider font-medium mb-5">Written by</div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] flex items-center justify-center text-white font-bold text-xl shrink-0">{blog.author[0]}</div>
                    <div>
                      <div className="font-bold text-white text-lg">{blog.author}</div>
                      <div className="text-sm text-white/40">Greatodeal Team</div>
                    </div>
                  </div>
                  {blog.authorBio && <p className="text-base text-white/60 leading-relaxed mb-5">{blog.authorBio}</p>}

                  <div className="border-t border-white/[0.06] pt-5 mt-5 space-y-4">
                    <div className="flex items-center gap-3 text-base text-white/50"><BookOpen className="w-5 h-5" />{blog.readTime} read</div>
                    <div className="flex items-center gap-3 text-base text-white/50"><Eye className="w-5 h-5" />{blog.views} views</div>
                    <div className="flex items-center gap-3 text-base text-white/50"><Clock className="w-5 h-5" />{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    {blog.updatedAt && (
                      <div className="flex items-center gap-3 text-base text-white/50"><RefreshCw className="w-5 h-5" />Updated {new Date(blog.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    )}
                  </div>

                  <Link href="/contact" className="btn-primary w-full mt-6">
                    Request a Demo
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>

          {/* CTA */}
          <motion.div className="mt-16 sm:mt-20 p-8 sm:p-12 bg-white/[0.02] rounded-2xl border border-white/[0.06] text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight text-white">Need Help With Your Project?</h3>
            <p className="text-white/60 mb-8 text-lg">Get a personalized demo from Greatodeal&apos;s expert team.</p>
            <Link href="/contact" className="btn-primary group text-lg">
              Request a Demo <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
          </motion.div>

          {/* ═══ RELATED ARTICLES ═══ */}
          {related.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h3 className="text-2xl font-bold mb-8 tracking-tight text-white">More in {blog.category}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((r, i) => {
                  const rAccent = categoryColor(r.category);
                  return (
                    <motion.div key={r._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
                      <Link href={`/blog/${r._id}`} className="group bg-white/[0.02] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full block hover:-translate-y-1">
                        <div className="relative h-40 overflow-hidden bg-white/[0.04]">
                          {r.image && <img src={getImageUrl(r.image)} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <span className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: rAccent }}>{r.category}</span>
                          <h4 className="text-[15px] font-bold mb-2 line-clamp-2 group-hover:text-[#6EE7B7] transition-colors duration-500 leading-snug">{r.title}</h4>
                          <span className="mt-auto pt-3 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500" style={{ color: rAccent }}>Read <ArrowUpRight className="w-3 h-3" /></span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      {/* ═══ COMMENTS ═══ */}
      <section className="py-16 sm:py-20 bg-[#060606] border-t border-white/[0.06]">
        <div className="container max-w-[1920px] px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight text-white">Comments ({comments.length})</h2>

            {/* Add Comment */}
            <div className="bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.06] mb-8">
              <h3 className="font-bold text-xl mb-6 tracking-tight text-white">Leave a Comment</h3>
              {commentSuccess && (
                <motion.div className="mb-5 p-4 bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 rounded-xl text-base text-[#6EE7B7] flex items-center gap-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Check className="w-4 h-4" /> Comment posted successfully!
                </motion.div>
              )}
              <form onSubmit={handleComment} className="space-y-5">
                <input type="text" placeholder="Your name" value={commentForm.username} onChange={e => setCommentForm(p => ({ ...p, username: e.target.value }))} required maxLength={50}
                  className="w-full px-5 py-4 bg-[#0D0D0D] border border-white/[0.08] rounded-xl focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 outline-none transition-all duration-500 text-base placeholder-white/30 text-white" />
                <textarea rows={4} placeholder="Share your thoughts..." value={commentForm.comment} onChange={e => setCommentForm(p => ({ ...p, comment: e.target.value }))} required maxLength={1000}
                  className="w-full px-5 py-4 bg-[#0D0D0D] border border-white/[0.08] rounded-xl focus:border-[#6EE7B7]/40 focus:ring-2 focus:ring-[#6EE7B7]/20 outline-none transition-all duration-500 resize-none text-base placeholder-white/30 text-white" />
                <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
                  <Send className="w-5 h-5" /> {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>

            {/* Comments list */}
            <div className="space-y-4">
              {comments.map((comment, i) => (
                <motion.div key={comment._id} className="bg-white/[0.02] p-6 sm:p-7 rounded-2xl border border-white/[0.06]" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] flex items-center justify-center text-white font-bold shrink-0">
                        {comment.username[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white text-base">{comment.username}</div>
                        <div className="text-sm text-white/40">{new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                    </div>
                    <button onClick={() => handleLike(comment._id)} aria-label="Like this comment" className="flex items-center gap-2 text-base text-white/40 hover:text-[#6EE7B7] transition-colors duration-500">
                      <Heart className="w-5 h-5" />{comment.likes}
                    </button>
                  </div>
                  <p className="text-white/70 text-base leading-relaxed">{comment.comment}</p>
                </motion.div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-16 text-white/40 text-lg">Be the first to comment on this article!</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
