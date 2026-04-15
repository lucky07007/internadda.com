'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Search, PlayCircle, Star, Verified, CheckCircle, GraduationCap, MapPin, Building, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Free Internships - InternAdda',
  description: 'Internshala inspired, perfectly colored internships board.',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `${job.title} at ${job.company}. Required skills: ${job.skills.join(', ')}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN'
    }
  }))
};

const CONTAINER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8";

function FadeUp({ children, delay = 0, className = '' }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, tag, image }: any) {
  const { user } = useAuth();
  const router = useRouter();
  
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Top badge and verified layer */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
              <Verified size={12} /> Verified
            </span>
            <span className="bg-sky-50 text-sky-600 text-xs font-semibold px-2.5 py-1 rounded-md">
              {tag || 'Internship'}
            </span>
          </div>
          <div className="w-12 h-12 relative rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm flex-shrink-0">
            <Image src={image} alt={company} fill className="object-cover" />
          </div>
        </div>

        {/* Title & Company */}
        <h3 className="text-[18px] font-bold text-gray-900 leading-snug mb-1">{title}</h3>
        <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mb-5">
          <Building size={14} className="text-gray-400" /> {company}
        </p>

        {/* Core Details Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Location</p>
              <p className="text-sm font-medium text-gray-800">{location}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Duration</p>
              <p className="text-sm font-medium text-gray-800">{duration || '3 Months'}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Stipend</p>
              <p className="text-sm font-medium text-gray-800">{stipend}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.slice(0, 3).map((s: string) => (
             <span key={s} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
               {s}
             </span>
          ))}
          {skills.length > 3 && <span className="bg-gray-50 border border-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">+{skills.length - 3}</span>}
        </div>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={10} /> Active Hiring
          </span>
          <button onClick={go} className="text-sm font-bold text-sky-600 hover:text-sky-700 hover:bg-sky-50 px-4 py-2 rounded-xl transition-colors flex items-center gap-1 group">
            View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main className="w-full bg-[#f8f9fa] overflow-x-hidden font-sans">
        
        {/* HERO SECTION - Vibrant light blue themed */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/50" />
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-sky-200/20 blur-[100px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-[100px]" />

          <div className={`relative z-10 ${CONTAINER}`}>
            <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
              
              <FadeUp>
                <div className="inline-flex items-center gap-2 mb-8 bg-sky-100 text-sky-700 px-4 py-2 text-xs font-bold rounded-full border border-sky-200 shadow-sm">
                  <Star size={14} className="fill-sky-500 text-sky-500" />
                  India's #1 Trusted Internship Platform
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
                  Make your dream career a reality
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
                  Trending internships, 100% verified startups, and guaranteed certificates. Explore thousands of remote and in-office opportunities today.
                </p>
              </FadeUp>

              <FadeUp delay={0.2} className="w-full max-w-2xl">
                <div className="bg-white p-2 rounded-2xl shadow-xl shadow-sky-900/5 border border-gray-100 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-4 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="e.g. Marketing, Graphic Design, Web Web..." 
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-md focus:outline-none text-gray-700 bg-transparent"
                    />
                  </div>
                  <button 
                    onClick={() => router.push('/internships')}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap shadow-md shadow-sky-500/20"
                  >
                    Search
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-gray-500">
                  <span className="font-medium">Trending:</span>
                  {['Digital Marketing', 'Data Analyst', 'Frontend Dev', 'HR'].map(tag => (
                    <span key={tag} className="bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-sky-300 hover:text-sky-600 cursor-pointer transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeUp>

            </div>
          </div>
        </section>

        {/* METRICS - Clean, colorful cards */}
        <section className="py-12 bg-white relative -mt-6">
          <div className={CONTAINER}>
             <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 p-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
                <div className="text-center px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-sky-500 mb-2">15K+</h3>
                  <p className="text-sm font-medium text-gray-500">Active Companies</p>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-sky-500 mb-2">1M+</h3>
                  <p className="text-sm font-medium text-gray-500">Selected Students</p>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-emerald-500 mb-2">100%</h3>
                  <p className="text-sm font-medium text-gray-500">Verified Profiles</p>
                </div>
                <div className="text-center px-4">
                  <h3 className="text-3xl lg:text-4xl font-bold text-purple-500 mb-2">4.9/5</h3>
                  <p className="text-sm font-medium text-gray-500">Platform Rating</p>
                </div>
             </div>
          </div>
        </section>

        {/* LATEST INTERNSHIPS COMPONENT */}
        <section className="py-20">
          <div className={CONTAINER}>
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Latest Internships on InternAdda</h2>
              <p className="text-gray-500 font-medium text-lg">
                <span className="text-emerald-500 font-bold flex items-center justify-center gap-1"><GraduationCap size={18} /> Apply for free & accelerate your career</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.slice(0,6).map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>

            <div className="mt-14 text-center">
              <button onClick={() => router.push('/internships')} className="bg-sky-50 text-sky-600 hover:bg-sky-100 font-bold px-8 py-3 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2">
                 View all internships <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* TRUST BANNER */}
        <section className="py-16 bg-sky-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600" />
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"/></svg>
          </div>
          <div className={`relative z-10 ${CONTAINER}`}>
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                <div className="max-w-2xl text-center md:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">Certified Training & Internships</h2>
                  <p className="text-sky-100 text-lg">Build the exact skills companies are looking for through our globally recognized network powered by UpForge.</p>
                </div>
                <button className="bg-white text-sky-600 font-extrabold px-8 py-4 rounded-xl shadow-xl hover:scale-105 transition-transform flex-shrink-0">
                  Explore Courses
                </button>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

