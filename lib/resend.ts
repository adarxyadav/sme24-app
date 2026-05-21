import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  from: string
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    await resend.emails.send(options)
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}
