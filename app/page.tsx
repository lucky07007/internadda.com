// app/page.tsx
'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Star, MapPin, Clock, Sparkles, CheckCircle, Globe, ChevronRight, Code2, TrendingUp, PenTool, Briefcase, GraduationCap, BarChart, Zap, Users, Shield, Award, FileText, Target, Heart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'
import { GlobeHero } from '@/components/globe-hero'
import { useTheme } from 'next-themes'
import { ForbesBlogs } from '@/components/forbes/forbes-blogs'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'InternAdda',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Upforge Global'
  },
  description: 'Global internship platform connecting students with meaningful opportunities worldwide.',
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
      whileHover={{ y: -3 }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
              <Image src={image} alt={company} width={36} height={36} className="w-full h-full object-cover" />
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
            <span className="bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-semibold px-2 py-1 rounded-md">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            <span>{duration || '3 Months'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-900 dark:text-white font-semibold">
            <span>{stipend}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {skills?.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
              {skill}
            </span>
          ))}
          {skills?.length > 3 && (
            <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">
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
            className="text-sky-600 dark:text-sky-400 font-semibold text-sm hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 group/btn"
          >
            Apply
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-sky-200 dark:hover:border-sky-700 transition-all duration-300"
    >
      <div className="w-10 h-10 bg-sky-50 dark:bg-sky-900/30 rounded-lg flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Verified Opportunities',
      description: 'All internships are verified for authenticity and quality assurance'
    },
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered recommendations based on your skills and interests'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Access opportunities across 40+ countries worldwide'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Create professional resumes with our guided builder tool'
    }
  ];

  const testimonials = [
    {
      name: 'Aarav Mehta',
      role: 'Software Development Intern',
      company: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'InternAdda connected me with an amazing startup where I learned more in 3 months than in 2 years of college.',
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

  if (!mounted) return null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main className="w-full bg-white dark:bg-gray-900 font-sans transition-colors duration-200">
        
        {/* Hero Section - Clean & Minimal */}
        <section className="relative bg-gradient-to-b from-sky-50/50 via-white to-white dark:from-sky-950/20 dark:via-gray-900 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
          <div className={CONTAINER}>
            <div className="py-12 lg:py-16">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <FadeUp>
                    <div className="inline-flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 px-3 py-1.5 rounded-full mb-5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span className="text-xs font-medium text-sky-700 dark:text-sky-300">Part of Upforge Global</span>
                    </div>
                  </FadeUp>

                  <FadeUp delay={0.1}>
                    <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white leading-[1.2] mb-3">
                      Launch Your Career with
                      <br />
                      <span className="text-sky-600 dark:text-sky-400">Global Internships</span>
                    </h1>
                    <p className="text-base text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto lg:mx-0">
                      Connect with verified companies worldwide. Build real experience and shape your future.
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                      <button 
                        onClick={() => router.push('/internships')}
                        className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2 shadow-sm shadow-sky-200 dark:shadow-sky-900/30"
                      >
                        Find Opportunities
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => router.push('/courses')}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors text-sm"
                      >
                        Explore Resources
                      </button>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>100% Free for Students · 40+ Countries</span>
                    </div>
                  </FadeUp>
                </div>

                {/* Right - Globe */}
                <div className="flex-1">
                  <FadeUp delay={0.3}>
                    <div className="relative flex items-center justify-center min-h-[360px] lg:min-h-[420px]">
                      <GlobeHero />
                    </div>
                  </FadeUp>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Opportunities - Now Above Why Choose Us */}
        <section className="py-14">
          <div className={CONTAINER}>
            <div className="mb-8">
              <FadeUp>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      Featured Opportunities
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Hand-picked internships from verified companies</p>
                  </div>
                  <Link 
                    href="/internships" 
                    className="text-sky-600 dark:text-sky-400 font-semibold text-sm hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredInternships?.slice(0, 4).map((item: any, i: number) => (
                <FadeUp key={item.id} delay={i * 0.05}>
                  <InternshipCard {...item} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Now Below Featured */}
        <section className="py-14 bg-gray-50 dark:bg-gray-800/30">
          <div className={CONTAINER}>
            <div className="mb-8 text-center">
              <FadeUp>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Why Students Choose InternAdda
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                  Quality opportunities and comprehensive support for your career journey
                </p>
              </FadeUp>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <FadeUp key={index} delay={index * 0.05}>
                  <FeatureCard {...feature} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Upforge Intelligence Journal - Forbes Style Blog Section */}
        <section className="py-14">
          <div className={CONTAINER}>
            <FadeUp>
              <ForbesBlogs />
            </FadeUp>
          </div>
        </section>

        {/* Resume Builder CTA - Clean */}
        <section className="py-12">
          <div className={CONTAINER}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-sky-600 to-sky-700 dark:from-sky-800 dark:to-sky-900 rounded-xl p-8"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="text-white max-w-lg text-center lg:text-left">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">Build a Professional Resume in Minutes</h3>
                  <p className="text-sky-50 text-sm">Create a standout resume that gets noticed by top companies.</p>
                </div>
                <button className="bg-white text-sky-600 dark:bg-gray-100 dark:text-sky-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-sky-50 dark:hover:bg-white transition-colors text-sm">
                  Try Resume Builder →
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Success Stories */}
        <section className="py-14 bg-gray-50 dark:bg-gray-800/30">
          <div className={CONTAINER}>
            <div className="mb-8 text-center">
              <FadeUp>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Student Success Stories
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Real experiences from our community</p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((item, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 flex-1">"{item.text}"</p>
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={40} 
                        height={40} 
                        className="rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</p>
                          {item.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
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
    </>
  )
}
