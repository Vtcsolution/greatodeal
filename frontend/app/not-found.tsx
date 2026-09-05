import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | Greatodeal',
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center px-4 py-24">
      <div className="text-center max-w-lg">
        <div className="text-[#6EE7B7] font-mono text-sm tracking-[0.2em] uppercase mb-4">Error 404</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Page Not Found</h1>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has moved. It might have been renamed, or the link you followed is out of date.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary group">
            <Home className="w-4 h-4" /> Back to Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-white/[0.08] text-white rounded-xl font-bold text-sm hover:border-[#6EE7B7]/30 hover:bg-[#6EE7B7]/[0.03] transition-all duration-500 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
