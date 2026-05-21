'use server'

import { sendEmail } from '@/lib/resend'

export type ContactFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message?: string }

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const company = formData.get('company')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  if (!name || !email || !message) {
    return { status: 'error', message: 'Name, email, and message are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    return { status: 'error', message: 'Contact address not configured. Please try again later.' }
  }

  const html = `
    <p><strong>Name:</strong> ${name}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
    <p><strong>Email:</strong> ${email}</p>
    <hr />
    <p>${message.replace(/\n/g, '<br />')}</p>
  `

  const result = await sendEmail({
    from: 'SME24 Contact <noreply@sme24.ch>',
    to: contactEmail,
    subject: `Contact form: ${name}${company ? ` (${company})` : ''}`,
    html,
  })

  if (!result.success) {
    return { status: 'error', message: 'Failed to send message. Please try again.' }
  }

  return { status: 'success' }
}
