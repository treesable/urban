'use client'
import React from 'react'
import { motion } from 'framer-motion'
import OptimizedImage from './OptimizedImage'

interface Achievement {
  stat: string
  description: string
}

const achievements: Achievement[] = [
  {
    stat: "40%",
    description: "reduction in maintenance costs"
  },
  {
    stat: "60%",
    description: "improvement in inventory accuracy"
  },
  {
    stat: "85%",
    description: "better health assessment rates"
  }
]

const AboutUs = () => {
  const handleFollowClick = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-start space-y-8"
          >
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-[#2D5A27] mb-6"
              >
                About Us
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl text-gray-700 font-semibold mb-4"
              >
                Backed by Research Excellence
              </motion.p>

              <p className="text-xl text-gray-600 leading-relaxed">
                Combining years of academic research in sustainability and circular bioeconomy 
                with AI innovation, we're developing data-driven solutions for smarter urban 
                forest and green infrastructure management.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  stat: "20+",
                  description: "peer-reviewed scientific publications"
                },
                {
                  stat: "15+",
                  description: "years of research and innovations"
                },
                {
                  stat: "10+",
                  description: "international partners and collaborations"
                }
              ].map((achievement, index) => (
                <motion.div
                  key={achievement.description}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center bg-gray-50 rounded-xl p-6"
                >
                  <div className="text-4xl font-bold text-[#2D5A27] mb-3">
                    {achievement.stat}
                  </div>
                  <div className="text-gray-600 leading-tight">
                    {achievement.description}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-8"
            >
              <button
                onClick={handleFollowClick}
                className="bg-[#2D5A27] text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-[#234620] transition-all duration-200 transform hover:scale-105"
              >
                Follow our Journey
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative h-[560px] rounded-2xl overflow-hidden shadow-xl lg:w-[640px]"
          >
            <OptimizedImage
              src="/images/about/3d-vis2.jpg"
              alt="3D Visualization of Urban Forest"
              className="object-cover w-full h-full object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs 