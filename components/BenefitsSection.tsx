'use client'
import React from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

interface Statistic {
  value: string
  label: string
}

const statistics: Statistic[] = [
  { value: '40%', label: 'Reduction in maintenance costs' },
  { value: '60%', label: 'Faster inventory management' },
  { value: '85%', label: 'More accurate health assessments' }
]

const BenefitsSection: React.FC = () => {
  const handleWaitlistClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Transform Your Urban Forest Management
            </h2>
            <div className="space-y-8">
              {statistics.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-4xl font-bold text-[#2D5A27]">
                    {stat.value}
                  </span>
                  <span className="text-xl text-gray-600">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg"
          >
            <OptimizedImage
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80"
              alt="Platform Interface Preview"
              className="relative h-[400px] rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection 