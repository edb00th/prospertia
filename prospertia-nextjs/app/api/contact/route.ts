import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(2).max(80), email: z.string().email().max(160), company: z.string().min(2).max(120), turnover: z.string().max(60).optional(), message: z.string().min(20).max(3000) })

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Invalid enquiry' }, { status: 400 })
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return NextResponse.json({ error: 'Email delivery is not configured' }, { status: 503 })
  const resend = new Resend(RESEND_API_KEY)
  const { name, email, company, turnover, message } = parsed.data
  const result = await resend.emails.send({ from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL, replyTo: email, subject: `Prospertia enquiry from ${name} at ${company}`, text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nApprox. turnover: ${turnover || 'Not specified'}\n\n${message}` })
  if (result.error) return NextResponse.json({ error: 'Delivery failed' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
