'use client'

import Link from 'next/link'
import { Linkedin, Youtube, Instagram, ShieldCheck, MapPin, Verified, Globe, Heart } from 'lucide-react'

const CONTAINER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"

const footerLinks = {
  Platform: [
    { label: 'Browse Internships',  href: '/internships' },
    { label: 'Certification Courses', href: '/courses' },
    { label: 'Journal & Advice',    href: '/blog' },
    { label: 'Student Reviews',     href: '#' },
  ],
  Company: [
    { label: 'About Us',      href: '/about' },
    { label: 'Careers',       href: '#' },
    { label: 'Contact',       href: '/contact' },
    { label: 'Help Center',   href: '/help-center' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Data Security',    href: '#' },
  ],
}

const SOCIALS = [
  { Icon: Youtube,   href: 'https://www.youtube.com/@theInternadda',              label: 'YouTube' },
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/Internadda-india',   label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://www.instagram.com/Internadda.india/#',        label: 'Instagram' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800 font-sans">

      {/* Main content grid */}
      <div className="relative z-10 pt-16 pb-12">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

            {/* Brand details */}
            <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="flex flex-col mb-6">
                 <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                   InternAdda
                 </span>
                 <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-1">Global Placements</span>
              </Link>
              
              <p className="text-[15px] leading-relaxed mb-8 max-w-sm text-gray-400 font-medium">
                We are on a mission to equip students with relevant skills & practical exposure through free, verified global internships.
              </p>
              
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-sky-500 text-gray-400 hover:text-white transition-all transform hover:-translate-y-1">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="flex flex-col items-center md:items-start">
                <h4 className="font-bold text-[15px] text-white mb-5">
                  {category}
                </h4>
                <ul className="space-y-3.5 text-center md:text-left">
                  {links.map((link, i) => (
                    <li key={i}>
                      <Link href={link.href} className="text-[14px] font-medium text-gray-400 hover:text-sky-400 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Trust banner inside footer */}
      <div className="border-y border-gray-800 bg-gray-900/50">
         <div className={CONTAINER}>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 py-6">
               <div className="flex items-center gap-2 text-gray-400">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <span className="text-sm font-semibold">100% Secure & Verified</span>
               </div>
               <div className="flex items-center gap-2 text-gray-400">
                  <Verified size={20} className="text-sky-500" />
                  <span className="text-sm font-semibold">Backed by Industry Leaders</span>
               </div>
               <div className="flex items-center gap-2 text-gray-400">
                  <Globe size={20} className="text-amber-500" />
                  <span className="text-sm font-semibold">Opportunities in 40+ Countries</span>
               </div>
            </div>
         </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 py-6">
         <div className={CONTAINER}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
               <p className="text-[13px] text-gray-500 font-medium">
                 © {year} InternAdda Enterprises. All rights reserved.
               </p>
               <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5">
                 Built with <Heart size={14} className="text-red-500 fill-red-500" /> for the student community
               </p>
            </div>
         </div>
      </div>
    </footer>
  )
}
