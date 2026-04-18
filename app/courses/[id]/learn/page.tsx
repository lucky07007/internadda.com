// app/courses/[id]/learn/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { getCourseById } from '@/data/courses'
import { 
  Play, CheckCircle, Circle, ChevronRight, ChevronLeft, Menu, X, 
  Clock, Award, FileText, Download, Maximize2, Minimize2, 
  ArrowLeft, Home, Settings, BookOpen, Code, Coffee, ExternalLink,
  Volume2, VolumeX, Pause, SkipForward, SkipBack, RotateCcw
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function LearnPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  const videoRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLesson, setActiveLesson] = useState(0)
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'transcript'>('notes')
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

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

  return (
    <div ref={containerRef} className="fixed inset-0 bg-[#0a0a0a] font-sans overflow-hidden">
      {/* Minimal Header - Only visible when not fullscreen */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 h-14 bg-black/90 backdrop-blur-md border-b border-white/10 z-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/courses/${courseId}`)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <ArrowLeft size={20} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/internadda.jpg" alt="InternAdda" width={28} height={28} className="rounded" />
              <span className="font-bold text-white hidden sm:block">InternAdda</span>
            </Link>
            <span className="text-white/30 mx-2 hidden md:block">|</span>
            <span className="text-white/70 text-sm hidden md:block truncate max-w-[300px]">
              {courseData.title} • Week {currentLesson?.week}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              {sidebarOpen ? <ChevronRight size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`h-full flex ${isFullscreen ? 'pt-0' : 'pt-14'}`}>
        {/* Left Content Area - Video + Reading */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'lg:mr-[420px]' : ''}`}>
          {/* Video Player Section */}
          <div className="bg-black">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {currentLesson?.videoId ? (
                <iframe
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLesson.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=0&mute=${isMuted ? 1 : 0}`}
                  title={currentLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                  <Play className="w-20 h-20 text-white/30" />
                </div>
              )}
              
              {/* Video Controls Overlay */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <div className="flex items-center gap-3 text-white">
                  <button onClick={handlePrevious} disabled={activeLesson === 0} className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30">
                    <SkipBack size={18} />
                  </button>
                  <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-white/10 rounded-full">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button onClick={handleNext} disabled={activeLesson === weeks.length - 1} className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30">
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
          <div className="bg-[#1a1a1a] border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-semibold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                    Week {currentLesson?.week}
                  </span>
                  <span className="text-white/50 text-sm flex items-center gap-1">
                    <Clock size={14} /> {currentLesson?.duration}
                  </span>
                </div>
                <h1 className="text-xl font-bold text-white">{currentLesson?.title}</h1>
              </div>
              <button
                onClick={() => handleLessonComplete(activeLesson)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  completedLessons.includes(activeLesson)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
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

          {/* Tab Navigation */}
          <div className="bg-[#1a1a1a] border-b border-white/10 px-6">
            <div className="flex gap-6">
              {[
                { id: 'notes', label: '📝 Notes & Reading', icon: BookOpen },
                { id: 'resources', label: '📎 Resources', icon: FileText },
                { id: 'transcript', label: '📜 Transcript', icon: FileText }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-sky-400 border-sky-400'
                      : 'text-white/50 border-transparent hover:text-white/70'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Content Area - Full immersive */}
          <div className="bg-[#0d0d0d] p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {activeTab === 'notes' && (
                <div className="prose prose-invert prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentLesson?.readingContent || `
                    <h2>📚 ${currentLesson?.title}</h2>
                    <p class="text-white/70">Complete reading material for this lesson.</p>
                    <h3>Topics Covered</h3>
                    <ul>
                      ${currentLesson?.topics.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                  `}} />
                </div>
              )}

              {activeTab === 'resources' && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-6">Downloadable Resources</h2>
                  <div className="grid gap-3">
                    {currentLesson?.resources?.map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-sky-400" />
                          <div>
                            <p className="font-medium text-white">{resource.name}</p>
                            <p className="text-sm text-white/40">{resource.type} • {resource.size}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors">
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'transcript' && (
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-xl font-bold text-white mb-4">Video Transcript</h2>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-white/70 leading-relaxed">
                      Transcript will be available here. You can follow along with the video content.
                    </p>
                  </div>
                </div>
              )}

              {/* Lesson Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={handlePrevious}
                  disabled={activeLesson === 0}
                  className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                  Previous Lesson
                </button>
                <span className="text-white/40 text-sm">
                  {activeLesson + 1} of {weeks.length} lessons
                </span>
                <button
                  onClick={handleNext}
                  disabled={activeLesson === weeks.length - 1}
                  className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next Lesson
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Course Content */}
        <div className={`
          fixed lg:relative right-0 top-14 lg:top-0 h-[calc(100vh-56px)] lg:h-full w-full sm:w-[420px] 
          bg-[#1a1a1a] border-l border-white/10 overflow-y-auto transition-all duration-300 z-20
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-20'}
        `}>
          <div className="p-4">
            <div className={`flex items-center justify-between mb-4 ${!sidebarOpen && 'lg:hidden'}`}>
              <h3 className="font-bold text-white">Course Content</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-white/10 rounded"
              >
                <X size={18} className="text-white/70" />
              </button>
            </div>

            {/* Progress */}
            <div className={`mb-6 ${!sidebarOpen && 'lg:hidden'}`}>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/50">Your Progress</span>
                <span className="font-semibold text-sky-400">{progress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
                      ? 'bg-sky-500/20 border-l-2 border-sky-400'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {completedLessons.includes(idx) ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : lesson.isPreview ? (
                      <Play className="w-4 h-4 text-sky-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        activeLesson === idx ? 'text-sky-300' : 'text-white/70'
                      }`}>
                        Week {lesson.week}: {lesson.title}
                      </p>
                      <p className="text-xs text-white/40">{lesson.duration}</p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            {sidebarOpen && (
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white py-3 rounded-xl text-sm font-medium transition-colors">
                  <Award size={16} />
                  Take Quiz to Earn Certificate
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white py-3 rounded-xl text-sm font-medium transition-colors">
                  <MessageCircle size={16} />
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

// MessageCircle icon
const MessageCircle = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
