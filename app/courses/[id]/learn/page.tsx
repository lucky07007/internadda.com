// app/courses/[id]/learn/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Play, CheckCircle, Circle, ChevronRight, ChevronLeft, Menu, X, FileText, Download, Clock, BookOpen, Award, Code } from 'lucide-react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getCourseById } from '@/data/courses'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

export default function CourseLearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLesson, setActiveLesson] = useState(0)
  const [activeTab, setActiveTab] = useState<'video' | 'reading' | 'resources'>('video')
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  const courseData = getCourseById(courseId)
  const weeks = courseData?.weeks || []
  const currentLesson = weeks[activeLesson]

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/learn`)
      return
    }

    const isEnrolled = localStorage.getItem(`enrolled_${courseId}`)
    if (isEnrolled !== 'true') {
      router.push(`/courses/${courseId}`)
      return
    }

    const weekParam = searchParams?.get('week')
    if (weekParam) {
      const weekIndex = weeks.findIndex(w => w.week === parseInt(weekParam))
      if (weekIndex !== -1) setActiveLesson(weekIndex)
    }

    const savedProgress = localStorage.getItem(`progress_${courseId}`)
    const savedCompleted = localStorage.getItem(`completed_${courseId}`)
    
    if (savedProgress) setProgress(parseInt(savedProgress))
    if (savedCompleted) setCompletedLessons(JSON.parse(savedCompleted))
  }, [user, courseId, router, searchParams, weeks])

  const handleLessonComplete = (lessonIdx: number) => {
    const newCompleted = completedLessons.includes(lessonIdx) 
      ? completedLessons.filter(id => id !== lessonIdx)
      : [...completedLessons, lessonIdx]
    
    setCompletedLessons(newCompleted)
    const newProgress = Math.round((newCompleted.length / weeks.length) * 100)
    setProgress(newProgress)
    localStorage.setItem(`progress_${courseId}`, newProgress.toString())
    localStorage.setItem(`completed_${courseId}`, JSON.stringify(newCompleted))
  }

  if (!mounted || !courseData) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <div className="flex h-[calc(100vh-64px)]">
          <div className={`flex-1 transition-all overflow-y-auto ${sidebarOpen ? 'lg:mr-96' : ''}`}>
            {/* Video Player */}
            <div className="bg-black">
              <div className="max-w-5xl mx-auto">
                <div className="relative pt-[56.25%]">
                  {currentLesson?.videoId ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${currentLesson.videoId}`}
                      title={currentLesson.title}
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-white/80 mx-auto mb-3" />
                        <p className="text-white text-lg">{currentLesson?.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-gray-800 border-b">
              <div className={CONTAINER}>
                <div className="flex gap-6 py-2">
                  {['video', 'reading', 'resources'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-2 text-sm font-semibold border-b-2 transition-colors ${
                        activeTab === tab ? 'text-sky-600 border-sky-600' : 'text-gray-500 border-transparent'
                      }`}
                    >
                      {tab === 'video' && <><Play size={14} className="inline mr-1" /> Video</>}
                      {tab === 'reading' && <><BookOpen size={14} className="inline mr-1" /> Reading</>}
                      {tab === 'resources' && <><FileText size={14} className="inline mr-1" /> Resources</>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={CONTAINER}>
              <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold">Week {currentLesson?.week}: {currentLesson?.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span><Clock size={14} className="inline mr-1" /> {currentLesson?.duration}</span>
                      <span><Code size={14} className="inline mr-1" /> {currentLesson?.topics?.length} topics</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLessonComplete(activeLesson)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
                      completedLessons.includes(activeLesson) ? 'bg-green-500 text-white' : 'border'
                    }`}
                  >
                    {completedLessons.includes(activeLesson) ? <><CheckCircle size={16} /> Completed</> : <><Circle size={16} /> Mark Complete</>}
                  </button>
                </div>

                {activeTab === 'video' && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border">
                    <h3 className="font-bold text-lg mb-4">Topics Covered:</h3>
                    <ul className="space-y-2">
                      {currentLesson?.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'reading' && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border">
                    <div className="prose prose-sm dark:prose-invert max-w-none" 
                         dangerouslySetInnerHTML={{ __html: currentLesson?.readingContent || '' }} />
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border">
                    <h3 className="font-bold text-lg mb-4">Downloadable Resources</h3>
                    <div className="space-y-3">
                      {currentLesson?.resources?.map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-blue-500" />
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                            </div>
                          </div>
                          <button className="text-sky-600 text-sm"><Download size={14} /> Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <button onClick={() => setActiveLesson(l => Math.max(0, l - 1))} disabled={activeLesson === 0}
                          className="flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50">
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <span className="text-sm text-gray-500">Lesson {activeLesson + 1} of {weeks.length}</span>
                  <button onClick={() => setActiveLesson(l => Math.min(weeks.length - 1, l + 1))} disabled={activeLesson === weeks.length - 1}
                          className="flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-50">
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="fixed right-0 top-20 z-30 lg:hidden bg-white dark:bg-gray-800 p-2 rounded-l-lg shadow-lg border">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className={`fixed lg:relative right-0 top-16 h-[calc(100vh-64px)] w-full sm:w-96 bg-white dark:bg-gray-800 border-l overflow-y-auto transition-transform z-20
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-20'}`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold ${!sidebarOpen && 'lg:hidden'}`}>Course Content</h3>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block">
                  {sidebarOpen ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
              </div>

              <div className={`mb-4 ${!sidebarOpen && 'lg:hidden'}`}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Your Progress</span>
                  <span className="font-semibold text-sky-600">{progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                {weeks.map((lesson, idx) => (
                  <button key={lesson.week} onClick={() => { setActiveLesson(idx); setActiveTab('video') }}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                            activeLesson === idx ? 'bg-sky-50 dark:bg-sky-900/30 border-l-2 border-sky-500' : 'hover:bg-gray-50'
                          }`}>
                    <div className="flex-shrink-0">
                      {completedLessons.includes(idx) ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                       lesson.isPreview ? <Play className="w-4 h-4 text-sky-500" /> : <Circle className="w-4 h-4 text-gray-400" />}
                    </div>
                    {sidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${activeLesson === idx ? 'text-sky-700' : ''}`}>
                          Week {lesson.week}: {lesson.title}
                        </p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {sidebarOpen && (
                <div className="mt-6 pt-6 border-t">
                  <button onClick={() => router.push(`/courses/${courseId}/quiz`)}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl">
                    <Award size={16} /> Take Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
