import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(entry: {
  email: string
  name: string
  verificationToken: string
}) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${entry.verificationToken}`

  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: entry.email,
    subject: 'Verify your waitlist registration',
    html: `
      <h1>Welcome to Urban Forestry Platform</h1>
      <p>Hi ${entry.name},</p>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `,
  })
} 