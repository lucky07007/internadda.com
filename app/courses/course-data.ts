// app/data/courses.ts

export interface CourseWeek {
  week: number
  title: string
  description: string
  videoId: string
  duration: string
  topics: string[]
  readingContent: string
  resources: { name: string; type: string; size: string }[]
  isPreview?: boolean
}

export interface CourseData {
  id: string
  title: string
  tagline: string
  category: string
  level: string
  duration: string
  totalHours: string
  students: number
  rating: number
  reviews: number
  image: string
  instructor: {
    name: string
    role: string
    avatar: string
    experience: string
    students: string
    rating: number
    courses: number
    bio: string
  }
  skills: string[]
  price: string
  originalPrice: string
  badge?: string
  lastUpdated: string
  enrolled: number
  language: string
  certificate: boolean
  features: string[]
  whatYouWillLearn: string[]
  requirements: string[]
  weeks: CourseWeek[]
  resources: { name: string; type: string; size: string; icon: string }[]
  faqs: { q: string; a: string }[]
  quizQuestions?: { id: number; question: string; options: string[]; correct: number }[]
}

// ============================================
// ALL COURSES DATA - ADD NEW COURSES HERE
// ============================================

export const coursesData: Record<string, CourseData> = {
  
  // Full Stack Web Development
  'full-stack-web-development': {
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
      bio: 'Ex-Microsoft engineer with 12+ years of experience in full-stack development.'
    },
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 'Redux', 'REST APIs'],
    price: 'Free',
    originalPrice: '₹19,999',
    badge: 'Bestseller',
    lastUpdated: 'January 2024',
    enrolled: 12450,
    language: 'English & Hindi',
    certificate: true,
    features: ['Lifetime Access', 'Downloadable Resources', 'Certificate', 'Projects'],
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
    weeks: [
      {
        week: 1,
        title: 'Introduction to MERN Stack & Setup',
        description: 'Master the fundamentals and set up your development environment.',
        videoId: '7CqJlxBYj-M',
        duration: '45:20',
        topics: ['What is MERN Stack?', 'Single Language Mastery', 'Installing Node.js', 'Setting up MongoDB Atlas', 'Folder structure'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📚 Week 1: MERN Stack Introduction</h3><p class="text-gray-700 dark:text-gray-300">Confused by the "alphabet soup" of modern web development? You're not alone. The MERN Stack uses JavaScript from start to finish...</p><h4 class="font-bold mt-6 mb-3">Why Students Learn MERN Stack?</h4><ul class="list-disc pl-5 space-y-2"><li><strong>Single Language Mastery:</strong> Only JavaScript needed</li><li><strong>High Market Demand:</strong> Used by Netflix, Airbnb, Uber</li><li><strong>Lucrative Salary:</strong> Freshers earn ₹4-7 LPA</li></ul><h4 class="font-bold mt-6 mb-3">Step 1: Installing Node.js</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>node -v\nnpm -v</code></pre><h4 class="font-bold mt-6 mb-3">Step 2: MongoDB Atlas Setup</h4><ol class="list-decimal pl-5"><li>Sign up at mongodb.com</li><li>Create Shared Cluster (Free)</li><li>Add IP address</li><li>Create database user</li><li>Get connection string</li></ol><div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6"><p class="font-semibold">✅ Practice: Set up your environment</p></div></div>`,
        resources: [{ name: 'Setup Guide PDF', type: 'PDF', size: '1.2 MB' }],
        isPreview: true
      },
      {
        week: 2,
        title: 'Backend Development with Node.js & Express',
        description: 'Build robust APIs with Node.js and Express framework.',
        videoId: 'Oe421EPjeBE',
        duration: '52:15',
        topics: ['Initialize Node.js server', 'Express framework', 'Mongoose ODM', 'Environment variables', 'CORS and middleware'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📚 Week 2: Backend Development</h3><h4 class="font-bold mb-3">Initialize Server</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>cd server\nnpm init -y\nnpm install express mongoose cors dotenv</code></pre><h4 class="font-bold mt-6 mb-3">Create server.js</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm"><code>const express = require('express');\nconst mongoose = require('mongoose');\nconst cors = require('cors');\nrequire('dotenv').config();\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\nmongoose.connect(process.env.MONGO_URI)\n  .then(() => console.log("MongoDB Connected"));\n\napp.listen(5000, () => console.log("Server running"));</code></pre><div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-6"><p class="font-semibold">💡 Key Concepts: Express, Mongoose, Dotenv, Nodemon</p></div></div>`,
        resources: [{ name: 'Server Code', type: 'ZIP', size: '2.5 MB' }]
      },
      {
        week: 3,
        title: 'React Frontend Fundamentals',
        description: 'Build dynamic user interfaces with React.',
        videoId: 'w7ejDZ8SWv8',
        duration: '48:30',
        topics: ['Creating React app', 'Components and Props', 'useState hook', 'useEffect hook', 'Axios API integration'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📚 Week 3: React Fundamentals</h3><h4 class="font-bold mb-3">Create React App with Vite</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>cd client\nnpm create vite@latest . -- --template react\nnpm install axios\nnpm run dev</code></pre><h4 class="font-bold mt-6 mb-3">Fetch Data in React</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm"><code>import { useState, useEffect } from 'react';\nimport axios from 'axios';\n\nfunction App() {\n  const [tasks, setTasks] = useState([]);\n  \n  useEffect(() => {\n    axios.get('http://localhost:5000/tasks')\n      .then(res => setTasks(res.data));\n  }, []);\n  \n  return (&lt;ul&gt;{tasks.map(t => &lt;li&gt;{t.title}&lt;/li&gt;)}&lt;/ul&gt;);\n}</code></pre></div>`,
        resources: [{ name: 'React Components', type: 'ZIP', size: '1.8 MB' }]
      },
      {
        week: 4,
        title: 'Full Stack Integration & CRUD',
        description: 'Connect frontend and backend for complete functionality.',
        videoId: 'jS4aFq5-91M',
        duration: '55:40',
        topics: ['POST requests', 'Form handling', 'Update and Delete', 'State management', 'Error handling'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📚 Week 4: Full Stack Integration</h3><h4 class="font-bold mb-3">CRUD Operations - Backend</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm"><code>app.get('/tasks', async (req, res) => {\n  const tasks = await Task.find();\n  res.json(tasks);\n});\n\napp.post('/tasks', async (req, res) => {\n  const task = new Task(req.body);\n  await task.save();\n  res.json(task);\n});\n\napp.delete('/tasks/:id', async (req, res) => {\n  await Task.findByIdAndDelete(req.params.id);\n  res.json({ message: 'Deleted' });\n});</code></pre><div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-6"><p class="font-semibold">🚀 Pro Tip: Add Dark Mode using React Context!</p></div></div>`,
        resources: [{ name: 'Complete Project', type: 'ZIP', size: '5 MB' }]
      }
    ],
    resources: [
      { name: 'MERN Stack Cheat Sheet', type: 'PDF', size: '2 MB', icon: 'FileText' },
      { name: 'Complete Source Code', type: 'ZIP', size: '15 MB', icon: 'FileCode' },
      { name: 'Postman Collection', type: 'JSON', size: '500 KB', icon: 'FileCode' }
    ],
    faqs: [
      { q: 'Is MERN backend or frontend?', a: 'MERN is full-stack. React handles frontend, Node.js/Express handle backend.' },
      { q: 'Can I learn MERN in 1 month?', a: 'With JavaScript knowledge, basics take 30 days. Mastery requires 3-6 months.' },
      { q: 'Which is better, Node.js or React?', a: 'Neither is "better" - they serve different purposes.' },
      { q: 'Is MERN Stack dead in 2026?', a: 'No! MERN remains #1 choice for startups.' }
    ],
    quizQuestions: [
      { id: 1, question: 'What does MERN stand for?', options: ['MySQL, Express, React, Node', 'MongoDB, Express, React, Node.js', 'MongoDB, Ember, Ruby, Node', 'MySQL, Electron, React, Nest'], correct: 1 },
      { id: 2, question: 'Which component is used for frontend?', options: ['MongoDB', 'Express', 'React', 'Node.js'], correct: 2 },
      { id: 3, question: 'What is Mongoose used for?', options: ['React components', 'HTTP requests', 'MongoDB ODM', 'State management'], correct: 2 },
      { id: 4, question: 'Command to initialize Node.js project?', options: ['node start', 'npm init -y', 'node create', 'npm start'], correct: 1 },
      { id: 5, question: 'Purpose of CORS?', options: ['Compress files', 'Allow cross-origin requests', 'Create routes', 'Connect to MongoDB'], correct: 1 },
      { id: 6, question: 'Hook for state in React?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 1 },
      { id: 7, question: 'Correct way to connect MongoDB?', options: ['mongoose.start()', 'mongoose.connect(URI)', 'mongoose.open(URI)', 'mongoose.run()'], correct: 1 },
      { id: 8, question: 'HTTP method to create data?', options: ['GET', 'PUT', 'POST', 'DELETE'], correct: 2 },
      { id: 9, question: 'Purpose of dotenv?', options: ['Create env variables', 'Load from .env file', 'Deploy apps', 'Test APIs'], correct: 1 },
      { id: 10, question: 'Real-world MERN application?', options: ['Microsoft Word', 'Photoshop', 'Netflix Clone', 'Windows OS'], correct: 2 }
    ]
  },

  // ============================================
  // ADD NEW COURSES HERE - Just copy this template
  // ============================================
  
  // Data Science & Machine Learning
  'data-science-machine-learning': {
    id: 'data-science-machine-learning',
    title: 'Data Science & Machine Learning',
    tagline: 'Become a Data Scientist - Complete A-Z Course',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '16 Weeks',
    totalHours: '140+ hours',
    students: 8230,
    rating: 4.7,
    reviews: 1560,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    instructor: {
      name: 'Priya Sharma',
      role: 'Data Scientist at Google',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      experience: '8+ years',
      students: '35K+',
      rating: 4.8,
      courses: 6,
      bio: 'Senior Data Scientist at Google with 8+ years of experience in ML and AI.'
    },
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau', 'Machine Learning'],
    price: 'Free',
    originalPrice: '₹24,999',
    badge: 'Popular',
    lastUpdated: 'January 2024',
    enrolled: 8230,
    language: 'English',
    certificate: true,
    features: ['Lifetime Access', 'Downloadable Resources', 'Certificate', 'Projects'],
    whatYouWillLearn: [
      'Master Python for data science',
      'Analyze data with Pandas and NumPy',
      'Build ML models with Scikit-learn',
      'Create deep learning models with TensorFlow',
      'Work with real-world datasets',
      'Deploy ML models to production'
    ],
    requirements: ['Basic programming knowledge', 'High school math', 'Computer with 8GB+ RAM'],
    weeks: [
      {
        week: 1,
        title: 'Introduction to Data Science & Python',
        description: 'Learn fundamentals of Data Science and Python programming.',
        videoId: 'LHBE6Q9XlzI',
        duration: '50:00',
        topics: ['What is Data Science?', 'Python Basics', 'Jupyter Notebook', 'Data Types', 'Control Flow'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📊 Week 1: Data Science Introduction</h3><p class="text-gray-700">Data Science encompasses all ways information is extracted from data. Big Data deals with enormous datasets requiring specialized tools.</p><h4 class="font-bold mt-6">5 V's of Big Data</h4><ul class="list-disc pl-5"><li>Volume - Amount of data</li><li>Variety - Different types</li><li>Velocity - Speed of processing</li><li>Veracity - Accuracy</li><li>Value - Business worth</li></ul></div>`,
        resources: [{ name: 'Python Cheat Sheet', type: 'PDF', size: '1.5 MB' }],
        isPreview: true
      },
      {
        week: 2,
        title: 'Data Analysis with Pandas & NumPy',
        description: 'Master data manipulation and analysis.',
        videoId: 'r-uOLxNrNk8',
        duration: '55:00',
        topics: ['Pandas DataFrames', 'Data Cleaning', 'NumPy Arrays', 'Aggregation', 'Merging Data'],
        readingContent: `<div class="space-y-6"><h3 class="text-xl font-bold mb-4">📊 Week 2: Data Analysis</h3><h4 class="font-bold mb-3">Pandas Basics</h4><pre class="bg-gray-900 text-gray-100 p-4 rounded-lg"><code>import pandas as pd\ndf = pd.read_csv('data.csv')\ndf.head()\ndf.describe()</code></pre></div>`,
        resources: [{ name: 'Datasets', type: 'ZIP', size: '10 MB' }]
      }
    ],
    resources: [
      { name: 'Python Cheat Sheet', type: 'PDF', size: '1.5 MB', icon: 'FileText' },
      { name: 'Datasets Collection', type: 'ZIP', size: '50 MB', icon: 'FileCode' }
    ],
    faqs: [
      { q: 'What is Data Science?', a: 'Data Science extracts knowledge from data using statistics, programming, and ML.' },
      { q: 'Do I need prior ML experience?', a: 'No! We start from basics and gradually move to advanced topics.' }
    ],
    quizQuestions: [
      { id: 1, question: 'What does Data Science extract from data?', options: ['Knowledge and insights', 'Only statistics', 'Raw numbers', 'Nothing'], correct: 0 },
      { id: 2, question: 'Which library is used for data manipulation?', options: ['React', 'Pandas', 'Express', 'Django'], correct: 1 },
      { id: 3, question: 'What does NumPy provide?', options: ['Web framework', 'Numerical computing', 'Database', 'UI components'], correct: 1 },
      { id: 4, question: 'Jupyter Notebook file extension?', options: ['.py', '.js', '.ipynb', '.txt'], correct: 2 },
      { id: 5, question: 'Which is a 5V of Big Data?', options: ['Visibility', 'Volume', 'Vibration', 'Validation'], correct: 1 }
    ]
  }
}

// Helper function to get course by ID
export function getCourseById(id: string): CourseData | null {
  return coursesData[id] || null
}

// Helper function to get all courses list (for listing page)
export function getAllCourses(): CourseData[] {
  return Object.values(coursesData)
}

// Helper function to get course weeks
export function getCourseWeeks(id: string) {
  return coursesData[id]?.weeks || []
}
