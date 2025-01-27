'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface AudienceTab {
  id: string
  label: string
  description: string
  benefits: string[]
}

const audienceTabs: AudienceTab[] = [
  {
    id: 'foresters',
    label: 'Urban Foresters',
    description: 'Streamline your daily operations and make data-driven decisions.',
    benefits: [
      'Digital inventory management',
      'Health assessment tools',
      'Work order tracking'
    ]
  },
  {
    id: 'planners',
    label: 'City Planners',
    description: 'Plan and manage urban forest resources more effectively.',
    benefits: [
      'Canopy coverage analysis',
      'Development impact assessment',
      'Species diversity planning'
    ]
  },
  {
    id: 'architects',
    label: 'Landscape Architects',
    description: 'Design sustainable urban spaces with confidence.',
    benefits: [
      'Species selection tools',
      'Growth projections',
      'Site condition analysis'
    ]
  },
  {
    id: 'managers',
    label: 'Environmental Managers',
    description: 'Track and improve environmental impact metrics.',
    benefits: [
      'Carbon sequestration data',
      'Ecosystem services tracking',
      'Environmental impact reports'
    ]
  }
]

const AudienceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(audienceTabs[0].id)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Solutions for Every Stakeholder
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {audienceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200
                ${activeTab === tab.id 
                  ? 'bg-[#2D5A27] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              aria-label={`View benefits for ${tab.label}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {audienceTabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 20 
            }}
            className={`space-y-6 ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto">
              {tab.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tab.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="p-4 bg-gray-50 rounded-lg text-center"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default AudienceTabs 