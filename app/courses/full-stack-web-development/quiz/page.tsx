// app/courses/full-stack-web-development/quiz/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, CheckCircle, XCircle, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'

const CONTAINER = "max-w-[900px] mx-auto px-3 sm:px-4 lg:px-6"

const quizQuestions = [
  {
    id: 1,
    question: 'What does MERN stand for?',
    options: [
      'MySQL, Express, React, Node',
      'MongoDB, Express, React, Node.js',
      'MongoDB, Ember, Ruby, Node',
      'MySQL, Electron, React, Nest'
    ],
    correct: 1
  },
  {
    id: 2,
    question: 'Which component of MERN is used for the frontend?',
    options: ['MongoDB', 'Express', 'React', 'Node.js'],
    correct: 2
  },
  {
    id: 3,
    question: 'What is the purpose of Mongoose in MERN stack?',
    options: [
      'To create React components',
      'To handle HTTP requests',
      'Object Data Modeling for MongoDB',
      'To manage state in React'
    ],
    correct: 2
  },
  {
    id: 4,
    question: 'Which command initializes a new Node.js project?',
    options: ['node start', 'npm init -y', 'node create', 'npm start'],
    correct: 1
  },
  {
    id: 5,
    question: 'What is the purpose of CORS in Express?',
    options: [
      'To compress files',
      'To allow cross-origin requests',
      'To create routes',
      'To connect to MongoDB'
    ],
    correct: 1
  },
  {
    id: 6,
    question: 'Which hook is used to manage state in React functional components?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1
  },
  {
    id: 7,
    question: 'What is the correct way to connect to MongoDB using Mongoose?',
    options: [
      'mongoose.start()',
      'mongoose.connect(URI)',
      'mongoose.open(URI)',
      'mongoose.run()'
    ],
    correct: 1
  },
  {
    id: 8,
    question: 'Which HTTP method is used to create new data in REST APIs?',
    options: ['GET', 'PUT', 'POST', 'DELETE'],
    correct: 2
  },
  {
    id: 9,
    question: 'What is the purpose of dotenv in Node.js?',
    options: [
      'To create environment variables',
      'To load environment variables from .env file',
      'To deploy applications',
      'To test APIs'
    ],
    correct: 1
  },
  {
    id: 10,
    question: 'Which of these is a real-world application of MERN stack?',
    options: [
      'Microsoft Word',
      'Adobe Photoshop',
      'Netflix Clone',
      'Windows OS'
    ],
    correct: 2
  }
]

export default function MERNQuizPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!user) {
      router.push('/auth/signin?callbackUrl=/courses/full-stack-web-development/quiz')
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
    
    const passed = correct >= 6
    localStorage.setItem('quiz_fs_score', correct.toString())
    localStorage.setItem('quiz_fs_passed', passed.toString())
    
    if (passed) {
      localStorage.setItem('progress_full-stack-web-development', '100')
    }
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const answeredCount = Object.keys(answers).length
  const passed = score >= 6

  if (!mounted) return null

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
                    <h1 className="text-2xl font-bold mb-2">MERN Stack Assessment</h1>
                    <p className="text-gray-600">Answer 6+ correctly to earn your certificate</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock size={20} />
                      <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                    </div>
                    <p className="text-sm text-gray-500">{answeredCount}/10 answered</p>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-4">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full transition-all" 
                       style={{ width: `${(answeredCount/10)*100}%` }} />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {quizQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white dark:bg-gray-800 rounded-xl p-5">
                    <p className="font-semibold mb-3">{idx+1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-lg border ${
                            answers[q.id] === optIdx
                              ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-500 text-sky-700'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span className="font-medium">{String.fromCharCode(65+optIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={answeredCount < 10}
                className={`w-full py-3 rounded-xl font-bold ${
                  answeredCount === 10
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
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
                  <p className="text-xl mb-4">You scored {score}/10</p>
                  <p className="text-gray-600 mb-8">You've passed and earned your certificate!</p>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl mb-8">
                    <Award className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Your Certificate is Ready!</h3>
                    <button
                      onClick={() => router.push('/courses/full-stack-web-development/certificate')}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-6 py-3 rounded-xl"
                    >
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
                  <p className="text-xl mb-4">You scored {score}/10</p>
                  <p className="text-gray-600 mb-8">You need 6+ correct answers. Review and try again!</p>
                  
                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setSubmitted(false); setAnswers({}); setTimeLeft(600) }}
                            className="bg-sky-500 text-white font-bold px-6 py-3 rounded-xl">
                      Retake Quiz
                    </button>
                    <button onClick={() => router.push('/courses/full-stack-web-development')}
                            className="border border-gray-300 font-bold px-6 py-3 rounded-xl">
                      Back to Course
                    </button>
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
