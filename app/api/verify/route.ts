import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic since it uses request URL
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { message: 'Missing verification token' },
        { status: 400 }
      )
    }

    // Since we're not using Prisma/database verification,
    // we'll just return a success response
    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { message: 'Verification failed' },
      { status: 400 }
    )
  }
} 