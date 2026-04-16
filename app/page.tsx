'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Search, Star, Verified, CheckCircle, MapPin, Building, ChevronRight, Globe, Lock, Code, LayoutDashboard, Users, Briefcase, Award, Sparkles, TrendingUp, Clock, GraduationCap, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useAnimationControls } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Free Internships - UpForge',
  description: 'Premium global internship platform powered by UpForge.org - Connect with world-class opportunities',
  itemListElement: featuredInternships.map((job, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'JobPosting',
      title: job.title,
      description: `${job.title} at ${job.company}.`,
      hiringOrganization: { '@type': 'Organization', name: job.company },
      jobLocationType: 'TELECOMMUTE',
      applicantLocationRequirements: { '@type': 'Country', name: 'Worldwide' },
      employmentType: 'INTERN'
    }
  }))
};

const CONTAINER = "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8";

function FadeUp({ children, delay = 0, className = '' }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function InternshipCard({ id, title, company, stipend, location, duration, skills, applicants, tag, image }: any) {
  const { user } = useAuth();
  const router = useRouter();
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(user ? `/apply/${id}` : `/auth/signin?callbackUrl=/apply/${id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -6, boxShadow: '0px 20px 40px rgba(0,0,0,0.08)' }} 
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with company logo and verified badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
              <Verified className="w-3 h-3" />
              Verified
            </div>
            {tag && (
              <span className="bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-[10px] font-bold px-2.5 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
                {tag}
              </span>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gray-100 dark:border-gray-800 bg-white shadow-sm">
            <Image src={image} alt={company} width={48} height={48} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Title and Company */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5 mb-4">
          <Building className="w-3.5 h-3.5" />
          {company}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-500 uppercase">Location</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-500 uppercase">Duration</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{duration || '3 Months'}</p>
            </div>
          </div>
        </div>

        {/* Stipend */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-3 mb-4 border border-gray-200 dark:border-gray-700">
          <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">Stipend</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{stipend}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
              +{skills.length - 3}
            </span>
          )}
        </div>

        {/* Apply Button */}
        <button 
          onClick={go} 
          className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Apply Now
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

// Category Card Component
function CategoryCard({ icon: Icon, title, count, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-5 rounded-full -mr-12 -mt-12 group-hover:opacity-10 transition-opacity`} />
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{count} opportunities</p>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStat, setActiveStat] = useState(0);
  const controls = useAnimationControls();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const stats = [
    { value: '15K+', label: 'Verified Companies', icon: Building },
    { value: '1.2M+', label: 'Active Students', icon: Users },
    { value: '₹0', label: 'Zero Platform Fees', icon: Sparkles },
    { value: '98%', label: 'Success Rate', icon: Award }
  ];

  const categories = [
    { icon: Code, title: 'Development', count: '2.5K+', color: 'from-blue-500 to-cyan-500' },
    { icon: TrendingUp, title: 'Marketing', count: '1.8K+', color: 'from-orange-500 to-red-500' },
    { icon: LayoutDashboard, title: 'Design', count: '1.2K+', color: 'from-purple-500 to-pink-500' },
    { icon: Briefcase, title: 'Business', count: '950+', color: 'from-green-500 to-emerald-500' },
    { icon: GraduationCap, title: 'Research', count: '600+', color: 'from-yellow-500 to-amber-500' },
    { icon: Shield, title: 'Cybersecurity', count: '400+', color: 'from-red-500 to-rose-500' }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 font-sans transition-colors">
        
        {/* Hero Section - Optimized Spacing */}
        <section className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-full blur-3xl" />
          
          <div className={`${CONTAINER} relative z-10 py-12 lg:py-16`}>
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* Left Content */}
              <div className="flex-1 max-w-3xl">
                <FadeUp>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg shadow-blue-500/25">
                      <Sparkles className="w-3.5 h-3.5" />
                      India's Highest Rated Platform
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">4.9/5</span>
                    </div>
                  </div>
                </FadeUp>

                <FadeUp delay={0.1}>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                    Launch Your
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Global Career </span>
                    With Premium Internships
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
                    Connect with world-class companies, gain real experience, and build your professional network. 
                    Zero fees, 100% verified opportunities.
                  </p>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <form onSubmit={handleSearch} className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row max-w-2xl">
                    <div className="relative flex-1 flex items-center">
                      <Search className="absolute left-5 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for internships, skills, or companies..." 
                        className="w-full pl-14 pr-6 py-4 bg-transparent text-base text-gray-900 dark:text-white focus:outline-none placeholder-gray-400"
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      Search
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  {/* Trending Tags */}
                  <div className="flex flex-wrap items-center gap-3 mt-6">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trending:</span>
                    {['Product Design', 'Full Stack', 'AI/ML', 'Digital Marketing', 'Data Science'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => router.push(`/internships?search=${tag}`)}
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">100% Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Quick Apply</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Global Reach</span>
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Right Visual */}
              <div className="flex-1 hidden lg:block">
                <FadeUp delay={0.3}>
                  <div className="relative">
                    {/* Main Image Card */}
                    <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-1 shadow-2xl">
                      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                          alt="Students collaborating" 
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Live Opportunities</p>
                              <p className="text-3xl font-bold text-gray-900 dark:text-white">2,500+</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div className="flex -space-x-2">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gradient-to-br from-gray-400 to-gray-600" />
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-blue-600 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-white">+50</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute -top-6 -right-6 z-20 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Success Rate</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">98%</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-6 -left-6 z-20 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Active Students</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">1.2M+</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Modern Grid */}
        <section className="py-12">
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveStat(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    {index === 2 && (
                      <span className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-[10px] font-bold px-2 py-1 rounded-full">
                        FREE
                      </span>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="text-center mb-12">
              <FadeUp>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Explore by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Category</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Find internships tailored to your skills and interests across various domains
                </p>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <FadeUp key={index} delay={index * 0.05}>
                  <CategoryCard {...category} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Internships */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <FadeUp>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Featured</span>
                  </div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Premium Opportunities
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Hand-picked internships from world-class companies
                  </p>
                </FadeUp>
              </div>
              <button 
                onClick={() => router.push('/internships')} 
                className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                View All Internships
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredInternships.slice(0,6).map((item, i) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Powered by UpForge Banner */}
        <section className="py-20">
          <div className={CONTAINER}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-12 lg:p-16"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
              </div>
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-400" />
                    </div>
                    <span className="text-white/80 font-semibold uppercase tracking-wider text-sm">Powered by UpForge.org</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Elevate Your Career with Premium Education
                  </h2>
                  <p className="text-lg text-white/70 mb-8 max-w-xl">
                    Access world-class courses, certifications, and internship opportunities. 
                    Join millions of learners worldwide.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => router.push('/courses')}
                      className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2 group"
                    >
                      Explore Courses
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => router.push('/internships')}
                      className="bg-white/10 backdrop-blur text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                    >
                      Browse Internships
                    </button>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <p className="text-3xl font-bold text-white mb-1">500+</p>
                      <p className="text-sm text-white/70">Partner Companies</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                      <p className="text-3xl font-bold text-white mb-1">50K+</p>
                      <p className="text-sm text-white/70">Success Stories</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center col-span-2">
                      <p className="text-3xl font-bold text-white mb-1">4.9/5</p>
                      <p className="text-sm text-white/70">Student Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="text-center mb-12">
              <FadeUp>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Millions</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  See what our community has to say about their experience
                </p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[1,2,3].map((_, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      "This platform completely transformed my career trajectory. Landed an internship at a top tech company within weeks!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">Software Engineer Intern</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
      
      {/* Add custom styles for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .dark .bg-grid-pattern {
          background-image: linear-gradient(to right, #374151 1px, transparent 1px),
                            linear-gradient(to bottom, #374151 1px, transparent 1px);
        }
      `}</style>
    </>
  )
}
