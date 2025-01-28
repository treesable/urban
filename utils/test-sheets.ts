import './test-env'
import { addSubmissionToSheet } from './googleSheets'
import type { WaitlistInput } from './validation'

async function testConnection() {
  try {
    // Verify env variables are loaded
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Missing required environment variables')
    }

    const testData: WaitlistInput = {
      name: 'Test User',
      email: 'test@example.com',
      organization: 'Test Org',
      primaryGoal: 'starting',
      source: 'social',
      urgencyLevel: 1,
      budget: 'price1',
      interestedInvestor: false,
      additionalInfo: 'Test submission',
      isInitialSubmission: true
    }

    const success = await addSubmissionToSheet(testData)

    if (success) {
      console.log('Test row added successfully!')
      return true
    } else {
      throw new Error('Failed to add test row')
    }
  } catch (error) {
    console.error('Test failed:', error)
    return false
  }
}

// Run test
testConnection()
  .then(() => process.exit(0))
  .catch(() => process.exit(1)) 