'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const WaitlistForm = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          isInitialSubmission: true
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setIsSuccess(true)
      setIsSubmitting(false)
      setName('')
      setEmail('')
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit')
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#90EE90] rounded-2xl p-6 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-[#2D5A27] mb-2">Thank you for joining!</h3>
        <p className="text-[#234620]">We&apos;ll be in touch soon with more information.</p>
      </motion.div>
    )
  }

  return (
    <div id="waitlist-form" className="bg-[#90EE90] rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-[#2D5A27] mb-6">
        Join the Waitlist
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="waitlist-name" className="block text-lg mb-2 font-semibold text-[#234620]">
            Name
          </label>
          <input
            type="text"
            id="waitlist-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234620] transition-all"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="waitlist-email" className="block text-lg mb-2 font-semibold text-[#234620]">
            Email
          </label>
          <input
            type="email"
            id="waitlist-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#234620] transition-all"
            placeholder="Enter your email"
            disabled={isSubmitting}
          />
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#234620] text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg hover:bg-[#1a351a] transition-all disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Join Now'}
        </button>
      </form>
    </div>
  )
}

export default WaitlistForm 