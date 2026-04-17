// components/Footer.tsx
'use client'

import Link from 'next/link'
import { 
  Linkedin, 
  Youtube, 
  Instagram, 
  Heart, 
  Mail,
  Sparkles,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

const footerLinks = {
  Platform: [
    { label: 'Internships', href: '/internships' },
    { label: 'Courses', href: '/courses' },
    { label: 'Journal', href: '/blog' },
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
      
      <div className="pt-12 lg:pt-16 pb-8 lg:pb-10">
        <div className={CONTAINER}>
          
          {/* Mobile Layout - 2 Columns Center Aligned */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-2 gap-x-4 gap-y-10">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="flex flex-col items-center text-center">
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-sky-500 inline-block">
                    {category}
                  </h4>
                  <ul className="space-y-2.5 w-full">
                    {links.map((link, i) => (
                      <li key={i}>
                        <Link 
                          href={link.href} 
                          className="text-[13px] font-medium text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-8 xl:gap-12">
            {/* Brand Column */}
            <div className="col-span-4 flex flex-col">
              <Link href="/" className="flex flex-col mb-5">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Powered by UpForge Global
                  </span>
                  <Sparkles className="w-3 h-3 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed mb-6 max-w-sm text-gray-600 dark:text-gray-400">
                Connecting students with global internship opportunities across 40+ countries.
              </p>

              <div className="space-y-3 mb-6">
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
                    className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-sky-500 dark:hover:bg-sky-500 text-gray-600 dark:text-gray-400 hover:text-white transition-all"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="col-span-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-5 pb-2 border-b-2 border-sky-500 inline-block">
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

          {/* Mobile Brand Section */}
          <div className="block lg:hidden mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="flex flex-col mb-4">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                  InternAdda
                </span>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
                    Powered by UpForge Global
                  </span>
                  <Sparkles className="w-3 h-3 text-sky-500" />
                </div>
              </Link>
              
              <p className="text-sm leading-relaxed mb-5 max-w-xs text-gray-600 dark:text-gray-400">
                Connecting students with global internship opportunities across 40+ countries.
              </p>

              <div className="space-y-2 mb-5">
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

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {year} InternAdda. All rights reserved.
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
              Made with <Heart size={11} className="text-red-500 fill-red-500" /> for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
