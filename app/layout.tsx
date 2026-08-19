import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'
import { SiteChrome } from '@/components/site-chrome'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  metadataBase: new URL('https://prospertia.com'),
  title: { default: 'Prospertia | Growth & Transformation Consultancy', template: '%s | Prospertia' },
  description: 'Prospertia helps B2B businesses launch and scale with joined-up marketing, sales, technology and AI — without the overhead.',
  openGraph: { title: 'Prospertia', description: 'One senior partner across every commercial lever — without the overhead.', type: 'website', locale: 'en_GB' },
}
export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Prospertia', url: 'https://prospertia.com', description: 'Launch, growth and transformation consultancy for B2B startups and established businesses', areaServed: 'United Kingdom' }
  return <html lang="en" className="bg-background"><body className={`${manrope.variable} ${geistMono.variable}`}><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3">Skip to content</a><SiteChrome>{children}</SiteChrome><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
