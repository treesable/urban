'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const HeroSection = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Basic client-side validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    if (!name || name.trim().length < 2) {
      setError('Please enter your name (at least 2 characters)')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(10,15,13,0.75)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12 flex items-center justify-center gap-3"
          >
            <Image
              src="/logo.svg"
              alt="Tree Impact Logo"
              width={42}
              height={42}
              className="w-[42px] h-[42px]"
            />
            <h1 className="text-[2rem] font-semibold text-white tracking-tight">
              Tree Impact
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm md:text-base uppercase tracking-wider text-white/85 mb-10 font-normal"
          >
            MAKE YOUR IMPACT MEASURABLE
          </motion.p>

          {/* Coming Soon */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-[clamp(3rem,10vw,7rem)] font-extrabold text-white mb-8 leading-none tracking-wide uppercase"
          >
            COMING<br />SOON
          </motion.h2>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-[#f8f8f5] mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          >
            <p>Transform how you track, measure, and communicate trees impact.</p>
            <p>Stay tuned for our full web platform.</p>
          </motion.div>

          {/* Waitlist Form */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-[10px] rounded-3xl p-8 max-w-2xl mx-auto border border-white/20"
            >
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Thanks! You&apos;re on the list. 🌱</h3>
                <p className="text-white/80">We&apos;ll notify you when we launch.</p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-stretch gap-0 bg-white/15 backdrop-blur-[10px] rounded-[50px] p-2 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all focus-within:bg-white/20 focus-within:border-white/30 focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  minLength={2}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 text-base border-none bg-transparent text-white placeholder-white/60 outline-none font-sans min-w-0 md:border-r border-white/20"
                  aria-label="Your name"
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 text-base border-none bg-transparent text-white placeholder-white/60 outline-none font-sans min-w-0"
                  aria-label="Email address for notifications"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-4 text-base font-semibold text-[#0a0f0d] bg-white rounded-[50px] cursor-pointer transition-all hover:bg-[#f8f8f5] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap min-w-[140px]"
                >
                  {isSubmitting ? (
                    <span className="inline-flex gap-1 items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-[#0a0f0d] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-1.5 h-1.5 bg-[#0a0f0d] rounded-full animate-bounce" style={{ animationDelay: '0.16s' }} />
                      <span className="w-1.5 h-1.5 bg-[#0a0f0d] rounded-full animate-bounce" style={{ animationDelay: '0.32s' }} />
                    </span>
                  ) : (
                    'Notify Me'
                  )}
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-5 p-4 rounded-xl bg-[rgba(248,113,113,0.15)] text-[#f87171] border border-[rgba(248,113,113,0.3)] text-sm font-medium"
                  role="alert"
                >
                  {error}
                </motion.div>
              )}
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection 