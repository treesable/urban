import { NextResponse } from 'next/server'
import { waitlistSchema } from '@/utils/validation'
import { checkRateLimit } from '@/utils/rateLimit'

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || 'unknown'
    const body = await req.json()
    
    const isAllowed = checkRateLimit(ip, false)
    
    if (!isAllowed) {
      return NextResponse.json({
        success: false,
        error: 'Please wait a few minutes before trying again.'
      }, { status: 429 })
    }

    const validatedData = waitlistSchema.parse(body)
    
    // Get Brevo configuration from environment variables
    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID
    
    if (!brevoApiKey || !brevoListId) {
      console.error('Missing Brevo configuration - API Key:', !!brevoApiKey, 'List ID:', !!brevoListId)
      return NextResponse.json({
        success: false,
        error: 'Server configuration error. Please try again later.'
      }, { status: 500 })
    }

    // Log the submission for debugging (remove in production)
    console.log('Submitting to Brevo:', {
      email: validatedData.email,
      name: validatedData.name,
      listId: brevoListId
    })

    // Submit to Brevo API
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify({
        email: validatedData.email.trim(),
        attributes: {
          FIRSTNAME: validatedData.name.trim() || '',
          LASTNAME: ''
        },
        listIds: [parseInt(brevoListId, 10)],
        updateEnabled: true
      })
    })

    // Log Brevo response for debugging
    const responseStatus = brevoResponse.status
    console.log('Brevo API response status:', responseStatus)

    // Handle Brevo response
    if (brevoResponse.ok || brevoResponse.status === 204) {
      return NextResponse.json({ 
        success: true,
        message: 'Successfully added to waitlist'
      })
    } else {
      const errorData = await brevoResponse.json().catch(() => ({}))
      
      // Handle duplicate email gracefully (contact already exists)
      if (brevoResponse.status === 400 && (
        errorData.code === 'duplicate_parameter' || 
        errorData.message?.toLowerCase().includes('duplicate') ||
        errorData.message?.toLowerCase().includes('already exists')
      )) {
        // Show success even if already subscribed
        return NextResponse.json({ 
          success: true,
          message: 'Successfully added to waitlist'
        })
      } else {
        const errorMessage = errorData.message || errorData.error || `HTTP ${brevoResponse.status}: ${brevoResponse.statusText}`
        console.error('Brevo API error:', {
          status: brevoResponse.status,
          statusText: brevoResponse.statusText,
          error: errorMessage,
          fullError: errorData
        })
        return NextResponse.json({
          success: false,
          error: errorMessage || 'Failed to process submission. Please try again.'
        }, { status: 400 })
      }
    }

  } catch (error) {
    console.error('Waitlist submission error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process submission'
    }, { status: 400 })
  }
} 