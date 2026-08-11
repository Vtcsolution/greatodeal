import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin, Instagram, Youtube, MapPin, Mail } from 'lucide-react';

const footerLinks = {
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ],
  industries: [
    { name: 'Government', path: '/industries/government' },
    { name: 'Healthcare', path: '/industries/healthcare' },
    { name: 'Fintech', path: '/industries/fintech' },
    { name: 'Green Tech', path: '/industries/green-tech' },
    { name: 'Real Estate', path: '/industries/real-estate' },
    { name: 'AI Automation', path: '/industries/ai-automation' },
  ],
};

const socials = [
  { Icon: Facebook, href: 'https://www.facebook.com/greatodealofficial/', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/greatodeal/', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/greatodeal', label: 'LinkedIn' },
  { Icon: Youtube, href: 'https://www.youtube.com/@GreatodealAI', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-[#060606] text-white/90" itemScope itemType="https://schema.org/Organization">
      <div className="container max-w-[1600px] py-14 sm:py-16 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <Link href="/">
              <Image src="/images/logo.png" alt="Greatodeal AI automation agency logo" width={140} height={50} className="h-10 sm:h-12 w-auto object-contain" />
            </Link>
            <p className="text-white/70 text-base leading-relaxed" itemProp="description">
              AI SaaS and agentic automation for government, healthcare, and other regulated industries.{' '}
              <span className="text-[#6EE7B7]">greatodeal.com</span>
            </p>
            <div className="flex space-x-2">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-white/40 hover:text-[#6EE7B7] p-2.5 rounded-xl transition-all hover:bg-white/[0.04]">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(({ name, path }) => (
                <li key={path}>
                  <Link href={path} className="text-white/70 hover:text-[#6EE7B7] transition-colors duration-300 text-base">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white">Industries</h3>
            <ul className="space-y-3">
              {footerLinks.industries.map(({ name, path }, i) => (
                <li key={i}>
                  <Link href={path} className="text-white/70 hover:text-[#6EE7B7] transition-colors duration-300 text-base">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl">
              <Mail className="w-5 h-5 text-white/40 flex-shrink-0" />
              <a href="mailto:sales@greatodeal.com" className="text-white/70 hover:text-[#6EE7B7] transition-colors text-base" itemProp="email">
                sales@greatodeal.com
              </a>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl">
              <Mail className="w-5 h-5 text-white/40 flex-shrink-0" />
              <a href="mailto:hello@greatodeal.com" className="text-white/70 hover:text-[#6EE7B7] transition-colors text-base">
                hello@greatodeal.com
              </a>
            </div>
            <div className="p-4 bg-white/[0.02] rounded-xl" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                <div className="text-base text-white/80">
                  <span itemProp="streetAddress">16 Jail Rd, Shadman 2</span><br />
                  <span itemProp="addressLocality">Lahore</span>, <span itemProp="addressCountry">Pakistan</span>
                </div>
              </div>
              <a href="tel:+923011060841" className="text-[#6EE7B7] hover:text-[#5CD7A5] text-base mt-3 block font-medium" itemProp="telephone">
                +92 301 1060841
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <span className="text-white/40 text-sm sm:text-base">&copy; 2026 Greatodeal Software. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
