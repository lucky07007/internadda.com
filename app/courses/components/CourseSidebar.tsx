// app/courses/components/CourseSidebar.tsx
'use client'

import { Award, Video, CheckCircle, Share2, Bookmark, Play } from 'lucide-react'
import Image from 'next/image'

export function CourseSidebar({ course, isEnrolled, onEnroll, onContinue, onShare, onSave }: any) {
  return (
    <div className="lg:w-96">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-20">
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900">
          <Image src={course.image} alt={course.title} fill className="object-cover opacity-75" />
          <button className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Video className="w-6 h-6 text-slate-900 ml-0.5" />
            </div>
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{course.price}</span>
            <span className="text-gray-400 line-through">{course.originalPrice}</span>
            <span className="ml-auto bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold px-2 py-1 rounded">
              100% OFF
            </span>
          </div>

          {!isEnrolled ? (
            <button onClick={onEnroll} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl mb-3 transition-colors">
              Enroll Now - It's Free
            </button>
          ) : (
            <button onClick={onContinue} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl mb-3 transition-colors flex items-center justify-center gap-2">
              <Play size={16} /> Continue Learning
            </button>
          )}

          <div className="flex items-center gap-2 mb-4">
            <button onClick={onSave} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
              <Bookmark size={16} /> Save
            </button>
            <button onClick={onShare} className="flex-1 flex items-center justify-center gap-2 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
              <Share2 size={16} /> Share
            </button>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white">This course includes:</h4>
            <ul className="space-y-2">
              {course.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {isEnrolled && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                <p className="text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  <Award size={14} />
                  Complete the quiz with 6+ correct answers to earn your certificate!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
