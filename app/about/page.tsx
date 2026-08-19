import type { Metadata } from 'next'
import { CTA, SectionHeading } from '@/components/marketing'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn how Prospertia combines senior commercial thinking with practical delivery.',
}

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-20 lg:px-8 lg:py-28">
          <p className="font-mono text-xs font-bold uppercase tracking-[.2em] text-accent-foreground">About Prospertia</p>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-.045em] md:text-7xl">Senior capability.<br /><span className="text-primary">Without the big-agency machinery.</span></h1>
          <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">Prospertia is a boutique growth and transformation consultancy for B2B businesses that need joined-up thinking and the ability to make things happen.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2">
          <SectionHeading eyebrow="Why Prospertia" title="Commercial problems rarely stay in one department." />
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
            <p>Prospertia does not begin with a channel, platform or pre-set deliverable. Every engagement starts with the business objective, diagnoses what is getting in the way, and creates a clear sequence of priorities.</p>
            <p>Senior commercial direction, practical execution, AI and technology are brought together in one accountable working model. Trusted specialists add deeper capability when the brief requires it.</p>
            <p className="font-semibold text-foreground">Clear priorities. Joined-up delivery. Visible progress.</p>
          </div>
        </div>
      </section>
      <CTA title="Bring the commercial picture into focus." body="Start with a practical conversation about the priorities, constraints and opportunities shaping growth." />
    </main>
  )
}
