'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { waitlistSchema, type WaitlistInput } from '@/utils/validation'
import MultiStepQuestionnaire from './MultiStepQuestionnaire'
import { z } from 'zod'

interface QuestionnaireData {
  primaryGoal?: string
  source?: string
  urgencyLevel?: number
  budget?: string
  interestedInvestor?: boolean
  additionalInfo?: string
}

const WaitlistForm = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [organization, setOrganization] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    try {
      const input: WaitlistInput = {
        name,
        email,
        organization: organization || undefined,
        ...questionnaireData
      }
      
      waitlistSchema.parse(input)
      
      setIsSubmitting(true)
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Submission failed')
      }
      
      setIsSubmitting(false)
      setShowQuestionnaire(true)
    } catch (err) {
      setIsSubmitting(false)
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message)
      } else {
        setError('Something went wrong')
      }
    }
  }

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    setQuestionnaireData(data)
    // Send updated data to API
    fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        organization,
        ...data
      }),
    })
  }

  return (
    <>
      <div id="waitlist-form" className="bg-[#90EE90] rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-lg mb-2 font-semibold text-[#234620]">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full px-5 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-gray-400 text-lg ${
                error?.includes('Name') 
                  ? 'ring-2 ring-red-300 focus:ring-red-500' 
                  : 'focus:ring-[#234620]'
              }`}
              placeholder="Enter your name"
            />
            {error?.includes('Name') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-[#234620]"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-lg mb-2 font-semibold text-[#234620]">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-5 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-gray-400 text-lg ${
                error?.includes('email') 
                  ? 'ring-2 ring-red-300 focus:ring-red-500' 
                  : 'focus:ring-[#234620]'
              }`}
              placeholder="Enter your email"
            />
            {error?.includes('email') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-[#234620]"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="organization" className="block text-lg mb-2 font-semibold text-[#234620]">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className={`w-full px-5 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 transition-all placeholder-gray-400 text-lg ${
                error?.includes('Organization') 
                  ? 'ring-2 ring-red-300 focus:ring-red-500' 
                  : 'focus:ring-[#234620]'
              }`}
              placeholder="Enter your organization"
            />
            {error?.includes('Organization') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-[#234620]"
              >
                {error}
              </motion.p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#234620] text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-[#1a351a] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Joining...' : 'Start Now'}
          </motion.button>
        </form>
      </div>

      {showQuestionnaire && (
        <MultiStepQuestionnaire
          initialData={{ name, email, organization }}
          onClose={() => setShowQuestionnaire(false)}
          onComplete={handleQuestionnaireComplete}
        />
      )}
    </>
  )
}

export default WaitlistForm 