// app/verify/[id]/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Shield, CheckCircle, XCircle, Award, Calendar, User, Globe } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function VerifyCertificatePage() {
  const params = useParams()
  const certificateId = params?.id as string
  const [verified, setVerified] = useState(false)
  const [certificateData, setCertificateData] = useState<any>(null)

  useEffect(() => {
    // Check localStorage for this certificate
    const allCertificates = Object.keys(localStorage).filter(k => k.startsWith('certificate_') && k.endsWith('_id'))
    
    for (const key of allCertificates) {
      const storedId = localStorage.getItem(key)
      if (storedId === certificateId) {
        const courseId = key.replace('certificate_', '').replace('_id', '')
        const studentName = localStorage.getItem('user_name') || 'Student'
        
        setCertificateData({
          courseId,
          studentName,
          issueDate: new Date().toLocaleDateString(),
          certificateId
        })
        setVerified(true)
        break
      }
    }
  }, [certificateId])

  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            {verified ? (
              <>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Certificate Verified ✓
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This is an authentic InternAdda certificate
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Recipient</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{certificateData?.studentName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Course</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{certificateData?.courseId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Issue Date</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{certificateData?.issueDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Certificate ID</p>
                        <p className="font-mono text-sm text-gray-900 dark:text-white">{certificateId}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mt-6">
                  Issued by <span className="font-semibold">InternAdda</span> • Powered by UpForge Global
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Certificate Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  This certificate ID could not be verified.
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
