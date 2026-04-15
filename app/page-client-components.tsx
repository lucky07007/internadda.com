"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const collaborationSlides = ['/slide1.jpg', '/slide2.jpg', '/slide3.jpg', '/slide4.jpg', '/slide5.jpg', '/slide6.jpg'];

export function HeroVisual() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % collaborationSlides.length)
    }, 4000) // Slightly slower for better readability
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={slideIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={collaborationSlides[slideIndex]}
            alt="Industry Collaborations"
            fill
            priority={slideIndex === 0} // SEO: Prioritize the first slide for LCP
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2647]/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {collaborationSlides.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${slideIndex === i ? 'bg-[#FFD700] w-6' : 'bg-white/30 w-1'}`} />
        ))}
      </div>
    </motion.div>
  )
}
