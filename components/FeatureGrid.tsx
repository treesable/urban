'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface Feature {
  title: string
  description: string
  icon: string
}

const features: Feature[] = [
  {
    title: 'Smart Inventory Management',
    description: 'Digital mapping and tracking of urban forest assets',
    icon: '🌳'
  },
  {
    title: 'Predictive Maintenance',
    description: 'AI-powered forecasting for proactive tree care',
    icon: '🤖'
  },
  {
    title: 'Automated Reporting',
    description: 'Generate comprehensive insights with one click',
    icon: '📊'
  }
]

const FeatureGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for Modern Urban Forestry
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureGrid 