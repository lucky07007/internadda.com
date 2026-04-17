// app/internships/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Verified, MapPin, Building, Filter, Search, Clock, X, TrendingUp, History, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { internships as allInternships } from '@/data/internships'
import { useTheme } from 'next-themes'

const CONTAINER = "max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6"

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
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Mobile Search Bar
function MobileSearchBar({ value, onChange, onFocus }: any) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
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

  const handleSelect = (term: string) => {
    onChange(term)
    saveSearch(term)
    setIsOpen(false)
  }

  const clearRecent = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  const trendingSearches = ['Frontend', 'Marketing', 'Data Science', 'Remote', 'Design']

  return (
    <div className="relative hidden lg:block w-80">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search title, company, skill..."
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
                    <p className="text-xs text-gray-500 truncate">{item.company} • {item.location}</p>
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

// Filter Bottom Sheet for Mobile
function MobileFilterSheet({ isOpen, onClose, categories, selectedFilters, toggleFilter, clearFilters }: any) {
  const [showAll, setShowAll] = useState(false)
  const displayedCategories = showAll ? categories : categories.slice(0, 6)

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
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
                    ({filter === 'All' ? allInternships.length : allInternships.filter((i: any) => i.tag === filter).length})
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 hover:shadow-lg transition-all">
      {/* Mobile: Stack layout, Desktop: Flex */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        {/* Company Logo - Mobile: absolute position */}
        <div className="flex items-start gap-3 sm:flex-1">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 bg-white">
            <Image src={image} alt={company} width={48} height={48} className="object-cover w-full h-full" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-2">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Building size={12} /> {company}
            </p>
          </div>
        </div>

        {/* Tags and Time */}
        <div className="flex flex-wrap items-center gap-1.5 mt-1 sm:mt-0">
          <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Verified size={9} /> Verified
          </span>
          {tag && (
            <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] px-2 py-0.5 rounded-full">{tag}</span>
          )}
          <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 ml-auto sm:ml-0">
            <Clock size={9} /> {relativeTime}
          </span>
        </div>
      </div>

      {/* Details Grid - 2 columns on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Location</p>
          <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-0.5 text-[11px] sm:text-xs">
            <MapPin size={10} /> <span className="truncate">{location}</span>
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Duration</p>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-[11px] sm:text-xs">{duration || '3 Months'}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Stipend</p>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-[11px] sm:text-xs">{stipend}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[9px] uppercase">Apply by</p>
          <p className="font-medium text-gray-800 dark:text-gray-200 text-[11px] sm:text-xs">ASAP</p>
        </div>
      </div>

      {/* Skills and Button */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex flex-wrap gap-1">
          {skills?.slice(0, 2).map((s: string, i: number) => (
            <span key={i} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded hidden sm:inline-block">
              {s}
            </span>
          ))}
          <span className="text-[10px] text-gray-500 dark:text-gray-400">
            {skills?.length}+ skills
          </span>
        </div>
        <button 
          onClick={go} 
          className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default function InternshipsPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilterSheet, setShowMobileFilterSheet] = useState(false)
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

  const clearFilters = () => { 
    setSelectedFilters(['All']); 
    setSearchQuery('')
    setShowMobileFilterSheet(false)
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
              {/* Mobile Filter Button */}
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

              {/* Mobile Search */}
              <div className="flex-1 lg:hidden">
                <MobileSearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>

              {/* Desktop Title */}
              <h1 className="hidden lg:block text-xl font-bold text-gray-900 dark:text-white flex-shrink-0">Internships</h1>
              
              {/* Desktop Search */}
              <DesktopSearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                suggestions={searchSuggestions}
              />

              {/* Result Count */}
              <span className="hidden sm:block text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {filteredInternships.length} open
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
                    const count = filter === 'All' ? allInternships.length : allInternships.filter(i => i.tag === filter).length
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

              {/* Mobile Result Count */}
              <div className="lg:hidden mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">{filteredInternships.length} internships found</span>
              </div>

              {/* Cards */}
              <div className="space-y-2 sm:space-y-3">
                {filteredInternships.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl text-center">
                    <p className="text-gray-500 dark:text-gray-400">No internships found</p>
                    <button onClick={clearFilters} className="mt-3 text-sky-500 text-sm font-medium">Clear filters</button>
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
