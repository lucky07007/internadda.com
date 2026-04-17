// components/Footer.tsx
'use client'

import Link from 'next/link'
import { Linkedin, Youtube, Instagram, ShieldCheck, MapPin, Verified, Globe, Heart, Mail, Phone, ChevronRight, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

const footerLinks = {
  Platform: [
    { label: 'Browse Internships', href: '/internships' },
    { label: 'Certification Courses', href: '/courses' },
    { label: 'Journal & Advice', href: '/blog' },
    { label: 'Success Stories', href: '/success-stories' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Mission', href: '/mission' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help Center', href: '/help-center' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'GDPR', href: '/gdpr' },
  ],
}

const SOCIALS = [
  { Icon: Youtube, href: 'https://www.youtube.com/@theInternadda', label: 'YouTube' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/Internadda-india', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#', label: 'Instagram' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 font-sans transition-colors duration-200">
      
      {/* Main content grid */}
      <div className="relative z-10 pt-16 pb-12">
        <div className={CONTAINER}>
          
          {/* Mobile: 2-column layout for links */}
          <div className="block md:hidden mb-10">
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, i) => (
                      <li key={i}>
                        <Link 
                          href={link.href} 
                          className="text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1 group"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Full grid layout */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Brand details */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="flex flex-col mb-6">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Powered by UpForge Global
                  </span>
                  <Sparkles className="w-3 h-3 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-[15px] leading-relaxed mb-6 max-w-sm text-gray-600 dark:text-gray-400 font-medium">
                We're on a mission to equip students with relevant skills & practical exposure through verified global internships.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 mb-6">
                <a href="mailto:support@internadda.com" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  support@internadda.com
                </a>
                <a href="tel:+910000000000" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  <Phone className="w-4 h-4" />
                  +91 00000 00000
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col items-center md:items-start">
                <h4 className="font-bold text-[15px] text-gray-900 dark:text-white mb-5">
                  {category}
                </h4>
                <ul className="space-y-3.5 text-center md:text-left">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-[14px] font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Brand section for mobile (below links) */}
          <div className="block md:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="flex flex-col mb-4">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Powered by UpForge Global
                  </span>
                  <Sparkles className="w-3 h-3 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed mb-6 max-w-xs text-gray-600 dark:text-gray-400 font-medium">
                Equipping students with skills & exposure through verified global internships.
              </p>

              {/* Contact Info Mobile */}
              <div className="space-y-2 mb-6">
                <a href="mailto:support@internadda.com" className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  support@internadda.com
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust banner */}
      <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6">
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <ShieldCheck size={18} className="text-emerald-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">100% Verified Internships</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Globe size={18} className="text-sky-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Opportunities in 40+ Countries</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Verified size={18} className="text-amber-500 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">Part of UpForge Global Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* UpForge Global Banner */}
      <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border-b border-gray-200 dark:border-gray-800">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">A Proud Member of</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">UpForge Global</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-base font-bold text-gray-900 dark:text-white">15+</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wide">Global Offices</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-gray-900 dark:text-white">50K+</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wide">Alumni Network</p>
              </div>
              <div className="text-center">
                <p className="text-base font-bold text-gray-900 dark:text-white">2018</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-wide">Founded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-50 dark:bg-gray-950 py-6">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 font-medium text-center sm:text-left">
              © {year} InternAdda. A UpForge Global Company. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="text-xs text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="text-xs text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                Sitemap
              </Link>
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
              Built with <Heart size={12} className="text-red-500 fill-red-500" /> for students worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
