'use client'
import React from 'react'
import { motion } from 'framer-motion'
import WaitlistForm from './WaitlistForm'

const features = [
  {
    title: "2024 Urban Forestry Technology Guide",
    description: "Get early access to our comprehensive guide"
  },
  {
    title: "Case studies from successful cities",
    description: "Learn from real-world implementations"
  },
  {
    title: "Early access to beta features",
    description: "Be the first to try new capabilities"
  }
]

const BonusOffer = () => {
  return (
    <section className="py-20 bg-[#2D5A27]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Bonus Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-white lg:pr-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mb-6"
            >
              <svg
                className="w-12 h-12 mb-4 text-[#90EE90]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H5zm11 4a1 1 0 10-2 0v6a1 1 0 102 0V6zM6 6a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h4a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Join the waitlist and get access to exclusive resources
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl mb-6"
            >
              Recently we recorded a 30-minute masterclass on "AI-Powered Urban Forest Management" 
              - it's yours when you register for the waiting list.
            </motion.p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <svg 
                      className="w-6 h-6 text-[#90EE90]" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#90EE90] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:pl-6 w-full"
          >
            <div className="w-full">
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BonusOffer 