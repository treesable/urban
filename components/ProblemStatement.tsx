'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface Problem {
  title: string
  description: string
  icon: string
}

const problems: Problem[] = [
  {
    title: 'Manual Inventory Management',
    description: 'Traditional tree inventory methods are time-consuming and prone to errors.',
    icon: '📋'
  },
  {
    title: 'Reactive Maintenance',
    description: 'Costly emergency responses due to lack of preventive care systems.',
    icon: '🔧'
  },
  {
    title: 'Limited Data Insights',
    description: 'Difficulty making informed decisions without comprehensive data analytics.',
    icon: '📊'
  }
]

const ProblemStatement = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Current Urban Forestry Challenges
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemStatement 