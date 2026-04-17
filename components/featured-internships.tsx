// components/featured-internships.tsx
"use client"

import { ArrowUpRight, MapPin, Clock, Briefcase, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface Internship {
  id: string
  title: string
  company: string
  location: string
  stipend: string
  duration: string
  image: string
  tag?: string
  applicants?: number
}

export function FeaturedInternships({ internships }: { internships: Internship[] }) {
  const { user } = useAuth()
  const router = useRouter()

  const handleApply = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  const featuredInternships = internships?.slice(0, 3) || []

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200 dark:border-gray-700">
        <h2 className="font-sans font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
          Featured Opportunities
        </h2>
        <Link
          href="/internships"
          className="group inline-flex items-center gap-1.5 font-sans font-bold text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          View All
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Internship List - Full Width Layout */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
        {featuredInternships.map((internship) => (
          <div
            key={internship.id}
            className="group py-5 first:pt-0 last:pb-0 transition-all duration-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 -mx-2 px-2 rounded-lg"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              
              {/* Company Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={internship.image}
                  alt={internship.company}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Top Row: Company & Tag */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans font-bold text-xs sm:text-sm text-gray-900 dark:text-white truncate">
                    {internship.company}
                  </span>
                  {internship.tag && (
                    <span className="hidden sm:inline-block bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      {internship.tag}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-base sm:text-lg lg:text-xl leading-snug text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                  {internship.title}
                </h3>

                {/* Meta Info Row */}
                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1.5">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate max-w-[120px] sm:max-w-none">{internship.location}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-900 dark:text-white">
                    <Briefcase className="w-3.5 h-3.5 shrink-0 text-sky-500" />
                    <span>{internship.stipend}</span>
                  </div>
                  {internship.applicants && (
                    <div className="hidden lg:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="w-3.5 h-3.5 shrink-0" />
                      <span>{internship.applicants}+ applied</span>
                    </div>
                  )}
                </div>

                {/* Mobile: Duration & Applicants */}
                <div className="flex sm:hidden items-center gap-4 mt-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{internship.duration}</span>
                  </div>
                  {internship.applicants && (
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                      <Users className="w-3 h-3 shrink-0" />
                      <span>{internship.applicants}+</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Apply Button - Desktop */}
              <div className="hidden sm:block shrink-0">
                <button
                  onClick={(e) => handleApply(e, internship.id)}
                  className="font-sans font-bold text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 border-2 border-sky-600 dark:border-sky-400 px-5 py-2.5 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 dark:hover:text-white transition-all duration-200 rounded-lg"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Apply Button - Mobile (Full Width) */}
            <div className="sm:hidden mt-3">
              <button
                onClick={(e) => handleApply(e, internship.id)}
                className="w-full font-sans font-bold text-xs uppercase tracking-wider text-white bg-sky-600 dark:bg-sky-600 border border-sky-600 px-4 py-2.5 hover:bg-sky-700 dark:hover:bg-sky-700 transition-colors rounded-lg"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <Link
          href="/internships"
          className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
        >
          Browse All Opportunities
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

// Import correction
import { ArrowRight } from "lucide-react"
