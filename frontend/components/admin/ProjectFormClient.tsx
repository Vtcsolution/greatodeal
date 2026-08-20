'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { projectApi } from '@/lib/api';
import type { Project, ProjectFeature, ProjectMilestone, ProjectExpense, ProjectStatus, MilestoneStatus, ExpenseCategory } from '@/types';
import { Plus, Trash2, Save, DollarSign, ListChecks, Flag, ArrowLeft, CheckCircle2, Circle, Loader2 } from 'lucide-react';

const STATUS_OPTIONS: { value: ProjectStatus; label: string; color: string }[] = [
  { value: 'planning', label: 'Planning', color: 'text-white/50' },
  { value: 'in_progress', label: 'In Progress', color: 'text-blue-400' },
  { value: 'on_hold', label: 'On Hold', color: 'text-amber-400' },
  { value: 'completed', label: 'Completed', color: 'text-emerald-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400' },
];

const EXPENSE_CATEGORIES: ExpenseCategory[] = ['development', 'api', 'tool', 'other'];
const MILESTONE_STATUSES: MilestoneStatus[] = ['pending', 'in_progress', 'done'];

interface Prefill {
  contactId: string;
  clientName: string;
  clientEmail: string;
  company?: string;
  services?: string;
}

const inputCls = 'w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 transition-all';
const labelCls = 'block text-xs font-medium text-white/50 mb-1.5';

