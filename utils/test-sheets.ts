import './test-env'
import { addSubmissionToSheet } from './googleSheets'

async function testConnection() {
  try {
    // Verify env variables are loaded
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      throw new Error('Missing required environment variables')
    }

    const success = await addSubmissionToSheet({
      name: 'Test User',
      email: 'test@example.com',
      organization: 'Test Org',
      primaryGoal: 'Testing',
      source: 'Direct',
      urgencyLevel: 1,
      budget: 'Test',
      interestedInvestor: false,
      additionalInfo: 'Test submission'
    })

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