'use server'

import { z } from 'zod'
import { Resend } from 'resend'

import { ContactFormSchema, NewsLetterFormSchema } from './schema'

import ContactFormEmail from '@/emails/contact-form-email'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
type NewsletterFormInputs = z.infer<typeof NewsLetterFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }
  try {
    const { message, name, email } = result.data
    const { data: resendData, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      cc: ['javad.esmatib@gmail.com'],
      subject: 'Contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message })
    })

    if (!resendData || error) {
      throw new Error('Failed to send email')
    }

    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) }
  }
}

export async function subscribe(data: NewsletterFormInputs) {
  const result = NewsLetterFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { email } = result.data
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string
    })

    if (!data || error) {
      throw new Error('Failed to send subscription confirmation email')
    }
    // Send welcome email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'javad.esmatib@gmail.com',
      subject: 'Welcome to Our Newsletter!',
      text: `Thank you for subscribing to our newsletter. We're excited to have you on board!`,
      html: `<h1>Welcome to Our Newsletter!</h1><p>Thank you for subscribing to our newsletter. We're excited to have you on board!</p>`
    })

    if (!emailData || emailError) {
      throw new Error('Failed to send welcome email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}
