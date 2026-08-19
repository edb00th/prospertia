import type { Metadata } from 'next'
import { PremiumHome } from '@/components/premium-home'

export const metadata: Metadata = {
  title: 'Prospertia | B2B launch, growth & transformation consultancy',
  description: 'Launch and scale with joined-up marketing, sales, technology and AI — without the overhead.',
  alternates: { canonical: '/' },
}

export default function Page() {
  return <PremiumHome />
}
