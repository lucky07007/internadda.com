// app/internships/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Verified, MapPin, Building, ChevronRight, Filter, Search, Clock, DollarSign, Calendar, Users, Sparkles, X, TrendingUp, History } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { internships as allInternships } from '@/data/internships'
import { useTheme } from 'next-themes'

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"

const generateUpdateTime = () => {
  const minutes = Math.floor(Math.random() * 120)
  return new Date(Date.now() - minutes * 60 * 1000)
}

function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hr ago`
  if (diffDays < 7) return `${diffDays} day ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Search Bar with Suggestions
function SearchBar({ value, onChange, suggestions, onSelect }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
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
    localStorage.setItem('recentSearches', JSON.stringify(updated))
  }

  const handleSelect = (term: string, item?: any) => {
    onChange(term)
    saveSearch(term)
    setIsOpen(false)
    if (onSelect && item) onSelect(item)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveSearch(value)
      setIsOpen(false)
    }
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const trendingSearches = ['Frontend', 'Marketing', 'Data Science', 'Remote', 'Design']

  return (
    <div className="relative w-full lg:w-96">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search title, company, skill..."
          value={value}
          onChange={(e) => { onChange(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:text-white"
        />
      </div>

      {isOpen && (value || recentSearches.length > 0) && (
        <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl z-50 overflow-hidden">
          {value && suggestions.length > 0 && (
            <div className="p-1">
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-1.5">
                Suggestions
              </p>
              {suggestions.slice(0, 6).map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.title, item)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded text-left"
                >
                  <Search size={13} className="text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.company} • {item.location}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {recentSearches.length > 0 && !value && (
            <div className="p-1">
              <div className="flex items-center justify-between px-3 py-1.5">
                <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recent</p>
                <button onClick={clearRecent} className="text-[10px] text-gray-400 hover:text-gray-600">Clear</button>
              </div>
              {recentSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => { onChange(term); saveSearch(term); setIsOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
                  <History size={13} className="text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{term}</span>
                </button>
              ))}
            </div>
          )}

          {!value && recentSearches.length === 0 && (
            <div className="p-1">
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-1.5">Trending</p>
              {trendingSearches.map((term, idx) => (
                <button
                  key={idx}
                  onClick={() => { onChange(term); saveSearch(term); setIsOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                >
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

function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, image, tag, lastUpdated }: any) {
  const { user } = useAuth()
  const router = useRouter()
  const [relativeTime, setRelativeTime] = useState(() => getRelativeTime(lastUpdated || generateUpdateTime()))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateTime = lastUpdated || generateUpdateTime()
    const interval = setInterval(() => setRelativeTime(getRelativeTime(updateTime)), 30000)
    return () => clearInterval(interval)
  }, [lastUpdated])

  const go = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`)
  }

  if (!mounted) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <Building size={13} /> {company}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0">
              <Image src={image} alt={company} width={40} height={40} className="object-cover" />
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Verified size={9} /> Verified
            </span>
            {tag && (
              <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
            )}
            <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 ml-auto">
              <Clock size={9} /> {relativeTime}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Location</p>
              <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-0.5"><MapPin size={10} /> {location}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Duration</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{duration || '3M'}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Stipend</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{stipend}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Apply</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{applicants || '120'}+</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {skills?.slice(0, 3).map((s: string, i: number) => (
                <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded">{s}</span>
              ))}
            </div>
            <button onClick={go} className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InternshipsPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [updateTimes, setUpdateTimes] = useState<Map<number, Date>>(new Map())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const times = new Map()
    allInternships.forEach((_, idx) => times.set(idx, generateUpdateTime()))
    setUpdateTimes(times)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set<string>()
    allInternships.forEach(i => { if (i.tag) cats.add(i.tag) })
    return ['All', ...Array.from(cats).sort()]
  }, [])

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return allInternships.filter(i => 
      i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [searchQuery])

  const filteredInternships = useMemo(() => {
    let filtered = allInternships
    if (!selectedFilters.includes('All')) {
      filtered = filtered.filter(i => selectedFilters.includes(i.tag || ''))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(i => 
        i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q) || 
        i.location.toLowerCase().includes(q) || i.skills?.some((s: string) => s.toLowerCase().includes(q))
      )
    }
    return filtered
  }, [selectedFilters, searchQuery])

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
  }

  const clearFilters = () => { setSelectedFilters(['All']); setSearchQuery('') }
  const activeFilterCount = selectedFilters.includes('All') ? 0 : selectedFilters.length

  if (!mounted) return null

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
        
        {/* Compact Header Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 sticky top-16 z-30">
          <div className={CONTAINER}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Internships</h1>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                  {filteredInternships.length} open
                </span>
              </div>
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                suggestions={searchSuggestions}
              />
            </div>
          </div>
        </div>

        <div className={CONTAINER}>
          <div className="flex gap-5 py-4">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm"
            >
              <Filter size={14} className="text-sky-500" />
              Filter
              {activeFilterCount > 0 && <span className="bg-sky-500 text-white text-xs px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>}
            </button>

            {/* Sidebar */}
            <aside className={`w-60 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 sticky top-28">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Categories</span>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-[10px] text-gray-500 flex items-center gap-0.5"><X size={10} /> Clear</button>
                  )}
                </div>
                <div className="space-y-0.5 max-h-80 overflow-y-auto">
                  {categories.map(filter => (
                    <button 
                      key={filter}
                      onClick={() => toggleFilter(filter)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs ${selectedFilters.includes(filter) ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                      <span>{filter}</span>
                      <span className="text-[10px] opacity-60">({filter === 'All' ? allInternships.length : allInternships.filter(i => i.tag === filter).length})</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters */}
              {!selectedFilters.includes('All') && selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selectedFilters.map(f => (
                    <span key={f} className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      {f}
                      <button onClick={() => toggleFilter(f)}><X size={10} /></button>
                    </span>
                  ))}
                </div>
              )}

              {/* Cards */}
              <div className="space-y-3">
                {filteredInternships.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-xl text-center">
                    <p className="text-gray-500 dark:text-gray-400">No internships found</p>
                    <button onClick={clearFilters} className="mt-3 text-sky-500 text-sm">Clear filters</button>
                  </div>
                ) : (
                  filteredInternships.map((item, idx) => (
                    <InternshipCard key={item.id} {...item} lastUpdated={updateTimes.get(idx)} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
