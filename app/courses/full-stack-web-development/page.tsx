// app/courses/full-stack-web-development/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CourseHeader } from '../components/CourseHeader'
import { CourseCurriculum } from '../components/CourseCurriculum'
import { CourseSidebar } from '../components/CourseSidebar'
import { CourseInstructor } from '../components/CourseInstructor'
import { Star, Users, Award, Clock, CheckCircle, Briefcase, Target, Shield, Globe, Code, Terminal, Database, Layout, Sparkles, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
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
  videoTrailer: 'YOUR_YOUTUBE_VIDEO_ID_HERE',
  whatYouWillLearn: [
    'Build full-stack web applications using MERN stack (MongoDB, Express, React, Node.js)',
    'Create RESTful APIs with Node.js and Express framework',
    'Design responsive and modern UIs with React 18 and Tailwind CSS',
    'Implement secure authentication using JWT and OAuth',
    'Deploy applications to cloud platforms (AWS EC2, Vercel, Heroku)',
    'Master MongoDB for efficient database management and aggregation',
    'Use Git for version control and team collaboration',
    'Build and deploy 5 real-world portfolio projects',
    'Implement payment gateways using Stripe and Razorpay',
    'Optimize web performance and SEO best practices'
  ],
  requirements: [
    'Basic computer skills and internet browsing',
    'No prior programming experience needed - we start from scratch',
    'A computer (Windows/Mac/Linux) with internet connection',
    'Willingness to learn, practice, and build projects',
    '8-10 hours per week for learning and practice'
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'Build a full-featured online store with product listings, cart, checkout, payment integration (Stripe), user profiles, order management, and admin dashboard.',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'JWT'],
      duration: '4 weeks',
      videoId: 'ECOMMERCE_VIDEO_ID'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Create a real-time analytics dashboard for social media with data visualization, real-time updates, user engagement metrics, and automated reporting.',
      skills: ['React', 'Socket.io', 'Chart.js', 'Express', 'MongoDB'],
      duration: '3 weeks',
      videoId: 'DASHBOARD_VIDEO_ID'
    },
    {
      title: 'Task Management App',
      description: 'Develop a Trello-like project management tool with drag-drop interface, task assignment, comments, file attachments, and team collaboration features.',
      skills: ['React', 'Redux', 'Node.js', 'PostgreSQL', 'WebSockets'],
      duration: '3 weeks',
      videoId: 'TASK_APP_VIDEO_ID'
    },
    {
      title: 'Blog Platform with CMS',
      description: 'Build a content management system with markdown support, SEO optimization, comments system, user roles, and media management.',
      skills: ['Next.js', 'MongoDB', 'AWS S3', 'Tailwind', 'MDX'],
      duration: '3 weeks',
      videoId: 'BLOG_CMS_VIDEO_ID'
    },
    {
      title: 'Real-time Chat Application',
      description: 'Create a WhatsApp-like chat app with private messaging, group chats, file sharing, voice/video calls, and end-to-end encryption.',
      skills: ['React Native', 'Socket.io', 'Node.js', 'Redis', 'WebRTC'],
      duration: '4 weeks',
      videoId: 'CHAT_APP_VIDEO_ID'
    }
  ],
  curriculum: [
    {
      week: 1,
      title: 'Web Development Fundamentals',
      description: 'Master the building blocks of web development. Learn HTML5, CSS3, and responsive design principles.',
      topics: [
        'Introduction to Web Development and How Internet Works',
        'HTML5 Semantic Elements and Best Practices',
        'CSS3 Flexbox and Grid - Modern Layout Techniques',
        'Responsive Design Principles and Mobile-First Approach',
        'JavaScript Basics - Variables, Functions, and Control Flow'
      ],
      projects: ['Personal Portfolio Website with HTML/CSS'],
      duration: '5 lessons',
      videoHours: '8 hours',
      videoId: 'WEEK1_VIDEO_ID',
      isPreview: true
    },
    {
      week: 2,
      title: 'JavaScript Deep Dive',
      description: 'Comprehensive JavaScript training from basics to advanced concepts.',
      topics: [
        'Advanced JavaScript Concepts - Closures, Prototypes',
        'Asynchronous Programming - Callbacks, Promises, Async/Await',
        'ES6+ Features - Destructuring, Spread, Modules',
        'Error Handling and Debugging Techniques',
        'Working with APIs and Fetch'
      ],
      projects: ['Interactive Quiz Application'],
      duration: '6 lessons',
      videoHours: '10 hours',
      videoId: 'WEEK2_VIDEO_ID'
    },
    {
      week: 3,
      title: 'React.js Fundamentals',
      description: 'Learn React from scratch and build interactive user interfaces.',
      topics: [
        'React Components, Props, and JSX',
        'State Management and Component Lifecycle',
        'React Hooks - useState, useEffect, useContext',
        'React Router for Navigation',
        'Context API for Global State'
      ],
      projects: ['Movie Search Application with OMDB API'],
      duration: '7 lessons',
      videoHours: '12 hours',
      videoId: 'WEEK3_VIDEO_ID'
    },
    {
      week: 4,
      title: 'Advanced React Development',
      description: 'Master advanced React patterns and state management.',
      topics: [
        'Custom Hooks for Reusable Logic',
        'Performance Optimization - memo, useMemo, useCallback',
        'Redux Toolkit for Complex State',
        'React Query for Server State',
        'Testing React Components with Jest and RTL'
      ],
      projects: ['E-Commerce Frontend with Redux'],
      duration: '6 lessons',
      videoHours: '11 hours',
      videoId: 'WEEK4_VIDEO_ID'
    },
    {
      week: 5,
      title: 'Node.js and Express Mastery',
      description: 'Build scalable backend applications with Node.js.',
      topics: [
        'Node.js Fundamentals and Event Loop',
        'Express.js Framework and Middleware',
        'RESTful API Design Best Practices',
        'Authentication with JWT and OAuth',
        'File Upload and Handling'
      ],
      projects: ['REST API for Task Management'],
      duration: '6 lessons',
      videoHours: '10 hours',
      videoId: 'WEEK5_VIDEO_ID'
    },
    {
      week: 6,
      title: 'MongoDB and Database Design',
      description: 'Master NoSQL database design and optimization.',
      topics: [
        'NoSQL Concepts and MongoDB Architecture',
        'CRUD Operations and Query Optimization',
        'Mongoose ODM and Schema Design',
        'Data Modeling for Scalable Applications',
        'Aggregation Pipeline for Complex Queries'
      ],
      projects: ['Database Design for E-Commerce Platform'],
      duration: '5 lessons',
      videoHours: '9 hours',
      videoId: 'WEEK6_VIDEO_ID'
    },
    {
      week: 7,
      title: 'Full Stack Integration',
      description: 'Connect frontend and backend for complete applications.',
      topics: [
        'Connecting React to Node.js API',
        'State Management in Full Stack Apps',
        'File Uploads with Cloud Storage (AWS S3)',
        'Payment Integration with Stripe',
        'Email Services and Notifications'
      ],
      projects: ['Complete Authentication System'],
      duration: '7 lessons',
      videoHours: '12 hours',
      videoId: 'WEEK7_VIDEO_ID'
    },
    {
      week: 8,
      title: 'Advanced Backend & Deployment',
      description: 'Deploy and scale your applications like a pro.',
      topics: [
        'GraphQL with Apollo Server and Client',
        'WebSockets for Real-time Features',
        'Caching Strategies with Redis',
        'Security Best Practices and Rate Limiting',
        'Deployment to AWS, Vercel, and Heroku'
      ],
      projects: ['Real-time Notification System'],
      duration: '6 lessons',
      videoHours: '11 hours',
      videoId: 'WEEK8_VIDEO_ID'
    }
  ],
  resources: [
    { name: 'Complete Course Slides', type: 'PDF', size: '45 MB', icon: 'FileText', url: '#' },
    { name: 'All Source Code', type: 'ZIP', size: '120 MB', icon: 'FileCode', url: '#' },
    { name: 'Project Assets & Designs', type: 'ZIP', size: '250 MB', icon: 'FileCode', url: '#' },
    { name: 'Interview Preparation Guide', type: 'PDF', size: '15 MB', icon: 'FileText', url: '#' },
    { name: 'Cheat Sheets Collection', type: 'PDF', size: '8 MB', icon: 'FileText', url: '#' }
  ],
  faqs: [
    { 
      q: 'Is this course really completely free?', 
      a: 'Yes! This course is 100% free as part of our mission to make quality tech education accessible to everyone.' 
    },
    { 
      q: 'Do I get a certificate upon completion?', 
      a: 'Yes, you receive a verified certificate from InternAdda that you can share on LinkedIn and your resume.' 
    },
    { 
      q: 'What if I get stuck or need help?', 
      a: 'We have an active Discord community with 50,000+ students, plus TA support to answer your questions within 24 hours.' 
    },
    { 
      q: 'Can I learn at my own pace?', 
      a: 'Absolutely! You have lifetime access to all course materials. Learn whenever and wherever you want.' 
    },
    {
      q: 'Will this course help me get a job?',
      a: 'Yes! We include interview prep, resume reviews, and job referral opportunities to partner companies.'
    }
  ]
}

