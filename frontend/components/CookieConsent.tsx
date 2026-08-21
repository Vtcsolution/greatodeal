'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

export const COOKIE_CONSENT_KEY = 'gd_cookie_consent';
export type ConsentValue = 'all' | 'essential';
export const COOKIE_CONSENT_EVENT = 'gd-cookie-consent-changed';

export function getCookieConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(COOKIE_CONSENT_KEY);
  return v === 'all' || v === 'essential' ? v : null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);
  }, []);

  const choose = (value: ConsentValue) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[60] bg-[#0D0D0D]/97 backdrop-blur-xl border-t border-white/[0.08]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#6EE7B7]/10 border border-[#6EE7B7]/20 flex items-center justify-center shrink-0">
                <Cookie className="w-4 h-4 text-[#6EE7B7]" />
              </div>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-2xl">
                We use essential cookies to run this site, and optional analytics cookies to understand how it&apos;s used. You can choose which to allow.{' '}
                <Link href="/privacy-policy" className="text-[#6EE7B7] underline hover:text-[#5CD7A5]">Privacy Policy</Link>
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => choose('essential')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-white/10 text-white/70 text-xs sm:text-sm font-semibold hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                Essentials Only
              </button>
              <button
                onClick={() => choose('all')}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#6EE7B7] text-[#090909] text-xs sm:text-sm font-bold hover:bg-[#5CD7A5] transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
