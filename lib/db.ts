import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function createWaitlistEntry(data: {
  email: string
  name: string
  role: string
  organization?: string
}) {
  // In development, just log the data
  if (process.env.NODE_ENV === 'development') {
    console.log('Development mode - Entry would be created:', data)
    return {
      ...data,
      id: 'mock-id',
      verificationToken: 'mock-token',
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  return prisma.waitlistEntry.create({
    data: {
      ...data,
      verificationToken: generateToken(),
      status: 'PENDING',
    },
  })
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
} 