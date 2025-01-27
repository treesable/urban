'use client'
import React from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

const HeroSection = () => {
  const handleWaitlistClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative h-full bg-gradient-to-br from-[#2D5A27] to-[#1a351a]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-8"
          >
            <div className="bg-[#90EE90]/90 rounded-lg shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-[#90EE90]/90 rounded-lg shadow-lg transform hover:scale-105 transition-transform" />
            <div className="bg-transparent rounded-lg border-4 border-[#90EE90]/30" />
            <div className="bg-[#90EE90]/90 rounded-lg shadow-lg transform hover:scale-105 transition-transform" />
          </motion.div>
        </div>
        <OptimizedImage
          src="/images/hero/urban-forest-aerial.jpg"
          alt="Urban Forest Management Aerial View"
          className="relative h-full opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/60" />
      </div>

      <div className="relative container mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Join the waitlist and unlock smarter urban forest management.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Get better results with AI-powered urban forestry and green infrastructure solutions in 2025.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button
              onClick={handleWaitlistClick}
              className="bg-[#90EE90] text-[#2D5A27] font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-[#98FB98] transition-all transform hover:scale-105"
            >
              Join the Waitlist
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 