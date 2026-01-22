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

    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const doc = new GoogleSpreadsheet(docId, auth)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      throw new Error('Sheet not found')
    }

    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Name': data.name,
      'Email': data.email,
      'Organization': data.organization || ''
    })

    return true
  } catch (error) {
    console.error('Google Sheets error:', error)
    throw error
  }
} 