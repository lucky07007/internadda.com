// app/courses/page.tsx
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import CoursesClient from './courses-client'
import type { Metadata } from 'next'
import { courses } from './course-data'
import { CheckCircle, Shield, Verified } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Industry-Ready Courses & Certifications | Powered by UpForge',
  description:
    'Master in-demand skills in Development, Data Science, Design and Marketing. Free expert-led courses with certificates map perfectly to your UpForge global identity.',
}

const STATS = [
  { label: '6 Courses',      sub: 'across 5 domains' },
  { label: '100% Free',      sub: 'no hidden fees' },
  { label: 'Certificate',    sub: 'on completion' },
  { label: 'UpForge',        sub: 'Verified Skill' },
]

export default function CoursesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 overflow-x-hidden pt-24 pb-20">
        {/* ── Hero ── */}
        <section className="relative bg-white border-b-2 border-black overflow-hidden py-16">
          <div className="relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest mb-6">
                <Verified size={12} /> Powered by UpForge
              </div>

              <h1 className="text-[2.5rem] sm:text-[3.5rem] xl:text-[4.5rem] font-serif font-black text-black leading-[1.05] tracking-tight mb-4 uppercase">
                Master the Skills.<br />
                <span className="text-zinc-500">Earn the Certificate.</span>
              </h1>

              <p className="text-black font-medium text-[14px] sm:text-[16px] leading-[1.75] max-w-2xl mx-auto mb-10 tracking-wide uppercase">
                Learn exactly what global startups need. 100% Free. Directly verified on your UpForge Profile.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border border-black p-4 bg-zinc-50 uppercase tracking-widest">
                {STATS.map((s, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <span className="text-[14px] font-black text-black">{s.label}</span>
                    <span className="text-[10px] text-zinc-500 font-bold">{s.sub}</span>
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
