'use client'
import React from 'react'
import { motion } from 'framer-motion'

const benefits = [
  'Priority access to the platform',
  'Exclusive training sessions',
  'Early adopter pricing'
]

const ValueProposition = () => {
  const handleWaitlistClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title with accent decoration */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-[#2D5A27] relative">
                In the coming months, we're launching a
                <span className="block">more efficient way to manage urban forests.</span>
                <motion.div 
                  className="absolute -bottom-3 left-0 w-full h-1 bg-[#90EE90]"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h2>
            </div>
          </div>

          {/* Subtitle with improved typography */}
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Be among the first to experience this innovative platform—register your interest and join our pioneer community to enjoy:
          </p>

          {/* Benefits with visual enhancements */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#2D5A27]/10 flex items-center justify-center">
                    <svg 
                      className="w-6 h-6 text-[#2D5A27]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {benefit}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Updated button section with proper styling and spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <button 
              onClick={handleWaitlistClick}
              className="bg-[#2D5A27] text-white text-xl font-semibold px-12 py-6 rounded-2xl shadow-lg hover:bg-[#234620] transition-all duration-200"
            >
              Register your Interest
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition 