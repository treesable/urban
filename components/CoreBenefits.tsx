'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface BenefitItem {
  category: string
  title: string
  description: string[]
  icon: React.ReactNode
  metric?: {
    value: string
    label: string
  }
}

const benefits: BenefitItem[] = [
  {
    category: "Efficiency",
    title: "Getting more value from your urban forest",
    description: [
      "Discover how our AI-powered platform can supercharge your tree management efficiency",
      "Transform data into actionable insights for healthier, more sustainable green spaces",
      "Access predictive maintenance tools that reduce costs while maximizing tree health"
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M12 3v18M7 8l5-5 5 5M3 15a9 9 0 0118 0v3H3v-3z" 
        />
      </svg>
    ),
    metric: {
      value: "40%",
      label: "More Efficient"
    }
  },
  {
    category: "Prevention",
    title: "Preventing common challenges",
    description: [
      "Eliminate manual inventory headaches with digital mapping and tracking",
      "Avoid costly emergency responses with predictive maintenance",
      "Protect your green infrastructure investment with data-driven decision making"
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
        />
      </svg>
    ),
    metric: {
      value: "60%",
      label: "Fewer Issues"
    }
  },
  {
    category: "Impact",
    title: "Why Smart Green Infrastructure Matters",
    description: [
      "Explore how modern urban forestry impacts city sustainability",
      "Learn how leading cities are achieving 60% better tree survival rates",
      "Discover the connection between urban forests and property values"
    ],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
        />
      </svg>
    ),
    metric: {
      value: "85%",
      label: "Better Results"
    }
  }
]

const CoreBenefits = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="w-1 h-16 bg-gradient-to-b from-[#90EE90] to-transparent mx-auto -mt-8 mb-16" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-[#2D5A27] mb-4"
          >
            Smart Solutions for Modern Cities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Join leading cities in adopting a new, sustainable approach to urban forest and green infrastructure management.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2D5A27_1px,transparent_1px),linear-gradient(to_bottom,#2D5A27_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-[0.02]" />

          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative group"
            >
              {benefit.metric && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="absolute -top-4 left-8 bg-[#2D5A27] text-white rounded-full shadow-md px-6 py-2 flex items-center space-x-2"
                >
                  <span className="text-xl font-bold">{benefit.metric.value}</span>
                  <span className="text-sm opacity-90">{benefit.metric.label}</span>
                </motion.div>
              )}

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#2D5A27] transition-colors">
                  {benefit.title}
                </h3>

                <ul className="space-y-4">
                  {benefit.description.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-start space-x-3 text-gray-600"
                    >
                      <svg 
                        className="w-5 h-5 text-[#2D5A27] flex-shrink-0 mt-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4" 
                        />
                      </svg>
                      <span className="group-hover:text-gray-900 transition-colors">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreBenefits 