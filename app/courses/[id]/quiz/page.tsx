// app/courses/[id]/quiz/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, CheckCircle, XCircle, ArrowRight, Clock, Sparkles } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

const CONTAINER = "max-w-[900px] mx-auto px-3 sm:px-4 lg:px-6"

const quizQuestions = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Home Tool Markup Language'
    ],
    correct: 0
  },
  {
    id: 2,
    question: 'Which of the following is a JavaScript framework?',
    options: ['Django', 'Laravel', 'React', 'Flask'],
    correct: 2
  },
  {
    id: 3,
    question: 'What is the purpose of CSS?',
    options: [
      'To add interactivity',
      'To style web pages',
      'To handle database operations',
      'To manage server logic'
    ],
    correct: 1
  },
  {
    id: 4,
    question: 'Which command initializes a new Node.js project?',
    options: [
      'node start',
      'npm init',
      'node create',
      'npm start'
    ],
    correct: 1
  },
  {
    id: 5,
    question: 'What does API stand for?',
    options: [
      'Application Programming Interface',
      'Advanced Program Integration',
      'Automated Protocol Interface',
      'Application Process Integration'
    ],
    correct: 0
  },
  {
    id: 6,
    question: 'Which database is commonly used with MERN stack?',
    options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    correct: 2
  },
  {
    id: 7,
    question: 'What is the purpose of Git?',
    options: [
      'Version control',
      'Database management',
      'Server deployment',
      'UI design'
    ],
    correct: 0
  },
  {
    id: 8,
    question: 'Which hook is used for state management in React?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1
  },
  {
    id: 9,
    question: 'What does JWT stand for?',
    options: [
      'Java Web Token',
      'JSON Web Token',
      'JavaScript Window Tool',
      'JSON Window Transfer'
    ],
    correct: 1
  },
  {
    id: 10,
    question: 'Which platform is used for deploying web applications?',
    options: ['Photoshop', 'Vercel', 'Excel', 'WordPress'],
    correct: 1
  }
]

export default function CourseQuizPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const courseId = params?.id as string
  
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push(`/auth/signin?callbackUrl=/courses/${courseId}/quiz`)
      return
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit()
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [user, courseId, router])

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    quizQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++
    })
    setScore(correctCount)
    setSubmitted(true)
    
    const passed = correctCount >= 6
    localStorage.setItem(`quiz_${courseId}_score`, correctCount.toString())
    localStorage.setItem(`quiz_${courseId}_passed`, passed.toString())
    
    if (passed) {
      localStorage.setItem(`progress_${courseId}`, '100')
      localStorage.setItem(`completed_${courseId}`, quizQuestions.length.toString())
    }
  }

  const handleClaimCertificate = () => {
    router.push(`/courses/${courseId}/certificate`)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const answeredCount = Object.keys(answers).length
  const passed = score >= 6

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans py-8">
        <div className={CONTAINER}>
          {!submitted ? (
            <>
              {/* Quiz Header */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Final Assessment: Full Stack Web Development
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Answer 6+ questions correctly to earn your certificate
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Clock size={20} />
                      <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {answeredCount}/{quizQuestions.length} answered
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-blue-500 transition-all"
                    style={{ width: `${(answeredCount / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4 mb-6">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white mb-3">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border transition-all ${
                            answers[q.id] === optIdx
                              ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-500 text-sky-700 dark:text-sky-300'
                              : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={answeredCount < quizQuestions.length}
                  className={`px-8 py-3 rounded-xl font-bold transition-all ${
                    answeredCount === quizQuestions.length
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:from-sky-600 hover:to-blue-700'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Quiz
                </button>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center max-w-2xl mx-auto">
              {passed ? (
                <>
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Congratulations! 🎉
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    You scored {score}/10
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    You've successfully passed the assessment and earned your certificate!
                  </p>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8">
                    <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      Your Certificate is Ready!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Click below to view and download your verified certificate
                    </p>
                    <button
                      onClick={handleClaimCertificate}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 transition-all inline-flex items-center gap-2"
                    >
                      <Award size={18} />
                      View Certificate
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Keep Practicing!
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    You scored {score}/10
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    You need 6+ correct answers to earn the certificate. Review the material and try again!
                  </p>
                  
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setAnswers({})
                        setTimeLeft(600)
                      }}
                      className="bg-sky-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-sky-600 transition-all"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={() => router.push(`/courses/${courseId}`)}
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                      Back to Course
                    </button>
                  </div>
                </>
              )}
              
              {/* Review Answers */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Review Answers</h3>
                <div className="space-y-3 text-left">
                  {quizQuestions.map((q, idx) => (
                    <div key={q.id} className="flex items-start gap-3">
                      {answers[q.id] === q.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Your answer: {q.options[answers[q.id]] || 'Not answered'}
                        </p>
                        {answers[q.id] !== q.correct && (
                          <p className="text-xs text-green-600 dark:text-green-400">
                            Correct: {q.options[q.correct]}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
