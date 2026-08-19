import type { MetadataRoute } from 'next'
import { insights, services } from '@/lib/site-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://prospertia.com'
  const staticRoutes = ['', '/about', '/services', '/insights', '/contact']
  return [...staticRoutes.map(path => ({ url: `${base}${path}`, lastModified: new Date() })), ...services.map(item => ({ url: `${base}/services/${item.slug}`, lastModified: new Date() })), ...insights.map(item => ({ url: `${base}/insights/${item.slug}`, lastModified: new Date() }))]
}