export default function FullStackWebDevelopmentCourse() {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('curriculum')

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        <CourseHeader course={courseData} />
        
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {/* Main Content */}
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-6 px-6 pt-4">
                    {['curriculum', 'projects', 'resources', 'faq'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-semibold capitalize transition-colors ${
                          activeTab === tab
                            ? 'text-sky-600 dark:text-sky-400 border-b-2 border-sky-600 dark:border-sky-400'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'curriculum' && (
                    <CourseCurriculum curriculum={courseData.curriculum} />
                  )}
                  
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      {courseData.projects.map((project, idx) => (
                        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.skills.map((skill, i) => (
                              <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock size={14} /> {project.duration}
                            </span>
                            {project.videoId && (
                              <span className="text-sky-600 dark:text-sky-400">▶ Preview Project</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'resources' && (
                    <div className="space-y-3">
                      {courseData.resources.map((resource, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            {resource.icon === 'FileText' ? <FileText size={20} className="text-blue-500" /> : <FileCode size={20} className="text-green-500" />}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{resource.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type} • {resource.size}</p>
                            </div>
                          </div>
                          <button className="text-sky-600 dark:text-sky-400 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      ))}
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
                </div>
              </div>

              {/* Instructor */}
              <CourseInstructor instructor={courseData.instructor} />
            </div>

            {/* Sidebar */}
            <CourseSidebar course={courseData} isEnrolled={isEnrolled} setIsEnrolled={setIsEnrolled} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
