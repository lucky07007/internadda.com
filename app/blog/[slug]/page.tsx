import { blogs } from '@/data/blogs'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowLeft, Calendar, User, Verified } from 'lucide-react'

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) return {}

  return {
    title: `${blog.title} | InternAdda`,
    description: blog.excerpt,
  }
}

function parseMarkdown(md: string) {
  // Ultra simple markdown mock parser for the B&W theme
  let html = md.trim()
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-black">$1</strong>')
  // H1
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl sm:text-4xl font-serif font-black mb-6 mt-10 uppercase text-black">$1</h1>')
  // H2
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-serif font-bold mb-4 mt-8 uppercase text-black border-b-2 border-black pb-2">$1</h2>')
  // Paragraphs
  html = html.replace(/^(?!<h|<ul|<li)(.*$)/gim, (match) => {
    if (!match.trim()) return ''
    return `<p class="mb-5 text-zinc-700 text-lg leading-relaxed">${match}</p>`
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
      <main className="w-full bg-zinc-50 min-h-screen pt-24 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[11px] font-bold text-zinc-500 uppercase tracking-widest hover:text-black transition-colors mb-10">
            <ArrowLeft size={14} /> Back to Insights
          </Link>

          <header className="mb-12 border-b-4 border-black pb-10">
            <div className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                <Verified size={12} /> Powered by UpForge
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-black leading-[1.05] tracking-tight uppercase mb-6">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[12px] font-bold uppercase tracking-widest text-zinc-600">
              <span className="flex items-center gap-2"><User size={14} className="text-black" /> {blog.author}</span>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-black" /> {blog.date}</span>
            </div>
          </header>

          <div 
            className="prose-container pb-20"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(blog.content) }}
          />
        </article>
      </main>
      <Footer />
    </>
  )
}
