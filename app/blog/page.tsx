'use client'
import { useState, useMemo, Suspense } from 'react'
import { blogs } from '@/data/blogs'
import { useSearchParams } from 'next/navigation'
import { BlogCard } from '@/components/blog/BlogCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Verified } from 'lucide-react'

function BlogContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') ?? ''
  const categorySlug = searchParams.get('category')
  
  const [localSearch, setLocalSearch] = useState(initialSearch)

  const searchQuery  = localSearch.toLowerCase()

  const displayedPosts = useMemo(() => {
    let filtered = blogs;
    if (categorySlug) filtered = filtered.filter(b => b.categoryId === categorySlug)
    if (searchQuery) {
      filtered = filtered.filter(b => b.title.toLowerCase().includes(searchQuery) || b.tags.some(t => t.toLowerCase().includes(searchQuery)))
    }
    return filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [categorySlug, searchQuery])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50 overflow-x-hidden pt-24 pb-20">
        <section className="relative bg-white border-b-2 border-black overflow-hidden py-16">
          <div className="relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                <Verified size={12} /> Powered by UpForge
             </div>
             <h1 className="text-[2.5rem] sm:text-[3.5rem] xl:text-[4.5rem] font-serif font-black text-black leading-[1.05] tracking-tight mb-4 uppercase">
               Career <span className="text-zinc-500">Insights</span>
             </h1>
             <p className="text-black font-medium text-[14px] sm:text-[16px] leading-[1.75] max-w-2xl mx-auto mb-10 tracking-wide uppercase">
               Expert advice, student success stories, and verified industry trends.
             </p>
             <input type="text" value={localSearch} onChange={e => setLocalSearch(e.target.value)} placeholder="Search articles..." className="max-w-md mx-auto w-full border-2 border-black p-3 bg-zinc-50 text-black font-bold uppercase tracking-widest focus:outline-none focus:ring-4 ring-black/20 block" />
          </div>
        </section>

        <section className="py-20 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {displayedPosts.map((blog, idx) => (
                <div key={blog.slug} className="group bg-white border-2 border-black p-6 hover:shadow-[8px_8px_0_0_#000] transition-all duration-300">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{blog.categoryId}</p>
                   <h3 className="text-xl font-serif font-black text-black mb-3">{blog.title}</h3>
                   <p className="text-[12px] font-medium text-zinc-600 mb-6">{blog.excerpt}</p>
                   <a href={`/blog/${blog.slug}`} className="inline-block bg-black text-white px-4 py-2 text-[11px] font-bold uppercase tracking-widest hover:-translate-y-1 transition-transform">Read Article</a>
                </div>
             ))}
           </div>
           {displayedPosts.length === 0 && <p className="text-center font-serif text-xl font-bold mt-10">No articles found.</p>}
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function BlogPage() {
  return <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}><BlogContent /></Suspense>
}
