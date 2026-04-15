'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Users, Shield, Award, Globe, Verified, CheckCircle, GraduationCap, TrendingUp, X, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Verified Internships Powered by UpForge',
  description: 'Access exclusive, 100% free, performance-based internships. Build your world-class career profile on UpForge.',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: \`\${job.title} at \${job.company}. Required skills: \${job.skills.join(', ')}. Free to apply, performance-based with certification. Verified on UpForge.\`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN'
    }
  }))
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  url: 'https://www.internadda.com',
  description: 'Global internship discovery platform. Official verification partner: UpForge.',
  sameAs: ['https://upforge.org']
};

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8";

function FadeUp({ children, delay = 0, className = '' }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, companyLogos, tag }: any) {
  const { user } = useAuth();
  const router = useRouter();
  
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? \`/apply/\${id}\` : \`/auth/signin?callbackUrl=/apply/\${id}\`);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-none border border-black overflow-hidden flex flex-col hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 relative"
    >
      <div className="absolute top-3 right-3 z-10">
        <span className="bg-black text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
          <Verified size={10} /> UpForge Verified
        </span>
      </div>

      <div className="relative h-40 bg-zinc-100 overflow-hidden flex-shrink-0 border-b border-black">
        <Image src={image} alt={title} fill sizes="(max-width:640px)100vw,33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" />
        <span className="absolute top-3 left-3 bg-white text-black text-[10.5px] font-semibold px-2.5 py-1 border border-black rounded-sm">{tag}</span>
        <span className="absolute bottom-3 right-3 bg-white text-[10.5px] font-medium px-2.5 py-1 rounded-sm border border-black flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />{applicants} applied
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3.5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="text-[17px] font-bold font-serif text-black leading-snug">{title}</h3>
          </div>
          <p className="text-[12px] text-zinc-600 font-medium">{company} <span className="text-zinc-400">+{otherCompaniesCount} more</span></p>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-zinc-50 border border-black p-3 rounded-sm">
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Compensation</p>
            <p className="text-[12px] font-bold text-black">{stipend}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Location</p>
            <p className="text-[12px] font-bold text-black flex items-center gap-1"><MapPin size={9} />{location}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {skills.map((s: string) => (
             <span key={s} className="bg-zinc-100 text-black text-[10.5px] font-semibold px-2.5 py-0.5 border border-black rounded-sm">{s}</span>
          ))}
        </div>
        
        <p className="text-[10px] text-zinc-500 text-center uppercase tracking-widest mt-2">
          Earn <b className="text-black">Experience, LOR & Certificate</b>
        </p>
        
        <button onClick={go} className="mt-auto w-full bg-black text-white text-[13px] font-bold py-2.5 rounded-sm hover:opacity-80 transition-opacity uppercase tracking-wider">
          {user ? 'Apply Now' : 'Sign in to Apply'}
        </button>
      </div>
    </motion.article>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      
      <main className="w-full overflow-x-hidden font-sans">
        
        {/* HERO */}
        <section className="relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24 border-b-2 border-black">
          <div className={\`\${CONTAINER} relative z-10 text-center\`}>
            <FadeUp>
              <div className="inline-flex items-center gap-2 mb-6 border-2 border-black px-4 py-1.5 rounded-sm bg-zinc-50">
                <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">Partnered with UpForge Network</span>
              </div>
              
              <h1 className="text-[3rem] sm:text-[4.5rem] lg:text-[5.5rem] font-serif font-black text-black leading-[1.05] tracking-tight mb-6 uppercase">
                Establish Your <br/> <span className="text-zinc-600">Legacy.</span>
              </h1>
              
              <p className="text-zinc-700 text-[16px] sm:text-[18px] leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                InternAdda connects modern students with 100% free, performance-based global internships. Build your verifiable identity, gain real startup experience, and secure your LOR & Certificates — all powered by <strong className="font-black">UpForge</strong>.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/internships" className="w-full sm:w-auto">
                  <button className="w-full sm:w-64 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 text-[13px] font-bold uppercase tracking-widest rounded-sm hover:-translate-y-1 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] transition-all">
                    Browse Internships <ArrowRight size={14} />
                  </button>
                </Link>
                <Link href="https://upforge.org/signup" target="_blank" className="w-full sm:w-auto">
                  <button className="w-full sm:w-64 flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-8 py-4 text-[13px] font-bold uppercase tracking-widest rounded-sm hover:bg-zinc-100 transition-colors">
                    <Verified size={14} /> Claim UpForge Profile
                  </button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* METRICS */}
        <section className="border-b-2 border-black bg-zinc-50 py-10">
          <div className={CONTAINER}>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x-2 divide-black">
                <div><h3 className="text-4xl font-serif font-black text-black">15K+</h3><p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Placed Globally</p></div>
                <div><h3 className="text-4xl font-serif font-black text-black">100%</h3><p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Free & Verified</p></div>
                <div><h3 className="text-4xl font-serif font-black text-black">40+</h3><p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Countries</p></div>
                <div><h3 className="text-4xl font-serif font-black text-black">4.9/5</h3><p className="text-[11px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Trust Score</p></div>
             </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="py-20 bg-white">
          <div className={CONTAINER}>
            <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
              <div>
                <h2 className="text-3xl lg:text-5xl font-serif font-black text-black uppercase">Top Opportunities</h2>
                <p className="text-zinc-500 font-medium uppercase tracking-widest mt-2 text-[11px]">Free • Performance Based • LOR Included</p>
              </div>
              <Link href="/internships" className="hidden lg:flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                 View All <ArrowRight size={14}/>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredInternships.slice(0,6).map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.1}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
