'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import NotificationBell from '@/components/admin/NotificationBell';
import { Menu } from 'lucide-react';

// Paths an "operator" account is allowed on. Kept in sync with AdminSidebar's
// operatorVisible flags; the backend's requireFullAdmin middleware is the real
// security boundary — this is just so an operator isn't shown a broken/empty page.
const OPERATOR_ALLOWED_PREFIXES = [
  '/admin/dashboard/linkedin',
  '/admin/dashboard/chats',
  '/admin/dashboard/emails',
  '/admin/dashboard/lead-finder',
  '/admin/dashboard/followups',
  '/admin/dashboard/projects',
  '/admin/dashboard/mailbox',
  '/admin/dashboard/activity',
  '/admin/dashboard/profile',
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !admin) router.push('/admin/login');
  }, [admin, loading, router]);

  useEffect(() => {
    if (loading || !admin || admin.accessLevel !== 'operator') return;
    const allowed = OPERATOR_ALLOWED_PREFIXES.some(prefix => pathname?.startsWith(prefix));
    if (!allowed) router.replace('/admin/dashboard/linkedin');
  }, [admin, loading, pathname, router]);

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-[#6EE7B7] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!admin) return null;

  return (
    <NotificationProvider>
      <div className="flex min-h-screen bg-[#0F0F0F]">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile top bar */}
          <header className="sticky top-0 z-30 lg:hidden bg-[#161616] border-b border-white/10 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-bold text-[#6EE7B7]">Greatodeal</span>
            <span className="text-xs text-white/40">Admin</span>
            <div className="ml-auto"><NotificationBell /></div>
          </header>
          {/* Desktop top bar */}
          <header className="hidden lg:flex sticky top-0 z-30 bg-[#0F0F0F]/80 backdrop-blur border-b border-white/5 px-6 py-3 items-center justify-end">
            <NotificationBell />
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </NotificationProvider>
  );
}
