import { z } from 'zod'

export const waitlistSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: z.string()
    .email('Please enter a valid email')
    .refine(
      (email) => {
        const blockedDomains = ['.xyz', 'temporary.', 'temp.', 'disposable.']
        return !blockedDomains.some(domain => email.toLowerCase().includes(domain))
      }, 
      'Please use a business email'
    ),
  organization: z.string()
    .min(2, 'Organization name is too short')
    .max(100, 'Organization name is too long')
    .optional(),
  primaryGoal: z.string().optional(),
  source: z.string().optional(),
  urgencyLevel: z.number().optional(),
  budget: z.string().optional(),
  interestedInvestor: z.boolean().optional(),
  additionalInfo: z.string().optional()
})

export type WaitlistInput = z.infer<typeof waitlistSchema> 