import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services, site } from '@/lib/site-content'

export function SiteFooter() {
  return <footer className="bg-foreground text-background">
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <div className="grid gap-12 border-b border-background/20 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex max-w-md flex-col gap-5"><Image src="/prospertia-logo.png" alt="Prospertia" width={202} height={58} className="h-auto w-44 brightness-0 invert" /><p className="text-lg leading-relaxed text-background/70">Senior thinking and hands-on execution for B2B businesses ready to market, sell and operate better.</p></div>
        <div className="flex flex-col gap-3"><p className="text-xs font-bold uppercase tracking-widest text-background/45">Explore</p><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link></div>
        <div className="flex flex-col gap-3"><p className="text-xs font-bold uppercase tracking-widest text-background/45">Capabilities</p>{services.map(s => <Link key={s.slug} href={`/services/${s.slug}`}>{s.title}</Link>)}</div>
      </div>
      <div className="flex flex-col gap-5 pt-8 text-sm text-background/55 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} Prospertia. All rights reserved.</p><div className="flex flex-wrap gap-5"><a href={site.linkedin}>LinkedIn <ArrowUpRight className="inline size-3" aria-hidden="true" /></a><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link></div></div>
    </div>
  </footer>
}
