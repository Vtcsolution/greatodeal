'use client';

import { useState, useMemo } from 'react';
import { useNotifications } from '@/context/NotificationContext';
import type { NotificationType } from '@/types';
import { UserPlus, MailOpen, Reply, Send, Inbox, Bell, Circle } from 'lucide-react';

const ICONS: Record<NotificationType, typeof Bell> = {
  new_lead: UserPlus,
  email_opened: MailOpen,
  email_replied: Reply,
  followup_sent: Send,
  new_mail: Inbox,
  partnership_lead: UserPlus,
};

const TYPE_LABELS: Record<NotificationType, string> = {
  new_lead: 'New lead',
  email_opened: 'Email opened',
  email_replied: 'Lead replied',
  followup_sent: 'Follow-up sent',
  new_mail: 'New mail',
  partnership_lead: 'Partnership lead',
};

const fullTime = (iso: string) => new Date(iso).toLocaleString();

export default function ActivityPage() {
  const { notifications, unreadCount, connected, markRead, markAllRead } = useNotifications();
  const [filter, setFilter] = useState<'all' | NotificationType>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? notifications : notifications.filter(n => n.type === filter)),
    [notifications, filter]
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Live Activity</h1>
            <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${connected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400 animate-live-pulse' : 'bg-white/30'}`} />
              {connected ? 'Live' : 'Reconnecting…'}
            </span>
          </div>
          <p className="text-white/50 text-sm">Real-time feed of opens, replies, new leads and automated follow-ups.</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="px-4 py-2 bg-[#161616] border border-white/10 rounded-xl text-sm text-white/60 hover:text-white hover:border-[#6EE7B7] transition-all">
            Mark all read ({unreadCount})
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', ...Object.keys(TYPE_LABELS)] as const).map(f => (
          <button key={f} onClick={() => setFilter(f as 'all' | NotificationType)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${filter === f ? 'bg-[#6EE7B7] text-[#121212]' : 'bg-[#161616] border border-white/10 text-white/50 hover:border-[#6EE7B7] hover:text-white/80'}`}>
            {f === 'all' ? 'All' : TYPE_LABELS[f as NotificationType]}
          </button>
        ))}
      </div>

      <div className="bg-[#161616] rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden">
        {filtered.length === 0 && <div className="p-10 text-center text-white/30 text-sm">No activity yet — this feed updates in real time as things happen.</div>}
        {filtered.map(n => {
          const Icon = ICONS[n.type] || Bell;
          return (
            <button key={n._id} onClick={() => !n.read && markRead(n._id)}
              className={`w-full text-left p-4 sm:p-5 flex gap-4 hover:bg-white/[0.03] transition-colors ${!n.read ? 'bg-[#6EE7B7]/[0.03]' : ''}`}>
              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#6EE7B7]/10 flex items-center justify-center text-[#6EE7B7]">
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white/90">{n.title}</span>
                  {!n.read && <Circle className="w-1.5 h-1.5 fill-[#6EE7B7] text-[#6EE7B7]" />}
                </div>
                <p className="text-sm text-white/50 mt-1">{n.message}</p>
                <span className="text-xs text-white/30 mt-2 block">{fullTime(n.createdAt)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
