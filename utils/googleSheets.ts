import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import type { WaitlistInput } from './validation'

export async function addSubmissionToSheet(data: WaitlistInput) {
  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const docId = process.env.GOOGLE_SHEETS_DOCUMENT_ID

    if (!privateKey || !clientEmail || !docId) {
      throw new Error('Missing required environment variables')
    }

    const formattedKey = `-----BEGIN PRIVATE KEY-----\n${privateKey}\n-----END PRIVATE KEY-----`

    const auth = new JWT({
      email: clientEmail,
      key: formattedKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(docId, auth)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      throw new Error('Sheet not found')
    }

    if (data.isInitialSubmission) {
      await sheet.addRow({
        'Timestamp': new Date().toISOString(),
        'Name': data.name,
        'Email': data.email,
        'Organization': data.organization || ''
      })
    } else {
      const rows = await sheet.getRows()
      const existingRow = [...rows].reverse().find(r => r.get('Email') === data.email)
      
      if (existingRow) {
        if (data.primaryGoal) existingRow.set('Primary Goal', data.primaryGoal)
        if (data.source) existingRow.set('Source', data.source)
        if (data.urgencyLevel) existingRow.set('Urgency Level', data.urgencyLevel.toString())
        if (data.budget) existingRow.set('Budget', data.budget)
        existingRow.set('Interested Investor', data.interestedInvestor ? 'Yes' : 'No')
        if (data.additionalInfo) existingRow.set('Additional Info', data.additionalInfo)
        await existingRow.save()
      } else {
        await sheet.addRow({
          'Timestamp': new Date().toISOString(),
          'Name': data.name,
          'Email': data.email,
          'Organization': data.organization || '',
          'Primary Goal': data.primaryGoal || '',
          'Source': data.source || '',
          'Urgency Level': data.urgencyLevel ? data.urgencyLevel.toString() : '',
          'Budget': data.budget || '',
          'Interested Investor': data.interestedInvestor ? 'Yes' : 'No',
          'Additional Info': data.additionalInfo || ''
        })
      }
    }

    return true
  } catch (error) {
    console.error('Google Sheets error:', error)
    throw error
  }
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim()
    .slice(0, 1000) // Limit length
} 