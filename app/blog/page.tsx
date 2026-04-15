'use client'
import { useState, useMemo, Suspense } from 'react'
import { blogs } from '@/data/blogs'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Search, ChevronRight, User, Calendar } from 'lucide-react'
import Link from 'next/link'

const CONTAINER = "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8";

function BlogContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialSearch = searchParams.get('search') ?? ''
  
  const [localSearch, setLocalSearch] = useState(initialSearch)

  const searchQuery  = localSearch.toLowerCase()

  const displayedPosts = useMemo(() => {
    let filtered = blogs;
    if (searchQuery) {
      filtered = filtered.filter(b => b.title.toLowerCase().includes(searchQuery) || b.excerpt.toLowerCase().includes(searchQuery))
    }
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [searchQuery])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f8f9fa] overflow-x-hidden pt-24 pb-20 font-sans">
        
        {/* Banner */}
        <section className="bg-white border-b border-gray-200 py-16 mb-12">
          <div className={`${CONTAINER} text-center max-w-3xl`}>
             <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
               InternAdda <span className="text-sky-500">Journal</span>
             </h1>
             <p className="text-lg text-gray-500 font-medium mb-8">
               Expert advice, student success stories, and industry trends to crack your dream internship.
             </p>
             
             <div className="relative max-w-xl mx-auto shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={localSearch} 
                  onChange={e => setLocalSearch(e.target.value)} 
                  placeholder="Ask a question or search topics..." 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-md focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 text-gray-700 bg-white transition-all"
                />
             </div>
          </div>
        </section>

        <section className={CONTAINER}>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {displayedPosts.map((blog) => (
                <div key={blog.slug} className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300">
                   <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                     <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
                   </div>
                   
                   <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors leading-snug">
                     {blog.title}
                   </h3>
                   
                   <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed flex-1">
                     {blog.excerpt}
                   </p>
                   
                   <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                     <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5"><User size={14}/> {blog.author}</span>
                     <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700 transition-colors group-hover:translate-x-1">
                        Read <ChevronRight size={16} />
                     </Link>
                   </div>
                </div>
             ))}
           </div>
           
           {displayedPosts.length === 0 && (
             <div className="bg-white p-16 rounded-2xl border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
                <p className="text-gray-500">We couldn't find any articles matching your search.</p>
             </div>
           )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function BlogPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa]" />}><BlogContent /></Suspense>
}
