// app/courses/full-stack-web-development/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseHeader } from '../components/CourseHeader'
import { CourseCurriculum } from '../components/CourseCurriculum'
import { CourseSidebar } from '../components/CourseSidebar'
import { CourseInstructor } from '../components/CourseInstructor'
import { CheckCircle, Play, FileText, FileCode, Download, Award, ChevronRight, Clock, Users, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

const courseData = {
  id: 'full-stack-web-development',
  title: 'Full Stack Web Development',
  tagline: 'Master MERN Stack from Scratch - Build Real Projects',
  category: 'Development',
  level: 'Beginner to Advanced',
  duration: '12 Weeks',
  totalHours: '120+ hours',
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
    bio: 'Ex-Microsoft engineer with 12+ years of experience in full-stack development. Helped 50,000+ students launch their tech careers.'
  },
  skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'Redux', 'REST APIs'],
  price: 'Free',
  originalPrice: '₹19,999',
  badge: 'Bestseller',
  lastUpdated: 'January 2024',
  enrolled: 12450,
  language: 'English & Hindi',
  certificate: true,
  features: ['Lifetime Access', 'Downloadable Resources', 'Certificate', 'Projects', '30-Day Guarantee'],
  whatYouWillLearn: [
    'Build full-stack web applications using MERN stack',
    'Create RESTful APIs with Node.js and Express',
    'Design responsive UIs with React 18 and Tailwind',
    'Implement secure authentication using JWT',
    'Master MongoDB for database management',
    'Deploy applications to AWS and Vercel'
  ],
  requirements: [
    'Basic computer skills',
    'No prior programming experience needed',
    'Computer with internet connection'
  ],
  curriculum: [
    {
      week: 1,
      title: 'Introduction to MERN Stack & Environment Setup',
      description: 'Master the fundamentals and set up your development environment.',
      topics: [
        'What is MERN Stack? MongoDB, Express, React, Node.js',
        'Single Language Mastery: JavaScript everywhere',
        'Installing Node.js and npm',
        'Setting up MongoDB Atlas (Cloud Database)',
        'Creating folder structure for MERN projects',
        'Understanding package.json and dependencies'
      ],
      readingContent: `
        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-bold mb-4">📚 Week 1: Introduction to MERN Stack & Environment Setup</h3>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
              <p class="font-semibold text-blue-800 dark:text-blue-300">Why MERN Stack?</p>
              <p class="text-gray-700 dark:text-gray-300 mt-2">Confused by the "alphabet soup" of modern web development? You're not alone. The MERN Stack uses JavaScript from start to finish, eliminating the need to learn separate languages for frontend and backend.</p>
            </div>

            <h4 class="font-bold mt-6 mb-3">Why Students Learn MERN Stack?</h4>
            <ul class="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Single Language Mastery:</strong> Only JavaScript needed for frontend (React), backend (Node/Express), and database queries (MongoDB)</li>
              <li><strong>High Market Demand:</strong> Used by Netflix, Airbnb, Uber for building fast SPAs</li>
              <li><strong>Faster Development:</strong> React components and NPM ecosystem speed up development</li>
              <li><strong>Lucrative Salary:</strong> Freshers earn ₹4-7 LPA with rapid growth</li>
              <li><strong>Huge Community:</strong> Millions of developers worldwide for support</li>
            </ul>

            <h4 class="font-bold mt-6 mb-3">Step 1: Installing Node.js</h4>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code># Download LTS version from nodejs.org
# Verify installation:
node -v
npm -v</code></pre>

            <h4 class="font-bold mt-6 mb-3">Step 2: Database Setup (MongoDB Atlas)</h4>
            <ol class="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Sign up at mongodb.com</li>
              <li>Create a 'Shared Cluster' (Free tier)</li>
              <li>Add your IP address in Network Access</li>
              <li>Create database user with password</li>
              <li>Click "Connect → Drivers" to get connection string</li>
            </ol>

            <h4 class="font-bold mt-6 mb-3">Step 3: Folder Structure</h4>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>mkdir mern-tutorial && cd mern-tutorial
mkdir server client</code></pre>

            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
              <p class="font-semibold text-green-800 dark:text-green-300">✅ Practice Exercise:</p>
              <p class="text-gray-700 dark:text-gray-300">Set up your development environment and create the folder structure. Verify Node.js and MongoDB Atlas are working correctly.</p>
            </div>
          </div>
        </div>
      `,
      projects: ['Environment Setup Verification'],
      duration: '5 lessons',
      videoHours: '8 hours',
      videoId: '7CqJlxBYj-M',
      isPreview: true
    },
    {
      week: 2,
      title: 'Backend Development with Node.js & Express',
      description: 'Build robust APIs with Node.js and Express framework.',
      topics: [
        'Initialize Node.js server with npm init',
        'Express framework setup and routing',
        'Mongoose ODM for MongoDB connection',
        'Environment variables with dotenv',
        'CORS and middleware configuration',
        'Creating RESTful API endpoints'
      ],
      readingContent: `
        <div class="space-y-6">
          <h3 class="text-xl font-bold mb-4">📚 Week 2: Backend Development with Node.js & Express</h3>
          
          <h4 class="font-bold mt-4 mb-3">Initialize Server</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>cd server
npm init -y
npm install express mongoose cors dotenv
npm install --save-dev nodemon</code></pre>

          <h4 class="font-bold mt-6 mb-3">Create Entry Point (server.js)</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;

mongoose.connect(URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(\`Server running on port: \${PORT}\`);
});</code></pre>

          <h4 class="font-bold mt-6 mb-3">Define Data Model (models/Task.js)</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);</code></pre>

          <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6">
            <p class="font-semibold text-amber-800 dark:text-amber-300">💡 Key Concepts:</p>
            <ul class="list-disc pl-5 text-gray-700 dark:text-gray-300">
              <li>Express: Web framework for API development</li>
              <li>Mongoose: MongoDB object modeling</li>
              <li>Dotenv: Stores sensitive configuration</li>
              <li>Nodemon: Auto-restarts server on changes</li>
            </ul>
          </div>
        </div>
      `,
      projects: ['Task API with CRUD Operations'],
      duration: '6 lessons',
      videoHours: '10 hours',
      videoId: 'Oe421EPjeBE'
    },
    {
      week: 3,
      title: 'React Frontend Fundamentals',
      description: 'Build dynamic user interfaces with React.',
      topics: [
        'Creating React app with Vite',
        'Components, Props, and JSX',
        'State management with useState',
        'Side effects with useEffect',
        'Axios for API integration',
        'Displaying data from backend'
      ],
      readingContent: `
        <div class="space-y-6">
          <h3 class="text-xl font-bold mb-4">📚 Week 3: React Frontend Fundamentals</h3>
          
          <h4 class="font-bold mt-4 mb-3">Bootstrap React with Vite</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>cd client
npm create vite@latest . -- --template react
npm install axios
npm run dev</code></pre>

          <h4 class="font-bold mt-6 mb-3">Fetch Data in React (App.jsx)</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div className="App">
      <h1>My MERN Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;</code></pre>

          <h4 class="font-bold mt-6 mb-3">Real-World MERN Applications</h4>
          <div class="grid md:grid-cols-3 gap-4 mt-4">
            <div class="border p-4 rounded-lg">
              <p class="font-semibold">📋 Trello Clone</p>
              <p class="text-sm text-gray-600">React drag-drop + Node.js WebSockets</p>
            </div>
            <div class="border p-4 rounded-lg">
              <p class="font-semibold">🛒 E-Commerce</p>
              <p class="text-sm text-gray-600">React cart + Stripe payments</p>
            </div>
            <div class="border p-4 rounded-lg">
              <p class="font-semibold">🎬 Netflix Clone</p>
              <p class="text-sm text-gray-600">React streaming + Node.js async</p>
            </div>
          </div>
        </div>
      `,
      projects: ['Task Management Frontend'],
      duration: '6 lessons',
      videoHours: '10 hours',
      videoId: 'w7ejDZ8SWv8'
    },
    {
      week: 4,
      title: 'Full Stack Integration & CRUD Operations',
      description: 'Connect frontend and backend for complete functionality.',
      topics: [
        'Creating POST requests from React',
        'Handling form submissions',
        'Update and Delete operations',
        'State management across components',
        'Error handling best practices',
        'Loading states and UX improvements'
      ],
      readingContent: `
        <div class="space-y-6">
          <h3 class="text-xl font-bold mb-4">📚 Week 4: Full Stack Integration & CRUD</h3>
          
          <h4 class="font-bold mt-4 mb-3">Complete CRUD Operations</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>// Backend Routes (server.js)
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});</code></pre>

          <h4 class="font-bold mt-6 mb-3">Frontend CRUD Implementation</h4>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code>const addTask = async (newTask) => {
  const res = await axios.post('http://localhost:5000/tasks', newTask);
  setTasks([...tasks, res.data]);
};

const deleteTask = async (id) => {
  await axios.delete(\`http://localhost:5000/tasks/\${id}\`);
  setTasks(tasks.filter(task => task._id !== id));
};</code></pre>

          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-6">
            <p class="font-semibold text-purple-800 dark:text-purple-300">🚀 Pro Tip:</p>
            <p class="text-gray-700 dark:text-gray-300">Add a "Dark Mode" toggle using React context as an extra challenge!</p>
          </div>
        </div>
      `,
      projects: ['Complete Task Manager App'],
      duration: '5 lessons',
      videoHours: '9 hours',
      videoId: 'jS4aFq5-91M'
    }
  ],
  resources: [
    { name: 'MERN Stack Cheat Sheet', type: 'PDF', size: '2 MB', icon: 'FileText' },
    { name: 'Complete Source Code', type: 'ZIP', size: '15 MB', icon: 'FileCode' },
    { name: 'Postman Collection', type: 'JSON', size: '500 KB', icon: 'FileCode' }
  ],
  faqs: [
    { q: 'Is MERN backend or frontend?', a: 'MERN is full-stack. React handles frontend, Node.js/Express handle backend, MongoDB stores data.' },
    { q: 'Can I learn MERN in 1 month?', a: 'With JavaScript knowledge, basics take 30 days. Mastery requires 3-6 months of practice.' },
    { q: 'Which is better, Node.js or React?', a: 'Neither is "better" - they serve different purposes. React for UI, Node.js for server logic.' },
    { q: 'Is MERN Stack dead in 2026?', a: 'No! MERN remains #1 choice for startups due to rapid development and JavaScript ecosystem.' },
    { q: 'Can I learn React without HTML and CSS?', a: 'No. HTML and CSS fundamentals are essential before learning React.' }
  ]
}

