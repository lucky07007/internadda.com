// components/Footer.tsx
'use client'

import Link from 'next/link'
import { 
  Linkedin, 
  Youtube, 
  Instagram, 
  ShieldCheck, 
  MapPin, 
  Verified, 
  Globe, 
  Heart, 
  Mail, 
  Phone, 
  ChevronRight, 
  Sparkles,
  Award,
  Users,
  Building2,
  Calendar,
  Briefcase,
  GraduationCap,
  Newspaper,
  Compass
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

// Reorganized into 4 columns for better balance
const footerLinks = {
  Platform: [
    { label: 'Browse Internships', href: '/internships', icon: Briefcase },
    { label: 'Certification Courses', href: '/courses', icon: GraduationCap },
    { label: 'Journal & Advice', href: '/blog', icon: Newspaper },
    { label: 'Success Stories', href: '/success-stories', icon: Award },
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
  Resources: [
    { label: 'Hire Interns', href: '/hire' },
    { label: 'Partner With Us', href: '/partner' },
    { label: 'Student Resources', href: '/resources' },
    { label: 'FAQ', href: '/faq' },
  ],
}

const SOCIALS = [
  { Icon: Youtube, href: 'https://www.youtube.com/@theInternadda', label: 'YouTube' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/company/Internadda-india', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#', label: 'Instagram' },
]

const TRUST_METRICS = [
  { 
    value: '15+', 
    label: 'Global Offices',
    icon: Building2,
    color: 'text-blue-600 dark:text-blue-400'
  },
  { 
    value: '50K+', 
    label: 'Alumni Network',
    icon: Users,
    color: 'text-emerald-600 dark:text-emerald-400'
  },
  { 
    value: '40+', 
    label: 'Countries',
    icon: Globe,
    color: 'text-sky-600 dark:text-sky-400'
  },
  { 
    value: '2018', 
    label: 'Founded',
    icon: Calendar,
    color: 'text-amber-600 dark:text-amber-400'
  },
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
      <div className="relative z-10 pt-12 lg:pt-16 pb-8 lg:pb-12">
        <div className={CONTAINER}>
          
          {/* Mobile Optimized: 2-column layout with icons */}
          <div className="block lg:hidden mb-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4 tracking-wide">
                    {category}
                  </h4>
                  <ul className="space-y-2.5">
                    {links.map((link, i) => (
                      <li key={i}>
                        <Link 
                          href={link.href} 
                          className="text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5 group"
                        >
                          {link.icon && <link.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sky-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Full grid layout with 4 columns */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12">
            {/* Brand column - 4 cols */}
            <div className="col-span-4 flex flex-col">
              <Link href="/" className="flex flex-col mb-5">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Powered by UpForge Global
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed mb-5 max-w-sm text-gray-600 dark:text-gray-400">
                Equipping students with relevant skills & practical exposure through verified global internships.
              </p>

              {/* Contact Info */}
              <div className="space-y-2.5 mb-6">
                <a href="mailto:support@internadda.com" className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/40 transition-colors">
                    <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  support@internadda.com
                </a>
                <a href="tel:+910000000000" className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/30 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/40 transition-colors">
                    <Phone className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  +91 00000 00000
                </a>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns - 2 cols each */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-5 tracking-wide">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-2 group"
                      >
                        {link.icon && <link.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />}
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sky-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Brand Section */}
          <div className="block lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
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
              
              <p className="text-sm leading-relaxed mb-5 max-w-xs text-gray-600 dark:text-gray-400">
                Equipping students with skills & exposure through verified global internships.
              </p>

              {/* Contact Info Mobile */}
              <div className="space-y-2 mb-5 w-full max-w-xs">
                <a href="mailto:support@internadda.com" className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  support@internadda.com
                </a>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner - Redesigned with icons */}
      <div className="border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-5">
            <div className="flex items-center justify-center gap-2.5 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
                <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">100% Verified Internships</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                <Building2 size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">500+ Partner Companies</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                <Verified size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 text-gray-600 dark:text-gray-400">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center">
                <Globe size={16} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs sm:text-sm font-semibold">40+ Countries</span>
            </div>
          </div>
        </div>
      </div>

      {/* UpForge Global Banner - Enhanced with metrics */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 dark:from-sky-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 border-b border-gray-200 dark:border-gray-800">
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row items-center justify-between py-5 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <p className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">A Proud Member of</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">UpForge Global</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Empowering Global Talent Since 2018</p>
              </div>
            </div>
            
            {/* Metrics Grid - Now 4 items in a row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-6">
              {TRUST_METRICS.map((metric, idx) => (
                <div key={idx} className="text-center group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {metric.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide font-medium">
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-50 dark:bg-gray-950 py-5">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium text-center sm:text-left">
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
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1.5">
              Built with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> for students worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
