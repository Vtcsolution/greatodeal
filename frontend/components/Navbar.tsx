'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight, ArrowUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AIChatBot from './AIChatBot';
import { portfolioApi } from '@/lib/api';

const chatQuickReplies = ['Services', 'Get a Quote', 'AI Automation'];

interface NavSubItem { name: string; path: string; }
interface NavItem {
  name: string;
  path?: string;
  dropdown?: NavSubItem[];
}

const navItems: NavItem[] = [
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  {
    name: 'Industries',
    path: '/industries',
    dropdown: [
      { name: 'Government', path: '/industries/government' },
      { name: 'Healthcare', path: '/industries/healthcare' },
      { name: 'Fintech', path: '/industries/fintech' },
      { name: 'Green Tech', path: '/industries/green-tech' },
      { name: 'Real Estate', path: '/industries/real-estate' },
      { name: 'AI Automation', path: '/industries/ai-automation' },
    ],
  },
  { name: 'Insights', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const whatsappUrl = `https://wa.me/923011060841?text=Hi%20there!%20I%20visited%20greatodeal.com%20and%20would%20love%20to%20connect.`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatPreview, setShowChatPreview] = useState(false);
  const [chatPreviewDismissed, setChatPreviewDismissed] = useState(false);
  const [showPortfolioLink, setShowPortfolioLink] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsVisible(window.pageYOffset > 300);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setMobileDropdowns({});
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsOpen(false); setActiveDropdown(null); setMobileDropdowns({}); }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); setMobileDropdowns({}); }, [pathname]);

  useEffect(() => {
    portfolioApi.getPublic()
      .then(res => setShowPortfolioLink(!!res.data?.data?.isVisible))
      .catch(() => setShowPortfolioLink(false));
  }, []);

  const visibleNavItems = useMemo(() => {
    if (!showPortfolioLink) return navItems;
    const items = [...navItems];
    items.splice(2, 0, { name: 'Portfolio', path: '/portfolio' });
    return items;
  }, [showPortfolioLink]);

  useEffect(() => {
    if (chatPreviewDismissed || isChatOpen) return;
    const timer = setTimeout(() => setShowChatPreview(true), 4000);
    return () => clearTimeout(timer);
  }, [chatPreviewDismissed, isChatOpen]);

  const openChatWithPreview = () => {
    setShowChatPreview(false);
    setChatPreviewDismissed(true);
    setIsChatOpen(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 80);
  };

  const getDropdownWidth = (name: string) => {
    if (name === 'Industries') return 'w-[480px]';
    return 'w-[280px]';
  };

  const getDropdownCols = (name: string) => {
    if (name === 'Industries') return 'grid-cols-2';
    return 'grid-cols-1';
  };

  return (
    <>
      {/* Scroll to Top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 right-4 p-3 bg-[#6EE7B7] hover:shadow-[0_0_20px_rgba(110,231,183,0.3)] rounded-full z-50 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-[#090909]" />
      </motion.button>

      {/* Floating widgets: WhatsApp + AI chat button, with the preview bubble
          stacking above them via flex-col-reverse so nothing needs manually
          calculated offsets that can drift out of sync and overlap. */}
      {!isChatOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 flex flex-col-reverse items-end gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="bg-[#6EE7B7] p-2 sm:p-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(110,231,183,0.3)] transition-all duration-700 flex items-center gap-1"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 sm:w-6 sm:h-6 text-[#090909]">
                <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z" fill="currentColor" fillRule="evenodd" />
              </svg>
              <span className="hidden sm:inline text-sm font-semibold text-[#090909]">WhatsApp</span>
            </a>

            <motion.button
              className="bg-[#6EE7B7] p-2 sm:p-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(110,231,183,0.3)] flex items-center gap-1 pr-3 sm:pr-4"
              onClick={openChatWithPreview}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#090909]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-xs sm:text-sm font-semibold text-[#090909]">AI Greato</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {showChatPreview && (
              <motion.div
                className="w-72 bg-[#0D0D0D]/95 backdrop-blur-xl border border-white/[0.1] rounded-2xl rounded-br-md shadow-2xl shadow-black/50 overflow-hidden"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-[#6EE7B7]" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#6EE7B7] rounded-full border-2 border-[#0D0D0D] animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">AI Greato</p>
                      <p className="text-[11px] text-white/40">Typically replies instantly</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShowChatPreview(false); setChatPreviewDismissed(true); }}
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
                    aria-label="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-white/85 leading-relaxed mb-3.5">Hi! 👋 How can we help you automate your business today?</p>
                  <div className="flex flex-wrap gap-1.5">
                    {chatQuickReplies.map(label => (
                      <button
                        key={label}
                        onClick={openChatWithPreview}
                        className="px-3 py-1.5 border border-[#6EE7B7]/25 text-[#6EE7B7] text-xs rounded-lg hover:bg-[#6EE7B7]/10 transition-colors font-medium"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AIChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-[#090909]/95 shadow-2xl' : 'backdrop-blur-md bg-[#090909]/80'}`}>
        <div className="container max-w-[1920px]">
          <div className="flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <Image src="/images/logo.png" alt="Greatodeal AI automation agency logo" width={140} height={50} className="h-10 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105" priority />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex items-center space-x-1 xl:space-x-2">
                {visibleNavItems.map((item) => (
                  item.dropdown ? (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Trigger */}
                      <div className="flex items-center cursor-pointer">
                        {item.path ? (
                          <Link
                            href={item.path}
                            className={`px-3 xl:px-4 py-2 rounded-l-md text-base font-medium transition-all hover:bg-gray-800/50 ${pathname.startsWith(item.path) ? 'text-green-400' : 'text-gray-300 hover:text-green-400'}`}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <span className={`px-3 xl:px-4 py-2 text-base font-medium select-none ${activeDropdown === item.name ? 'text-green-400' : 'text-gray-300'}`}>
                            {item.name}
                          </span>
                        )}
                        <span className={`py-2 pr-2 ${item.path ? '' : 'pl-0'}`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-green-400' : 'text-gray-400'}`} />
                        </span>
                      </div>

                      {/* Dropdown Panel — inside same hover container */}
                      <div
                        className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ${activeDropdown === item.name ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}
                      >
                        <div className={`${getDropdownWidth(item.name)} bg-[#0D1117] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden`}>
                          <div className={`p-4 grid ${getDropdownCols(item.name)} gap-1`}>
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-3 text-[15px] text-white/80 hover:text-[#6EE7B7] hover:bg-white/[0.04] rounded-lg transition-all"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.path!}
                      className={`px-3 xl:px-4 py-2 rounded-md text-base font-medium transition-all hover:bg-gray-800/50 ${pathname === item.path ? 'text-green-400' : 'text-gray-300 hover:text-green-400'}`}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <button onClick={() => setIsChatOpen(true)} className="btn-primary btn-primary-sm group">
                AI Assistant <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button onClick={() => setIsChatOpen(true)} className="hidden sm:flex btn-primary btn-primary-sm">
                AI Assistant
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-green-400 p-2 rounded-md z-50 relative" aria-label="Toggle menu">
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <X className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div ref={mobileMenuRef} className={`lg:hidden fixed top-0 right-0 h-screen w-full bg-black z-40 transform transition-all duration-500 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="h-16 flex items-center justify-end px-6 border-b border-gray-800">
            <button onClick={() => { setIsOpen(false); setMobileDropdowns({}); }} className="text-gray-300 hover:text-green-400 p-2" aria-label="Close">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="pt-6 pb-8 px-6 h-[calc(100%-4rem)] overflow-y-auto">
            <div className="space-y-2">
              {visibleNavItems.map((item) => (
                <div key={item.name} className="border-b border-gray-800 last:border-0">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => setMobileDropdowns(p => ({ ...p, [item.name]: !p[item.name] }))}
                        className="w-full flex items-center justify-between px-4 py-4 text-gray-200 hover:text-green-400 rounded-lg hover:bg-gray-800/50 transition-all"
                      >
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns[item.name] ? 'rotate-180 text-green-400' : ''}`} />
                      </button>
                      <div className={`ml-4 pl-4 border-l-2 border-gray-700 space-y-1 overflow-hidden transition-all duration-500 ${mobileDropdowns[item.name] ? 'max-h-[500px] opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
                        {item.dropdown.map((sub) => (
                          <Link key={sub.path} href={sub.path} onClick={() => { setIsOpen(false); setMobileDropdowns({}); }}
                            className="block px-3 py-2.5 text-base text-gray-400 hover:text-blue-400 rounded-lg hover:bg-gray-800/30 transition-all">
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link href={item.path!} onClick={() => { setIsOpen(false); setMobileDropdowns({}); }}
                      className="block px-4 py-4 text-gray-200 hover:text-green-400 rounded-lg hover:bg-gray-800/50 font-medium transition-all">
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 px-4">
              <button onClick={() => { setIsChatOpen(true); setIsOpen(false); }}
                className="btn-primary w-full text-center">
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
