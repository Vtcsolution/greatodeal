'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, UserPlus, MailOpen, Reply, Send, Inbox, Circle } from 'lucide-react';
import { useNotifications } from '@/context/NotificationContext';
import type { AppNotification, NotificationType } from '@/types';

const ICONS: Record<NotificationType, typeof Bell> = {
  new_lead: UserPlus,
  email_opened: MailOpen,
  email_replied: Reply,
  followup_sent: Send,
  new_mail: Inbox,
  partnership_lead: UserPlus,
};

const timeAgo = (iso: string): string => {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export default function NotificationBell() {
  const { notifications, unreadCount, ringTick, connected, markRead, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [ringing, setRinging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (ringTick === 0) return;
    setRinging(true);
    const t = setTimeout(() => setRinging(false), 800);
    return () => clearTimeout(t);
  }, [ringTick]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleClick = (n: AppNotification) => {
    if (!n.read) markRead(n._id);
    setOpen(false);
    router.push('/admin/dashboard/activity');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`relative p-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors ${ringing ? 'animate-[bell-ring_0.8s_ease-in-out]' : ''}`}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
        <span
          className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 rounded-full ${connected ? 'bg-emerald-400' : 'bg-white/20'}`}
          title={connected ? 'Live' : 'Offline'}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[70vh] overflow-y-auto bg-[#161616] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/[0.04] z-50">
          <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#161616]">
            <div>
              <h3 className="font-semibold text-white text-sm">Activity</h3>
              <p className="text-xs text-white/40">{connected ? 'Live updates on' : 'Reconnecting…'}</p>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-xs text-[#6EE7B7] hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="divide-y divide-white/5">
            {notifications.length === 0 && (
              <div className="p-8 text-center text-white/30 text-sm">No activity yet.</div>
            )}
            {notifications.map(n => {
              const Icon = ICONS[n.type] || Bell;
              return (
                <button
                  key={n._id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left p-4 flex gap-3 hover:bg-white/[0.03] transition-colors ${!n.read ? 'bg-[#6EE7B7]/[0.04]' : ''}`}
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[#6EE7B7]/10 flex items-center justify-center text-[#6EE7B7]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-white/90 truncate">{n.title}</span>
                      {!n.read && <Circle className="w-1.5 h-1.5 fill-[#6EE7B7] text-[#6EE7B7] shrink-0" />}
                    </div>
                    <p className="text-xs text-white/50 mt-0.5 line-clamp-2">{n.message}</p>
                    <span className="text-[11px] text-white/30 mt-1 block">{timeAgo(n.createdAt)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
