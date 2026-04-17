// app/internships/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Verified, MapPin, Building, ChevronRight, Filter, Search, Clock, Briefcase, DollarSign, Calendar, Users, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { internships as allInternships } from '@/data/internships'
import { useTheme } from 'next-themes'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

// Generate random update times for initial load
const generateUpdateTime = () => {
  const minutes = Math.floor(Math.random() * 120) // 0-120 minutes ago
  return new Date(Date.now() - minutes * 60 * 1000)
}

// Format relative time
function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, image, tag, lastUpdated }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const { theme } = useTheme()
  const [relativeTime, setRelativeTime] = useState(() => getRelativeTime(lastUpdated || generateUpdateTime()))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = lastUpdated || generateUpdateTime()
    
    // Update relative time every minute
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(updateTime))
    }, 60000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  const go = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  if (!mounted) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300 flex flex-col p-5 sm:p-6">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {title}
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <Building size={14} className="text-gray-400 dark:text-gray-500" /> 
            {company}
          </p>
        </div>
        <div className="w-14 h-14 relative rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-white dark:bg-gray-700">
          <Image src={image} alt={company} fill className="object-cover" />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-5 flex flex-wrap gap-2">
        <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Verified size={10} /> Verified
        </span>
        <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-full">
          Actively hiring
        </span>
        {tag && (
          <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 text-sm bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            <MapPin size={12}/> Location
          </div>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{location}</p>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Calendar size={12}/> Duration
          </div>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{duration || '3 Months'}</p>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            <DollarSign size={12}/> Stipend
          </div>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{stipend}</p>
        </div>
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Users size={12}/> Applicants
          </div>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{applicants || '120'}+ applied</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {skills?.slice(0, 4).map((s: string, idx: number) => (
            <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] font-medium px-2.5 py-1 rounded-md">
              {s}
            </span>
          ))}
          {skills?.length > 4 && (
            <span className="text-gray-500 dark:text-gray-400 text-[11px] font-medium px-2 py-1">
              +{skills.length - 4} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Clock size={12} />
            <span>Updated {relativeTime}</span>
          </div>
          <button 
            onClick={go} 
            className="flex-1 sm:flex-initial bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-md shadow-sky-500/20 dark:shadow-sky-600/20 whitespace-nowrap text-center"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InternshipsPage() {
  const { theme } = useTheme()
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [updateTimes, setUpdateTimes] = useState<Map<number, Date>>(new Map())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Initialize random update times for all internships
    const times = new Map()
    allInternships.forEach((_, idx) => {
      times.set(idx, generateUpdateTime())
    })
    setUpdateTimes(times)
  }, [])

  // Extract all unique categories/tags from internships
  const categories = useMemo(() => {
    const cats = new Set<string>()
    allInternships.forEach(i => {
      if (i.tag) cats.add(i.tag)
    })
    return ['All', ...Array.from(cats).sort()]
  }, [])

  // Filter internships based on selected filters and search
  const filteredInternships = useMemo(() => {
    let filtered = allInternships

    // Filter by category
    if (!selectedFilters.includes('All') && selectedFilters.length > 0) {
      filtered = filtered.filter(i => selectedFilters.includes(i.tag || ''))
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(i => 
        i.title.toLowerCase().includes(query) ||
        i.company.toLowerCase().includes(query) ||
        i.location.toLowerCase().includes(query) ||
        i.skills?.some((s: string) => s.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [selectedFilters, searchQuery])

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      if (filter === 'All') {
        return ['All']
      }
      
      const withoutAll = prev.filter(f => f !== 'All')
      if (prev.includes(filter)) {
        const newFilters = withoutAll.filter(f => f !== filter)
        return newFilters.length === 0 ? ['All'] : newFilters
      } else {
        return [...withoutAll, filter]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters(['All'])
    setSearchQuery('')
  }

  const activeFilterCount = selectedFilters.includes('All') ? 0 : selectedFilters.length

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-20 font-sans transition-colors duration-200">
        
        {/* Banner */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8 mb-8 transition-colors">
          <div className={CONTAINER}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                  Internships
                </h1>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Discover opportunities tailored to your skills
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-transparent dark:text-white transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center justify-between w-full bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium"
            >
              <span className="flex items-center gap-2">
                <Filter size={18} className="text-sky-500" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-sky-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <ChevronRight size={18} className={`transform transition-transform ${showMobileFilters ? 'rotate-90' : ''}`} />
            </button>

            {/* Sidebar Filters */}
            <aside className={`
              w-full lg:w-72 flex-shrink-0
              ${showMobileFilters ? 'block' : 'hidden lg:block'}
            `}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                    <Filter size={18} className="text-sky-500" /> 
                    Filters
                  </div>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                    >
                      <X size={12} />
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Categories
                    </label>
                    <div className="flex flex-col gap-1.5 max-h-96 overflow-y-auto">
                      {categories.map(filter => {
                        const isActive = selectedFilters.includes(filter)
                        const count = filter === 'All' 
                          ? allInternships.length 
                          : allInternships.filter(i => i.tag === filter).length
                        
                        return (
                          <button 
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`
                              flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                              ${isActive 
                                ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-l-2 border-sky-500' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            <span>{filter}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">({count})</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                      <div className="flex justify-between">
                        <span>Total Internships</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{allInternships.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verified Companies</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {new Set(allInternships.map(i => i.company)).size}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Categories</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{categories.length - 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Listings */}
            <div className="flex-1 flex flex-col gap-5">
              {/* Results Header */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Showing <strong className="text-gray-900 dark:text-white">{filteredInternships.length}</strong> internships
                    </span>
                    {selectedFilters.length > 0 && !selectedFilters.includes('All') && (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedFilters.map(f => (
                          <span key={f} className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            {f}
                            <button onClick={() => toggleFilter(f)} className="hover:text-sky-900 dark:hover:text-sky-100">
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-amber-500" />
                    <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Clock size={12} />
                      Updated live
                    </span>
                  </div>
                </div>
              </div>

              {/* Internship Cards */}
              {filteredInternships.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 p-16 rounded-2xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No internships found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any positions matching your criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <>
                  {filteredInternships.map((item, idx) => (
                    <InternshipCard 
                      key={item.id} 
                      {...item} 
                      lastUpdated={updateTimes.get(idx)}
                    />
                  ))}
                  
                  {/* Load More Button */}
                  <div className="text-center pt-8">
                    <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors shadow-sm">
                      Load More Internships
                    </button>
                  </div>
                </>
              )}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
