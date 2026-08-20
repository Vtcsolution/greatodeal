'use client';

import { useState, useEffect } from 'react';
import { followUpApi } from '@/lib/api';
import type { FollowUpTemplate, LeadStatus, EmailLogEntry } from '@/types';
import { Zap, Snowflake, Flame, Plus, Trash2, Save, PlayCircle, Mail, Eye } from 'lucide-react';

const GROUPS: { status: LeadStatus; label: string; color: string; icon: typeof Snowflake }[] = [
  { status: 'cold', label: 'Cold Leads', color: 'text-sky-400', icon: Snowflake },
  { status: 'warm', label: 'Warm Leads', color: 'text-amber-400', icon: Flame },
  { status: 'urgent', label: 'Urgent Leads', color: 'text-red-400', icon: Zap },
];

type DraftTemplate = Partial<FollowUpTemplate> & { leadStatus: LeadStatus; stage: number };

export default function FollowUpsPage() {
  const [templates, setTemplates] = useState<FollowUpTemplate[]>([]);
  const [logs, setLogs] = useState<EmailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<string | null>(null);

  const load = () => {
    Promise.all([followUpApi.getTemplates(), followUpApi.getLogs()])
      .then(([t, l]) => {
        setTemplates(t.data.data || []);
        setLogs(l.data.data || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const templatesFor = (status: LeadStatus) =>
    templates.filter(t => t.leadStatus === status).sort((a, b) => a.stage - b.stage);

  const addStage = (status: LeadStatus) => {
    const existing = templatesFor(status);
    const nextStage = existing.length ? Math.max(...existing.map(t => t.stage)) + 1 : 0;
    const draft: FollowUpTemplate = {
      _id: `new-${status}-${nextStage}`,
      leadStatus: status,
      stage: nextStage,
      delayHours: 24,
      subject: `Follow-up: {{services}}`,
      body: `Hi {{fullName}},\n\nJust checking in about {{services}}.\n\nBest,\nGreatodeal Team`,
      active: true,
    };
    setTemplates(prev => [...prev, draft]);
  };

  const updateField = (id: string, field: keyof FollowUpTemplate, value: string | number | boolean) => {
    setTemplates(prev => prev.map(t => (t._id === id ? { ...t, [field]: value } : t)));
  };

  const saveTemplate = async (t: FollowUpTemplate) => {
    setSaving(t._id);
    try {
      const res = await followUpApi.saveTemplate({
        leadStatus: t.leadStatus,
        stage: t.stage,
        delayHours: Number(t.delayHours),
        subject: t.subject,
        body: t.body,
        active: t.active,
      });
      const saved = res.data.data as FollowUpTemplate;
      setTemplates(prev => prev.map(x => (x._id === t._id ? saved : x)));
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const removeTemplate = async (t: FollowUpTemplate) => {
    if (!t._id.startsWith('new-')) {
      try { await followUpApi.deleteTemplate(t._id); } catch (err) { console.error(err); }
    }
    setTemplates(prev => prev.filter(x => x._id !== t._id));
  };

  const runNow = async () => {
    setRunning(true);
    setRunResult(null);
    try {
      const res = await followUpApi.runNow();
      setRunResult(`Sent ${res.data.data.sent}, errors ${res.data.data.errors}`);
      load();
    } catch (err) {
      console.error(err);
      setRunResult('Error running follow-up cycle');
    } finally {
      setRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Automated Follow-Ups</h1>
          <p className="text-white/50 text-sm">Configure staged email sequences per lead status. Runs automatically every 15 minutes.</p>
        </div>
        <div className="flex items-center gap-3">
          {runResult && <span className="text-xs text-white/50">{runResult}</span>}
          <button onClick={runNow} disabled={running}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#6EE7B7] text-[#121212] rounded-xl font-semibold text-sm hover:bg-[#5CD7A5] transition-all disabled:opacity-50">
            <PlayCircle className="w-4 h-4" />{running ? 'Running...' : 'Run Now'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {GROUPS.map(group => {
          const Icon = group.icon;
          return (
            <div key={group.status} className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`flex items-center gap-2 font-semibold ${group.color}`}>
                  <Icon className="w-4 h-4" />{group.label}
                </h2>
                <button onClick={() => addStage(group.status)}
                  className="flex items-center gap-1 text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <Plus className="w-3.5 h-3.5" />Add Stage
                </button>
              </div>

              <div className="space-y-4">
                {templatesFor(group.status).length === 0 && (
                  <p className="text-sm text-white/30">No follow-up stages configured yet.</p>
                )}
                {templatesFor(group.status).map(t => (
                  <div key={t._id} className="p-4 bg-[#0F0F0F] border border-white/10 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-white/60">Stage {t.stage + 1}</span>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1.5 text-xs text-white/40">
                          <input type="checkbox" checked={t.active} onChange={e => updateField(t._id, 'active', e.target.checked)}
                            className="accent-[#6EE7B7]" />
                          Active
                        </label>
                        <button onClick={() => removeTemplate(t)} className="p-1.5 rounded-lg text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-[1fr_140px] gap-3 mb-3">
                      <div>
                        <label className="block text-[11px] text-white/40 mb-1">Subject</label>
                        <input value={t.subject} onChange={e => updateField(t._id, 'subject', e.target.value)}
                          className="w-full px-3 py-2 bg-[#161616] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-[#6EE7B7]" />
                      </div>
                      <div>
                        <label className="block text-[11px] text-white/40 mb-1">Delay (hours after previous)</label>
                        <input type="number" min={1} value={t.delayHours} onChange={e => updateField(t._id, 'delayHours', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-[#161616] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-[#6EE7B7]" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-[11px] text-white/40 mb-1">Body (use {'{{fullName}}'}, {'{{company}}'}, {'{{services}}'})</label>
                      <textarea rows={3} value={t.body} onChange={e => updateField(t._id, 'body', e.target.value)}
                        className="w-full px-3 py-2 bg-[#161616] border border-white/10 rounded-lg text-sm text-white outline-none focus:border-[#6EE7B7] resize-none" />
                    </div>
                    <button onClick={() => saveTemplate(t)} disabled={saving === t._id}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#6EE7B7]/10 text-[#6EE7B7] hover:bg-[#6EE7B7]/20 transition-all disabled:opacity-50">
                      <Save className="w-3.5 h-3.5" />{saving === t._id ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6">
        <h2 className="flex items-center gap-2 font-semibold text-white/90 mb-4">
          <Mail className="w-4 h-4 text-[#6EE7B7]" />Recent Automated Emails
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/40 text-xs border-b border-white/10">
                <th className="pb-2 pr-4">To</th>
                <th className="pb-2 pr-4">Subject</th>
                <th className="pb-2 pr-4">Type</th>
                <th className="pb-2 pr-4">Opened</th>
                <th className="pb-2">Sent</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-white/30">No emails sent yet.</td></tr>
              )}
              {logs.map(log => (
                <tr key={log._id} className="border-b border-white/5 text-white/70">
                  <td className="py-2 pr-4 truncate max-w-[160px]">{log.to}</td>
                  <td className="py-2 pr-4 truncate max-w-[220px]">{log.subject}</td>
                  <td className="py-2 pr-4 text-xs text-white/40">{log.type.replace('_', ' ')}</td>
                  <td className="py-2 pr-4">
                    {log.opened ? (
                      <span className="flex items-center gap-1 text-[#6EE7B7] text-xs"><Eye className="w-3.5 h-3.5" />{log.openCount}x</span>
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-2 text-xs text-white/40">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
