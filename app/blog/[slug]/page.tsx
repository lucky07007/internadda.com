import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowLeft, Calendar, User, Verified, Share2 } from 'lucide-react'

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) return {}

  return {
    title: `${blog.title} | InternAdda Journal`,
    description: blog.excerpt,
  }
}

function parseMarkdown(md: string) {
  let html = md.trim()
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
  // H1 (should theoretically not exist heavily if title is outside, but handle it)
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl sm:text-4xl font-extrabold mb-6 mt-10 text-gray-900 tracking-tight">$1</h1>')
  // H2
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-4 mt-10 text-gray-900 tracking-tight">$1</h2>')
  // Paragraphs
  html = html.replace(/^(?!<h|<ul|<li)(.*$)/gim, (match) => {
    if (!match.trim()) return ''
    return `<p class="mb-5 text-gray-600 font-medium text-[17px] leading-[1.8]">${match}</p>`
  })
  
  return html
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  
  if (!blog) notFound()

  return (
    <>
      <Header />
      <main className="w-full bg-[#f8f9fa] min-h-screen pt-24 pb-20 font-sans">
        <article className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-4 py-2 rounded-xl transition-colors mb-10 w-auto">
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 mb-6 bg-emerald-50 text-emerald-600 px-3 py-1 text-xs font-bold rounded-md">
                <Verified size={14} /> Career Guide
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-8">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-500 py-4 border-y border-gray-200">
              <span className="flex items-center gap-2"><User size={16} className="text-sky-500" /> {blog.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-sky-500" /> {blog.date}</span>
            </div>
          </header>

          <div 
            className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
          />

          <div className="mt-12 flex justify-center">
             <button className="flex items-center gap-2 bg-white text-gray-700 font-semibold px-6 py-3 rounded-xl border border-gray-200 shadow-sm hover:border-sky-300 hover:text-sky-600 transition-colors">
               <Share2 size={16} /> Share this article
             </button>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
