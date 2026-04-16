'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ArrowRight, Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CONTAINER = "max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/internships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <Header />

      <main className="w-full bg-[#f9fafb] font-sans">

        {/* HERO */}
        <section className="relative overflow-hidden">

          {/* World Map BG */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('/world-map.svg')] bg-center bg-no-repeat bg-contain" />

          {/* Gradient Glow */}
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

          <div className={`${CONTAINER} relative z-10 py-16 lg:py-24`}>
            <div className="flex flex-col lg:flex-row items-center gap-12">

              {/* LEFT */}
              <div className="flex-1 max-w-2xl">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-6">
                  🌍 Global Internship Platform
                </div>

                {/* Heading */}
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                  Launch Your Career{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Globally
                  </span>
                </h1>

                {/* Subtext */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Access 100% free internships from companies worldwide. Gain real experience,
                  build skills, and grow your career — all in one place.
                </p>

                {/* Search */}
                <form onSubmit={handleSearch} className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 flex">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search internships, skills, companies..."
                      className="w-full pl-12 pr-4 py-4 rounded-xl outline-none text-gray-900"
                    />
                  </div>

                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition">
                    Search <ArrowRight size={16} />
                  </button>
                </form>

                {/* Trust */}
                <div className="flex items-center gap-6 mt-6 text-sm text-gray-500">
                  <span>Trusted globally</span>
                  <span className="font-semibold">Google</span>
                  <span className="font-semibold">Microsoft</span>
                  <span className="font-semibold">Startups</span>
                </div>

                {/* Features */}
                <div className="flex gap-6 mt-8 text-sm text-gray-600">
                  <span>✔ 100% Free</span>
                  <span>✔ Verified</span>
                  <span>✔ Global</span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex-1 hidden lg:flex justify-center">
                <div className="relative w-full max-w-xl">

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl rounded-[40px]" />

                  {/* Image */}
                  <Image
                    src="/hero.jpg"
                    alt="Student"
                    width={600}
                    height={600}
                    className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                    priority
                  />

                  {/* Floating Tags */}
                  <div className="absolute top-10 right-0 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow text-xs font-semibold">
                    🌍 Global
                  </div>

                  <div className="absolute bottom-10 left-0 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow text-xs font-semibold">
                    💼 Free
                  </div>

                  <div className="absolute bottom-0 right-10 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow text-xs font-semibold">
                    ⚡ Fast Apply
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16">
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

              <div>
                <h3 className="text-3xl font-bold text-gray-900">50K+</h3>
                <p className="text-gray-500 text-sm">Students</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
                <p className="text-gray-500 text-sm">Internships</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">100+</h3>
                <p className="text-gray-500 text-sm">Countries</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900">500+</h3>
                <p className="text-gray-500 text-sm">Companies</p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className={CONTAINER}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Start Your Journey Today
              </h2>
              <p className="mb-6 text-white/80">
                Join thousands of students building their global careers.
              </p>

              <button
                onClick={() => router.push('/internships')}
                className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Explore Internships
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
