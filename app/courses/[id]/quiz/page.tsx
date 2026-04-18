// app/courses/[id]/quiz/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { getCourseById } from '@/data/courses'

const CONTAINER = "max-w-[900px] mx-auto px-3 sm:px-4 lg:px-6"

export default function CourseQuizPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600)
  const [mounted, setMounted] = useState(false)

  const courseData = getCourseById(courseId)
  const quizQuestions = courseData?.quizQuestions || []

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/quiz`)
      return
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); clearInterval(timer); return 0 }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [user])

  const handleAnswer = (qId: number, optIdx: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  const handleSubmit = () => {
    let correct = 0
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correct++
    })
    setScore(correct)
    setSubmitted(true)
    
    const passed = correct >= Math.ceil(quizQuestions.length * 0.6)
    localStorage.setItem(`quiz_${courseId}_score`, correct.toString())
    localStorage.setItem(`quiz_${courseId}_passed`, passed.toString())
    
    if (passed) {
      localStorage.setItem(`progress_${courseId}`, '100')
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    return `${m}:${(s % 60).toString().padStart(2, '0')}`
  }

  const answeredCount = Object.keys(answers).length
  const passed = score >= Math.ceil(quizQuestions.length * 0.6)

  if (!mounted || !courseData) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
        <div className={CONTAINER}>
          {!submitted ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">{courseData.title} - Assessment</h1>
                    <p className="text-gray-600">Answer {Math.ceil(quizQuestions.length * 0.6)}+ correctly to earn your certificate</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock size={20} />
                      <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{answeredCount}/{quizQuestions.length} answered</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all" 
                       style={{ width: `${(answeredCount/quizQuestions.length)*100}%` }} />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <p className="font-semibold mb-3">{idx+1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button key={optIdx} onClick={() => handleAnswer(q.id, optIdx)}
                                className={`w-full text-left p-3 rounded-lg border ${
                                  answers[q.id] === optIdx ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-500 text-sky-700' : 'border-gray-200 hover:bg-gray-50'
                                }`}>
                          <span className="font-medium">{String.fromCharCode(65+optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleSubmit} disabled={answeredCount < quizQuestions.length}
                      className={`w-full py-3 rounded-xl font-bold ${
                        answeredCount === quizQuestions.length ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}>
                Submit Quiz
              </button>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              {passed ? (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Congratulations! 🎉</h2>
                  <p className="text-xl mb-4">You scored {score}/{quizQuestions.length}</p>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-8">
                    <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Your Certificate is Ready!</h3>
                    <button onClick={() => router.push(`/courses/${courseId}/certificate`)}
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-xl">
                      View Certificate
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-3">Keep Practicing!</h2>
                  <p className="text-xl mb-4">You scored {score}/{quizQuestions.length}</p>
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setSubmitted(false); setAnswers({}); setTimeLeft(600) }}
                            className="bg-sky-500 text-white font-bold px-6 py-3 rounded-xl">Retake Quiz</button>
                    <button onClick={() => router.push(`/courses/${courseId}`)}
                            className="border font-bold px-6 py-3 rounded-xl">Back to Course</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
