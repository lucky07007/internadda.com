// app/courses/components/CourseCurriculum.tsx
'use client'

import { Play, Lock, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { CurriculumWeek } from '../course-data'

export function CourseCurriculum({ curriculum, isEnrolled }: { curriculum: CurriculumWeek[], isEnrolled: boolean }) {
  const router = useRouter()
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1])

  const toggleWeek = (week: number) => {
    setExpandedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    )
  }

  const handleStartLesson = (week: CurriculumWeek) => {
    if (!isEnrolled && !week.isPreview) {
      alert('Please enroll to access this lesson')
      return
    }
    router.push(`/courses/full-stack-web-development/learn?week=${week.week}`)
  }

  return (
    <div className="space-y-2">
      {curriculum.map((week) => (
        <div key={week.week} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="w-full">
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-1 rounded">
                    Week {week.week}
                  </span>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{week.title}</h4>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {week.duration} • {week.videoHours}
                  </span>
                  {week.isPreview && (
                    <span className="text-sky-600 dark:text-sky-400">Free Preview</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(isEnrolled || week.isPreview) && (
                  <button
                    onClick={() => handleStartLesson(week)}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={() => toggleWeek(week.week)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {expandedWeeks.includes(week.week) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
            </div>
          </div>
          
          {expandedWeeks.includes(week.week) && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
              {week.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{week.description}</p>
              )}
              
              <div className="space-y-2">
                {week.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-gray-800 rounded transition-colors">
                    {week.isPreview || isEnrolled ? (
                      <Play size={14} className="text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Lock size={14} className="text-gray-400" />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{topic}</span>
                    {week.isPreview && (
                      <span className="text-xs text-sky-600 dark:text-sky-400">Preview</span>
                    )}
                  </div>
                ))}
              </div>
              
              {week.projects && week.projects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Projects</p>
                  {week.projects.map((project, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                      {project}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
