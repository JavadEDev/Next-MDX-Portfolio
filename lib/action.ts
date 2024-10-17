'use server'

import { z } from 'zod'
import { Resend } from 'resend'

import { ContactFormSchema, NewsLetterFormSchema } from './schema'

import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }
  try {
    const { message, name, email } = result.data
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      cc: ['javad.esmatib@gmail.com'],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    if (!data || error) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function subscribe(data: { email: string }) {
  const result = NewsLetterFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  return { success: true }
  
  try {
    const { email } = result.data
    const { data: emailData, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Newsletter Subscription Confirmation',
      text: `Thank you for subscribing to our newsletter!`,
      html: `<p>Thank you for subscribing to our newsletter!</p>`
    })

    if (!emailData || error) {
      throw new Error('Failed to send subscription confirmation email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}
