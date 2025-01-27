// Mock implementations for testing without external services
export const mockServices = {
  rateLimit: async () => ({ success: true, remaining: 10, reset: Date.now() + 3600000 }),
  recaptcha: async () => true,
  email: async () => ({ success: true }),
  db: {
    createEntry: async (data: any) => ({ ...data, id: 'mock-id', createdAt: new Date() })
  }
} 