export default function FullStackCourse() {
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

  const handleTakeQuiz = () => {
    router.push(`/courses/${courseData.id}/quiz`)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: courseData.title, text: courseData.tagline, url: window.location.href })
      } catch (err) {}
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

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 pt-4 overflow-x-auto">
                    {['curriculum', 'reading', 'resources', 'faq', 'quiz'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-semibold capitalize whitespace-nowrap ${
                          activeTab === tab
                            ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {tab === 'reading' ? '📖 Reading' : tab === 'quiz' ? '📝 Quiz' : tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  {activeTab === 'curriculum' && (
                    <div className="space-y-2">
                      {courseData.curriculum.map((week) => (
                        <div key={week.week} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/30 px-2 py-1 rounded">
                                Week {week.week}
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white text-left">{week.title}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${selectedWeek === week.week ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {selectedWeek === week.week && (
                            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{week.description}</p>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Topics:</h5>
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
                                  <p className="text-sm text-gray-700 dark:text-gray-300">📝 {week.projects?.[0]}</p>
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
                  )}
                  
                  {activeTab === 'reading' && (
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {courseData.curriculum.map((week) => (
                          <button
                            key={week.week}
                            onClick={() => setSelectedWeek(week.week)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              selectedWeek === week.week
                                ? 'bg-sky-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            Week {week.week}
                          </button>
                        ))}
                      </div>
                      
                      {selectedWeek && (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ 
                            __html: courseData.curriculum.find(w => w.week === selectedWeek)?.readingContent || '<p>Loading...</p>'
                          }} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div className="space-y-3">
                      {courseData.resources.map((resource, idx) => {
                        const IconComponent = resource.icon === 'FileText' ? FileText : FileCode
                        return (
                          <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                              <IconComponent size={20} className="text-blue-500" />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{resource.name}</p>
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
                        <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.q}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'quiz' && (
                    <div className="text-center py-8">
                      <Award className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Test Your Knowledge?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">Complete the quiz with 6+ correct answers to earn your certificate!</p>
                      <button onClick={handleTakeQuiz} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-xl">
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
