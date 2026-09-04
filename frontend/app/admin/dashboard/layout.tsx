'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar, { navGroups } from '@/components/admin/AdminSidebar';
import NotificationBell from '@/components/admin/NotificationBell';
import { Menu, ChevronRight } from 'lucide-react';

const allNavItems = navGroups.flatMap(g => g.items.map(item => ({ ...item, group: g.label })));

function currentPage(pathname: string | null) {
  if (!pathname) return null;
  const exact = allNavItems.find(i => i.href === pathname);
  if (exact) return exact;
  // fall back to the deepest matching section (e.g. an edit/[id] page under a list route)
  const prefixMatches = allNavItems
    .filter(i => i.href !== '/admin/dashboard' && pathname.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length);
  return prefixMatches[0] || null;
}

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

  const page = currentPage(pathname);

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
            <span className="text-sm font-semibold text-white truncate">{page?.label || 'Dashboard'}</span>
            <div className="ml-auto shrink-0"><NotificationBell /></div>
          </header>
          {/* Desktop top bar */}
          <header className="hidden lg:flex sticky top-0 z-30 bg-[#0F0F0F]/85 backdrop-blur-md border-b border-white/[0.06] px-7 py-4 items-center justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-white/35 font-medium">
                <span>{page?.group || 'Overview'}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/50">{page?.label || 'Dashboard'}</span>
              </div>
              <h1 className="text-lg font-bold text-white tracking-tight mt-0.5">{page?.label || 'Dashboard'}</h1>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <NotificationBell />
            </div>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </NotificationProvider>
  );
}
