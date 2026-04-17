'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Star, MapPin, Building, Briefcase, Award, Sparkles, TrendingUp, Clock, GraduationCap, Shield, Zap, Users, CheckCircle, Globe, ChevronRight, Code2, PenTool, BarChart, Search, FileText, Rocket, Target, Heart, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'
import { GlobeHero } from '@/components/globe-hero'
import { useTheme } from 'next-themes'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Upforge Global'
  },
  description: 'Global internship platform connecting students with meaningful opportunities worldwide. Part of Upforge Global.',
  url: 'https://internadda.com',
  logo: 'https://internadda.com/logo.png',
  sameAs: [
    'https://linkedin.com/company/internadda',
    'https://twitter.com/internadda'
  ]
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
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
              <Image src={image} alt={company} width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{company}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            </div>
          </div>
          {tag && (
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-semibold px-2 py-1 rounded-md">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span>{duration || '3 Months'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
            <span>{stipend}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills?.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
              {skill}
            </span>
          ))}
          {skills?.length > 3 && (
            <span className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md">
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span>{applicants || 120}+ applied</span>
          </div>
          <button 
            onClick={go}
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group/btn"
          >
            Apply
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryCard({ icon: Icon, title, count, color, bgColor }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="group bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className={`w-11 h-11 rounded-lg ${bgColor} dark:bg-opacity-20 flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${color} dark:text-opacity-90`} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{count} opportunities</p>
    </motion.div>
  );
}

function StatCard({ value, label, icon: Icon }: any) {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
      <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '1,200+', label: 'Registered Companies', icon: Building },
    { value: '50+', label: 'Daily Openings', icon: Briefcase },
    { value: '25,000+', label: 'Applications Sent', icon: Rocket },
    { value: '85+', label: 'Countries', icon: Globe }
  ];

  const categories = [
    { icon: Code2, title: 'Engineering', count: '850+', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: TrendingUp, title: 'Marketing', count: '420+', color: 'text-orange-600', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { icon: PenTool, title: 'Design', count: '310+', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Briefcase, title: 'Business', count: '380+', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: GraduationCap, title: 'Research', count: '195+', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { icon: BarChart, title: 'Data Science', count: '290+', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Globe, title: 'Remote', count: '720+', color: 'text-cyan-600', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
    { icon: Zap, title: 'Startups', count: '510+', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' }
  ];

  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'AI-powered recommendations based on your skills and interests'
    },
    {
      icon: Shield,
      title: 'Verified Companies',
      description: 'All opportunities are verified for authenticity and quality'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create professional resumes with our guided builder tool'
    },
    {
      icon: Target,
      title: 'Skill Development',
      description: 'Free resources and courses to enhance your employability'
    },
    {
      icon: Heart,
      title: 'Mentorship Program',
      description: 'Connect with industry professionals for guidance'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Access opportunities across 85+ countries worldwide'
    }
  ];

  const testimonials = [
    {
      name: 'Aarav Mehta',
      role: 'Software Development Intern',
      company: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'InternAdda connected me with an amazing startup where I learned more in 3 months than in 2 years of college. Highly recommended!',
      verified: true
    },
    {
      name: 'Zara Kapoor',
      role: 'Marketing Associate',
      company: 'BrandWave Agency',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'The platform made finding remote internships so easy. Got 3 offers within a week of applying!',
      verified: true
    },
    {
      name: 'Vikram Singh',
      role: 'Data Analyst Intern',
      company: 'DataMind Analytics',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      text: 'From resume building to interview prep, InternAdda supported me throughout my internship search journey.',
      verified: true
    }
  ];

  const trustedBy = [
    'Regional Tech Firms',
    'Growing Startups',
    'Educational Institutions',
    'NGOs Worldwide',
    'Remote-First Companies',
    'Innovation Hubs'
  ];

  if (!mounted) return null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main className="w-full bg-white dark:bg-gray-900 font-sans transition-colors duration-200">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-gray-900 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className={CONTAINER}>
            <div className="py-12 lg:py-20">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <FadeUp>
                    <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Part of Upforge Global</span>
                    </div>
                  </FadeUp>

                  <FadeUp delay={0.1}>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-[1.2] mb-4">
                      Launch Your Career with
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">Global Internships</span>
                      <br />
                      That Matter
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                      Connect with verified companies worldwide. Build real experience, develop skills, and shape your future.
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                      <button 
                        onClick={() => router.push('/internships')}
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base shadow-sm shadow-blue-200 dark:shadow-blue-900/30 flex items-center gap-2"
                      >
                        Find Opportunities
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => router.push('/courses')}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-8 py-3.5 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors text-base"
                      >
                        Explore Resources
                      </button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 max-w-md mx-auto lg:mx-0 border border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Free for Students</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">2-3 Days</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Avg. Response</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Support Available</div>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                </div>

                {/* Right Visual - Globe Component */}
                <div className="flex-1">
                  <FadeUp delay={0.3}>
                    <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                      <GlobeHero />
                    </div>
                  </FadeUp>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 border-b border-gray-200 dark:border-gray-800">
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <StatCard {...stat} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="mb-12 text-center">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Why Students Choose InternAdda
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  We're committed to providing quality opportunities and comprehensive support for your career journey
                </p>
              </FadeUp>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FadeUp key={index} delay={index * 0.05}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Opportunities */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      🔥 Featured Opportunities
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">Hand-picked internships from verified companies</p>
                  </div>
                  <Link 
                    href="/internships" 
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredInternships?.slice(0, 8).map((item: any, i: number) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Browse by Field
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Discover opportunities aligned with your interests</p>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <FadeUp key={index} delay={index * 0.05}>
                  <CategoryCard {...category} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Builder CTA */}
        <section className="py-12">
          <div className={CONTAINER}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-white max-w-xl">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">Build a Professional Resume in Minutes</h3>
                  <p className="text-blue-50 mb-6 text-lg">Our guided resume builder helps you create a standout resume that gets noticed.</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">ATS-friendly templates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">Real-time suggestions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">Export as PDF</span>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-blue-600 dark:bg-gray-100 dark:text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white transition-colors shadow-lg">
                  Try Resume Builder →
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Student Success Stories
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Real experiences from students who found opportunities through us</p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 flex-1">"{item.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={48} 
                        height={48} 
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                          {item.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.role} at {item.company}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Partners */}
        <section className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className={CONTAINER}>
            <FadeUp>
              <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
                Trusted by Organizations Worldwide
              </p>
            </FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
              {trustedBy.map((org) => (
                <span key={org} className="text-gray-400 dark:text-gray-500 font-medium text-sm lg:text-base">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Upforge Global Parent Company Section */}
        <section className="py-12 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-100 dark:border-blue-900/30">
          <div className={CONTAINER}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">A Proud Member of</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Upforge Global</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Connecting talent with opportunity worldwide</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-center px-6">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Global Offices</div>
                </div>
                <div className="text-center px-6 border-l border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Alumni Network</div>
                </div>
                <div className="text-center px-6 border-l border-gray-300 dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">2018</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Support Banner */}
        <section className="py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className={CONTAINER}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Need Help?</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Our support team is here for you</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Support
                </button>
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
