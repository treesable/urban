import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

interface RateLimitResult {
  success: boolean
  remaining: number
  reset: number
}

export async function rateLimit(
  ip: string,
  limit: number = 5,
  window: number = 60 * 60 // 1 hour in seconds
): Promise<RateLimitResult> {
  if (process.env.NODE_ENV === 'development') {
    return {
      success: true,
      remaining: limit,
      reset: Date.now() + window * 1000
    }
  }

  const key = `ratelimit:${ip}`
  const now = Math.floor(Date.now() / 1000)

  try {
    // Remove old entries
    await redis.zremrangebyscore(key, 0, now - window)
    
    // Get current count
    const count = await redis.zcard(key)
    
    // Add current request timestamp
    await redis.zadd(key, {
      score: now,
      member: now.toString()
    })
    
    // Set expiry
    await redis.expire(key, window)

    return {
      success: (count as number) < limit,
      remaining: Math.max(0, limit - (count as number)),
      reset: now + window,
    }
  } catch (error) {
    console.error('Rate limit error:', error)
    // In case of error, allow the request
    return {
      success: true,
      remaining: 1,
      reset: now + window,
    }
  }
} 