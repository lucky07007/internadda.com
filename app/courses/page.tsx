// app/courses/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Verified, MapPin, Building, Filter, Search, Clock, X, TrendingUp, History, ChevronDown, Star, Users, Award, BookOpen, Video, FileText, Download, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Link from 'next/link'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

// Sample Course Data
const allCourses = [
  {
    id: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    tagline: 'Master MERN Stack from Scratch',
    category: 'Development',
    level: 'Beginner to Advanced',
    duration: '24 Weeks',
    students: 15420,
    rating: 4.8,
    reviews: 2340,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    instructor: 'Rajesh Kumar',
    instructorRole: 'Senior Developer at Microsoft',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript'],
    price: 'Free',
    originalPrice: '₹19,999',
    badge: 'Bestseller',
    lastUpdated: '2024-01-15',
    enrolled: 12450,
    modules: 18,
    projects: 5,
    certificate: true
  },
  {
    id: 'data-science-machine-learning',
    title: 'Data Science & Machine Learning',
    tagline: 'Become a Data Scientist in 2024',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '20 Weeks',
    students: 8230,
    rating: 4.7,
    reviews: 1560,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    instructor: 'Priya Sharma',
    instructorRole: 'Data Scientist at Google',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL', 'Tableau'],
    price: 'Free',
    originalPrice: '₹24,999',
    badge: 'Popular',
    lastUpdated: '2024-01-10',
    enrolled: 6890,
    modules: 15,
    projects: 4,
    certificate: true
  },
  {
    id: 'digital-marketing-mastery',
    title: 'Digital Marketing Mastery',
    tagline: 'SEO, Social Media & Growth Hacking',
    category: 'Marketing',
    level: 'All Levels',
    duration: '12 Weeks',
    students: 18900,
    rating: 4.9,
    reviews: 3420,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    instructor: 'Amit Verma',
    instructorRole: 'Marketing Head at Swiggy',
    skills: ['SEO', 'Social Media', 'Google Ads', 'Content Marketing', 'Analytics'],
    price: 'Free',
    originalPrice: '₹15,999',
    badge: 'Trending',
    lastUpdated: '2024-01-18',
    enrolled: 15230,
    modules: 12,
    projects: 3,
    certificate: true
  },
  {
    id: 'ui-ux-design-professional',
    title: 'UI/UX Design Professional',
    tagline: 'Design Beautiful Digital Products',
    category: 'Design',
    level: 'Beginner',
    duration: '16 Weeks',
    students: 5670,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    instructor: 'Neha Gupta',
    instructorRole: 'Product Designer at Adobe',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Wireframing', 'Prototyping'],
    price: 'Free',
    originalPrice: '₹18,999',
    badge: 'New',
    lastUpdated: '2024-01-20',
    enrolled: 4120,
    modules: 14,
    projects: 4,
    certificate: true
  },
  {
    id: 'cloud-computing-aws',
    title: 'Cloud Computing with AWS',
    tagline: 'Become AWS Certified Solutions Architect',
    category: 'Cloud',
    level: 'Intermediate',
    duration: '18 Weeks',
    students: 9450,
    rating: 4.8,
    reviews: 1780,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    instructor: 'Vikram Singh',
    instructorRole: 'Cloud Architect at AWS',
    skills: ['AWS', 'EC2', 'S3', 'Lambda', 'CloudFormation', 'DevOps'],
    price: 'Free',
    originalPrice: '₹22,999',
    badge: 'Certification Prep',
    lastUpdated: '2024-01-12',
    enrolled: 7890,
    modules: 16,
    projects: 3,
    certificate: true
  },
  {
    id: 'blockchain-web3-development',
    title: 'Blockchain & Web3 Development',
    tagline: 'Build Decentralized Applications',
    category: 'Blockchain',
    level: 'Advanced',
    duration: '14 Weeks',
    students: 3420,
    rating: 4.9,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    instructor: 'Arjun Nair',
    instructorRole: 'Blockchain Lead at Polygon',
    skills: ['Solidity', 'Ethereum', 'Smart Contracts', 'Web3.js', 'DeFi'],
    price: 'Free',
    originalPrice: '₹29,999',
    badge: 'Hot',
    lastUpdated: '2024-01-05',
    enrolled: 2340,
    modules: 12,
    projects: 3,
    certificate: true
  },
  {
    id: 'mobile-app-react-native',
    title: 'Mobile App Development with React Native',
    tagline: 'Build iOS & Android Apps',
    category: 'Mobile',
    level: 'Intermediate',
    duration: '15 Weeks',
    students: 6780,
    rating: 4.7,
    reviews: 1230,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    instructor: 'Sneha Reddy',
    instructorRole: 'Mobile Lead at Flipkart',
    skills: ['React Native', 'Expo', 'Redux', 'Firebase', 'Native Modules'],
    price: 'Free',
    originalPrice: '₹21,999',
    badge: 'Updated',
    lastUpdated: '2024-01-08',
    enrolled: 5340,
    modules: 13,
    projects: 4,
    certificate: true
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals',
    tagline: 'Protect Systems & Networks',
    category: 'Security',
    level: 'Beginner',
    duration: '10 Weeks',
    students: 4560,
    rating: 4.6,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    instructor: 'Rahul Mehta',
    instructorRole: 'Security Consultant at Deloitte',
    skills: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Risk Management'],
    price: 'Free',
    originalPrice: '₹16,999',
    badge: 'Essential',
    lastUpdated: '2024-01-03',
    enrolled: 3450,
    modules: 10,
    projects: 2,
    certificate: true
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence A-Z',
    tagline: 'From Basics to Advanced AI',
    category: 'AI',
    level: 'All Levels',
    duration: '22 Weeks',
    students: 11230,
    rating: 4.9,
    reviews: 2890,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    instructor: 'Dr. Anjali Sharma',
    instructorRole: 'AI Research Scientist at OpenAI',
    skills: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning'],
    price: 'Free',
    originalPrice: '₹27,999',
    badge: 'Advanced',
    lastUpdated: '2024-01-22',
    enrolled: 9870,
    modules: 20,
    projects: 6,
    certificate: true
  }
]

