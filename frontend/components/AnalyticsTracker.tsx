'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsApi } from '@/lib/api';
import { getCookieConsent, COOKIE_CONSENT_EVENT } from './CookieConsent';

function getSessionId(): string {
  let id = sessionStorage.getItem('gd_session_id');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('gd_session_id', id);
  }
  return id;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const visitIdRef = useRef<string | null>(null);
  const startRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);

  useEffect(() => {
    // Analytics is a non-essential/optional cookie category — only track once
    // the visitor has explicitly accepted all cookies, not by default.
    let cleanupTracking: (() => void) | undefined;

    const startTracking = () => {
      startRef.current = Date.now();
      maxScrollRef.current = 0;
      visitIdRef.current = null;

      const sessionId = getSessionId();
      analyticsApi
        .track({ event: 'pageview', sessionId, path: pathname, referrer: document.referrer })
        .then((res) => { visitIdRef.current = res.data?.id || null; })
        .catch(() => {});

      const onScroll = () => {
        const doc = document.documentElement;
        const scrollable = doc.scrollHeight - doc.clientHeight;
        const pct = scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
        if (pct > maxScrollRef.current) maxScrollRef.current = pct;
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const sendUpdate = () => {
        if (!visitIdRef.current || typeof navigator === 'undefined' || !navigator.sendBeacon) return;
        const duration = Math.round((Date.now() - startRef.current) / 1000);
        const payload = JSON.stringify({ event: 'update', id: visitIdRef.current, duration, scrollDepth: maxScrollRef.current });
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        navigator.sendBeacon(`${apiBase}/api/analytics/track`, new Blob([payload], { type: 'application/json' }));
      };

      const onVisibility = () => { if (document.visibilityState === 'hidden') sendUpdate(); };
      document.addEventListener('visibilitychange', onVisibility);
      window.addEventListener('pagehide', sendUpdate);

      cleanupTracking = () => {
        sendUpdate();
        window.removeEventListener('scroll', onScroll);
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pagehide', sendUpdate);
      };
    };

    let onConsentChange: (() => void) | undefined;
    if (getCookieConsent() === 'all') {
      startTracking();
    } else {
      onConsentChange = () => {
        if (getCookieConsent() === 'all') startTracking();
      };
      window.addEventListener(COOKIE_CONSENT_EVENT, onConsentChange, { once: true });
    }

    return () => {
      if (onConsentChange) window.removeEventListener(COOKIE_CONSENT_EVENT, onConsentChange);
      cleanupTracking?.();
    };
  }, [pathname]);

  return null;
}
