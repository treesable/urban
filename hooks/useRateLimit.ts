import { useState, useEffect } from 'react'

export const useRateLimit = (maxAttempts: number, timeWindow: number) => {
  const [attempts, setAttempts] = useState<number[]>([])

  useEffect(() => {
    // Clean up old attempts
    const now = Date.now()
    setAttempts(prev => prev.filter(timestamp => now - timestamp < timeWindow))
  }, [timeWindow])

  const isRateLimited = attempts.length >= maxAttempts

  const incrementAttempts = () => {
    setAttempts(prev => [...prev, Date.now()])
  }

  return { isRateLimited, incrementAttempts }
} 