'use client';

import { useState, useEffect } from 'react';
import { contactApi } from '@/lib/api';
import type { Contact, LeadStatus } from '@/types';
import { Mail, Send, CheckCircle, Clock, Search, ArrowLeft, Eye, Zap, Snowflake, Flame, Power } from 'lucide-react';

const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string; icon: typeof Snowflake }> = {
  cold: { label: 'Cold', color: 'text-sky-400', bg: 'bg-sky-500/10', icon: Snowflake },
  warm: { label: 'Warm', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: Flame },
  urgent: { label: 'Urgent', color: 'text-red-400', bg: 'bg-red-500/10', icon: Zap },
};

const timeAgo = (iso?: string | null): string => {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

export default function EmailsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'replied'>('all');

  const load = () => {
    contactApi.getAll()
      .then(res => setContacts(res.data.data || []))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const sendReply = async () => {
    if (!selected || !replyText.trim()) return;
    setSending(true);
    try {
      await contactApi.reply({
        contactId: selected._id,
        to: selected.email,
        subject: `Re: Your inquiry about ${selected.services} | Greatodeal`,
        message: replyText,
      });
      setContacts(prev => prev.map(c => c._id === selected._id ? { ...c, status: 'replied', followUpEnabled: false } : c));
      setSelected(prev => prev ? { ...prev, status: 'replied', followUpEnabled: false } : null);
      setReplyText('');
    } catch (err) { console.error(err); } finally { setSending(false); }
  };

  const changeLeadStatus = async (contact: Contact, leadStatus: LeadStatus) => {
    setContacts(prev => prev.map(c => c._id === contact._id ? { ...c, leadStatus, followUpStage: 0 } : c));
    if (selected?._id === contact._id) setSelected(prev => prev ? { ...prev, leadStatus, followUpStage: 0 } : null);
    try {
      const res = await contactApi.updateLeadStatus(contact._id, leadStatus);
      const updated = res.data.data as Contact;
      setContacts(prev => prev.map(c => c._id === contact._id ? updated : c));
      if (selected?._id === contact._id) setSelected(updated);
    } catch (err) { console.error(err); }
  };

  const toggleAutomation = async (contact: Contact) => {
    const next = !contact.followUpEnabled;
    setContacts(prev => prev.map(c => c._id === contact._id ? { ...c, followUpEnabled: next } : c));
    if (selected?._id === contact._id) setSelected(prev => prev ? { ...prev, followUpEnabled: next } : null);
    try {
      const res = await contactApi.toggleFollowUp(contact._id, next);
      const updated = res.data.data as Contact;
      setContacts(prev => prev.map(c => c._id === contact._id ? updated : c));
      if (selected?._id === contact._id) setSelected(updated);
    } catch (err) { console.error(err); }
  };

  const filtered = contacts.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.services.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Leads &amp; Contact Inquiries</h1>
          <p className="text-white/50 text-sm">{contacts.length} total &middot; <span className="text-emerald-400">{newCount} new</span></p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#161616] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none text-sm text-white placeholder-white/25" />
        </div>
        <div className="flex gap-2">
          {(['all', 'new', 'replied'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all capitalize ${filter === f ? 'bg-[#6EE7B7] text-[#121212]' : 'bg-[#161616] border border-white/10 text-white/50 hover:border-[#6EE7B7] hover:text-white/80'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Contact List */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 overflow-hidden ${selected ? 'hidden lg:block' : ''}`}>
          <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto">
            {loading && <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" /></div>}
            {!loading && filtered.length === 0 && <div className="p-8 text-center text-white/30 text-sm">No contacts found.</div>}
            {filtered.map(c => {
              const lead = LEAD_STATUS_CONFIG[c.leadStatus || 'cold'];
              const LeadIcon = lead.icon;
              return (
                <button key={c._id} onClick={() => setSelected(c)}
                  className={`w-full p-4 text-left hover:bg-white/[0.03] transition-colors ${selected?._id === c._id ? 'bg-[#6EE7B7]/10 border-l-2 border-[#6EE7B7]' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-sm text-white/90">{c.fullName}</span>
                        {c.status === 'new' && <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" title="New" />}
                        <span className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${lead.bg} ${lead.color}`}>
                          <LeadIcon className="w-2.5 h-2.5" />{lead.label}
                        </span>
                      </div>
                      <div className="text-xs text-white/40 truncate">{c.email}</div>
                      <div className="text-xs text-[#6EE7B7]/70 mt-1 truncate">{c.services}</div>
                      {c.emailOpens > 0 && (
                        <div className="text-[11px] text-white/35 mt-1 flex items-center gap-1">
                          <Eye className="w-3 h-3" />Opened {c.emailOpens}x{c.lastOpenedAt ? ` · ${timeAgo(c.lastOpenedAt)}` : ''}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.status === 'new' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-white/40'}`}>
                        {c.status}
                      </span>
                      <div className="text-xs text-white/30 mt-1">{new Date(c.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Detail + Reply */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 flex flex-col ${selected ? '' : 'hidden lg:flex'}`}>
          {selected ? (
            <>
              <div className="p-4 sm:p-6 border-b border-white/10">
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <button onClick={() => setSelected(null)} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors mt-0.5">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-white">{selected.fullName}</h3>
                      <a href={`mailto:${selected.email}`} className="text-[#6EE7B7] text-sm hover:underline break-all">{selected.email}</a>
                      {selected.phone && <div className="text-white/50 text-sm mt-0.5">{selected.countryCode} {selected.phone}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm shrink-0">
                    {selected.status === 'replied' ? (
                      <span className="flex items-center gap-1 text-[#6EE7B7]"><CheckCircle className="w-4 h-4" />Replied</span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400"><Clock className="w-4 h-4" />New</span>
                    )}
                  </div>
                </div>

                {/* Lead status selector */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {(Object.keys(LEAD_STATUS_CONFIG) as LeadStatus[]).map(status => {
                    const cfg = LEAD_STATUS_CONFIG[status];
                    const Icon = cfg.icon;
                    const active = selected.leadStatus === status;
                    return (
                      <button key={status} onClick={() => changeLeadStatus(selected, status)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${active ? `${cfg.bg} ${cfg.color} ring-1 ring-inset ring-current` : 'bg-white/5 text-white/40 hover:text-white/70'}`}>
                        <Icon className="w-3 h-3" />{cfg.label}
                      </button>
                    );
                  })}
                  <button onClick={() => toggleAutomation(selected)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ml-auto ${selected.followUpEnabled ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-white/5 text-white/40'}`}>
                    <Power className="w-3 h-3" />{selected.followUpEnabled ? 'Automation On' : 'Automation Off'}
                  </button>
                </div>

                {selected.followUpEnabled && selected.nextFollowUpAt && (
                  <div className="text-xs text-white/40 mb-3">
                    Next auto follow-up (stage {selected.followUpStage + 1}): {new Date(selected.nextFollowUpAt).toLocaleString()}
                  </div>
                )}
                {selected.emailOpens > 0 && (
                  <div className="text-xs text-white/40 mb-3 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />Opened {selected.emailOpens} time{selected.emailOpens > 1 ? 's' : ''}
                    {selected.lastOpenedAt ? ` · last ${timeAgo(selected.lastOpenedAt)}` : ''}
                  </div>
                )}

                <div className="p-3 bg-white/5 rounded-xl text-xs text-[#6EE7B7] mb-3">{selected.services}</div>
                <p className="text-sm text-white/60 leading-relaxed">{selected.message}</p>
                <div className="text-xs text-white/30 mt-3">{new Date(selected.createdAt).toLocaleString()}</div>
              </div>

              <div className="p-4 sm:p-6 flex-1">
                <h4 className="font-semibold text-white/90 mb-3 flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-[#6EE7B7]" />Send Reply</h4>
                <textarea rows={4} value={replyText} onChange={e => setReplyText(e.target.value)}
                  placeholder={`Write your reply to ${selected.fullName}...`}
                  className="w-full px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl focus:border-[#6EE7B7] outline-none resize-none text-sm text-white placeholder-white/25 mb-3" />
                <button onClick={sendReply} disabled={sending || !replyText.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#6EE7B7] text-[#121212] rounded-xl font-semibold hover:bg-[#5CD7A5] transition-all disabled:opacity-50 text-sm">
                  <Send className="w-4 h-4" />{sending ? 'Sending...' : 'Send Reply'}
                </button>
                <p className="text-xs text-white/30 mt-2">Sending a manual reply pauses automated follow-ups for this lead.</p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <Mail className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Select an inquiry to view details and reply</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
