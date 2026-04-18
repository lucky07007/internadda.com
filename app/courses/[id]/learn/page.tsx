// app/courses/[id]/learn/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Play, CheckCircle, Circle, Lock, ChevronRight, ChevronLeft, Menu, X, FileText, Download, MessageCircle, ThumbsUp, BookOpen, Clock, Award } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

export default function CourseLearnPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLesson, setActiveLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Mock curriculum data - replace with actual data
  const curriculum = [
    { id: 1, title: 'Introduction to Web Development', duration: '15:30', isPreview: true, completed: false },
    { id: 2, title: 'HTML5 Fundamentals', duration: '22:45', isPreview: false, completed: false },
    { id: 3, title: 'CSS3 Styling Mastery', duration: '28:20', isPreview: false, completed: false },
    { id: 4, title: 'JavaScript Basics', duration: '35:10', isPreview: false, completed: false },
    { id: 5, title: 'DOM Manipulation', duration: '25:40', isPreview: false, completed: false },
  ]

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/learn`)
      return
    }

    // Check if enrolled
    const isEnrolled = localStorage.getItem(`enrolled_${courseId}`)
    if (isEnrolled !== 'true') {
      router.push(`/courses/${courseId}`)
      return
    }

    // Load progress
    const savedProgress = localStorage.getItem(`progress_${courseId}`)
    const savedCompleted = localStorage.getItem(`completed_${courseId}`)
    
    if (savedProgress) setProgress(parseInt(savedProgress))
    if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted))
  }, [user, courseId, router])

  const handleLessonComplete = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => prev.filter(id => id !== lessonId))
    } else {
      setCompletedLessons(prev => [...prev, lessonId])
    }
    
    const newProgress = Math.round((completedLessons.length / curriculum.length) * 100)
    setProgress(newProgress)
    localStorage.setItem(`progress_${courseId}`, newProgress.toString())
    localStorage.setItem(`completed_${courseId}`, JSON.stringify(completedLessons))
    localStorage.setItem(`lastWatched_${courseId}`, curriculum[activeLesson]?.title || '')
  }

  const handleNextLesson = () => {
    if (activeLesson < curriculum.length - 1) {
      setActiveLesson(activeLesson + 1)
    }
  }

  const handlePrevLesson = () => {
    if (activeLesson > 0) {
      setActiveLesson(activeLesson - 1)
    }
  }

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Main Content */}
          <div className={`flex-1 transition-all ${sidebarOpen ? 'lg:mr-96' : ''}`}>
            {/* Video Player */}
            <div className="bg-black">
              <div className="max-w-5xl mx-auto">
                <div className="relative pt-[56.25%]">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                      <p className="text-white text-lg font-semibold">
                        {curriculum[activeLesson]?.title}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Video player will load here (YouTube embed)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className={CONTAINER}>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">
                      {curriculum[activeLesson]?.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {curriculum[activeLesson]?.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLessonComplete(curriculum[activeLesson]?.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        completedLessons.includes(curriculum[activeLesson]?.id)
                          ? 'bg-green-500 text-white'
                          : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {completedLessons.includes(curriculum[activeLesson]?.id) ? (
                        <>
                          <CheckCircle size={16} />
                          Completed
                        </>
                      ) : (
                        <>
                          <Circle size={16} />
                          Mark Complete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className={CONTAINER}>
              <div className="flex items-center justify-between py-4">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeLesson === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronLeft size={16} />
                  Previous Lesson
                </button>
                <button
                  onClick={handleNextLesson}
                  disabled={activeLesson === curriculum.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Next Lesson
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="fixed right-0 top-20 z-30 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-l-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Course Sidebar */}
          <div className={`
            fixed lg:relative right-0 top-16 h-[calc(100vh-64px)] w-full sm:w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform z-20
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-20'}
          `}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold text-gray-900 dark:text-white ${!sidebarOpen && 'lg:hidden'}`}>
                  Course Content
                </h3>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden lg:block p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  {sidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
              </div>

              {/* Progress */}
              <div className={`mb-4 ${!sidebarOpen && 'lg:hidden'}`}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Lesson List */}
              <div className="space-y-1">
                {curriculum.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                      activeLesson === idx
                        ? 'bg-sky-50 dark:bg-sky-900/30 border-l-2 border-sky-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : lesson.isPreview ? (
                        <Play className="w-4 h-4 text-sky-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    {sidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          activeLesson === idx ? 'text-sky-700 dark:text-sky-300' : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Resources */}
              {sidebarOpen && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <FileText size={16} />
                    Resources
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Lesson Slides</span>
                      <Download size={14} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <span className="text-sm text-gray-700 dark:text-gray-300">Source Code</span>
                      <Download size={14} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
