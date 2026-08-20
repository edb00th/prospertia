'use client'

import { FormEvent, useState } from 'react'

const WEB3FORMS_ACCESS_KEY = 'd91b3a49-a4ea-4ed2-a574-10a823014ef9'

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('sending')
        const form = event.currentTarget
        const data = Object.fromEntries(new FormData(form))
        try {
                const response = await fetch('https://api.web3forms.com/submit', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
                })
                const result = await response.json() as { success?: boolean }
                if (!response.ok || !result.success) throw new Error('Web3Forms submission failed')
                setStatus('sent')
                form.reset()
        } catch {
                setStatus('error')
        }
  }

  const control = 'mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20'
    return <form onSubmit={submit} className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 md:p-8">
        <label className="font-semibold">Name<input className={control} name="name" required minLength={2} autoComplete="name" /></label>
        <label className="font-semibold">Work email<input className={control} name="email" type="email" required autoComplete="email" /></label>
        <label className="font-semibold">Company<input className={control} name="company" required autoComplete="organization" /></label>
        <label className="font-semibold">What would you like to change?<textarea className={control} name="message" required minLength={20} rows={6} /></label>
        <button className="w-fit rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>button>
        <p aria-live="polite" className="min-h-6 text-sm text-muted-foreground">{status === 'sent' ? 'Thank you. Your enquiry has been sent.' : status === 'error' ? 'We could not send this yet. Please email hello@prospertia.com.' : ''}</p>p>
    </form>
      }</form>
