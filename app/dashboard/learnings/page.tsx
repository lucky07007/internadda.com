// app/dashboard/learnings/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BookOpen, Clock, Award, TrendingUp, Play, ChevronRight, CheckCircle, Circle, Lock, Download, Share2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

interface EnrolledCourse {
  id: string
  title: string
  category: string
  image: string
  progress: number
  lastWatched: string
  completedLessons: number
  totalLessons: number
  certificateEarned: boolean
  instructor: string
}

export default function LearningsDashboard() {
  const router = useRouter()
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [completedCourses, setCompletedCourses] = useState<EnrolledCourse[]>([])
  const [activeTab, setActiveTab] = useState<'in-progress' | 'completed'>('in-progress')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push('/auth/signin?callbackUrl=/dashboard/learnings')
      return
    }

    // Load enrolled courses from localStorage
    const loadEnrolledCourses = () => {
      const allCourses = [
        {
          id: 'full-stack-web-development',
          title: 'Full Stack Web Development',
          category: 'Development',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
          instructor: 'Rajesh Kumar',
          totalLessons: 48
        },
        {
          id: 'data-science-machine-learning',
          title: 'Data Science & Machine Learning',
          category: 'Data Science',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
          instructor: 'Priya Sharma',
          totalLessons: 40
        }
      ]

      const enrolled: EnrolledCourse[] = []
      const completed: EnrolledCourse[] = []

      allCourses.forEach(course => {
        const isEnrolled = localStorage.getItem(`enrolled_${course.id}`)
        if (isEnrolled === 'true') {
          const progress = parseInt(localStorage.getItem(`progress_${course.id}`) || '0')
          const completedLessons = parseInt(localStorage.getItem(`completed_${course.id}`) || '0')
          const certificateEarned = localStorage.getItem(`certificate_${course.id}`) === 'true'
          
          const courseData: EnrolledCourse = {
            ...course,
            progress,
            completedLessons,
            lastWatched: localStorage.getItem(`lastWatched_${course.id}`) || 'Week 1',
            certificateEarned
          }

          if (progress >= 100 || certificateEarned) {
            completed.push(courseData)
          } else {
            enrolled.push(courseData)
          }
        }
      })

      setEnrolledCourses(enrolled)
      setCompletedCourses(completed)
    }

    loadEnrolledCourses()
  }, [user, router])

  const handleContinueLearning = (courseId: string) => {
    router.push(`/courses/${courseId}/learn`)
  }

  const handleClaimCertificate = (courseId: string) => {
    router.push(`/courses/${courseId}/certificate`)
  }

  const stats = {
    totalCourses: enrolledCourses.length + completedCourses.length,
    totalHours: 156,
    certificates: completedCourses.length,
    streak: 7
  }

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className={CONTAINER}>
            <div className="py-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                My Learning Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your progress and continue learning
              </p>
            </div>
          </div>
        </div>

        <div className={CONTAINER}>
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700">
              <BookOpen className="w-6 h-6 text-sky-500 mb-3" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCourses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700">
              <Clock className="w-6 h-6 text-green-500 mb-3" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Hours Learned</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700">
              <Award className="w-6 h-6 text-amber-500 mb-3" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.certificates}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Certificates</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700">
              <TrendingUp className="w-6 h-6 text-purple-500 mb-3" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.streak}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Day Streak</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`pb-3 text-sm font-semibold transition-colors ${
                activeTab === 'in-progress'
                  ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              In Progress ({enrolledCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-3 text-sm font-semibold transition-colors ${
                activeTab === 'completed'
                  ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Completed ({completedCourses.length})
            </button>
          </div>

          {/* Course List */}
          <div className="pb-10">
            {activeTab === 'in-progress' && (
              <>
                {enrolledCourses.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center border border-gray-200 dark:border-gray-700">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      No courses in progress
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start learning by enrolling in a course
                    </p>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                    >
                      Browse Courses
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 h-32 sm:h-auto relative">
                            <Image 
                              src={course.image} 
                              alt={course.title} 
                              fill 
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {course.instructor} • {course.category}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                                {course.progress}%
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {course.completedLessons}/{course.totalLessons} lessons completed
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Last watched: {course.lastWatched}
                              </p>
                              <button
                                onClick={() => handleContinueLearning(course.id)}
                                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                              >
                                <Play size={14} />
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === 'completed' && (
              <>
                {completedCourses.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center border border-gray-200 dark:border-gray-700">
                    <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      No completed courses yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Complete a course to earn your certificate
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedCourses.map((course) => (
                      <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-48 h-32 sm:h-auto relative">
                            <Image 
                              src={course.image} 
                              alt={course.title} 
                              fill 
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              Completed
                            </div>
                          </div>
                          <div className="flex-1 p-4 sm:p-5">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                                  {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {course.instructor} • {course.category}
                                </p>
                              </div>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>

                            <div className="flex items-center gap-3">
                              {course.certificateEarned ? (
                                <>
                                  <button className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                                    <Download size={14} />
                                    Download Certificate
                                  </button>
                                  <button className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <Share2 size={14} />
                                    Share
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleClaimCertificate(course.id)}
                                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-lg shadow-amber-500/25"
                                >
                                  <Award size={14} />
                                  Claim Certificate
                                </button>
                              )}
                              <Link
                                href={`/courses/${course.id}`}
                                className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 text-sm font-semibold hover:gap-2 transition-all"
                              >
                                View Course
                                <ExternalLink size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
