'use client'
import { motion } from 'framer-motion'

export const IconicLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse using your Secondary Cyan color */}
        <motion.div
          className="absolute h-24 w-24 rounded-full border-4 border-secondary opacity-20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Rotating ring using your Primary Deep Blue */}
        <motion.div
          className="h-16 w-16 rounded-full border-t-4 border-r-4 border-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Brand Initial in the center */}
        <div className="absolute text-primary font-bold text-xl">IA</div>
      </div>
      
      {/* Engaging text for students */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center"
      >
        <p className="text-foreground font-medium tracking-wide">Finding your dream internship...</p>
        <div className="mt-2 flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-secondary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
