'use client';

import { useState, useEffect, useCallback } from 'react';
import { mailboxApi } from '@/lib/api';
import { useNotifications } from '@/context/NotificationContext';
import type { MailMessage, MailFolder } from '@/types';
import { Inbox, Send, ShieldAlert, Trash2, Search, ArrowLeft, RefreshCw, Eye, EyeOff, Globe } from 'lucide-react';

const FOLDERS: { key: MailFolder; label: string; icon: typeof Inbox }[] = [
  { key: 'inbox', label: 'Inbox', icon: Inbox },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'spam', label: 'Spam', icon: ShieldAlert },
  { key: 'trash', label: 'Trash', icon: Trash2 },
];

export default function MailboxPage() {
  const [folder, setFolder] = useState<MailFolder>('inbox');
  const [messages, setMessages] = useState<MailMessage[]>([]);
  const [counts, setCounts] = useState<Record<string, { total: number; unread: number }>>({});
  const [selected, setSelected] = useState<MailMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sentStats, setSentStats] = useState<{ totalSent: number; totalOpened: number } | null>(null);
  const { notifications } = useNotifications();

  const loadCounts = useCallback(() => {
    mailboxApi.getFolderCounts().then(res => setCounts(res.data.data || {})).catch(() => {});
  }, []);

  const loadMessages = useCallback((f: MailFolder, q: string) => {
    setLoading(true);
    mailboxApi.getFolderMessages(f, { search: q || undefined })
      .then(res => {
        setMessages(res.data.data || []);
        setSentStats(res.data.stats || null);
      })
      .catch(() => { setMessages([]); setSentStats(null); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadCounts(); }, [loadCounts]);
  useEffect(() => { loadMessages(folder, search); setSelected(null); }, [folder]); // eslint-disable-line react-hooks/exhaustive-deps

  // Refresh the list whenever a real-time "new mail" style notification arrives
  useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[0];
    if (latest.type === 'new_mail' || latest.type === 'email_replied') {
      loadMessages(folder, search);
      loadCounts();
    }
  }, [notifications]); // eslint-disable-line react-hooks/exhaustive-deps

  const openMessage = async (m: MailMessage) => {
    try {
      const res = await mailboxApi.getMessage(m._id);
      setSelected(res.data.data);
      setMessages(prev => prev.map(x => (x._id === m._id ? { ...x, read: true } : x)));
      loadCounts();
    } catch (err) { console.error(err); }
  };

  const moveTo = async (m: MailMessage, target: MailFolder) => {
    try {
      await mailboxApi.moveMessage(m._id, target);
      setMessages(prev => prev.filter(x => x._id !== m._id));
      setSelected(null);
      loadCounts();
    } catch (err) { console.error(err); }
  };

  const remove = async (m: MailMessage) => {
    try {
      await mailboxApi.deleteMessage(m._id);
      setMessages(prev => prev.filter(x => x._id !== m._id));
      setSelected(null);
      loadCounts();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Mailbox</h1>
          <p className="text-white/50 text-sm">Inbox, Sent, Spam &amp; Trash for your connected mail account.</p>
        </div>
        <button onClick={() => { loadMessages(folder, search); loadCounts(); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#161616] border border-white/10 rounded-xl text-sm text-white/60 hover:text-white hover:border-[#6EE7B7] transition-all">
          <RefreshCw className="w-3.5 h-3.5" />Refresh
        </button>
      </div>

      <div className="grid lg:grid-cols-[200px_1fr_1fr] gap-4 sm:gap-6">
        {/* Folder list */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 p-3 ${selected ? 'hidden lg:block' : ''}`}>
          {FOLDERS.map(f => {
            const Icon = f.icon;
            const c = counts[f.key];
            return (
              <button key={f.key} onClick={() => setFolder(f.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${folder === f.key ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' : 'text-white/60 hover:bg-white/5 hover:text-white/90'}`}>
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{f.label}</span>
                {c?.unread ? <span className="text-[11px] bg-white/10 px-1.5 py-0.5 rounded-full">{c.unread}</span> : null}
              </button>
            );
          })}
          <div className="mt-3 pt-3 border-t border-white/10 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && loadMessages(folder, search)}
              placeholder="Search mail..."
              className="w-full pl-8 pr-2 py-2 bg-[#0F0F0F] border border-white/10 rounded-lg text-xs text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]" />
          </div>
        </div>

        {/* Message list */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 overflow-hidden ${selected ? 'hidden lg:block' : ''}`}>
          {folder === 'sent' && sentStats && (
            <div className="flex items-center gap-4 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Globe className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span className="font-semibold text-white">{sentStats.totalSent}</span> sent from website
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/60">
                <Eye className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span className="font-semibold text-white">{sentStats.totalOpened}</span> opened
              </div>
            </div>
          )}
          <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto">
            {loading && <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" /></div>}
            {!loading && messages.length === 0 && (
              <div className="p-8 text-center text-white/30 text-sm">
                No messages in {folder}.
              </div>
            )}
            {messages.map(m => (
              <button key={m._id} onClick={() => openMessage(m)}
                className={`w-full p-4 text-left hover:bg-white/[0.03] transition-colors ${selected?._id === m._id ? 'bg-[#6EE7B7]/10 border-l-2 border-[#6EE7B7]' : ''}`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`text-sm truncate ${!m.read ? 'font-semibold text-white' : 'text-white/70'}`}>{m.fromName || m.from}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {folder === 'sent' && m.tracked && (
                      m.opened
                        ? <Eye className="w-3.5 h-3.5 text-[#6EE7B7]" aria-label="Opened" />
                        : <EyeOff className="w-3.5 h-3.5 text-white/25" aria-label="Not opened yet" />
                    )}
                    <span className="text-[11px] text-white/30">{new Date(m.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className={`text-xs truncate ${!m.read ? 'text-white/80' : 'text-white/40'}`}>{m.subject}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Message viewer */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 flex flex-col ${selected ? '' : 'hidden lg:flex'}`}>
          {selected ? (
            <>
              <div className="p-4 sm:p-6 border-b border-white/10">
                <div className="flex items-start gap-3 mb-2">
                  <button onClick={() => setSelected(null)} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-base text-white truncate">{selected.subject}</h3>
                    <div className="text-xs text-white/40 mt-1">
                      From <span className="text-white/70">{selected.fromName ? `${selected.fromName} <${selected.from}>` : selected.from}</span>
                    </div>
                    <div className="text-xs text-white/30 mt-0.5">{new Date(selected.date).toLocaleString()}</div>
                    {folder === 'sent' && selected.tracked && (
                      <div className={`inline-flex items-center gap-1.5 text-xs mt-2 px-2.5 py-1 rounded-full ${selected.opened ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-white/5 text-white/40'}`}>
                        {selected.opened ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {selected.opened
                          ? `Opened ${selected.openCount || 1}× · last ${selected.lastOpenedAt ? new Date(selected.lastOpenedAt).toLocaleString() : ''}`
                          : 'Not opened yet'}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {folder !== 'trash' && (
                    <button onClick={() => moveTo(selected, 'trash')} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 hover:text-white transition-all">Move to Trash</button>
                  )}
                  {folder === 'spam' && (
                    <button onClick={() => moveTo(selected, 'inbox')} className="text-xs px-3 py-1.5 rounded-lg bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 transition-all">Not Spam</button>
                  )}
                  {folder === 'trash' && (
                    <button onClick={() => remove(selected)} className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">Delete Permanently</button>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
                {selected.htmlBody ? (
                  <div className="text-sm text-white/70 [&_a]:text-[#6EE7B7]" dangerouslySetInnerHTML={{ __html: selected.htmlBody }} />
                ) : (
                  <p className="text-sm text-white/70 whitespace-pre-wrap">{selected.textBody || '(no content)'}</p>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <Inbox className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Select a message to read it</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
