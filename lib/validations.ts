export const validateEmail = (email: string): boolean => {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return false

  // Domain validation
  const [, domain] = email.split('@')
  if (domain.startsWith('.') || domain.endsWith('.')) return false

  // Disposable email check (simplified version)
  const disposableDomains = ['tempmail.com', 'throwaway.com']
  return !disposableDomains.some(d => domain.includes(d))
}

export const validateRole = (role: string): boolean => {
  const validRoles = [
    'Urban Forester',
    'City Planner',
    'Landscape Architect',
    'Environmental Manager',
    'Other'
  ]
  return validRoles.includes(role)
} 