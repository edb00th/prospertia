import { Bot, ChartNoAxesCombined, MonitorSmartphone, PanelsTopLeft } from 'lucide-react'

export const site = {
  name: 'Prospertia',
  descriptor: 'Growth & Transformation Consultancy',
  bookingUrl: 'https://calendly.com/prospertia/discovery-call',
  email: 'hello@prospertia.com',
  linkedin: '#',
}

export const services = [
  { slug: 'marketing-growth', title: 'Marketing & Growth', short: 'Create a clearer position, stronger campaigns and a marketing engine built around commercial priorities.', icon: ChartNoAxesCombined, includes: ['Marketing and go-to-market strategy', 'Positioning, campaigns and content', 'SEO, paid media direction and demand generation'] },
  { slug: 'sales-hubspot', title: 'Sales & HubSpot', short: 'Make sales and marketing work as one system, with better enablement and more useful HubSpot activity.', icon: PanelsTopLeft, includes: ['HubSpot marketing activity', 'Sales enablement and collateral', 'Onboarding and implementation coordination'] },
  { slug: 'web-technology', title: 'Web & Technology', short: 'Turn websites, digital journeys and technology choices into practical assets that support growth.', icon: MonitorSmartphone, includes: ['Websites and landing pages', 'Migrations and digital journeys', 'Marketing technology oversight'] },
  { slug: 'ai-transformation', title: 'AI & Transformation', short: 'Apply AI where it creates real leverage: better workflows, faster production and less operational friction.', icon: Bot, includes: ['AI adoption and practical roadmaps', 'Automation and workflow improvement', 'AI-enabled content and creative'] },
]

export const insights = [
  { slug: 'growth-exposes-gaps', category: 'Growth & strategy', title: 'Growth does not create every problem. It reveals the ones already there.', excerpt: 'Why disconnected marketing, sales and technology become harder to ignore as a B2B business scales.', date: '12 August 2026', read: '6 min read' },
  { slug: 'getting-more-from-hubspot', category: 'Sales & HubSpot', title: 'Getting more from HubSpot starts before another workflow is built', excerpt: 'The practical questions leadership teams should answer before investing in more CRM complexity.', date: '4 August 2026', read: '5 min read' },
  { slug: 'practical-ai-plan', category: 'AI & transformation', title: 'A practical AI plan begins with work, not tools', excerpt: 'Find the repetitive, slow and inconsistent work first. Then decide where AI genuinely helps.', date: '24 July 2026', read: '7 min read' },
]

export const method = ['Understand', 'Diagnose', 'Prioritise', 'Create', 'Deliver', 'Improve']

export const faqs = [
  { q: 'Is Prospertia a consultancy or an agency?', a: 'Prospertia is a boutique growth and transformation consultancy. You get senior commercial direction and hands-on execution, supported by trusted specialists where deeper delivery is needed.' },
  { q: 'Who is the best fit?', a: 'Founder-led and commercially ambitious B2B businesses, typically with 15–150 people, where growth has outpaced the marketing, sales or technology infrastructure.' },
  { q: 'Can we start with a defined project?', a: 'Yes. The Commercial Growth Audit is a useful standalone diagnostic and 90-day roadmap. Defined website, positioning, enablement and AI projects can also be scoped separately.' },
  { q: 'How does specialist delivery work?', a: 'Prospertia is explicit about what we do directly, what we lead and what trusted partners deliver. You keep one senior commercial lead without paying for a large permanent agency team.' },
]
