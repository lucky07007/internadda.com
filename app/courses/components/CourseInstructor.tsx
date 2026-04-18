// app/courses/components/CourseInstructor.tsx
'use client'

import { Star, Users, Award } from 'lucide-react'
import Image from 'next/image'
import type { Instructor } from '../course-data'

export function CourseInstructor({ instructor }: { instructor: Instructor }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mt-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Instructor</h2>
      
      <div className="flex items-start gap-4">
        <Image 
          src={instructor.avatar} 
          alt={instructor.name} 
          width={80} 
          height={80} 
          className="rounded-full"
        />
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{instructor.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{instructor.role}</p>
          
          <div className="flex flex-wrap gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{instructor.rating}</span>
              <span className="text-xs text-gray-500">Instructor Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{instructor.students}</span>
              <span className="text-xs text-gray-500">Students</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{instructor.courses}</span>
              <span className="text-xs text-gray-500">Courses</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{instructor.bio}</p>
        </div>
      </div>
    </div>
  )
}
