// app/courses/components/CourseHeader.tsx
'use client'

import { Star, Users, Award, Clock, Globe, Calendar, BarChart, ChevronRight, Share2, Bookmark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CourseData } from '../course-data'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

export function CourseHeader({ course }: { course: CourseData }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className={CONTAINER}>
        <div className="py-6 sm:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight size={14} />
            <Link href={`/courses?category=${course.category}`} className="hover:text-white transition-colors">{course.category}</Link>
            <ChevronRight size={14} />
            <span className="text-white">{course.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {course.badge && (
                <span className="inline-block bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {course.badge}
                </span>
              )}
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-300 mb-4">{course.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold text-lg">{course.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">({course.reviews.toLocaleString()} ratings)</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={16} />
                  <span className="text-sm">{course.students.toLocaleString()} students</span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300 mb-4">
                <span className="flex items-center gap-2">
                  <Clock size={14} /> Last updated {course.lastUpdated}
                </span>
                <span className="flex items-center gap-2">
                  <Globe size={14} /> {course.language}
                </span>
                {course.certificate && (
                  <span className="flex items-center gap-2 text-green-400">
                    <Award size={14} /> Certificate included
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">Created by</span>
                <div className="flex items-center gap-2">
                  <Image 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                  <span className="font-medium">{course.instructor.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
