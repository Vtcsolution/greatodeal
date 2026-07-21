'use client';

import { useState, useEffect } from 'react';
import { adminApi, blogApi, contactApi } from '@/lib/api';
import { FileText, MessageSquare, Mail, Eye, Users } from 'lucide-react';

interface Stats {
  blogs?: number;
  contacts?: number;
  chats?: number;
  partnerships?: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState<Array<{ _id: string; title: string; views: number; date: string; category: string }>>([]);
  const [recentContacts, setRecentContacts] = useState<Array<{ _id: string; fullName: string; email: string; services: string; status: string; createdAt: string }>>([]);

  useEffect(() => {
    Promise.all([
      adminApi.getStats().catch(() => ({ data: { data: {} } })),
      blogApi.getAll({ limit: 5 }).catch(() => ({ data: { data: [] } })),
      contactApi.getAll().catch(() => ({ data: { data: [] } })),
    ]).then(([statsRes, blogsRes, contactsRes]) => {
      setStats(statsRes.data.data || {});
      setRecentBlogs((blogsRes.data.data || []).slice(0, 5));
      setRecentContacts((contactsRes.data.data || []).slice(0, 5));
    }).finally(() => setLoading(false));
  }, []);

  const statCards = [
    { icon: FileText, label: 'Total Blogs', value: stats.blogs ?? 'N/A', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { icon: MessageSquare, label: 'AI Chats', value: stats.chats ?? 'N/A', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
    { icon: Mail, label: 'Contact Forms', value: stats.contacts ?? 'N/A', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: Eye, label: 'Partnerships', value: stats.partnerships ?? 'N/A', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  ];

  if (loading) return (
    <div className="p-6 sm:p-8 flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-white/50 text-sm mb-6 sm:mb-8">Welcome back to the Greatodeal Admin Panel.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {statCards.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`p-4 sm:p-5 rounded-2xl border ${bg}`}>
            <Icon className={`w-5 h-5 ${color} mb-2 sm:mb-3`} />
            <div className={`text-xl sm:text-2xl font-bold ${color} mb-0.5`}>{value}</div>
            <div className="text-white/40 text-xs sm:text-sm">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Blogs */}
        <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
          <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#6EE7B7]" />Recent Blogs
          </h2>
          <div className="space-y-1">
            {recentBlogs.length === 0 && <p className="text-white/40 text-sm py-4">No blogs yet.</p>}
            {recentBlogs.map(b => (
              <div key={b._id} className="flex items-start justify-between gap-3 py-3 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90 truncate">{b.title}</div>
                  <div className="text-xs text-white/40 flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">{b.category}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{b.views}</span>
                  </div>
                </div>
                <div className="text-xs text-white/30 shrink-0">{new Date(b.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
          <h2 className="font-semibold text-white text-sm sm:text-base mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#6EE7B7]" />Recent Inquiries
          </h2>
          <div className="space-y-1">
            {recentContacts.length === 0 && <p className="text-white/40 text-sm py-4">No contacts yet.</p>}
            {recentContacts.map(c => (
              <div key={c._id} className="flex items-start justify-between gap-3 py-3 border-b border-white/5 last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white/90">{c.fullName}</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">{c.email}</div>
                  <div className="text-xs text-white/40 truncate mt-0.5">{c.services}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full shrink-0 font-medium ${c.status === 'new' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
