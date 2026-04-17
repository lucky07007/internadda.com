// components/Footer.tsx
'use client'

import Link from 'next/link'
import { 
  Linkedin, 
  Youtube, 
  Instagram, 
  Globe, 
  Heart, 
  Mail,
  Sparkles,
  Briefcase,
  GraduationCap,
  Newspaper,
  Award,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

const footerLinks = {
  Platform: [
    { label: 'Internships', href: '/internships', icon: Briefcase },
    { label: 'Courses', href: '/courses', icon: GraduationCap },
    { label: 'Journal', href: '/blog', icon: Newspaper },
    { label: 'Stories', href: '/success-stories', icon: Award },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Mission', href: '/mission' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help', href: '/help-center' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy-policy' },
    { label: 'Terms', href: '/terms-of-service' },
    { label: 'Cookies', href: '/cookie-policy' },
    { label: 'GDPR', href: '/gdpr' },
  ],
  Resources: [
    { label: 'Hire', href: '/hire' },
    { label: 'Partner', href: '/partner' },
    { label: 'Resources', href: '/resources' },
    { label: 'FAQ', href: '/faq' },
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
      
      <div className="relative z-10 pt-12 lg:pt-16 pb-8 lg:pb-10">
        <div className={CONTAINER}>
          
          {/* Mobile: 2-column layout */}
          <div className="block lg:hidden mb-10">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col">
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white mb-4 tracking-wide uppercase opacity-60">
                    {category}
                  </h4>
                  <ul className="space-y-2.5">
                    {links.map((link, i) => (
                      <li key={i}>
                        <Link 
                          href={link.href} 
                          className="text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5 group"
                        >
                          {link.icon && <link.icon className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />}
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12">
            {/* Brand */}
            <div className="col-span-4 flex flex-col">
              <Link href="/" className="flex flex-col mb-4">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    UpForge Global
                  </span>
                  <Sparkles className="w-3 h-3 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed mb-5 max-w-xs text-gray-600 dark:text-gray-400">
                Global internships for the next generation.
              </p>

              <div className="space-y-2 mb-5">
                <a href="mailto:support@internadda.com" className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  support@internadda.com
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a 
                    key={label} 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-2">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white mb-5 tracking-wide uppercase opacity-60">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link 
                        href={link.href} 
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Brand */}
          <div className="block lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="flex flex-col mb-3">
                <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    UpForge Global
                  </span>
                  <Sparkles className="w-2.5 h-2.5 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm mb-4 max-w-xs text-gray-600 dark:text-gray-400">
                Global internships for the next generation.
              </p>

              <div className="space-y-2 mb-4 w-full max-w-xs">
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - clean and minimal */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {year} InternAdda
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
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Heart size={11} className="text-red-500 fill-red-500" /> 
              Worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
