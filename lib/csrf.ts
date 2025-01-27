import Tokens from 'csrf'

const tokens = new Tokens()

export function getCsrfToken(): string {
  return tokens.create(process.env.CSRF_SECRET || '')
}

export function validateCsrfToken(token: string): boolean {
  return tokens.verify(process.env.CSRF_SECRET || '', token)
} 