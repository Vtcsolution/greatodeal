'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

const ParticleBackground = dynamic(() => import('./ui/ParticleBackground'), { ssr: false });
const AnalyticsTracker = dynamic(() => import('./AnalyticsTracker'), { ssr: false });
const CookieConsent = dynamic(() => import('./CookieConsent'), { ssr: false });

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768 && !window.matchMedia('(pointer: coarse)').matches);
  }, []);

  return (
    <>
      {!isAdmin && (
        <>
          {isDesktop && <ParticleBackground />}
          <AnalyticsTracker />
          <Navbar />
          <CookieConsent />
        </>
      )}
      <main className="relative z-10">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
