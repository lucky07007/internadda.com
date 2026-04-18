// app/courses/full-stack-web-development/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseHeader } from '../components/CourseHeader'
import { CourseCurriculum } from '../components/CourseCurriculum'
import { CourseSidebar } from '../components/CourseSidebar'
import { CourseInstructor } from '../components/CourseInstructor'
import { Star, Users, Award, Clock, CheckCircle, Briefcase, Target, Shield, Globe, Code, Terminal, Database, Layout, Sparkles, ChevronRight, FileText, FileCode, Download, Share2, Bookmark, ExternalLink, BookOpen, Play, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import type { CourseData } from '../course-data'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

const courseData: CourseData = {
  id: 'full-stack-web-development',
  title: 'Full Stack Web Development',
  tagline: 'Master MERN Stack from Scratch - Build 5 Real Projects',
  category: 'Development',
  level: 'Beginner to Advanced',
  duration: '24 Weeks',
  totalHours: '180+ hours',
  students: 15420,
  rating: 4.8,
  reviews: 2340,
  image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  instructor: {
    name: 'Rajesh Kumar',
    role: 'Senior Developer at Microsoft',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    experience: '12+ years',
    students: '50K+',
    rating: 4.9,
    courses: 8,
    bio: 'Ex-Microsoft engineer with 12+ years of experience in full-stack development. Helped 50,000+ students launch their tech careers. Specialized in MERN stack and cloud architecture.'
  },
  skills: ['React 18', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'Redux', 'REST APIs', 'GraphQL', 'AWS', 'Docker', 'Git'],
  price: 'Free',
  originalPrice: '₹19,999',
  badge: 'Bestseller',
  lastUpdated: 'January 2024',
  enrolled: 12450,
  language: 'English & Hindi',
  certificate: true,
  features: ['Lifetime Access', 'Downloadable Resources', 'Mobile & TV Access', 'Certificate', '30-Day Guarantee'],
  videoTrailer: 'dQw4w9WgXcQ',
  whatYouWillLearn: [
    'Build full-stack web applications using MERN stack',
    'Create RESTful APIs with Node.js and Express',
    'Design responsive UIs with React 18 and Tailwind CSS',
    'Implement secure authentication using JWT',
    'Deploy applications to AWS and Vercel',
    'Master MongoDB for database management',
    'Use Git for version control',
    'Build 5 real-world portfolio projects'
  ],
  requirements: [
    'Basic computer skills',
    'No prior programming experience needed',
    'A computer with internet connection',
    'Willingness to learn and practice'
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Build a full-featured online store with product listings, cart, checkout, payment integration (Stripe), user profiles, and admin dashboard.',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      duration: '4 weeks',
      videoId: 'ECOMMERCE_VIDEO_ID'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Create a real-time analytics dashboard with data visualization and real-time updates.',
      skills: ['React', 'Socket.io', 'Chart.js', 'Express'],
      duration: '3 weeks',
      videoId: 'DASHBOARD_VIDEO_ID'
    },
    {
      title: 'Task Management App',
      description: 'Develop a Trello-like project management tool with drag-drop interface.',
      skills: ['React', 'Redux', 'Node.js', 'PostgreSQL'],
      duration: '3 weeks',
      videoId: 'TASK_APP_VIDEO_ID'
    },
    {
      title: 'Blog Platform with CMS',
      description: 'Build a content management system with markdown support.',
      skills: ['Next.js', 'MongoDB', 'AWS S3', 'Tailwind'],
      duration: '3 weeks',
      videoId: 'BLOG_CMS_VIDEO_ID'
    },
    {
      title: 'Real-time Chat Application',
      description: 'Create a WhatsApp-like chat app with WebSockets.',
      skills: ['React Native', 'Socket.io', 'Node.js', 'Redis'],
      duration: '4 weeks',
      videoId: 'CHAT_APP_VIDEO_ID'
    }
  ],
  curriculum: [
    {
      week: 1,
      title: 'Web Development Fundamentals',
      description: 'Master HTML5, CSS3, and responsive design.',
      topics: [
        'Introduction to Web Development',
        'HTML5 Semantic Elements',
        'CSS3 Flexbox and Grid',
        'Responsive Design Principles',
        'JavaScript Basics'
      ],
      readingContent: `
        <h3>📚 Week 1: Web Development Fundamentals - Complete Reading Material</h3>
        
        <h4>Introduction to Web Development</h4>
        <p>Web development is the process of building and maintaining websites. It involves two main parts:</p>
        <ul>
          <li><strong>Frontend Development:</strong> What users see and interact with (HTML, CSS, JavaScript)</li>
          <li><strong>Backend Development:</strong> Server-side logic, databases, and APIs (Node.js, Python, Java)</li>
        </ul>
        
        <h4>How the Internet Works</h4>
        <p>When you type a URL in your browser:</p>
        <ol>
          <li>Browser sends a request to DNS server to find IP address</li>
          <li>Request goes to the web server hosting the website</li>
          <li>Server processes request and sends back HTML, CSS, JavaScript files</li>
          <li>Browser renders these files into the webpage you see</li>
        </ol>
        
        <h4>HTML5 Fundamentals</h4>
        <p>HTML (HyperText Markup Language) is the backbone of every webpage. Key concepts:</p>
        <ul>
          <li><strong>Elements:</strong> Building blocks like &lt;div&gt;, &lt;p&gt;, &lt;h1&gt;</li>
          <li><strong>Attributes:</strong> Provide additional info like class, id, src</li>
          <li><strong>Semantic HTML:</strong> &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;footer&gt;</li>
        </ul>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;My First Page&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;header&gt;Welcome to my website&lt;/header&gt;
  &lt;main&gt;This is the main content&lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        
        <h4>CSS3 Mastery</h4>
        <p>CSS (Cascading Style Sheets) controls the visual presentation. Modern CSS features:</p>
        <ul>
          <li><strong>Flexbox:</strong> One-dimensional layout for rows or columns</li>
          <li><strong>Grid:</strong> Two-dimensional layout system</li>
          <li><strong>Media Queries:</strong> Responsive design for different screen sizes</li>
        </ul>
        <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}</code></pre>
        
        <h4>Practice Exercise</h4>
        <p>Create a responsive navigation bar with logo on left and menu items on right. Use flexbox.</p>
      `,
      projects: ['Personal Portfolio Website'],
      duration: '5 lessons',
      videoHours: '8 hours',
      videoId: 'dQw4w9WgXcQ',
      isPreview: true
    },
    {
      week: 2,
      title: 'JavaScript Deep Dive',
      description: 'Master JavaScript from basics to advanced.',
      topics: [
        'Advanced JavaScript Concepts',
        'Asynchronous Programming',
        'ES6+ Features',
        'Error Handling',
        'Working with APIs'
      ],
      readingContent: `
        <h3>📚 Week 2: JavaScript Deep Dive</h3>
        
        <h4>JavaScript Fundamentals</h4>
        <p>JavaScript is a programming language that adds interactivity to websites.</p>
        
        <h4>Variables and Data Types</h4>
        <pre><code>// Modern JavaScript uses let and const
let name = "John";        // Can be reassigned
const age = 25;           // Cannot be reassigned

// Data types
let string = "Hello";      // String
let number = 42;           // Number
let boolean = true;        // Boolean
let array = [1, 2, 3];     // Array
let object = {name: "John", age: 25}; // Object</code></pre>
        
        <h4>Functions</h4>
        <pre><code>// Traditional function
function greet(name) {
  return "Hello " + name;
}

// Arrow function (ES6)
const greet = (name) => "Hello " + name;

// Higher-order function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]</code></pre>
        
        <h4>Asynchronous JavaScript</h4>
        <pre><code>// Promises
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await (modern approach)
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}</code></pre>
        
        <h4>Practice: Build a Weather App</h4>
        <p>Use the OpenWeatherMap API to fetch and display weather data for a city.</p>
      `,
      projects: ['Interactive Quiz Application'],
      duration: '6 lessons',
      videoHours: '10 hours',
      videoId: 'dQw4w9WgXcQ'
    }
  ],
  resources: [
    { name: 'Complete Course Slides', type: 'PDF', size: '45 MB', icon: 'FileText', url: '#' },
    { name: 'All Source Code', type: 'ZIP', size: '120 MB', icon: 'FileCode', url: '#' },
    { name: 'Project Assets & Designs', type: 'ZIP', size: '250 MB', icon: 'FileCode', url: '#' }
  ],
  faqs: [
    { q: 'Is this course really free?', a: 'Yes! 100% free as part of our mission.' },
    { q: 'Do I get a certificate?', a: 'Yes, after completing the course and passing the quiz.' }
  ]
}

