import { NextResponse } from 'next/server'
import { waitlistSchema } from '@/utils/validation'
import { addSubmissionToSheet } from '@/utils/googleSheets'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = waitlistSchema.parse(body)
    await addSubmissionToSheet(validatedData)
    
    return NextResponse.json({ 
      success: true,
      message: 'Successfully added to waitlist'
    })

  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process submission'
    }, { status: 400 })
  }
} 