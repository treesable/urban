import { z } from 'zod'

export const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  organization: z.string().optional(),
  // Questionnaire fields - match exactly with the form options
  primaryGoal: z.enum(['starting', 'challenges', 'enhance', 'exploring']).optional(),
  source: z.enum(['social', 'referral', 'search', 'other']).optional(),
  urgencyLevel: z.number().min(1).max(10).optional(),
  budget: z.enum(['price1', 'price2', 'price3', 'nobudget']).optional(),
  interestedInvestor: z.boolean().optional(),
  additionalInfo: z.string().optional(),
  isInitialSubmission: z.boolean()
})

export type WaitlistInput = z.infer<typeof waitlistSchema> 