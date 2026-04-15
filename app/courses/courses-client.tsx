'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Clock, Users, Star, ArrowRight,
  BookOpen, Lock, X, ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import type { Course } from './course-data'

const CATEGORIES = ['All', 'Development', 'Data Science', 'Design', 'Marketing', 'Business']

function CourseCard({ course }: { course: Course }) {
  const { user } = useAuth()
  const router   = useRouter()
  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0)

  const handleEnroll = () => {
    router.push(user ? `/courses/${course.id}` : `/auth/signin?callbackUrl=/courses/${course.id}`)
  }

  return (
    <motion.article
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 overflow-hidden flex-shrink-0">
        <Image
          src={course.image} alt={course.title} fill
          sizes="(max-width:640px)100vw,(max-width:1280px)50vw,33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-900/40 to-transparent" />

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/95 px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-sm">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-[12px] font-bold text-gray-800">{course.rating}</span>
        </div>

        {/* Free badge */}
        <span className="absolute bottom-4 left-4 text-[12px] font-extrabold px-3 py-1.5 rounded-xl text-white bg-emerald-500 shadow-sm shadow-emerald-500/20 tracking-wide uppercase">
          100% FREE
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <p className="text-[12px] font-bold text-sky-500 mb-2">
            {course.category} <span className="text-gray-300 mx-1">•</span> {course.level}
          </p>
          <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-sky-600 transition-colors">{course.title}</h3>
        </div>

        <p className="text-[14px] font-medium text-gray-500 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-2">
          {course.topics.slice(0, 3).map(t => (
            <span key={t} className="text-[12px] font-medium px-3 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100">
              {t}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between text-[13px] font-medium text-gray-500 pt-4 mt-auto border-t border-gray-100">
          <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" />{course.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={14} className="text-gray-400" />{totalLessons} lessons</span>
          <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400" />{course.students.toLocaleString('en-IN')}+</span>
        </div>
      </div>

      {/* Enroll footer */}
      <div className="px-6 pb-6 mt-1">
        <button
          onClick={handleEnroll}
          className="w-full bg-gray-50 hover:bg-sky-500 text-gray-700 hover:text-white text-[15px] font-bold rounded-2xl h-12 transition-all flex items-center justify-center gap-2 group/btn"
        >
          {user ? 'Start Learning' : 'Login to Enroll'}
          <ChevronRight size={16} className="text-gray-400 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>
    </motion.article>
  )
}

export default function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [search, setSearch]   = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => initialCourses.filter(c => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      c.title.toLowerCase().includes(q) ||
      c.topics.some(t => t.toLowerCase().includes(q)) ||
      c.category.toLowerCase().includes(q)
    const matchCat = category === 'All' || c.category === category
    return matchSearch && matchCat
  }), [search, category, initialCourses])

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">

      {/* Filter bar */}
      <div className="py-8 flex flex-col sm:flex-row items-center gap-4 border-b border-gray-200 mb-8">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search for skills, topics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-[14px] border border-gray-200 rounded-2xl bg-white outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-100 transition-all text-gray-700 font-medium placeholder:font-normal"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-[13px] font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                category === cat
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div key={course.id} layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm text-center max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search size={24} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
          <p className="text-[15px] font-medium text-gray-500 mb-6">We couldn't find any courses matching your criteria.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="text-[14px] font-bold text-sky-600 border border-sky-200 bg-sky-50 px-6 py-2.5 rounded-xl hover:bg-sky-100 transition-colors">
            Clear filters
          </button>
        </motion.div>
      )}

      {/* Bottom CTA */}
      <div className="mt-20">
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl relative overflow-hidden shadow-xl shadow-sky-500/10">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full"><path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"/></svg>
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-12 py-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-3">
                Cannot find your perfect course?
              </h2>
              <p className="text-[16px] text-sky-100 font-medium max-w-xl">
                We add verified, expert-led courses every single week. Sign up and turn on notifications to never miss out!
              </p>
            </div>
            <button className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-sky-600 hover:bg-gray-50 font-extrabold px-8 py-4 text-[15px] rounded-xl shadow-xl transition-all hover:scale-105 whitespace-nowrap">
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
