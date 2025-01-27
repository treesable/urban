'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Industry {
  name: string
  logo: string
  description: string
}

const industries: Industry[] = [
  { 
    name: "Landscape Architects", 
    logo: "/icons/landscape-architect.svg",
    description: "Design & Planning"
  },
  { 
    name: "Urban Foresters", 
    logo: "/icons/urban-forester.svg",
    description: "Tree Management"
  },
  { 
    name: "Smart City Teams", 
    logo: "/icons/smart-city.svg",
    description: "Innovation & Tech"
  },
  { 
    name: "City Planners", 
    logo: "/icons/city-planner.svg",
    description: "Urban Development"
  }
]

const SocialProof = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-3xl font-bold text-[#2D5A27] mb-12 text-center"
        >
          Built for Landscape Architects, Urban Foresters, and Smart City Innovators
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 relative grayscale hover:grayscale-0 transition-all">
                <Image
                  src={industry.logo}
                  alt={`${industry.name} icon`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="font-semibold text-[#2D5A27] mb-1 group-hover:text-[#234620] transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm text-gray-600">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof 