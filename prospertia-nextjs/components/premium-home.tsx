'use client'

import Image from 'next/image'
import { FormEvent, useEffect, useState } from 'react'

const CALENDLY = 'https://calendly.com/prospertia/discovery-call'

const capabilities = [
  ['Marketing & Growth', 'Positioning, go-to-market, campaigns, content, SEO, creative and paid media.'],
  ['Sales & HubSpot', 'CRM strategy, pipeline design, sales enablement, automation, reporting and HubSpot delivery.'],
  ['Web & Technology', 'Websites, customer journeys, analytics, integrations and marketing technology oversight.'],
  ['AI & Transformation', 'Practical AI adoption and workflow automation that improve output without adding roles.'],
]
const method = ['Align', 'Diagnose', 'Prioritise', 'Design', 'Deliver', 'Improve']
const faqs = [
  ['Who does Prospertia work with?', 'Founders, CEOs and commercial leaders at B2B startups, scale-ups and established businesses that need joined-up capability without another permanent senior hire.'],
  ['Can you review our sales and marketing technology stack?', 'Yes. The Growth Audit assesses CRM, sales tools, martech, website, analytics, automation, integrations and AI — then identifies what to keep, replace, connect or stop paying for.'],
  ['How does Prospertia keep the operating model lean?', 'You get senior direction, hands-on delivery and specialist depth when needed, without carrying every capability as fixed headcount.'],
  ['Why not use a full-service agency?', 'Agencies often organise around channels. Prospertia organises around commercial priorities, connects marketing, sales and technology, and stays accountable for delivery.'],
  ['Is Prospertia a HubSpot implementation specialist?', 'Prospertia defines the CRM strategy and roadmap, then coordinates proven HubSpot and RevOps specialists for deep technical implementation.'],
  ['Can we start smaller?', 'Yes. The Commercial Growth Audit is a standalone review with clear decisions and a prioritised 90-day roadmap. There is no obligation to continue.'],
]

function Arrow() { return <span className="ph-arrow" aria-hidden="true" /> }
function BookingLink({ children, className = 'ph-button ph-button-primary' }: { children: React.ReactNode, className?: string }) { return <a href={CALENDLY} target="_blank" rel="noreferrer" className={className}>{children}<Arrow /></a> }

export function PremiumHome() {
  const [menu, setMenu] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [story, setStory] = useState(false)
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'fallback'>('idle')
  useEffect(() => {
    document.body.style.overflow = menu || story ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); setStory(false) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown) }
  }, [menu, story])
  useEffect(() => {
    document.documentElement.classList.add('ph-motion-ready')
    const nodes = document.querySelectorAll<HTMLElement>('.ph-reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('ph-visible'))
      return () => document.documentElement.classList.remove('ph-motion-ready')
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ph-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.04, rootMargin: '120px 0px 120px 0px' })
    nodes.forEach((node) => observer.observe(node))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('ph-motion-ready')
    }
  }, [])
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      access_key: 'd91b3a49-a4ea-4ed2-a574-10a823014ef9',
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      turnover: String(formData.get('turnover') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json() as { success?: boolean }
      if (!response.ok || !result.success) throw new Error('Web3Forms submission failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('fallback')
    }
  }
  return <>
    <header className="ph-header">
      <a className="ph-brand" href="#top"><Image src="/logo.png" alt="Prospertia" width={666} height={187} priority /></a>
      <nav className="ph-nav" aria-label="Primary"><a href="#services">Capabilities</a><a href="#method">Method</a><a href="#work">Work</a><a href="#pricing">Ways to work</a></nav>
      <a href="#audit" className="ph-button ph-button-small">Explore the Growth Audit <span aria-hidden="true">↓</span></a>
      <button className="ph-menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu">{menu ? 'Close' : 'Menu'}</button>
    </header>
    {menu && <nav className="ph-mobile-nav" aria-label="Mobile"><a onClick={() => setMenu(false)} href="#services">Capabilities</a><a onClick={() => setMenu(false)} href="#method">Method</a><a onClick={() => setMenu(false)} href="#work">Work</a><a onClick={() => setMenu(false)} href="#pricing">Ways to work</a><a onClick={() => setMenu(false)} href="#audit" className="ph-button ph-button-primary">Explore the Growth Audit <span aria-hidden="true">↓</span></a></nav>}

    <main id="main-content">
      <section className="ph-hero" id="top">
        <div className="ph-hero-copy"><p className="ph-eyebrow">B2B launch, growth & transformation consultancy</p><h1>One senior partner.<br/><em><span className="ph-hero-nowrap">Every commercial lever.</span></em></h1><p className="ph-lead">Prospertia helps B2B businesses launch and scale with joined-up marketing, sales, technology and AI—without the overhead.</p><div className="ph-actions"><a href="#audit" className="ph-button ph-button-primary">Explore the Growth Audit <span aria-hidden="true">↓</span></a><BookingLink className="ph-text-link">Book a discovery call</BookingLink></div><p className="ph-call-note">A focused diagnostic · clear priorities · a practical 90-day roadmap · no obligation to continue</p></div>
        <div className="ph-system" aria-label="Prospertia commercial system">
          <div className="ph-system-ring ph-system-ring-1" />
          <div className="ph-system-ring ph-system-ring-2" />
          <div className="ph-system-ring ph-system-ring-3" />
          <span className="ph-system-line ph-system-line-1" />
          <span className="ph-system-line ph-system-line-2" />
          <span className="ph-system-line ph-system-line-3" />
          <span className="ph-system-line ph-system-line-4" />
          <div className="ph-system-core"><img src="/logo.png" alt="Prospertia" width="180" height="51" /><strong>Joined-up<br/>growth</strong><small>One connected system</small></div>
          {capabilities.map(([title], i) => <div key={title} className={`ph-orbit ph-orbit-${i+1}`}><span>0{i+1}</span><strong>{title}</strong></div>)}
        </div>
      </section>

      <section className="ph-signal" aria-label="Prospertia approach"><div className="ph-signal-track">{[0, 1].map((copy) => <div className="ph-signal-group" aria-hidden={copy === 1} key={copy}><span>Launch lean</span><span>Scale smarter</span><span>Joined-up growth</span><span>Senior direction</span><span>Hands-on delivery</span><span>Less overhead</span></div>)}</div></section>

      <section className="ph-section ph-reveal ph-audit" id="audit"><div className="ph-audit-intro"><p className="ph-eyebrow">The recommended starting point</p><h2>Commercial Growth Audit</h2><p>Find what is constraining growth, where budget is being diluted and what to do next.</p><div className="ph-audit-price"><strong>From £2,500</strong><span>Typically completed in 2–3 weeks</span></div><a href="#contact" className="ph-button ph-button-primary">Enquire about an audit <Arrow /></a></div><div className="ph-audit-details"><div><span>01</span><h3>Review the system</h3><p>Assess go-to-market, marketing, sales, CRM, website, analytics, automation, AI and the technology stack.</p></div><div><span>02</span><h3>Make the decisions</h3><p>Decide what to keep, replace, integrate or stop — and where flexible capability is smarter than hiring.</p></div><div><span>03</span><h3>Focus investment</h3><p>Direct budget and leadership attention towards the tools, campaigns and media most likely to drive growth.</p></div><aside><strong>What you receive</strong><ul><li>Leadership and commercial review</li><li>Technology and capability decisions</li><li>Prioritised 90-day roadmap</li><li>Investment and delivery priorities</li></ul><small>Standalone engagement. No obligation to continue.</small></aside></div></section>

      <section className="ph-section ph-reveal ph-problem"><div><p className="ph-eyebrow">The leadership challenge</p><h2>Growth investment gets absorbed by complexity.</h2></div><div className="ph-problem-copy"><p>Disconnected agencies, underused tools and premature hires add cost without building momentum.</p><ul><li>No single view across marketing, sales and technology</li><li>CRM, martech and sales tools overlap or go underused</li><li>Budget funds coordination instead of demand</li><li>Teams stay busy without clear priorities</li></ul></div></section>

      <section className="ph-section ph-reveal ph-approach" id="approach"><p className="ph-eyebrow ph-eyebrow-light">The Prospertia operating model</p><h2><span className="ph-heading-line">Senior direction.</span><br/><em>Flexible delivery.</em></h2><p>One accountable partner works with leadership, delivers directly and adds specialist depth only where needed.</p><div className="ph-model"><div><span>01 / Lead</span><h3>Leadership alignment</h3><p>Turn business goals into clear priorities, investment choices and ownership.</p></div><div><span>02 / Do</span><h3>Hands-on execution</h3><p>Build the campaigns, websites, content, systems and sales enablement that create momentum.</p></div><div><span>03 / Scale</span><h3>Specialist depth</h3><p>Add proven technical specialists when required, coordinated through Prospertia.</p></div></div></section>

      <section className="ph-section ph-reveal" id="services"><div className="ph-section-head"><div><p className="ph-eyebrow">What we do</p><h2>Four capabilities.<br/>One commercial system.</h2></div><p>Connect strategy, tools and execution through one senior partner — with specialist depth where it adds value.</p></div><div className="ph-capabilities">{capabilities.map(([title, copy], i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p><div className="ph-cap-line" /></article>)}</div></section>

      <section className="ph-section ph-reveal ph-method-section" id="method"><div className="ph-method-sticky"><p className="ph-eyebrow">The method</p><h2>From priorities to progress.</h2><p>Diagnose clearly, decide quickly and deliver what matters.</p></div><div className="ph-method-list">{method.map((item, i) => <div key={item}><span>0{i+1}</span><h3>{item}</h3><p>{['Agree the outcome, constraints and ambition.','Find the gaps across proposition, pipeline, people, tools and data.','Choose the few moves that deserve attention now.','Define the operating model, stack, campaigns and roadmap.','Execute directly and coordinate specialists.','Measure, learn and reinvest in what works.'][i]}</p></div>)}</div></section>

      <section className="ph-section ph-reveal ph-proof" id="work"><div className="ph-section-head"><div><p className="ph-eyebrow ph-eyebrow-light">Selected work</p><h2>Embedded commercial delivery.</h2></div><p>Invevo · multi-year partnership</p></div><div className="ph-proof-grid"><div><h3>Commercial infrastructure built with a growing B2B SaaS team.</h3><p>Ongoing support across marketing, website, content, creative and HubSpot.</p><ul><li>Embedded marketing, web, content and HubSpot support</li><li>Senior direction with hands-on execution</li><li>Specialists coordinated for technical delivery</li></ul><button className="ph-button ph-button-light" onClick={() => setStory(true)}>Read the working story <Arrow /></button></div><div className="ph-artifacts"><div><span>01</span><strong>Website evolution</strong><small>Approved artefact to be added</small></div><div><span>02</span><strong>Campaign systems</strong><small>Approved artefact to be added</small></div><div><span>03</span><strong>HubSpot activity</strong><small>Approved artefact to be added</small></div></div></div></section>

      <section className="ph-trust"><p>One senior relationship. Clear decisions. Visible delivery.</p><div><span>Senior input</span><span>No account layers</span><span>Clear ownership</span><span>Visible delivery</span></div></section>

      <section className="ph-section ph-reveal" id="pricing"><div className="ph-section-head"><div><p className="ph-eyebrow">After the audit</p><h2>Choose the support the roadmap needs.</h2></div><p>From leadership advice to embedded delivery — without defaulting to another hire.</p></div><div className="ph-pricing"><div className="ph-project-price"><p className="ph-eyebrow">Start here</p><h3>Commercial Growth Audit</h3><strong>From £2,500</strong><p>Commercial and technology decisions, aligned in a 90-day roadmap.</p><a href="#audit" className="ph-text-link">Review the audit <span aria-hidden="true">↑</span></a></div><div className="ph-retainers"><article><span>Leadership advisory</span><strong>From £2,000</strong><small>per month</small><p>Senior challenge and decision support for leaders with an internal team.</p></article><article className="ph-featured"><span>Fractional Growth Partner · recommended</span><strong>From £5,000</strong><small>per month · 6-month initial term</small><p>Cross-functional leadership with hands-on delivery across every commercial lever.</p><BookingLink>Discuss Growth Partner</BookingLink></article><article><span>Embedded delivery</span><strong>From £7,500</strong><small>per month</small><p>Deeper delivery ownership and specialist coordination without building the full team.</p></article></div></div></section>

      <section className="ph-section ph-reveal ph-faq" id="faq"><div><p className="ph-eyebrow">Frequently asked</p><h2>What leadership teams ask.</h2></div><div>{faqs.map(([q,a], i) => <div className="ph-faq-item" key={q}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{q}</span><b>{openFaq === i ? '−' : '+'}</b></button>{openFaq === i && <p>{a}</p>}</div>)}</div></section>

      <section className="ph-section ph-reveal ph-contact" id="contact"><div><p className="ph-eyebrow ph-eyebrow-light">Start with the audit</p><h2><span className="ph-heading-line">Put more resource</span><br/>behind growth.</h2><p>Tell us where you need clarity: go-to-market, team shape, tools, technology or delivery priorities.</p><BookingLink className="ph-button ph-button-light">Prefer to talk first?</BookingLink><small>30 minutes · no preparation required · or email hello@prospertia.com</small></div><form onSubmit={submit}><label>Full name<input name="name" required minLength={2} autoComplete="name" /></label><label>Work email<input name="email" type="email" required autoComplete="email" /></label><label>Company<input name="company" required autoComplete="organization" /></label><label>Business stage<select name="turnover" defaultValue=""><option value="">Select your stage</option><option>Pre-launch startup</option><option>Launched and validating</option><option>Scaling £2m–£10m</option><option>Established £10m–£30m</option><option>Established £30m+</option></select></label><label className="ph-form-wide">Where does leadership need clarity?<textarea name="message" required minLength={20} rows={5} placeholder="Tell us what you are launching or scaling, where spend feels diluted, or which team, tools and technology decisions need resolving." /></label><button className="ph-button ph-button-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Enquire about the audit'} <Arrow /></button><p aria-live="polite">{status === 'sent' ? 'Thank you — your enquiry has been sent.' : status === 'fallback' ? 'Something went wrong. Please try again or email hello@prospertia.com.' : ''}</p></form></section>
    </main>

    <footer className="ph-footer"><Image src="/logo.png" alt="Prospertia" width={666} height={187} /><p>Senior strategy. Hands-on execution. Joined-up growth.</p><nav><a href="#services">Capabilities</a><a href="#work">Work</a><a href="#pricing">Ways to work</a><a href="#contact">Contact</a></nav><small>© {new Date().getFullYear()} Prospertia · United Kingdom</small></footer>

    {story && <div className="ph-modal" role="dialog" aria-modal="true" aria-labelledby="story-title" onMouseDown={e => { if (e.target === e.currentTarget) setStory(false) }}><div><button onClick={() => setStory(false)} aria-label="Close story">Close</button><p className="ph-eyebrow">Invevo · working story</p><h2 id="story-title">An embedded partnership built for progress.</h2><p>Prospertia supports the internal team across marketing, web, content, creative and HubSpot.</p><p>Senior direction, hands-on delivery and specialist coordination sit within one accountable relationship.</p><BookingLink>Discuss a similar engagement</BookingLink></div></div>}
  </>
}
