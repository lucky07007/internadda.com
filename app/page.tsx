'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Search, Star, Verified, CheckCircle, MapPin, Building, ChevronRight, Globe, Lock, Code, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Free Internships - InternAdda',
  description: 'Internshala inspired, high authority global internships board.',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `${job.title} at ${job.company}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN'
    }
  }))
};

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8";

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
    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-900 hover:border-black dark:border-gray-800 dark:hover:border-gray-600 transition-colors flex flex-col p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.04)] dark:shadow-[0px_4px_24px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 block bg-black dark:bg-white text-white dark:text-black text-[10px] uppercase font-black tracking-[0.2em] px-2.5 py-1">
             Verified
          </div>
          <div className="w-10 h-10 border border-gray-100 flex-shrink-0 bg-white relative">
             <Image src={image} alt={company} fill className="object-cover" />
          </div>
        </div>

        <h3 className="text-xl font-black text-black dark:text-white leading-tight mb-2 tracking-tight">{title}</h3>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mb-6 uppercase tracking-widest">
           {company}
        </p>

        <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Loc</p>
              <p className="text-sm font-bold text-black dark:text-gray-200">{location}</p>
          </div>
          <div className="flex flex-col">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Dur</p>
              <p className="text-sm font-bold text-black dark:text-gray-200">{duration || '3 Months'}</p>
          </div>
          <div className="flex flex-col col-span-2 mt-2 border border-gray-100 dark:border-gray-800 p-3 bg-gray-50 dark:bg-black">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stipend</p>
              <p className="text-sm font-bold text-black dark:text-white leading-none">{stipend}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 border-l-2 border-black dark:border-white pl-3 text-xs font-bold text-gray-500">
           {skills.slice(0, 3).join(', ')} {skills.length > 3 && `+${skills.length - 3} more`}
        </div>

        <div className="mt-auto pt-2">
          <button onClick={go} className="w-full bg-black dark:bg-white text-white dark:text-black font-black text-center py-4 text-xs uppercase tracking-[0.2em] transition-all hover:bg-gray-800 dark:hover:bg-gray-200">
            Apply Now
          </button>
        </div>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      {/* Tightly snaps under the header, reduced from pt-72 to pt-24 */}
      <main className="w-full bg-[#FAFAFA] dark:bg-gray-950 font-sans transition-colors pt-24">
        
        {/* Modern Print-Aesthetic Monochrome Hero Section */}
        <section className="relative bg-[#FAFAFA] dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900 pb-16">
          <div className={`${CONTAINER} relative z-10`}>
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-12 pt-6">
              
              {/* Left Content */}
              <div className="flex-1 max-w-3xl">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 mb-8 bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em]">
                    India's Highest Rated Platform
                  </div>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <h1 className="text-6xl lg:text-[5.5rem] font-black text-black dark:text-white leading-[0.95] tracking-tighter mb-8">
                    Learn globally.<br/>
                    <span className="text-gray-400 dark:text-gray-500">Earn locally.</span>
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl font-medium border-l-4 border-black dark:border-white pl-6">
                    Connect directly with verified tier-1 startups and multinational corporations. Bypass outdated CV filters through algorithmic skill-matching.
                  </p>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <form onSubmit={handleSearch} className="bg-white dark:bg-black border border-black dark:border-gray-800 p-2 flex flex-col sm:flex-row max-w-2xl">
                    <div className="relative flex-1 flex items-center">
                      <Search className="absolute left-6 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search standard roles (e.g., Marketing, Frontend)..." 
                        className="w-full pl-14 pr-6 py-5 bg-transparent text-[15px] font-bold text-black dark:text-white focus:outline-none placeholder-gray-400"
                      />
                    </div>
                    <button type="submit" className="bg-black dark:bg-white text-white dark:text-black font-black text-[12px] uppercase tracking-[0.1em] px-10 py-5 transition-transform hover:scale-[0.98]">
                      Search
                    </button>
                  </form>

                  <div className="flex flex-wrap items-center gap-4 mt-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
                     TRENDING: 
                    {['Product Design', 'DevOps', 'Venture Capital'].map(tag => (
                      <span key={tag} onClick={() => router.push(`/internships?search=${tag}`)} className="text-black dark:text-white border-b border-black dark:border-white pb-0.5 cursor-pointer hover:text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Right Graphics/Image Area (Grid Layout) */}
              <div className="flex-1 hidden xl:flex justify-end relative h-full">
                <FadeUp delay={0.3} className="relative w-full max-w-[600px] aspect-[4/3]">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4">
                     {/* Image 1 */}
                     <div className="bg-gray-100 overflow-hidden relative border border-gray-200 dark:border-gray-800 row-span-2">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop&grayscale" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80 dark:mix-blend-lighten" alt="Global students" />
                     </div>
                     {/* Educational Pillar 1 */}
                     <div className="bg-black text-white p-8 flex flex-col justify-between">
                        <Globe size={28} />
                        <div>
                           <p className="text-3xl font-black mb-1">120+</p>
                           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">Countries Ranked</p>
                        </div>
                     </div>
                     {/* Educational Pillar 2 */}
                     <div className="bg-white dark:bg-black border border-black dark:border-gray-800 p-8 flex flex-col justify-between text-black dark:text-white">
                        <Lock size={28} />
                        <div>
                           <p className="text-sm font-black mb-1">MSME Certified</p>
                           <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">UFRN Security</p>
                        </div>
                     </div>
                  </div>
                  {/* Floating Trust Badge */}
                  <div className="absolute -bottom-8 -left-12 bg-white dark:bg-gray-950 p-6 flex items-center gap-6 border-2 border-black dark:border-gray-800 shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-none">
                     <div className="w-14 h-14 bg-black dark:bg-white flex items-center justify-center">
                       <CheckCircle size={28} className="text-white dark:text-black" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] leading-none mb-1.5">UpForge Original</p>
                       <p className="text-[18px] tracking-tight font-black text-black dark:text-white uppercase">Guaranteed Roles</p>
                     </div>
                  </div>
                </FadeUp>
              </div>

            </div>
          </div>
        </section>

        {/* METRICS - Redesigned as a strict data band */}
        <section className="bg-black dark:bg-gray-900 border-y border-white/10 relative z-20 py-12">
          <div className={CONTAINER}>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 divide-x-0 md:divide-x divide-gray-800 text-center">
                <div className="px-4">
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">15,000+</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Verified Companies</p>
                </div>
                <div className="px-4">
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">1.2M</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Active Students</p>
                </div>
                <div className="px-4">
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">₹0</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Zero Agency Fees</p>
                </div>
                <div className="px-4">
                  <h3 className="text-4xl font-black text-white mb-2 tracking-tighter">Top 1%</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Elite Talent Metric</p>
                </div>
             </div>
          </div>
        </section>

        {/* LATEST INTERNSHIPS MODIFIED TO BE TIGHTER */}
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className={CONTAINER}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
               <div className="max-w-2xl">
                 <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2"><MapPin size={14}/> Worldwide Index</p>
                 <h2 className="text-5xl font-black text-black dark:text-white tracking-tighter leading-none">Premier Postings</h2>
               </div>
               <button onClick={() => router.push('/internships')} className="text-[12px] uppercase font-black tracking-[0.1em] text-black dark:text-white border-b-2 border-black dark:border-white pb-1 inline-flex items-center gap-2 w-max transition-opacity hover:opacity-50">
                  View Index Directory <ArrowRight size={14} />
               </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInternships.slice(0,6).map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATIONAL/UPGRADE BANNER */}
        <section className="bg-[#FAFAFA] dark:bg-black py-24 border-t border-gray-200 dark:border-gray-900">
          <div className={CONTAINER}>
             <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch border border-black dark:border-gray-800 bg-white dark:bg-gray-950">
                
                <div className="p-12 md:p-16 flex-1 flex flex-col justify-center">
                  <h2 className="text-4xl font-black text-black dark:text-white mb-6 tracking-tighter uppercase leading-[0.9]">
                    Upgrade<br/>Your Syntax.
                  </h2>
                  <p className="text-gray-500 font-bold mb-10 max-w-md text-lg leading-snug">
                    Access elite syllabi and certification programs curated by industry veterans. Learn the precise stacks top recruiters demand.
                  </p>
                  <button onClick={() => router.push('/courses')} className="bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[12px] tracking-[0.2em] px-8 py-5 w-max hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                    View Course Catalog
                  </button>
                </div>
                
                <div className="w-full md:w-2/5 min-h-[300px] border-t md:border-t-0 md:border-l border-black dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-10 flex flex-col justify-center relative overflow-hidden">
                   {/* Abstract background graphics */}
                   <div className="absolute right-0 top-0 opacity-10">
                      <Code size={200} />
                   </div>
                   <div className="relative z-10 flex flex-col gap-6">
                      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-4 flex items-center justify-between">
                         <span className="font-bold text-xs uppercase tracking-widest text-black dark:text-white">Software Architecture</span>
                         <span className="bg-black text-white dark:bg-white dark:text-black text-[9px] px-2 py-0.5 font-black uppercase">Live</span>
                      </div>
                      <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-black p-4 flex items-center justify-between opacity-50">
                         <span className="font-bold text-xs uppercase tracking-widest text-black dark:text-white">Growth Marketing</span>
                         <span className="border border-black dark:border-white text-[9px] px-2 py-0.5 font-black uppercase dark:text-white">Draft</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
