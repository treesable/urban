// Simple in-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()

export function checkRateLimit(ip: string, isQuestionnaire: boolean = false): boolean {
  // Always return true in production for now (can be enhanced later)
  if (process.env.NODE_ENV === 'production') {
    return true
  }
  
  // Use existing in-memory implementation for development
  const now = Date.now()
  const windowMs = 5 * 60 * 1000 // 5 minutes
  // Different limits for initial form vs questionnaire
  const maxAttempts = isQuestionnaire ? 5 : 10 // stricter for questionnaire

  const key = isQuestionnaire ? `${ip}_questionnaire` : ip
  const current = rateLimitStore.get(key)
  
  // Clean up old entries
  if (current && now - current.timestamp > windowMs) {
    rateLimitStore.delete(key)
  }

  // If no record or cleaned up, create new
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, timestamp: now })
    return true
  }

  // Increment count
  const record = rateLimitStore.get(key)!
  record.count++
  
  return record.count <= maxAttempts
} 