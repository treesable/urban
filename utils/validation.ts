import { z } from 'zod'

export const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  organization: z.string().optional(),
  isInitialSubmission: z.boolean()
})

export type WaitlistInput = z.infer<typeof waitlistSchema> 