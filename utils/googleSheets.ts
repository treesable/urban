import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

const auth = new JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_DOCUMENT_ID!, auth)

export async function addSubmissionToSheet(data: {
  name: string
  email: string
  organization?: string
  primaryGoal?: string
  source?: string
  urgencyLevel?: number
  budget?: string
  interestedInvestor?: boolean
  additionalInfo?: string
}) {
  try {
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    
    // Debug log
    console.log('interestedInvestor value:', data.interestedInvestor)
    
    // Format the timestamp for better readability
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const row = {
      'Timestamp': timestamp,
      'Name': data.name,
      'Email': data.email.trim(),
      'Organization': data.organization || '',
      'Primary Goal': data.primaryGoal || '',
      'Source': data.source || '',
      'Urgency Level': data.urgencyLevel?.toString() || '',
      'Budget': data.budget || '',
      'Interested Investor': data.interestedInvestor ? 'Yes' : 'No',
      'Additional Info': data.additionalInfo || ''
    }

    // Debug log
    console.log('Row data:', row)

    await sheet.addRow(row, { raw: true })

    return true
  } catch (error) {
    console.error('Error adding to sheet:', error)
    return false
  }
} 