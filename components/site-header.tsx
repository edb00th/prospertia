'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { site } from '@/lib/site-content'

const links = [['/about', 'About'], ['/services', 'Services'], ['/insights', 'Insights'], ['/contact', 'Contact']]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
      <Link href="/" aria-label="Prospertia home"><Image src="/prospertia-logo.png" alt="Prospertia" width={202} height={58} className="h-auto w-44" priority /></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
        {links.map(([href, label]) => <Link key={href} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</Link>)}
        <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Book a call</a>
      </nav>
      <button type="button" className="flex size-11 items-center justify-center rounded-full border border-border md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
    {open && <nav id="mobile-menu" aria-label="Mobile navigation" className="flex flex-col gap-1 border-t border-border bg-background p-5 md:hidden">
      {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-lg font-semibold hover:bg-muted">{label}</Link>)}
      <a href={site.bookingUrl} target="_blank" rel="noreferrer" className="mt-2 rounded-xl bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">Book a call</a>
    </nav>}
  </header>
}
