'use client'
import React from 'react'
import { motion } from 'framer-motion'

const FinalCTA = () => {
  const handleWaitlistClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-[#2D5A27] mb-6"
          >
            Be among the first to revolutionize your urban forest management
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join leading cities who are already preparing for the future of urban forestry.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWaitlistClick}
            className="bg-[#2D5A27] text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-[#234420] transition-colors"
          >
            Join the Waitlist
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA 