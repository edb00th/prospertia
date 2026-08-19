import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { PageIntro } from '@/components/marketing'

export const metadata: Metadata = { title: 'Contact', description: 'Start a conversation with Prospertia about building a stronger, more predictable growth engine.' }

export default function ContactPage() {
  return <><PageIntro eyebrow="Start a conversation" title="Let's make growth feel less uncertain." copy="Tell us what is getting in the way. We will come back with a clear view on whether and how Prospertia can help." /><section className="px-5 py-16 lg:px-8 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:gap-16"><div className="flex flex-col gap-5"><h2 className="text-3xl font-semibold">A useful first conversation.</h2><p className="text-lg leading-relaxed text-muted-foreground">There is no hard sell. We will explore your priorities, the commercial context and the gap between where you are and where you want to be.</p><a className="font-bold text-primary underline-offset-4 hover:underline" href="https://calendly.com/prospertia/discovery-call" target="_blank" rel="noreferrer">Prefer to choose a time? Book a discovery call →</a></div><ContactForm /></div></section></>
}