export default function FullStackWebDevelopmentCourse() {
  const router = useRouter()
  const { user } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('curriculum')
  const [selectedWeek, setSelectedWeek] = useState<number | null>(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const enrolled = localStorage.getItem(`enrolled_${courseData.id}`)
    if (enrolled === 'true') setIsEnrolled(true)
  }, [])

  const handleEnroll = () => {
    if (!user) {
      router.push('/auth/signin?callbackUrl=/courses/full-stack-web-development')
      return
    }
    localStorage.setItem(`enrolled_${courseData.id}`, 'true')
    setIsEnrolled(true)
  }

  const handleContinueLearning = () => {
    router.push(`/courses/${courseData.id}/learn`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: courseData.title,
          text: courseData.tagline,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard?.writeText(window.location.href)
      alert('Course link copied!')
    }
  }

  const handleSave = () => {
    const saved = localStorage.getItem('saved_courses')
    const savedCourses = saved ? JSON.parse(saved) : []
    if (!savedCourses.includes(courseData.id)) {
      savedCourses.push(courseData.id)
      localStorage.setItem('saved_courses', JSON.stringify(savedCourses))
      alert('Course saved!')
    }
  }

  const handleTakeQuiz = () => {
    router.push(`/courses/${courseData.id}/quiz`)
  }

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <CourseHeader course={courseData} />
        
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* Main Content - Left Side */}
            <div className="flex-1">
              {/* What You'll Learn */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {courseData.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Content Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-6 px-6 pt-4 overflow-x-auto">
                    {['curriculum', 'reading', 'projects', 'resources', 'quiz'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-semibold capitalize transition-colors whitespace-nowrap ${
                          activeTab === tab
                            ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab === 'reading' ? '📖 Reading' : tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'curriculum' && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Click on any week to view detailed curriculum and reading materials
                      </p>
                      <div className="space-y-2">
                        {courseData.curriculum.map((week) => (
                          <div key={week.week} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <button
                              onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-1 rounded">
                                  Week {week.week}
                                </span>
                                <span className="font-semibold text-gray-900 dark:text-white">{week.title}</span>
                              </div>
                              <ChevronRight className={`w-4 h-4 transition-transform ${selectedWeek === week.week ? 'rotate-90' : ''}`} />
                            </button>
                            
                            {selectedWeek === week.week && (
                              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{week.description}</p>
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Topics Covered:</h5>
                                    <ul className="space-y-1">
                                      {week.topics.map((topic, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                          <span className="w-1 h-1 bg-sky-500 rounded-full mt-2 flex-shrink-0" />
                                          {topic}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Details:</h5>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">📹 {week.duration} • {week.videoHours}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">📝 Project: {week.projects?.[0]}</p>
                                    {isEnrolled && (
                                      <button className="mt-3 text-sky-600 dark:text-sky-400 text-sm font-medium flex items-center gap-1">
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
                    </div>
                  )}
                  
                  {activeTab === 'reading' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {courseData.curriculum.map((week) => (
                          <button
                            key={week.week}
                            onClick={() => setSelectedWeek(week.week)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              selectedWeek === week.week
                                ? 'bg-sky-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            Week {week.week}
                          </button>
                        ))}
                      </div>
                      
                      {selectedWeek && (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: courseData.curriculum.find(w => w.week === selectedWeek)?.readingContent || '<p>Reading content for this week is being prepared. Check back soon!</p>'
                            }} 
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      {courseData.projects.map((project, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                            {idx + 1}. {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.skills.map((skill, i) => (
                              <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div className="space-y-3">
                      {courseData.resources.map((resource, idx) => {
                        const IconComponent = resource.icon === 'FileText' ? FileText : FileCode
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent size={20} className={resource.icon === 'FileText' ? 'text-blue-500' : 'text-green-500'} />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{resource.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type} • {resource.size}</p>
                              </div>
                            </div>
                            <button className="text-sky-600 dark:text-sky-400 text-sm font-medium">
                              <Download size={14} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                  
                  {activeTab === 'quiz' && (
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Ready to Test Your Knowledge?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Complete the quiz with 6+ correct answers to earn your certificate!
                      </p>
                      <button
                        onClick={handleTakeQuiz}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 transition-all"
                      >
                        Take Quiz (10 Questions)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <CourseInstructor instructor={courseData.instructor} />
            </div>

            {/* Sidebar - Right Side */}
            <CourseSidebar 
              course={courseData} 
              isEnrolled={isEnrolled} 
              setIsEnrolled={setIsEnrolled}
              onEnroll={handleEnroll}
              onContinue={handleContinueLearning}
              onShare={handleShare}
              onSave={handleSave}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
