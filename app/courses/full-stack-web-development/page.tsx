// app/courses/full-stack-web-development/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseHeader } from '../components/CourseHeader'
import { CourseSidebar } from '../components/CourseSidebar'
import { CourseInstructor } from '../components/CourseInstructor'
import { CheckCircle, Play, FileText, FileCode, Download, Award, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'  
import { getCourseById } from '@/data/courses'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

export default function CoursePage() {
  const router = useRouter()
  const { user } = useAuth()
  const courseData = getCourseById('full-stack-web-development')
  
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('curriculum')
  const [selectedWeek, setSelectedWeek] = useState<number | null>(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const enrolled = localStorage.getItem(`enrolled_${courseData?.id}`)
    if (enrolled === 'true') setIsEnrolled(true)
  }, [courseData?.id])

  if (!courseData || !mounted) return null

  const handleEnroll = () => {
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseData.id}`)
      return
    }
    localStorage.setItem(`enrolled_${courseData.id}`, 'true')
    setIsEnrolled(true)
  }

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <CourseHeader course={courseData} />
        
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            <div className="flex-1">
              {/* What You'll Learn */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {courseData.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 pt-4 overflow-x-auto">
                    {['curriculum', 'resources', 'faq'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-semibold capitalize whitespace-nowrap ${
                          activeTab === tab ? 'text-sky-600 border-b-2 border-sky-600' : 'text-gray-500'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {activeTab === 'curriculum' && (
                    <div className="space-y-2">
                      {courseData.weeks.map((week) => (
                        <div key={week.week} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-sky-600 bg-sky-50 dark:bg-sky-900/30 px-2 py-1 rounded">
                                Week {week.week}
                              </span>
                              <span className="font-semibold text-left">{week.title}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${selectedWeek === week.week ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {selectedWeek === week.week && (
                            <div className="border-t p-4 bg-gray-50 dark:bg-gray-900/50">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{week.description}</p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold mb-2 text-sm">Topics:</h5>
                                  <ul className="space-y-1">
                                    {week.topics.map((topic, idx) => (
                                      <li key={idx} className="text-sm flex items-start gap-2">
                                        <span className="w-1 h-1 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-semibold mb-2 text-sm">Details:</h5>
                                  <p className="text-sm">📹 {week.duration}</p>
                                  {isEnrolled && (
                                    <button 
                                      onClick={() => router.push(`/courses/${courseData.id}/learn?week=${week.week}`)}
                                      className="mt-3 text-sky-600 text-sm font-medium flex items-center gap-1"
                                    >
                                      <Play size={14} /> Start Learning
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div className="space-y-3">
                      {courseData.resources.map((resource, idx) => {
                        const IconComponent = resource.icon === 'FileText' ? FileText : FileCode
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent size={20} className="text-blue-500" />
                              <div>
                                <p className="font-medium">{resource.name}</p>
                                <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                              </div>
                            </div>
                            <button className="text-sky-600 text-sm"><Download size={14} /></button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  
                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      {courseData.faqs.map((faq, idx) => (
                        <div key={idx} className="border-b pb-4 last:border-0">
                          <h4 className="font-semibold mb-2">{faq.q}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <CourseInstructor instructor={courseData.instructor} />
            </div>

            <CourseSidebar 
              course={courseData} 
              isEnrolled={isEnrolled} 
              onEnroll={handleEnroll}
              onContinue={() => router.push(`/courses/${courseData.id}/learn`)}
              onShare={async () => { navigator.clipboard?.writeText(window.location.href); alert('Link copied!') }}
              onSave={() => { localStorage.setItem(`saved_${courseData.id}`, 'true'); alert('Course saved!') }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
