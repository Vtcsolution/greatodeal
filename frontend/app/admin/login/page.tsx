'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, admin, loading } = useAdmin();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && admin) router.push('/admin/dashboard');
  }, [admin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password, rememberMe);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">Greatodeal CMS</p>
        </div>
        <div className="bg-[#161616] rounded-2xl border border-white/10 p-6 sm:p-8">
          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@greatodeal.com"
                className="w-full px-4 py-3 bg-[#0F0F0F] border border-white/10 rounded-xl text-white placeholder-white/25 focus:border-[#6EE7B7] focus:ring-2 focus:ring-[#6EE7B7]/20 outline-none transition-all text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 bg-[#0F0F0F] border border-white/10 rounded-xl text-white placeholder-white/25 focus:border-[#6EE7B7] focus:ring-2 focus:ring-[#6EE7B7]/20 outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded accent-[#6EE7B7] bg-[#0F0F0F] border-white/20"
              />
              <span className="text-sm text-white/60">Remember me for 30 days</span>
            </label>
            <button type="submit" disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 text-sm">
              {submitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
