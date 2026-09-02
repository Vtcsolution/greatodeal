'use client';

import { useState, useEffect, useCallback } from 'react';
import { linkedinApi } from '@/lib/api';
import type { LinkedInContact, LinkedInMessage } from '@/types';
import {
  Linkedin, PlusCircle, X, Send, Sparkles, Copy, Check, Loader2,
  ExternalLink, Trash2, MessageSquare, ArrowLeft,
} from 'lucide-react';

function interestColor(score?: number): string {
  if (score === undefined) return 'text-white/30 bg-white/5 border-white/10';
  if (score >= 76) return 'text-[#6EE7B7] bg-[#6EE7B7]/10 border-[#6EE7B7]/25';
  if (score >= 51) return 'text-blue-300 bg-blue-400/10 border-blue-400/25';
  if (score >= 21) return 'text-amber-300 bg-amber-400/10 border-amber-400/25';
  return 'text-white/40 bg-white/5 border-white/10';
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function LinkedInAssistantPage() {
  const [contacts, setContacts] = useState<LinkedInContact[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<LinkedInContact | null>(null);
  const [messages, setMessages] = useState<LinkedInMessage[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', position: '', company: '', profileUrl: '', firstMessage: '' });
  const [saving, setSaving] = useState(false);

  const [theirReply, setTheirReply] = useState('');
  const [addingReply, setAddingReply] = useState(false);
  const [manualMessage, setManualMessage] = useState('');
  const [sendingManual, setSendingManual] = useState(false);

  const [draft, setDraft] = useState('');
  const [generating, setGenerating] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadContacts = useCallback(() => {
    setLoadingList(true);
    linkedinApi.getAll()
      .then(res => setContacts(res.data.data || []))
      .catch(() => setContacts([]))
      .finally(() => setLoadingList(false));
  }, []);

  useEffect(() => { loadContacts(); }, [loadContacts]);

  const openContact = (id: string) => {
    setSelectedId(id);
    setDraft('');
    setTheirReply('');
    setManualMessage('');
    setLoadingThread(true);
    linkedinApi.getById(id)
      .then(res => {
        setSelectedContact(res.data.data.contact);
        setMessages(res.data.data.messages || []);
      })
      .catch(() => { setSelectedContact(null); setMessages([]); })
      .finally(() => setLoadingThread(false));
  };

  const refreshThread = (id: string) => {
    linkedinApi.getById(id).then(res => {
      setSelectedContact(res.data.data.contact);
      setMessages(res.data.data.messages || []);
    });
    loadContacts();
  };

  const createContact = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const res = await linkedinApi.create({
        name: form.name.trim(),
        position: form.position.trim(),
        company: form.company.trim(),
        profileUrl: form.profileUrl.trim(),
        firstMessage: form.firstMessage.trim(),
      });
      setForm({ name: '', position: '', company: '', profileUrl: '', firstMessage: '' });
      setShowAddForm(false);
      loadContacts();
      openContact(res.data.data._id);
    } catch { /* ignore */ } finally {
      setSaving(false);
    }
  };

  const removeContact = async (id: string) => {
    if (!confirm('Delete this contact and its whole conversation?')) return;
    try {
      await linkedinApi.delete(id);
      if (selectedId === id) { setSelectedId(null); setSelectedContact(null); setMessages([]); }
      loadContacts();
    } catch { /* ignore */ }
  };

  const addTheirReply = async () => {
    if (!selectedId || !theirReply.trim()) return;
    setAddingReply(true);
    try {
      await linkedinApi.addMessage(selectedId, 'them', theirReply.trim());
      setTheirReply('');
      refreshThread(selectedId);
      await generateDraft(selectedId);
    } catch { /* ignore */ } finally {
      setAddingReply(false);
    }
  };

  const sendManual = async () => {
    if (!selectedId || !manualMessage.trim()) return;
    setSendingManual(true);
    try {
      await linkedinApi.addMessage(selectedId, 'me', manualMessage.trim());
      setManualMessage('');
      refreshThread(selectedId);
    } catch { /* ignore */ } finally {
      setSendingManual(false);
    }
  };

  const generateDraft = async (id: string) => {
    setGenerating(true);
    setDraft('');
    try {
      const res = await linkedinApi.generateReply(id);
      setDraft(res.data.data?.draft || '');
      const { interestScore, interestNote } = res.data.data || {};
      setSelectedContact(prev => (prev ? { ...prev, interestScore, interestNote } : prev));
      loadContacts();
    } catch { /* ignore */ } finally {
      setGenerating(false);
    }
  };

  const saveDraftAsSent = async () => {
    if (!selectedId || !draft.trim()) return;
    setSavingDraft(true);
    try {
      await linkedinApi.addMessage(selectedId, 'me', draft.trim());
      setDraft('');
      refreshThread(selectedId);
    } catch { /* ignore */ } finally {
      setSavingDraft(false);
    }
  };

  const copyDraft = () => {
    navigator.clipboard.writeText(draft).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">LinkedIn Assistant</h1>
          <p className="text-white/50 text-sm">Save LinkedIn conversations and let AI draft your replies. Copy the draft into LinkedIn's message box to send it.</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn-primary btn-primary-sm shrink-0">
          <PlusCircle className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-4 sm:gap-6">
        {/* Contact list */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 overflow-hidden ${selectedId ? 'hidden lg:block' : ''}`}>
          <div className="divide-y divide-white/5 max-h-[75vh] overflow-y-auto">
            {loadingList ? (
              <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" /></div>
            ) : contacts.length === 0 ? (
              <div className="p-8 text-center text-white/30 text-sm">
                <Linkedin className="w-8 h-8 mx-auto mb-3 text-white/15" />
                No contacts yet. Add one to get started.
              </div>
            ) : (
              contacts.map(c => (
                <button key={c._id} onClick={() => openContact(c._id)}
                  className={`w-full p-4 text-left hover:bg-white/[0.03] transition-colors ${selectedId === c._id ? 'bg-[#6EE7B7]/10 border-l-2 border-[#6EE7B7]' : ''}`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                    <span className="text-[11px] text-white/30 shrink-0">{timeAgo(c.lastMessageAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    {(c.position || c.company) && (
                      <div className="text-xs text-white/40 truncate">{[c.position, c.company].filter(Boolean).join(' at ')}</div>
                    )}
                    {c.interestScore !== undefined && (
                      <span className={`ml-auto shrink-0 px-1.5 py-0.5 rounded-md border text-[10px] font-bold ${interestColor(c.interestScore)}`}>{c.interestScore}%</span>
                    )}
                  </div>
                  {c.lastMessage && (
                    <div className="text-xs text-white/50 truncate">
                      {c.lastMessageRole === 'me' ? 'You: ' : ''}{c.lastMessage}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Thread */}
        <div className={`bg-[#161616] rounded-2xl border border-white/10 flex flex-col min-h-[60vh] ${selectedId ? '' : 'hidden lg:flex'}`}>
          {!selectedId ? (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-3" />
                <p className="text-white/30 text-sm">Select a contact to view the conversation</p>
              </div>
            </div>
          ) : loadingThread ? (
            <div className="flex-1 flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" /></div>
          ) : selectedContact ? (
            <>
              <div className="p-4 sm:p-5 border-b border-white/10">
                <div className="flex items-start gap-3">
                  <button onClick={() => setSelectedId(null)} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-base truncate">{selectedContact.name}</h3>
                    <p className="text-white/40 text-xs mt-0.5 truncate">{[selectedContact.position, selectedContact.company].filter(Boolean).join(' at ')}</p>
                  </div>
                  {selectedContact.interestScore !== undefined && (
                    <div className={`shrink-0 px-3 py-1.5 rounded-xl border text-right ${interestColor(selectedContact.interestScore)}`}>
                      <div className="text-sm font-bold leading-none">{selectedContact.interestScore}%</div>
                      <div className="text-[10px] uppercase tracking-wide opacity-70 mt-0.5">interested</div>
                    </div>
                  )}
                  {selectedContact.profileUrl && (
                    <a href={selectedContact.profileUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all shrink-0" title="Open LinkedIn profile">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button onClick={() => removeContact(selectedContact._id)} className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all shrink-0" title="Delete contact">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {selectedContact.interestNote && (
                  <p className="text-xs text-white/40 mt-2.5 pl-0 lg:pl-9">{selectedContact.interestNote}</p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {messages.length === 0 && (
                  <p className="text-center text-white/30 text-sm py-8">No messages yet. Paste their first reply below, or send your own opener.</p>
                )}
                {messages.map(m => (
                  <div key={m._id} className={`flex ${m.role === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                      m.role === 'me' ? 'bg-[#6EE7B7]/15 border border-[#6EE7B7]/20 text-white rounded-br-md' : 'bg-white/[0.05] border border-white/[0.08] text-white/85 rounded-bl-md'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 p-4 sm:p-5 space-y-3">
                {draft && (
                  <div className="p-3 bg-[#6EE7B7]/[0.06] border border-[#6EE7B7]/20 rounded-xl">
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-[#6EE7B7] uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5" /> AI Draft Reply
                    </div>
                    <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={4}
                      className="w-full px-3 py-2 bg-[#0F0F0F] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-[#6EE7B7]/40 resize-none mb-2" />
                    <div className="flex gap-2">
                      <button onClick={copyDraft} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-semibold text-white/70 transition-colors flex items-center gap-1.5">
                        {copied ? <Check className="w-3.5 h-3.5 text-[#6EE7B7]" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied' : 'Copy'}
                      </button>
                      <button onClick={saveDraftAsSent} disabled={savingDraft} className="px-3 py-1.5 bg-[#6EE7B7]/15 hover:bg-[#6EE7B7]/25 border border-[#6EE7B7]/25 rounded-lg text-xs font-semibold text-[#6EE7B7] transition-colors flex items-center gap-1.5 disabled:opacity-50">
                        {savingDraft ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save as Sent
                      </button>
                      <button onClick={() => generateDraft(selectedContact._id)} disabled={generating} className="px-3 py-1.5 text-xs font-semibold text-white/40 hover:text-white transition-colors ml-auto">
                        Regenerate
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-1.5">Paste their LinkedIn reply</label>
                  <div className="flex gap-2">
                    <textarea value={theirReply} onChange={e => setTheirReply(e.target.value)} rows={2}
                      placeholder="Paste what they replied on LinkedIn..."
                      className="flex-1 px-3 py-2 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 resize-none" />
                    <button onClick={addTheirReply} disabled={addingReply || !theirReply.trim()} className="btn-primary btn-primary-sm self-end shrink-0 disabled:opacity-50">
                      {addingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} Add &amp; Draft Reply
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input value={manualMessage} onChange={e => setManualMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') sendManual(); }}
                    placeholder="Or log a message you sent manually..."
                    className="flex-1 px-3 py-2 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40" />
                  <button onClick={sendManual} disabled={sendingManual || !manualMessage.trim()} className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-colors disabled:opacity-50 shrink-0">
                    {sendingManual ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAddForm(false)}>
          <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white">Add LinkedIn Contact</h3>
              <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name *"
                className="w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="Position"
                  className="w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40" />
                <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Company"
                  className="w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40" />
              </div>
              <input value={form.profileUrl} onChange={e => setForm(p => ({ ...p, profileUrl: e.target.value }))} placeholder="LinkedIn profile URL (optional)"
                className="w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40" />
              <textarea value={form.firstMessage} onChange={e => setForm(p => ({ ...p, firstMessage: e.target.value }))} rows={3} placeholder="First message you sent them (optional)"
                className="w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 resize-none" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={createContact} disabled={saving || !form.name.trim()} className="btn-primary btn-primary-sm disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />} Add Contact
              </button>
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
