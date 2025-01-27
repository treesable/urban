import { NextResponse } from 'next/server'
import { waitlistSchema } from '../../../utils/validation'
// import { checkRateLimit } from '../../../utils/rateLimit'  // Comment this out for now
import { addSubmissionToSheet } from '../../../utils/googleSheets'

export async function POST(req: Request) {
  try {
    // Comment out rate limiting for development
    // const ip = req.headers.get('x-forwarded-for') || 'unknown'
    // const allowed = await checkRateLimit(ip)
    // if (!allowed) {
    //   return NextResponse.json(
    //     { message: 'Too many attempts. Please try again later.' },
    //     { status: 429 }
    //   )
    // }

    // Parse and validate input
    const body = await req.json()
    const validatedData = waitlistSchema.parse(body)

    // Add to Google Sheet
    const success = await addSubmissionToSheet(validatedData)
    
    if (!success) {
      throw new Error('Failed to save submission')
    }

    return NextResponse.json(
      { message: 'Successfully joined waitlist' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 400 }
    )
  }
} 