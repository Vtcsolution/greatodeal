'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { LayoutDashboard, FileText, PlusCircle, MessageSquare, Mail, User, LogOut, X, FolderOpen, BarChart3, Zap, Inbox, Activity, Search, Briefcase, Image as ImageIcon } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/dashboard/add-blog', icon: PlusCircle, label: 'Add Blog' },
  { href: '/admin/dashboard/manage-blogs', icon: FileText, label: 'Manage Blogs' },
  { href: '/admin/dashboard/portfolio', icon: ImageIcon, label: 'Portfolio' },
  { href: '/admin/dashboard/knowledge', icon: FolderOpen, label: 'AI Knowledge Base' },
  { href: '/admin/dashboard/chats', icon: MessageSquare, label: 'AI Chats' },
  { href: '/admin/dashboard/emails', icon: Mail, label: 'Leads / Emails' },
  { href: '/admin/dashboard/lead-finder', icon: Search, label: 'Lead Finder' },
  { href: '/admin/dashboard/followups', icon: Zap, label: 'Follow-Up Automation' },
  { href: '/admin/dashboard/projects', icon: Briefcase, label: 'Projects' },
  { href: '/admin/dashboard/mailbox', icon: Inbox, label: 'Mailbox' },
  { href: '/admin/dashboard/activity', icon: Activity, label: 'Live Activity' },
  { href: '/admin/dashboard/profile', icon: User, label: 'Profile' },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-[#161616] border-r border-white/10 flex flex-col
        transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-[#6EE7B7] tracking-tight">Greatodeal</div>
            <div className="text-xs text-white/50 mt-0.5">Admin Panel</div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${active
                    ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white/90'
                  }`}>
                <Icon className="w-[18px] h-[18px] shrink-0" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-2.5 mb-2">
            <div className="text-sm font-semibold text-white">{admin?.name || 'Admin'}</div>
            <div className="text-xs text-white/40 mt-0.5 truncate">{admin?.email}</div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut className="w-[18px] h-[18px]" />Logout
          </button>
        </div>
      </aside>
    </>
  );
}
