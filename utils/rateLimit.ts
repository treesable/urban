import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
})

export async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ratelimit:${ip}`
  const limit = 5 // attempts
  const window = 15 * 60 // 15 minutes

  const current = await redis.incr(key)
  if (current === 1) {
    await redis.expire(key, window)
  }

  return current <= limit
} 