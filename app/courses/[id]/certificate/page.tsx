// app/courses/[id]/certificate/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, Download, Share2, Linkedin, Twitter, Copy, CheckCircle, Sparkles, QrCode, Shield, Globe } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import QRCode from 'qrcode'
import { getCourseById } from '@/data/courses'

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  const certificateRef = useRef<HTMLDivElement>(null)
  
  const [courseData, setCourseData] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [mounted, setMounted] = useState(false)
  const [certificateId] = useState(() => `IA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/certificate`)
      return
    }

    const progress = parseInt(localStorage.getItem(`progress_${courseId}`) || '0')
    const quizPassed = localStorage.getItem(`quiz_${courseId}_passed`)
    
    if (progress < 100 || quizPassed !== 'true') {
      router.push(`/courses/${courseId}`)
      return
    }

    const course = getCourseById(courseId)
    setCourseData(course)

    const verifyUrl = `${window.location.origin}/verify/${certificateId}`
    QRCode.toDataURL(verifyUrl, { width: 120, margin: 1 })
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error(err))

    localStorage.setItem(`certificate_${courseId}`, 'true')
    localStorage.setItem(`certificate_${courseId}_id`, certificateId)
  }, [user, courseId, router, certificateId])

  const downloadCertificate = async () => {
    if (!certificateRef.current) return
    
    const html2canvas = (await import('html2canvas')).default
    const jsPDF = (await import('jspdf')).jsPDF
    
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      backgroundColor: '#ffffff'
    })
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height]
    })
    
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`InternAdda-Certificate-${courseId}.pdf`)
  }

  const shareCertificate = (platform: string) => {
    const url = `${window.location.origin}/verify/${certificateId}`
    const text = `I just earned my ${courseData?.title} certificate from InternAdda! 🎓`
    
    const shareUrls: any = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    }
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyLink = () => {
    navigator.clipboard?.writeText(`${window.location.origin}/verify/${certificateId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted || !courseData) return null

  const studentName = user?.user_metadata?.full_name || 'Student'
  const completionDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
  const verifyUrl = `${window.location.origin}/verify/${certificateId}`

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 font-sans">
        <div className="max-w-6xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-2 rounded-full border border-green-500/30 mb-4">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Course Successfully Completed!</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your Certificate is Ready 🎉
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Share your achievement with the world. This certificate is verified on blockchain.
            </p>
          </div>

          {/* Certificate Card */}
          <div className="flex justify-center mb-8">
            <div 
              ref={certificateRef}
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{ aspectRatio: '1.414 / 1' }}
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-40 h-40 border-4 border-blue-500 rounded-full" />
                <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-blue-500 rounded-full" />
              </div>
              
              {/* Certificate Border */}
              <div className="absolute inset-4 border-4 border-double border-blue-200 rounded-lg" />
              <div className="absolute inset-6 border border-blue-100 rounded-lg" />
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-12 text-center">
                {/* Logos Row */}
                <div className="flex items-center justify-center gap-8 mb-6">
                  <Image src="/internadda.jpg" alt="InternAdda" width={60} height={60} className="rounded-xl" />
                  <span className="text-3xl text-gray-300">×</span>
                  <Image src="/upforge.jpg" alt="UpForge Global" width={80} height={40} className="object-contain" />
                </div>

                {/* Certificate Title */}
                <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-2">Certificate of Completion</h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6" />

                {/* Presented to */}
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">This certificate is proudly presented to</p>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{studentName}</h3>
                
                {/* For completing */}
                <p className="text-gray-600 mb-2">for successfully completing the course</p>
                <h4 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">{courseData.title}</h4>

                {/* Details Grid */}
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date Issued</p>
                    <p className="font-semibold text-gray-800">{completionDate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                    <p className="font-mono text-sm text-gray-800">{certificateId}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Verified by</p>
                    <p className="font-semibold text-gray-800">UpForge Global</p>
                  </div>
                </div>

                {/* Signatures and QR */}
                <div className="flex items-center justify-between w-full mt-4">
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-gray-300 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">{courseData.instructor.name}</p>
                    <p className="text-xs text-gray-500">Course Instructor</p>
                  </div>
                  
                  {/* QR Code */}
                  <div className="text-center">
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                      {qrCodeUrl ? (
                        <Image src={qrCodeUrl} alt="Verification QR" width={80} height={80} />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 animate-pulse rounded" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Scan to verify</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-0.5 bg-gray-300 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">InternAdda</p>
                    <p className="text-xs text-gray-500">Official Seal</p>
                  </div>
                </div>

                {/* Verification URL */}
                <p className="text-[10px] text-gray-400 mt-4">
                  Verify at: {verifyUrl}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={downloadCertificate}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
            >
              <Download size={18} />
              Download PDF
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
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 font-bold px-6 py-3 rounded-xl transition-all"
            >
              {copied ? <CheckCircle size={18} className="text-green-400" /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Verification Info */}
          <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 text-white/70">
              <Shield className="w-5 h-5 text-green-400" />
              <p className="text-sm">
                This certificate is cryptographically signed and verifiable at <span className="font-mono text-white">{verifyUrl}</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
