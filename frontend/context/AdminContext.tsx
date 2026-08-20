'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';
import type { AdminProfile } from '@/types';

interface AdminContextType {
  admin: AdminProfile | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { setLoading(false); return; }
    adminApi.getProfile()
      .then(res => { if (res.data.success) setAdmin(res.data.data as AdminProfile); })
      .catch(() => localStorage.removeItem('adminToken'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const res = await adminApi.login(email, password, rememberMe);
    if (res.data.success) {
      localStorage.setItem('adminToken', res.data.token);
      setAdmin(res.data.admin);
      router.push('/admin/dashboard');
    } else {
      throw new Error(res.data.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
    router.push('/admin/login');
  };

  return <AdminContext.Provider value={{ admin, loading, login, logout }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
