// app/courses/[id]/certificate/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, Download, Share2, Linkedin, Twitter, Copy, CheckCircle, Sparkles, Globe } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'

const CONTAINER = "max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6"

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  const certificateRef = useRef<HTMLDivElement>(null)
  
  const [courseData, setCourseData] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/certificate`)
      return
    }

    // Check if course is completed
    const progress = parseInt(localStorage.getItem(`progress_${courseId}`) || '0')
    if (progress < 100) {
      router.push(`/courses/${courseId}`)
      return
    }

    // Load course data
    setCourseData({
      id: courseId,
      title: 'Full Stack Web Development',
      studentName: user?.user_metadata?.full_name || 'Student',
      completionDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      certificateId: `IA-${Date.now().toString(36).toUpperCase()}`,
      instructor: 'Rajesh Kumar'
    })
  }, [user, courseId, router])

  const downloadCertificate = () => {
    // Simple download - save as image
    const certificateData = {
      ...courseData,
      downloadDate: new Date().toISOString()
    }
    
    // Create downloadable text file with certificate details
    const content = `
INTERNADDA CERTIFICATE OF COMPLETION
=====================================
Certificate ID: ${certificateData.certificateId}
Student Name: ${certificateData.studentName}
Course: ${certificateData.title}
Completion Date: ${certificateData.completionDate}
Instructor: ${certificateData.instructor}
Verified by: UpForge Global

This certificate can be verified at:
https://internadda.com/verify/${certificateData.certificateId}
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificate-${courseId}.txt`
    a.click()
    URL.revokeObjectURL(url)
    
    // Mark certificate as earned
    localStorage.setItem(`certificate_${courseId}`, 'true')
    
    alert('Certificate downloaded! You can also take a screenshot of this page.')
  }

  const shareCertificate = (platform: string) => {
    const url = window.location.href
    const text = `I just earned my ${courseData?.title} certificate from InternAdda! 🎓`
    
    const shareUrls: any = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted || !courseData) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen font-sans py-8">
        <div className={CONTAINER}>
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full mb-4">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Congratulations! Course Completed</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Your Certificate is Ready! 🎉
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              You've successfully completed {courseData.title}. Download your certificate and share your achievement!
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="flex justify-center mb-8">
            <div 
              ref={certificateRef}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ aspectRatio: '1.414 / 1' }}
            >
              {/* Certificate Border */}
              <div className="absolute inset-4 border-4 border-double border-amber-300 rounded-lg" />
              <div className="absolute inset-6 border border-amber-200 rounded-lg" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                {/* Logo */}
                <div className="mb-6">
                  <span className="text-2xl sm:text-3xl font-black text-sky-600">InternAdda</span>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mt-1">Powered by UpForge Global</span>
                </div>

                {/* Certificate Title */}
                <h2 className="text-3xl sm:text-4xl font-serif text-gray-800 mb-2">Certificate of Completion</h2>
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

                {/* Presented to */}
                <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-2">This certificate is presented to</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{courseData.studentName}</h3>
                
                {/* For completing */}
                <p className="text-gray-600 text-sm mb-2">for successfully completing the course</p>
                <h4 className="text-xl sm:text-2xl font-bold text-sky-600 mb-6">{courseData.title}</h4>

                {/* Date and Certificate ID */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date of Completion</p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">{courseData.completionDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                    <p className="font-mono text-xs sm:text-sm text-gray-800">{courseData.certificateId}</p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex items-center justify-center gap-8 sm:gap-12">
                  <div className="text-center">
                    <div className="w-24 sm:w-32 h-0.5 bg-gray-300 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">{courseData.instructor}</p>
                    <p className="text-xs text-gray-500">Course Instructor</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 sm:w-32 h-0.5 bg-gray-300 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">UpForge Global</p>
                    <p className="text-xs text-gray-500">Verified by</p>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="absolute bottom-4 right-4">
                  <Award className="w-12 h-12 text-amber-400 opacity-30" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={downloadCertificate}
              className="flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-sky-500/25 transition-all"
            >
              <Download size={18} />
              Download Certificate
            </button>
            
            <button
              onClick={() => shareCertificate('linkedin')}
              className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#006699] text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-[#0077b5]/25 transition-all"
            >
              <Linkedin size={18} />
              Share on LinkedIn
            </button>
            
            <button
              onClick={() => shareCertificate('twitter')}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              <Twitter size={18} />
              Tweet
            </button>
            
            <button
              onClick={copyLink}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold px-6 py-3 rounded-xl transition-all"
            >
              {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Note */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            📸 You can also take a screenshot of this certificate for your records
          </p>

          {/* What's Next */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              What's Next?
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <button className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors text-left">
                <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Browse More Courses</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Continue learning</p>
              </button>
              <button className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Add to LinkedIn</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Showcase on profile</p>
              </button>
              <button className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left">
                <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Share Achievement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Let network know</p>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
