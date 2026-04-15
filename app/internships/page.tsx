'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Verified, MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { internships as featuredInternships } from '@/data/internships'

const CONTAINER = "max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8";

function InternshipCard({ id, title, company, stipend, location, skills, applicants, otherCompaniesCount, image, tag }: any) {
  const { user } = useAuth();
  const router = useRouter();
  
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? \`/apply/\${id}\` : \`/auth/signin?callbackUrl=/apply/\${id}\`);
  };

  return (
    <article className="group bg-white rounded-none border border-black overflow-hidden flex flex-col hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 relative">
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
          <h3 className="text-[17px] font-bold font-serif text-black leading-snug mb-1.5">{title}</h3>
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
    </article>
  );
}

export default function InternshipsPage() {
  const [filter, setFilter] = useState('All');
  
  const filtered = filter === 'All' 
    ? featuredInternships 
    : featuredInternships.filter(i => i.tag === filter);

  return (
    <>
      <Header />
      <main className="w-full bg-zinc-50 min-h-screen pt-24 pb-20">
        <div className={CONTAINER}>
          <div className="border-b-2 border-black pb-8 mb-8 text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-black uppercase tracking-tight">Available Global Internships</h1>
            <p className="text-zinc-600 font-medium uppercase tracking-widest mt-4 text-[12px] md:text-[14px]">
              100% Free • Verified on UpForge • Performance Based
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['All', 'Marketing', 'Sales', 'Growth', 'Operations', 'SEO', 'Design', 'Creative', 'Community', 'Business'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={\`px-4 py-2 text-[11px] font-bold uppercase tracking-widest border \${filter === f ? 'bg-black text-white border-black' : 'bg-white text-zinc-600 border-zinc-300 hover:border-black'} transition-colors\`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(item => (
              <InternshipCard key={item.id} {...item} />
            ))}
          </div>
          
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl font-serif font-bold text-zinc-400">No internships found for this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