function money(n: number, currency: string): string {
  return `${currency} ${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default function ProjectFormClient({ project, prefill }: { project?: Project; prefill?: Prefill }) {
  const router = useRouter();
  const isNew = !project;

  const [projectName, setProjectName] = useState(project?.projectName || (prefill?.services ? `${prefill.services} — ${prefill.clientName}` : ''));
  const [projectType, setProjectType] = useState(project?.projectType || '');
  const [description, setDescription] = useState(project?.description || '');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'planning');
  const [startDate, setStartDate] = useState(project?.startDate ? project.startDate.slice(0, 10) : new Date().toISOString().slice(0, 10));
  const [targetEndDate, setTargetEndDate] = useState(project?.targetEndDate ? project.targetEndDate.slice(0, 10) : '');
  const [budget, setBudget] = useState(project?.budget ?? 0);
  const [amountPaidByClient, setAmountPaidByClient] = useState(project?.amountPaidByClient ?? 0);
  const [currency, setCurrency] = useState(project?.currency || 'USD');
  const [features, setFeatures] = useState<ProjectFeature[]>(project?.features || []);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>(project?.milestones || []);
  const [expenses, setExpenses] = useState<ProjectExpense[]>(project?.expenses || []);
  const [newFeature, setNewFeature] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0), [expenses]);
  const remainingBudget = budget - totalExpenses;
  const amountDue = budget - amountPaidByClient;

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures(prev => [...prev, { name: newFeature.trim(), done: false }]);
    setNewFeature('');
  };
  const toggleFeature = (i: number) => setFeatures(prev => prev.map((f, idx) => idx === i ? { ...f, done: !f.done } : f));
  const removeFeature = (i: number) => setFeatures(prev => prev.filter((_, idx) => idx !== i));

  const addMilestone = () => setMilestones(prev => [...prev, { title: '', status: 'pending', amount: 0, startDate: null, endDate: null }]);
  const updateMilestone = (i: number, field: keyof ProjectMilestone, value: string | number) =>
    setMilestones(prev => prev.map((m, idx) => idx === i ? { ...m, [field]: value } : m));
  const removeMilestone = (i: number) => setMilestones(prev => prev.filter((_, idx) => idx !== i));

  const addExpense = () => setExpenses(prev => [...prev, { label: '', category: 'development', amount: 0, date: new Date().toISOString().slice(0, 10) }]);
  const updateExpense = (i: number, field: keyof ProjectExpense, value: string | number) =>
    setExpenses(prev => prev.map((e, idx) => idx === i ? { ...e, [field]: value } : e));
  const removeExpense = (i: number) => setExpenses(prev => prev.filter((_, idx) => idx !== i));

  const save = async () => {
    if (!projectName.trim() || !projectType.trim()) {
      setError('Project name and project type are required.');
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      projectName, projectType, description, status,
      startDate, targetEndDate: targetEndDate || null,
      budget: Number(budget), amountPaidByClient: Number(amountPaidByClient), currency,
      features, milestones, expenses,
    };
    try {
      if (isNew && prefill) {
        const res = await projectApi.create({ ...payload, contactId: prefill.contactId, clientName: prefill.clientName, clientEmail: prefill.clientEmail, company: prefill.company });
        router.push(`/admin/dashboard/projects/${res.data.data._id}`);
      } else if (project) {
        await projectApi.update(project._id, payload);
        router.refresh();
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const clientName = project?.clientName || prefill?.clientName || '';
  const clientEmail = project?.clientEmail || prefill?.clientEmail || '';
  const company = project?.company || prefill?.company || '';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <Link href="/admin/dashboard/projects" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />Back to Projects
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{isNew ? 'New Project' : projectName || 'Project'}</h1>
          <p className="text-white/50 text-sm">{clientName} · {clientEmail}{company ? ` · ${company}` : ''}</p>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#6EE7B7] text-[#121212] rounded-xl font-semibold text-sm hover:bg-[#5CD7A5] transition-all disabled:opacity-50 shrink-0">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-300 mb-6">{error}</div>}

      {/* Project basics */}
      <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6">
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className={labelCls}>Project Name</label>
            <input className={inputCls} value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="e.g. AI Automation Platform" />
          </div>
          <div>
            <label className={labelCls}>Project Type</label>
            <input className={inputCls} value={projectType} onChange={e => setProjectType(e.target.value)} placeholder="e.g. AI Automation, Web App, Mobile App" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={status} onChange={e => setStatus(e.target.value as ProjectStatus)}>
              {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Start Date</label>
            <input type="date" className={inputCls} value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Target End Date</label>
            <input type="date" className={inputCls} value={targetEndDate} onChange={e => setTargetEndDate(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description / Scope Notes</label>
          <textarea rows={3} className={`${inputCls} resize-none`} value={description} onChange={e => setDescription(e.target.value)} placeholder="What was agreed with the client..." />
        </div>
      </div>

      {/* Budget & costs */}
      <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6">
        <h2 className="flex items-center gap-2 font-semibold text-white/90 mb-4"><DollarSign className="w-4 h-4 text-[#6EE7B7]" />Budget &amp; Costs</h2>

        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className={labelCls}>Currency</label>
            <input className={inputCls} value={currency} onChange={e => setCurrency(e.target.value.toUpperCase())} maxLength={3} />
          </div>
          <div>
            <label className={labelCls}>Total Budget (agreed with client)</label>
            <input type="number" min={0} className={inputCls} value={budget} onChange={e => setBudget(Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Amount Paid by Client So Far</label>
            <input type="number" min={0} className={inputCls} value={amountPaidByClient} onChange={e => setAmountPaidByClient(Number(e.target.value))} />
          </div>
        </div>

        {/* Expenses */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-white/50">Expenses (development, API, tools, etc.)</label>
            <button onClick={addExpense} className="flex items-center gap-1 text-xs text-[#6EE7B7] hover:text-[#5CD7A5] px-2 py-1 rounded-lg hover:bg-[#6EE7B7]/10 transition-all">
              <Plus className="w-3.5 h-3.5" />Add Expense
            </button>
          </div>
          {expenses.length === 0 && <p className="text-xs text-white/30 py-2">No costs logged yet.</p>}
          <div className="space-y-2">
            {expenses.map((exp, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_110px_130px_auto] gap-2 items-center">
                <input className={inputCls} placeholder="e.g. OpenAI API credits" value={exp.label} onChange={e => updateExpense(i, 'label', e.target.value)} />
                <select className={inputCls} value={exp.category} onChange={e => updateExpense(i, 'category', e.target.value)}>
                  {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="number" min={0} className={inputCls} value={exp.amount} onChange={e => updateExpense(i, 'amount', Number(e.target.value))} />
                <input type="date" className={inputCls} value={exp.date?.slice(0, 10)} onChange={e => updateExpense(i, 'date', e.target.value)} />
                <button onClick={() => removeExpense(i)} className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div className="p-3 bg-white/[0.03] rounded-xl">
            <div className="text-xs text-white/40 mb-1">Budget</div>
            <div className="text-sm font-bold text-white tabular-nums">{money(budget, currency)}</div>
          </div>
          <div className="p-3 bg-white/[0.03] rounded-xl">
            <div className="text-xs text-white/40 mb-1">Total Expenses</div>
            <div className="text-sm font-bold text-amber-400 tabular-nums">{money(totalExpenses, currency)}</div>
          </div>
          <div className="p-3 bg-white/[0.03] rounded-xl">
            <div className="text-xs text-white/40 mb-1">Remaining Budget</div>
            <div className={`text-sm font-bold tabular-nums ${remainingBudget < 0 ? 'text-red-400' : 'text-[#6EE7B7]'}`}>{money(remainingBudget, currency)}</div>
          </div>
          <div className="p-3 bg-white/[0.03] rounded-xl">
            <div className="text-xs text-white/40 mb-1">Amount Due from Client</div>
            <div className={`text-sm font-bold tabular-nums ${amountDue > 0 ? 'text-blue-400' : 'text-white/40'}`}>{money(Math.max(amountDue, 0), currency)}</div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 font-semibold text-white/90"><Flag className="w-4 h-4 text-[#6EE7B7]" />Milestones</h2>
          <button onClick={addMilestone} className="flex items-center gap-1 text-xs text-[#6EE7B7] hover:text-[#5CD7A5] px-2 py-1 rounded-lg hover:bg-[#6EE7B7]/10 transition-all">
            <Plus className="w-3.5 h-3.5" />Add Milestone
          </button>
        </div>
        {milestones.length === 0 && <p className="text-xs text-white/30">No milestones added yet.</p>}
        <div className="space-y-3">
          {milestones.map((m, i) => (
            <div key={i} className="p-3 bg-[#0F0F0F] border border-white/10 rounded-xl">
              <div className="grid sm:grid-cols-[1fr_130px] gap-2 mb-2">
                <input className={inputCls} placeholder="Milestone title" value={m.title} onChange={e => updateMilestone(i, 'title', e.target.value)} />
                <select className={inputCls} value={m.status} onChange={e => updateMilestone(i, 'status', e.target.value)}>
                  {MILESTONE_STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-[1fr_1fr_130px_auto] gap-2 items-center">
                <div>
                  <label className="block text-[10px] text-white/30 mb-1">Start</label>
                  <input type="date" className={inputCls} value={m.startDate?.slice(0, 10) || ''} onChange={e => updateMilestone(i, 'startDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] text-white/30 mb-1">End / Done Date</label>
                  <input type="date" className={inputCls} value={m.endDate?.slice(0, 10) || ''} onChange={e => updateMilestone(i, 'endDate', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] text-white/30 mb-1">Tied Payment</label>
                  <input type="number" min={0} className={inputCls} value={m.amount} onChange={e => updateMilestone(i, 'amount', Number(e.target.value))} />
                </div>
                <button onClick={() => removeMilestone(i)} className="self-end p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#161616] rounded-2xl border border-white/10 p-4 sm:p-6 mb-8">
        <h2 className="flex items-center gap-2 font-semibold text-white/90 mb-4"><ListChecks className="w-4 h-4 text-[#6EE7B7]" />Features Checklist</h2>
        <div className="flex gap-2 mb-4">
          <input className={inputCls} placeholder="e.g. Admin dashboard, Payment integration..." value={newFeature}
            onChange={e => setNewFeature(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
          <button onClick={addFeature} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#6EE7B7]/10 text-[#6EE7B7] rounded-xl text-sm font-medium hover:bg-[#6EE7B7]/20 transition-all shrink-0">
            <Plus className="w-4 h-4" />Add
          </button>
        </div>
        {features.length === 0 && <p className="text-xs text-white/30">No features listed yet.</p>}
        <div className="space-y-1.5">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 p-2.5 bg-[#0F0F0F] border border-white/5 rounded-xl">
              <button onClick={() => toggleFeature(i)} className="shrink-0">
                {f.done ? <CheckCircle2 className="w-4 h-4 text-[#6EE7B7]" /> : <Circle className="w-4 h-4 text-white/30" />}
              </button>
              <span className={`flex-1 text-sm ${f.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{f.name}</span>
              <button onClick={() => removeFeature(i)} className="p-1 rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
