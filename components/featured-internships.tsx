// components/featured-internships.tsx
"use client"

import { ArrowUpRight, MapPin, Clock, Briefcase } from "lucide-react"
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

  // Only show first 3 internships
  const featuredInternships = internships?.slice(0, 3) || []

  return (
    <div className="pt-2 pb-6 w-full mt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-2 border-b-[1.5px] border-gray-300 dark:border-gray-700">
        <h2 className="font-sans font-black text-[13px] uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Featured Opportunities
        </h2>
        <Link
          href="/internships"
          className="group inline-flex items-center gap-1.5 font-sans font-bold text-[9px] uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          View All Internships
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Internship Feed - Forbes Style */}
      <div className="flex flex-col gap-6 md:gap-8">
        {featuredInternships.map((internship) => (
          <div
            key={internship.id}
            className="group flex flex-row items-center gap-5 sm:gap-6 pb-6 lg:pb-8 border-b border-gray-200 dark:border-gray-800 last:border-0 transition-all duration-300 hover:translate-x-[2px]"
          >
            {/* Company Logo */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
              <Image
                src={internship.image}
                alt={internship.company}
                width={144}
                height={144}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center flex-1 py-1">
              {/* Company & Tag */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-sans font-bold text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {internship.company}
                </span>
                {internship.tag && (
                  <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[9px] font-semibold px-2 py-0.5 rounded">
                    {internship.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[1.55rem] leading-snug text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                {internship.title}
              </h3>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-900 dark:text-white">
                  <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                  <span>{internship.stipend}</span>
                </div>
              </div>

              {/* Apply Button & Applicants */}
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={(e) => handleApply(e, internship.id)}
                  className="font-sans font-bold text-[11px] uppercase tracking-widest text-sky-600 dark:text-sky-400 border border-sky-600 dark:border-sky-400 px-4 py-1.5 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                >
                  Apply Now
                </button>
                {internship.applicants && (
                  <span className="font-sans text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {internship.applicants}+ applied
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-12 flex justify-center border-t border-gray-200 dark:border-gray-800 pt-10">
        <Link
          href="/internships"
          className="font-sans font-bold text-[11px] uppercase tracking-widest text-gray-700 dark:text-gray-300 border border-gray-400 dark:border-gray-600 px-10 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-block"
        >
          Browse All Opportunities
        </Link>
      </div>
    </div>
  )
}
