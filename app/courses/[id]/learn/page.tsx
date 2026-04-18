// app/courses/[id]/learn/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getCourseById } from '@/data/courses'
import { useTheme } from 'next-themes'
import { 
  Play, CheckCircle, Circle, ChevronRight, ChevronLeft, Menu, X, 
  Clock, Award, Maximize2, Minimize2, ArrowLeft, Home,
  Volume2, VolumeX, Pause, SkipForward, SkipBack, Settings, BookOpen
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const courseId = params?.id as string
  const videoRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLesson, setActiveLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoError, setVideoError] = useState(false)

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleTakeQuiz = () => {
    if (progress >= 100) {
      router.push(`/courses/${courseId}/quiz`)
    } else {
      alert(`Complete all lessons first! Progress: ${progress}%`)
    }
  }

  const handleNext = () => {
    if (activeLesson < weeks.length - 1) {
      setActiveLesson(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (activeLesson > 0) {
      setActiveLesson(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!mounted || !courseData) return null

  const isDark = theme === 'dark'

  return (
    <div 
      ref={containerRef} 
      className={`fixed inset-0 font-sans overflow-hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}
    >
      {/* Minimal Header */}
      {!isFullscreen && (
        <div className={`absolute top-0 left-0 right-0 h-14 z-30 flex items-center justify-between px-4 border-b ${
          isDark ? 'bg-black/90 border-white/10' : 'bg-white/90 border-gray-200'
        } backdrop-blur-md`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <ArrowLeft size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>InternAdda</span>
            </Link>
            <span className={`mx-2 ${isDark ? 'text-white/30' : 'text-gray-300'}`}>|</span>
            <span className={`text-sm truncate max-w-[300px] hidden md:block ${
              isDark ? 'text-white/70' : 'text-gray-600'
            }`}>
              {courseData.title} • Week {currentLesson?.week}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Settings size={18} />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {sidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`h-full flex ${isFullscreen ? 'pt-0' : 'pt-14'}`}>
        {/* Content Area */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? 'lg:mr-[380px]' : ''
        }`}>
          {/* Video Player - Full Width */}
          <div className={`${isDark ? 'bg-black' : 'bg-gray-900'}`}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {currentLesson?.videoId && !videoError ? (
                <iframe
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div className={`absolute inset-0 flex items-center justify-center ${
                  isDark ? 'bg-gray-900' : 'bg-gray-100'
                }`}>
                  <div className="text-center">
                    <Play className={`w-16 h-16 mx-auto mb-3 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                    <p className={isDark ? 'text-white/50' : 'text-gray-500'}>
                      {videoError ? 'Video unavailable' : currentLesson?.title}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Video Controls */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
                  showControls ? 'opacity-100' : 'opacity-0'
                }`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <div className="flex items-center gap-3 text-white">
                  <button onClick={handlePrevious} disabled={activeLesson === 0} 
                          className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30">
                    <SkipBack size={18} />
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-white/10 rounded-full">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={handleNext} disabled={activeLesson === weeks.length - 1} 
                          className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30">
                    <SkipForward size={18} />
                  </button>
                  
                  <div className="flex-1" />
                  
                  <button onClick={() => setIsMuted(!isMuted)} className="p-2 hover:bg-white/10 rounded-full">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button onClick={toggleFullscreen} className="p-2 hover:bg-white/10 rounded-full">
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Info Bar */}
          <div className={`border-b px-6 py-4 ${
            isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    isDark ? 'bg-sky-400/10 text-sky-400' : 'bg-sky-100 text-sky-700'
                  }`}>
                    Week {currentLesson?.week}
                  </span>
                  <span className={`text-sm flex items-center gap-1 ${
                    isDark ? 'text-white/50' : 'text-gray-500'
                  }`}>
                    <Clock size={14} /> {currentLesson?.duration}
                  </span>
                </div>
                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {currentLesson?.title}
                </h1>
              </div>
              <button
                onClick={() => handleLessonComplete(activeLesson)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  completedLessons.includes(activeLesson)
                    ? isDark 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                    : isDark
                      ? 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {completedLessons.includes(activeLesson) ? (
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

          {/* Reading Content - Full Width */}
          <div className={`p-6 lg:p-8 ${isDark ? 'bg-[#0d0d0d]' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto">
              <div className={`prose max-w-none ${
                isDark ? 'prose-invert' : ''
              }`}>
                <div dangerouslySetInnerHTML={{ __html: currentLesson?.readingContent || `
                  <h2>📚 ${currentLesson?.title}</h2>
                  <p>Complete reading material for this lesson.</p>
                  <h3>Topics Covered</h3>
                  <ul>
                    ${currentLesson?.topics.map((t: string) => `<li>${t}</li>`).join('')}
                  </ul>
                `}} />
              </div>

              {/* Lesson Navigation */}
              <div className={`flex items-center justify-between mt-8 pt-6 border-t ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}>
                <button
                  onClick={handlePrevious}
                  disabled={activeLesson === 0}
                  className={`flex items-center gap-2 px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <ChevronLeft size={18} />
                  Previous Lesson
                </button>
                <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                  {activeLesson + 1} of {weeks.length} lessons
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeLesson === weeks.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                    isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Next Lesson
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`
          fixed lg:relative right-0 top-14 lg:top-0 h-[calc(100vh-56px)] lg:h-full 
          w-full sm:w-[380px] overflow-y-auto transition-all duration-300 z-20 border-l
          ${isDark ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200'}
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-20'}
        `}>
          <div className="p-4">
            <div className={`flex items-center justify-between mb-4 ${!sidebarOpen && 'lg:hidden'}`}>
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Content</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`lg:hidden p-1 rounded ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                <X size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
              </button>
            </div>

            {/* Progress */}
            <div className={`mb-6 ${!sidebarOpen && 'lg:hidden'}`}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={isDark ? 'text-white/50' : 'text-gray-500'}>Your Progress</span>
                <span className={`font-semibold ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>{progress}%</span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                isDark ? 'bg-white/10' : 'bg-gray-200'
              }`}>
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Lesson List */}
            <div className="space-y-1">
              {weeks.map((lesson, idx) => (
                <button
                  key={lesson.week}
                  onClick={() => {
                    setActiveLesson(idx)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                    activeLesson === idx
                      ? isDark 
                        ? 'bg-sky-500/20 border-l-2 border-sky-400' 
                        : 'bg-sky-50 border-l-2 border-sky-500'
                      : isDark
                        ? 'hover:bg-white/5'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {completedLessons.includes(idx) ? (
                      <CheckCircle className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-500'}`} />
                    ) : lesson.isPreview ? (
                      <Play className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-sky-500'}`} />
                    ) : (
                      <Circle className={`w-4 h-4 ${isDark ? 'text-white/30' : 'text-gray-300'}`} />
                    )}
                  </div>
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        activeLesson === idx
                          ? isDark ? 'text-sky-300' : 'text-sky-700'
                          : isDark ? 'text-white/70' : 'text-gray-700'
                      }`}>
                        Week {lesson.week}: {lesson.title}
                      </p>
                      <p className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                        {lesson.duration}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Quiz Button */}
            {sidebarOpen && (
              <div className="mt-6 pt-6 border-t space-y-2">
                <button 
                  onClick={handleTakeQuiz}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                    progress >= 100
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                      : isDark 
                        ? 'bg-white/5 text-white/40 cursor-not-allowed' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Award size={16} />
                  {progress >= 100 ? 'Take Quiz to Earn Certificate' : `Complete ${100 - progress}% more to unlock Quiz`}
                </button>
                <button className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}>
                  <BookOpen size={16} />
                  Ask Question in Forum
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
