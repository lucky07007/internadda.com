'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Verified, MapPin, Building, ChevronRight, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { internships as featuredInternships } from '@/data/internships'

const CONTAINER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8";

function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, image, tag }: any) {
  const { user } = useAuth();
  const router = useRouter();
  
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 flex flex-col p-6">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-sky-600 transition-colors">{title}</h3>
          <p className="text-[14.5px] font-medium text-gray-500 flex items-center gap-1.5">
            <Building size={14} className="text-gray-400" /> {company}
          </p>
        </div>
        <div className="w-14 h-14 relative rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 bg-white">
          <Image src={image} alt={company} fill className="object-cover" />
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <span className="bg-sky-50 text-sky-600 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Verified size={10} /> Verified
        </span>
        <span className="bg-emerald-50 text-emerald-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
          Actively hiring
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm bg-gray-50/50 p-4 rounded-xl border border-gray-50">
        <div>
           <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12}/> Location</div>
           <p className="font-medium text-gray-800">{location}</p>
        </div>
        <div>
           <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg> 
             Start Date
           </div>
           <p className="font-medium text-gray-800">Immediately</p>
        </div>
        <div>
           <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Duration</div>
           <p className="font-medium text-gray-800">{duration || '3 Months'}</p>
        </div>
        <div>
           <div className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider mb-1">Stipend</div>
           <p className="font-medium text-gray-800">{stipend}</p>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0,3).map((s: string) => (
             <span key={s} className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-1 rounded-md">{s}</span>
          ))}
        </div>
        <button onClick={go} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-md shadow-sky-500/20 whitespace-nowrap text-center">
          View Details
        </button>
      </div>
    </div>
  );
}

export default function InternshipsPage() {
  const [filter, setFilter] = useState('All');
  
  const filtered = filter === 'All' 
    ? featuredInternships 
    : featuredInternships.filter(i => i.tag === filter);

  const categories = ['All', 'Marketing', 'Sales', 'Growth', 'Operations', 'SEO', 'Design', 'Creative', 'Community', 'Business'];

  return (
    <>
      <Header />
      <main className="w-full bg-[#f8f9fa] min-h-screen pt-24 pb-20 font-sans">
        
        {/* Banner */}
        <div className="bg-white border-b border-gray-200 py-8 mb-8">
           <div className={CONTAINER}>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Internships</h1>
              <p className="text-gray-500 font-medium">As per your <span className="text-sky-500">preferences</span></p>
           </div>
        </div>

        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
                <div className="flex items-center gap-2 mb-6 text-gray-800 font-bold">
                  <Filter size={18} className="text-sky-500"/> Filters
                </div>
                
                <div className="mb-6">
                  <label className="block text-[13px] font-semibold text-gray-500 mb-3">Category Profile</label>
                  <div className="flex flex-col gap-2">
                    {categories.map(f => (
                      <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-sky-50 text-sky-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Listings */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white border text-center lg:text-left border-gray-100 p-4 rounded-xl shadow-sm text-sm text-gray-600 font-medium font-sans flex items-center justify-between">
                <span>Showing <strong>{filtered.length}</strong> available internships</span>
                <span className="hidden sm:inline bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-xs font-bold">Updated Just Now</span>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No internships found</h3>
                  <p className="text-gray-500">We couldn't find any positions for "{filter}". Try a different category.</p>
                </div>
              ) : (
                filtered.map(item => (
                  <InternshipCard key={item.id} {...item} />
                ))
              )}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
