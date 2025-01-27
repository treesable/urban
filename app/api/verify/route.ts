import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { message: 'Invalid verification link' },
      { status: 400 }
    )
  }

  try {
    const entry = await prisma.waitlistEntry.update({
      where: { verificationToken: token },
      data: { status: 'VERIFIED' }
    })

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/verified`)
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid or expired verification link' },
      { status: 400 }
    )
  }
} 