import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CoursesClient from './courses-client'
import type { Metadata } from 'next'
import { courses } from './course-data'
import { CheckCircle, Verified, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Industry-Ready Courses & Certifications | InternAdda',
  description: 'Master in-demand skills. Free expert-led courses with certificates map perfectly to your global identity.',
}

const STATS = [
  { label: '6 Courses',      sub: 'across 5 domains' },
  { label: '100% Free',      sub: 'no hidden fees' },
  { label: 'Certificate',    sub: 'on completion' },
  { label: 'Verified',       sub: 'Industry Skill' },
]

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fa] overflow-x-hidden pt-24 pb-20 font-sans">
        {/* ── Hero ── */}
        <section className="relative bg-white border-b border-gray-200 overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/50" />
          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold mb-6 shadow-sm border border-emerald-100">
                <Verified size={14} /> Official Certification Partner
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
                Master the Skills.<br />
                <span className="text-sky-500">Earn the Certificate.</span>
              </h1>

              <p className="text-gray-600 font-medium text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                Learn exactly what global startups need. 100% free courses crafted by industry experts.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center gap-8 bg-white shadow-md border border-gray-100 rounded-2xl p-6 sm:p-8 w-full max-w-3xl">
                {STATS.map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <span className="text-2xl font-bold text-sky-500 mb-1">{s.label}</span>
                    <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CoursesClient initialCourses={courses} />
      </main>
      <Footer />
    </>
  )
}
