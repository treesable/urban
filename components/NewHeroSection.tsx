'use client'
import React from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

const NewHeroSection = () => {
  const handleWaitlistClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center bg-[#2D5A27]">
      <div className="container mx-auto px-4 py-20 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Join the waitlist and transform your urban forest management
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Get better results with AI-powered forestry solutions in 2024
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWaitlistClick}
            className="bg-[#90EE90] text-[#2D5A27] font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-[#98FB98] transition-colors"
          >
            Join the Waitlist
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default NewHeroSection 