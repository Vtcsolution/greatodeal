'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import { LayoutDashboard, FileText, PlusCircle, MessageSquare, Mail, User, LogOut, X, FolderOpen, BarChart3, Zap, Inbox, Activity, Search, Briefcase, Image as ImageIcon, Tag, Linkedin, Users, Shield, UserCog } from 'lucide-react';

// operatorVisible: shown to restricted "operator" accounts. Everything else (blog, Work,
// Pricing, Knowledge Base, Analytics, Team) is full-admin only — the backend enforces this
// too via requireFullAdmin, this flag just keeps the UI in sync with that boundary.
export const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', operatorVisible: false },
      { href: '/admin/dashboard/analytics', icon: BarChart3, label: 'Analytics', operatorVisible: false },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/dashboard/add-blog', icon: PlusCircle, label: 'Add Blog', operatorVisible: false },
      { href: '/admin/dashboard/manage-blogs', icon: FileText, label: 'Manage Blogs', operatorVisible: false },
      { href: '/admin/dashboard/portfolio', icon: ImageIcon, label: 'Work', operatorVisible: false },
      { href: '/admin/dashboard/pricing', icon: Tag, label: 'Pricing', operatorVisible: false },
      { href: '/admin/dashboard/knowledge', icon: FolderOpen, label: 'AI Knowledge Base', operatorVisible: false },
    ],
  },
  {
    label: 'Growth & CRM',
    items: [
      { href: '/admin/dashboard/linkedin', icon: Linkedin, label: 'LinkedIn Assistant', operatorVisible: true },
      { href: '/admin/dashboard/chats', icon: MessageSquare, label: 'AI Chats', operatorVisible: true },
      { href: '/admin/dashboard/emails', icon: Mail, label: 'Leads / Emails', operatorVisible: true },
      { href: '/admin/dashboard/lead-finder', icon: Search, label: 'Lead Finder', operatorVisible: true },
      { href: '/admin/dashboard/followups', icon: Zap, label: 'Follow-Up Automation', operatorVisible: true },
      { href: '/admin/dashboard/projects', icon: Briefcase, label: 'Projects', operatorVisible: true },
      { href: '/admin/dashboard/mailbox', icon: Inbox, label: 'Mailbox', operatorVisible: true },
      { href: '/admin/dashboard/activity', icon: Activity, label: 'Live Activity', operatorVisible: true },
    ],
  },
  {
    label: 'Team',
    items: [
      { href: '/admin/dashboard/team', icon: Users, label: 'Team', operatorVisible: false },
      { href: '/admin/dashboard/profile', icon: User, label: 'Profile', operatorVisible: true },
    ],
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

function initials(name?: string, email?: string): string {
  const source = name?.trim() || email || 'A';
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, logout } = useAdmin();
  const isOperator = admin?.accessLevel === 'operator';

  const groups = navGroups
    .map(g => ({ ...g, items: g.items.filter(item => !isOperator || item.operatorVisible) }))
    .filter(g => g.items.length > 0);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-[#141414] border-r border-white/[0.07] flex flex-col
        transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:translate-x-0 lg:z-auto lg:h-screen
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="relative p-5 border-b border-white/[0.07] flex items-center justify-between shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] flex items-center justify-center text-[#090909] font-black text-sm shrink-0">
              G
            </div>
            <div>
              <div className="text-[15px] font-bold text-white tracking-tight leading-tight">Greatodeal</div>
              <div className="text-[11px] text-white/40 leading-tight">Admin Panel</div>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-px left-5 right-5 h-px bg-gradient-to-r from-[#6EE7B7]/40 via-white/5 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {groups.map(group => (
            <div key={group.label}>
              <div className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/25">{group.label}</div>
              <div className="space-y-0.5">
                {group.items.map(({ href, icon: Icon, label }) => {
                  const active = pathname === href;
                  return (
                    <Link key={href} href={href} onClick={onClose}
                      className={`relative flex items-center gap-3 pl-3.5 pr-3 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${active
                          ? 'bg-[#6EE7B7]/10 text-white'
                          : 'text-white/55 hover:bg-white/[0.04] hover:text-white/85'
                        }`}>
                      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-[#6EE7B7]" />}
                      <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${active ? 'bg-[#6EE7B7]/15 text-[#6EE7B7]' : 'bg-white/[0.04] text-white/40 group-hover:text-white/70'}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="truncate">{label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.07] shrink-0">
          <Link href="/admin/dashboard/profile" onClick={onClose} className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isOperator ? 'bg-white/10 text-white/60' : 'bg-gradient-to-br from-[#6EE7B7] to-[#3B82F6] text-[#090909]'}`}>
              {initials(admin?.name, admin?.email)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white truncate">{admin?.name || 'Admin'}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-white/40 truncate">
                {isOperator ? <UserCog className="w-3 h-3 shrink-0" /> : <Shield className="w-3 h-3 shrink-0 text-[#6EE7B7]" />}
                <span className="truncate">{admin?.role || (isOperator ? 'Operator' : 'Administrator')}</span>
              </div>
            </div>
          </Link>
          <button onClick={logout} className="mt-1 flex items-center gap-3 w-full pl-3.5 pr-3 py-2.5 rounded-xl text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/[0.08] transition-all">
            <span className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-red-500/10">
              <LogOut className="w-4 h-4" />
            </span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