const generateUpdateTime = () => {
  const days = Math.floor(Math.random() * 30)
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'Today'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Mobile Search Bar
function MobileSearchBar({ value, onChange }: any) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search courses..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
      />
    </div>
  )
}

// Desktop Search with Suggestions
function DesktopSearchBar({ value, onChange, suggestions }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('recentCourseSearches')
    if (saved) setRecentSearches(JSON.parse(saved).slice(0, 5))
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const saveSearch = (term: string) => {
    if (!term.trim()) return
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem('recentCourseSearches', JSON.stringify(updated))
  }

  const handleSelect = (term: string) => {
    onChange(term)
    saveSearch(term)
    setIsOpen(false)
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('recentCourseSearches')
  }

  const trendingSearches = ['Web Development', 'Data Science', 'AI', 'Digital Marketing', 'Cloud']

  return (
    <div className="relative hidden lg:block w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search courses..."
          value={value}
          onChange={(e) => { onChange(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && (saveSearch(value), setIsOpen(false))}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white"
        />
      </div>

      {isOpen && (value || recentSearches.length > 0) && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
          {value && suggestions.length > 0 && (
            <div className="p-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase px-3 py-1.5">Suggestions</p>
              {suggestions.slice(0, 6).map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.title)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-left"
                >
                  <Search size={13} className="text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate">{item.category} • {item.level}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!value && recentSearches.length > 0 && (
            <div className="p-1">
              <div className="flex items-center justify-between px-3 py-1.5">
                <p className="text-[10px] font-semibold text-gray-500 uppercase">Recent</p>
                <button onClick={clearRecent} className="text-[10px] text-gray-400">Clear</button>
              </div>
              {recentSearches.map((term, idx) => (
                <button key={idx} onClick={() => handleSelect(term)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <History size={13} className="text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{term}</span>
                </button>
              ))}
            </div>
          )}

          {!value && recentSearches.length === 0 && (
            <div className="p-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase px-3 py-1.5">Trending</p>
              {trendingSearches.map((term, idx) => (
                <button key={idx} onClick={() => handleSelect(term)} className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <TrendingUp size={13} className="text-orange-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Mobile Filter Bottom Sheet
function MobileFilterSheet({ isOpen, onClose, categories, selectedFilters, toggleFilter, clearFilters }: any) {
  const [showAll, setShowAll] = useState(false)
  const displayedCategories = showAll ? categories : categories.slice(0, 6)

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl z-50 transition-transform duration-300 lg:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
            <button onClick={clearFilters} className="text-sm text-sky-500">Clear all</button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {displayedCategories.map((filter: string) => (
                <button
                  key={filter}
                  onClick={() => toggleFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedFilters.includes(filter)
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {filter}
                  <span className="ml-1 text-xs opacity-75">
                    ({filter === 'All' ? allCourses.length : allCourses.filter((c: any) => c.category === filter).length})
                  </span>
                </button>
              ))}
            </div>
            
            {categories.length > 6 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="mt-3 text-sky-500 text-sm font-medium flex items-center gap-1"
              >
                {showAll ? 'Show less' : `View all ${categories.length} categories`}
                <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-6 bg-sky-500 text-white font-semibold py-3 rounded-xl"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}

function CourseCard({ course }: any) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
      <div className="flex flex-col sm:flex-row">
        {/* Course Image */}
        <div className="relative sm:w-48 h-32 sm:h-auto flex-shrink-0">
          <Image 
            src={course.image} 
            alt={course.title} 
            fill 
            className="object-cover"
          />
          {course.badge && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {course.badge}
            </span>
          )}
        </div>

        {/* Course Content */}
        <div className="flex-1 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">{course.tagline}</p>
            </div>
          </div>

          {/* Category & Level */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] px-2 py-0.5 rounded-full">
              {course.category}
            </span>
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded-full">
              {course.level}
            </span>
            <div className="flex items-center gap-0.5 ml-auto">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-900 dark:text-white">{course.rating}</span>
              <span className="text-[10px] text-gray-500">({course.reviews})</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
            <div className="flex items-center gap-1">
              <Video size={12} className="text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{course.modules} modules</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={12} className="text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{course.projects} projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} className="text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">{course.enrolled.toLocaleString()}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {course.skills.slice(0, 3).map((skill: string, i: number) => (
              <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="text-[10px] text-gray-500">+{course.skills.length - 3}</span>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900 dark:text-white">{course.price}</span>
              <span className="text-xs text-gray-400 line-through">{course.originalPrice}</span>
              {course.certificate && (
                <Award className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <Link
              href={`/courses/${course.id}`}
              className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
            >
              View Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilterSheet, setShowMobileFilterSheet] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const categories = useMemo(() => {
    const cats = new Set<string>()
    allCourses.forEach(c => cats.add(c.category))
    return ['All', ...Array.from(cats).sort()]
  }, [])

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return allCourses.filter(c => 
      c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [searchQuery])

  const filteredCourses = useMemo(() => {
    let filtered = allCourses
    if (!selectedFilters.includes('All')) {
      filtered = filtered.filter(c => selectedFilters.includes(c.category))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q) ||
        c.skills.some((s: string) => s.toLowerCase().includes(q))
      )
    }
    return filtered
  }, [selectedFilters, searchQuery])

  const visibleCourses = filteredCourses.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCourses.length

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      if (filter === 'All') return ['All']
      const withoutAll = prev.filter(f => f !== 'All')
      if (prev.includes(filter)) {
        const newFilters = withoutAll.filter(f => f !== filter)
        return newFilters.length === 0 ? ['All'] : newFilters
      }
      return [...withoutAll, filter]
    })
    setVisibleCount(6)
  }

  const clearFilters = () => { 
    setSelectedFilters(['All'])
    setSearchQuery('')
    setShowMobileFilterSheet(false)
    setVisibleCount(6)
  }

  const activeFilterCount = selectedFilters.includes('All') ? 0 : selectedFilters.length

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        
        {/* Header Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 sm:py-3 sticky top-16 z-30">
          <div className={CONTAINER}>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowMobileFilterSheet(true)}
                className="lg:hidden flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 flex-shrink-0"
              >
                <Filter size={14} />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-sky-500 text-white text-xs px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>
                )}
              </button>

              <div className="flex-1 lg:hidden">
                <MobileSearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>

              <h1 className="hidden lg:block text-xl font-bold text-gray-900 dark:text-white flex-shrink-0">Courses</h1>
              
              <DesktopSearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                suggestions={searchSuggestions}
              />

              <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {filteredCourses.length} courses
              </span>
            </div>
          </div>
        </div>

        <div className={CONTAINER}>
          <div className="flex gap-4 lg:gap-6 py-3 sm:py-4">
            
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-28">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Categories</span>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-gray-500 flex items-center gap-0.5">
                      <X size={12} /> Clear
                    </button>
                  )}
                </div>
                <div className="space-y-0.5 max-h-96 overflow-y-auto">
                  {categories.map(filter => {
                    const count = filter === 'All' ? allCourses.length : allCourses.filter(c => c.category === filter).length
                    return (
                      <button 
                        key={filter}
                        onClick={() => toggleFilter(filter)}
                        className={`w-full flex items-center justify-between px-2 py-2 rounded text-xs font-medium transition-colors ${
                          selectedFilters.includes(filter) 
                            ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <span>{filter}</span>
                        <span className="text-[10px] opacity-60">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters */}
              {!selectedFilters.includes('All') && selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedFilters.map(f => (
                    <span key={f} className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {f}
                      <button onClick={() => toggleFilter(f)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              )}

              <div className="lg:hidden mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{filteredCourses.length} courses found</span>
              </div>

              {/* Course Cards */}
              <div className="space-y-3">
                {visibleCourses.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl text-center">
                    <p className="text-gray-500 dark:text-gray-400">No courses found</p>
                    <button onClick={clearFilters} className="mt-3 text-sky-500 text-sm font-medium">Clear filters</button>
                  </div>
                ) : (
                  visibleCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                )}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-6">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
                  >
                    Load More Courses ({filteredCourses.length - visibleCount} remaining)
                  </button>
                </div>
              )}

              {/* Certificate CTA Banner */}
              {visibleCourses.length > 0 && (
                <div className="mt-8 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl overflow-hidden shadow-xl">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 p-6 md:p-8 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Limited Time Offer</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">Claim Your Free Certificate Now!</h2>
                      <p className="text-blue-100 mb-4 max-w-lg">
                        Complete any course and get a verified certificate absolutely free. 
                        Boost your resume and stand out to employers.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="bg-white text-sky-600 font-bold px-6 py-2.5 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                          <Award size={18} />
                          Get Certificate
                        </button>
                        <button className="border border-white/30 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                          <Download size={18} />
                          Download Sample
                        </button>
                      </div>
                    </div>
                    <div className="md:w-80 p-4">
                      <div className="bg-white rounded-xl p-3 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
                        <Image 
                          src="/certificate.jpg" 
                          alt="Certificate Sample" 
                          width={400} 
                          height={300} 
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Bottom Sheet */}
        <MobileFilterSheet 
          isOpen={showMobileFilterSheet}
          onClose={() => setShowMobileFilterSheet(false)}
          categories={categories}
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
          clearFilters={clearFilters}
        />
      </main>
      <Footer />
    </>
  )
}
