'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Star, MapPin, Building, Briefcase, Award, Sparkles, TrendingUp, Clock, GraduationCap, Shield, Zap, Users, CheckCircle, Globe, ChevronRight, Download, Apple, Smartphone, Laptop, PenTool, BarChart, Code2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { internships as featuredInternships } from '@/data/internships'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Global Internships & Jobs - InternAdda',
  description: 'World\'s leading internship and job platform for students and freshers. 50L+ downloads, 28L+ placements.',
  itemListElement: featuredInternships.map((job: any, i: number) => ({
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
      whileHover={{ y: -4 }}
      className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              <Image src={image} alt={company} width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">{company}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </p>
            </div>
          </div>
          {tag && (
            <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-1 rounded-md">
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{duration || '3 Months'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-900 font-semibold">
            <span>{stipend}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {skills?.slice(0, 3).map((skill: string, idx: number) => (
            <span key={idx} className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
              {skill}
            </span>
          ))}
          {skills?.length > 3 && (
            <span className="text-[10px] font-medium px-2.5 py-1 bg-gray-100 text-gray-500 rounded-md">
              +{skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3.5 h-3.5" />
            <span>{applicants || 120}+ applied</span>
          </div>
          <button 
            onClick={go}
            className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1 group/btn"
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
      className="group bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className={`w-11 h-11 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-0.5">{title}</h3>
      <p className="text-sm text-gray-500">{count} internships</p>
    </motion.div>
  );
}

function StatCard({ value, label, icon: Icon }: any) {
  return (
    <div className="text-center">
      <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="flex items-center justify-center gap-1.5 text-sm text-gray-600">
        <Icon className="w-4 h-4 text-blue-600" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const stats = [
    { value: '50L+', label: 'App Downloads', icon: Download },
    { value: '28L+', label: 'Placements', icon: Award },
    { value: '10K+', label: 'Daily Openings', icon: Briefcase },
    { value: '1.5Cr+', label: 'Registered Users', icon: Users }
  ];

  const categories = [
    { icon: Code2, title: 'Engineering', count: '12.5K', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: TrendingUp, title: 'Marketing', count: '5.2K', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: PenTool, title: 'Design', count: '3.8K', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: Briefcase, title: 'Business', count: '4.1K', color: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: GraduationCap, title: 'Research', count: '2.3K', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { icon: BarChart, title: 'Data Science', count: '3.5K', color: 'text-red-600', bgColor: 'bg-red-50' },
    { icon: Globe, title: 'Remote', count: '8.7K', color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { icon: Zap, title: 'Startups', count: '6.2K', color: 'text-amber-600', bgColor: 'bg-amber-50' }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Software Engineer at Google',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'InternAdda helped me land my first internship which eventually led to my dream job at Google. The platform is a game-changer for students.',
      company: 'Google'
    },
    {
      name: 'Priya Patel',
      role: 'Product Manager at Microsoft',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'From zero experience to product manager at Microsoft. InternAdda\'s opportunities and resources made it all possible.',
      company: 'Microsoft'
    },
    {
      name: 'Arjun Nair',
      role: 'Data Scientist at Amazon',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      text: 'Got 5+ internship offers through InternAdda during college. The platform is unmatched for students looking to build their careers.',
      company: 'Amazon'
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      
      <main className="w-full bg-white font-sans">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-gray-100">
          <div className={CONTAINER}>
            <div className="py-12 lg:py-16">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <FadeUp>
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">India's #1 Internship Platform</span>
                    </div>
                  </FadeUp>

                  <FadeUp delay={0.1}>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.2] mb-4">
                      Find Your Dream
                      <br />
                      <span className="text-blue-600">Internship</span> & Launch
                      <br />
                      Your Career
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                      Join 1.5 Crore+ students who've found internships and jobs on InternAdda
                    </p>
                  </FadeUp>

                  <FadeUp delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                      <button 
                        onClick={() => router.push('/internships')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-base shadow-sm shadow-blue-200 flex items-center gap-2"
                      >
                        Explore Internships
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => router.push('/courses')}
                        className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-3.5 rounded-lg border border-gray-300 transition-colors text-base"
                      >
                        Upskill with Courses
                      </button>
                    </div>

                    {/* App Download Section */}
                    <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto lg:mx-0 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Download the App
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">QR Code</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-1 mb-2">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-sm font-semibold text-gray-700 ml-1">4.8</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-3">42K+ Reviews • 50L+ Downloads</p>
                          <div className="flex gap-2">
                            <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5">
                              <Apple className="w-3.5 h-3.5" />
                              App Store
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5">
                              <Smartphone className="w-3.5 h-3.5" />
                              Play Store
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                </div>

                {/* Right Visual - Hero Image */}
                <div className="flex-1">
                  <FadeUp delay={0.3}>
                    <div className="relative">
                      <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <Image 
                          src="/hero.jpg" 
                          alt="Students collaborating and working on internships"
                          width={600}
                          height={500}
                          className="w-full h-auto object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none" />
                      </div>
                      
                      <motion.div 
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Placement Rate</p>
                            <p className="text-xl font-bold text-gray-900">94%</p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Partner Companies</p>
                            <p className="text-xl font-bold text-gray-900">50K+</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </FadeUp>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-10 border-b border-gray-200">
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

        {/* Trending Now Section */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  🔥 Trending now
                </h2>
                <p className="text-gray-600">Most sought-after internships on InternAdda</p>
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
        <section className="py-16 bg-gray-50">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Explore by category
                </h2>
                <p className="text-gray-600">Find internships in your field of interest</p>
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

        {/* Resume Builder Banner */}
        <section className="py-12">
          <div className={CONTAINER}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-white max-w-xl">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">No resume? No problem.</h3>
                  <p className="text-blue-50 mb-6 text-lg">Let us help you create one or improve the one you've got.</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">AI-powered resume builder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">Intelligent feedback engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-200" />
                      <span className="text-white">Optimized for freshers</span>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Build Your Resume →
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-50">
          <div className={CONTAINER}>
            <div className="mb-10">
              <FadeUp>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  28,48,723+ placements - read their stories
                </h2>
                <p className="text-gray-600">Go-to platform for students and freshers</p>
              </FadeUp>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((item, index) => (
                <FadeUp key={index} delay={index * 0.1}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 flex-1">"{item.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={48} 
                        height={48} 
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Placed in {item.company}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Banner */}
        <section className="py-12 border-t border-gray-200">
          <div className={CONTAINER}>
            <FadeUp>
              <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
                Trusted by leading companies worldwide
              </p>
            </FadeUp>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
              {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Adobe', 'Salesforce'].map(company => (
                <span key={company} className="text-gray-400 font-semibold text-lg">{company}</span>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
