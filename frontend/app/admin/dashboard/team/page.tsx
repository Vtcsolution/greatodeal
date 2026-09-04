'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { adminApi } from '@/lib/api';
import type { AdminProfile } from '@/types';
import { PlusCircle, Trash2, Pencil, X, Shield, UserCog, Loader2 } from 'lucide-react';

const inputCls = 'w-full px-3 py-2.5 bg-[#0F0F0F] border border-white/10 rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-[#6EE7B7]/40 transition-all';
const labelCls = 'block text-xs font-semibold text-white/50 mb-1.5';

interface FormState {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  accessLevel: 'admin' | 'operator';
}

const emptyForm: FormState = { name: '', email: '', password: '', role: 'Operator', accessLevel: 'operator' };

export default function TeamPage() {
  const { admin: currentAdmin } = useAdmin();
  const [team, setTeam] = useState<AdminProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    adminApi.getTeam()
      .then(res => setTeam(res.data.data || []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setError(''); setModalOpen(true); };
  const openEdit = (member: AdminProfile) => {
    setForm({ _id: member._id, name: member.name || '', email: member.email, password: '', role: member.role, accessLevel: member.accessLevel });
    setError('');
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.email || (!form._id && !form.password)) {
      setError('Email and password are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (form._id) {
        const payload: Record<string, unknown> = { name: form.name, email: form.email, role: form.role, accessLevel: form.accessLevel };
        if (form.password) payload.password = form.password;
        await adminApi.updateTeamMember(form._id, payload);
      } else {
        await adminApi.createTeamMember({ name: form.name, email: form.email, password: form.password, role: form.role, accessLevel: form.accessLevel });
      }
      setModalOpen(false);
      load();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Could not save this account.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (member: AdminProfile) => {
    if (!confirm(`Remove ${member.name || member.email}'s access?`)) return;
    try {
      await adminApi.deleteTeamMember(member._id);
      setTeam(prev => prev.filter(m => m._id !== member._id));
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Could not remove this account.');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Team</h1>
          <p className="text-white/50 text-sm">Give teammates their own login. Operators only see LinkedIn Assistant, AI Chats, Leads/Emails, Lead Finder, Follow-Ups, Projects, Mailbox, and Live Activity.</p>
        </div>
        <button onClick={openAdd} className="btn-primary btn-primary-sm shrink-0">
          <PlusCircle className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-[#161616] rounded-2xl border border-white/10 divide-y divide-white/5 overflow-hidden">
          {team.map(member => (
            <div key={member._id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${member.accessLevel === 'admin' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-white/5 text-white/40'}`}>
                  {member.accessLevel === 'admin' ? <Shield className="w-4 h-4" /> : <UserCog className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{member.name || 'Unnamed'}</span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-semibold shrink-0 ${member.accessLevel === 'admin' ? 'bg-[#6EE7B7]/10 text-[#6EE7B7]' : 'bg-white/10 text-white/50'}`}>
                      {member.role}
                    </span>
                    {member._id === currentAdmin?._id && <span className="text-[10px] text-white/30 shrink-0">(you)</span>}
                  </div>
                  <div className="text-xs text-white/40 truncate">{member.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => openEdit(member)} className="p-2 text-white/40 hover:text-[#6EE7B7] hover:bg-white/5 rounded-lg transition-all" title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(member)}
                  disabled={member._id === currentAdmin?._id}
                  className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-white/40"
                  title={member._id === currentAdmin?._id ? "You can't remove your own account" : 'Remove'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => !saving && setModalOpen(false)}>
          <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">{form._id ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-white/40 hover:text-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>

            {error && <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">{error}</div>}

            <div className="space-y-4">
              <div>
                <label className={labelCls}>Name</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="e.g. Sara Ahmed" />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} placeholder="sara@greatodeal.com" />
              </div>
              <div>
                <label className={labelCls}>{form._id ? 'New password (leave blank to keep current)' : 'Password'}</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className={inputCls} placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Title</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={inputCls} placeholder="Operator / Manager / Assistant" />
                </div>
                <div>
                  <label className={labelCls}>Access level</label>
                  <select value={form.accessLevel} onChange={e => setForm(f => ({ ...f, accessLevel: e.target.value as 'admin' | 'operator' }))} className={inputCls}>
                    <option value="operator">Operator (limited panels)</option>
                    <option value="admin">Full Admin</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-white/50 hover:text-white text-sm transition-colors">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary btn-primary-sm disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {form._id ? 'Save Changes' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
