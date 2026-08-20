import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { CTA, RelatedInsights } from '@/components/marketing'
import { ShareRow } from '@/components/share-row'
import { insights, site } from '@/lib/site-content'

// Blocks are plain strings. A leading "## " renders as a subheading, a
// leading "> " renders as a pull quote, everything else is a paragraph
// (the very first block gets the larger lede treatment).
const articleCopy: Record<string, string[]> = {
  'growth-exposes-gaps': [
    'Most growing businesses do not wake up one morning with a broken commercial system. The gaps arrive gradually, then growth makes them visible.',
    'Marketing adds tools to solve immediate needs. Sales creates its own materials. The website reflects an earlier version of the business. CRM activity grows, but shared discipline does not. Each choice is understandable on its own; together, they create friction.',
    '## Why growth is the moment gaps become undeniable',
    'At ten people, a founder can hold the whole commercial picture in their head. Handovers happen in a hallway conversation. Pricing exceptions get remembered rather than logged. Nobody minds that the website is two positioning statements behind reality, because every deal still closes on a personal relationship.',
    'At fifty or a hundred people, that same informality becomes the constraint. New sales hires cannot read the founder’s mind. Marketing campaigns generate leads that sales cannot process consistently. The website is now doing real qualifying work, not just looking presentable, and it is still describing a version of the business that no longer exists.',
    'None of this is a sign that something has gone wrong. It is a sign that the business has outgrown the systems it was informally running on. Growth does not create the gap between how the business actually works and how it says it works — it just removes the slack that used to absorb it.',
    '> The businesses that scale smoothly are not the ones without gaps. They are the ones that go looking for them before growth forces the issue.',
    '## The four places gaps hide',
    'In practice, the same four gaps show up again and again in scaling B2B businesses.',
    'The first is ownership. Who is actually accountable for a lead between the moment it is captured and the moment it becomes revenue? If the honest answer involves more than one name, or no name, that handover is a leak.',
    'The second is definition. Sales and marketing frequently use the same words — qualified, opportunity, engaged — to mean different things. That mismatch alone can make a pipeline report technically accurate and practically useless.',
    'The third is the website and content estate. It is often the last thing updated because it feels the least urgent, right up until it becomes the first impression for a buyer doing their own research before ever speaking to a salesperson.',
    'The fourth is the technology layer underneath all of it — CRM, marketing automation, sales tools — configured for the business as it was, not as it is now, and rarely revisited once it is working.',
    '## What "joined up" actually means in practice',
    'Joined-up priorities beat disconnected activity is easy to agree with and hard to operationalise. In practice it means three things.',
    'It means one shared commercial objective that marketing, sales and any partner or agency can each point to and explain how their work contributes to it — not several separate functional plans that happen to run in the same quarter.',
    'It means a single, visible view of the buyer’s actual journey, built from what really happens rather than what the org chart implies should happen, so that gaps in ownership and handover are visible rather than assumed away.',
    'And it means agreeing, deliberately, which constraint matters most right now. Not every gap needs solving at once. A business that tries to fix positioning, sales enablement, the website and the CRM simultaneously usually ends up with four half-finished projects instead of one that actually moves the number that matters.',
    '## A pattern that shows up often',
    'Consider a business that has just crossed from founder-led selling into its first real sales team. Marketing is generating more leads than a year ago, sales has more people responding to them, and yet close rates have quietly fallen. On paper, activity is up everywhere.',
    'Look closer, and the gap is usually one of the four above, hiding in plain sight. Marketing’s definition of a qualified lead was set eighteen months ago, before the ideal customer profile shifted. Sales has adapted informally, screening leads its own way, but nobody has gone back and told marketing, so the top of the funnel keeps optimising for the wrong signal. The CRM dutifully reports both sides as on track, because nobody agreed what the numbers should actually mean together.',
    'Fixing this rarely requires new technology. It requires the two functions to sit down, agree a single definition, and rebuild the handover around it — a half-day of hard conversation rather than a quarter-long implementation project.',
    '## What this means for budget and hiring decisions',
    'Gaps like these are easy to mistake for headcount problems. A business notices sales is stretched, and hires another rep. It notices marketing cannot keep up with content, and hires another marketer. It notices the CRM feels behind the business, and buys a new module. Each decision can be justified individually, and the underlying gap survives all three, because none of them addressed ownership, definition or the handover itself.',
    'Before adding headcount or budget to a function that feels stretched, it is worth asking a harder question first: is this a capacity problem or a clarity problem? A team with a clear, agreed process and slightly too few hands is usually in a better position than a larger team layered on top of an unclear one. The second option just makes the friction more expensive, because more people are now operating inside it.',
    'This is also where genuinely joined-up commercial leadership earns its place: someone senior enough to see marketing, sales and technology as one connected system, with the standing to make the ownership and definition calls that individual functional hires are rarely positioned to make on their own — and the discipline to make those calls before signing off on the next hire or the next platform.',
    '## Where to start this quarter',
    'Start smaller than feels comfortable. Pick the one constraint that is most visibly costing revenue or time today — a lead-to-opportunity conversion that has quietly dropped, a sales cycle that has crept longer, a website that competitors’ prospects mention first. Map that one journey honestly, agree who owns what, and fix that before reaching for a new platform or a new hire.',
    'The gaps were always there. Growth just made them impossible to ignore. The businesses that handle that well are not the ones with no gaps — they are the ones that go looking before the market finds them first.',
  ],
  'getting-more-from-hubspot': [
    'HubSpot cannot fix a process nobody has agreed. Before building another workflow, decide what sales and marketing need the system to make easier.',
    'Look at ownership, lifecycle definitions, handovers, campaign decisions and reporting questions. If leadership cannot describe these clearly, more technical complexity usually creates more maintenance rather than more value.',
    '## Why more workflows rarely equal more value',
    'It is a natural instinct: the reporting is messy, so build a workflow to clean it up. Sales says leads are poor quality, so build a scoring model. Handovers are inconsistent, so automate the handover. Each of these feels like progress, and each adds another layer that someone now has to maintain, understand and eventually untangle when the business changes again.',
    'The trouble is that a workflow automates whatever process already exists — including the parts nobody has actually agreed on. If sales and marketing do not share a definition of qualified, automating the handover just moves the disagreement further downstream and hides it inside the platform, where it is harder to spot and harder to fix.',
    'HubSpot is very good at doing what it is told. It is not going to notice, on your behalf, that what it has been told does not make sense.',
    '> The platform is rarely the constraint. The constraint is almost always a decision that has not been made, dressed up as a technical problem.',
    '## The five questions to answer before you build anything',
    'Before commissioning another workflow, a leadership team should be able to answer five questions clearly and consistently — not five different answers depending on who you ask.',
    'Who owns a lead at each stage, and at what point does ownership formally pass from marketing to sales? If the honest answer is "it’s a bit fuzzy," that fuzziness is what the next workflow will automate.',
    'What does each lifecycle stage actually mean, in terms both teams recognise? Marketing qualified and sales qualified need definitions specific enough that two different people would categorise the same lead the same way.',
    'What happens at the handover moment, specifically? Not "sales gets notified" — what information travels with the lead, and what is sales expected to do with it in the first 24 hours?',
    'Which campaigns and content decisions actually move revenue, versus which ones are running because they always have? HubSpot will happily report on all of them equally; it will not tell you which to stop.',
    'What questions does leadership actually need answered in reporting, and does the current dashboard answer them — or does it just show what was easiest to build?',
    '## What "good enough" HubSpot hygiene actually looks like',
    'Good hygiene is not the same as more automation. A well-run HubSpot instance for a scaling B2B business usually has surprisingly few workflows, each one mapped to a real decision point, each one owned by a named person who understands what it does and why.',
    'It has lifecycle stages that both sales and marketing use the same way, properties that are actually filled in because someone is accountable for them, and reporting that answers the five questions above rather than surfacing everything the platform is capable of measuring.',
    '## A pattern that shows up often',
    'A common story: a business has been using HubSpot for two or three years, has accumulated dozens of workflows built to solve specific problems as they came up, and nobody currently working there built more than a handful of them. Reporting takes longer to trust than it should, onboarding a new hire onto "how we use HubSpot" takes weeks, and every proposed change comes with the nervous question of what else it might break.',
    'The fix is rarely to add another layer on top. It is usually to sit down, map what actually needs to happen at each stage of the buyer journey, retire what no longer serves that, and rebuild the smaller number of workflows that remain around a shared, explicit process.',
    '## How this shows up in reporting',
    'A leadership team can usually tell how healthy their HubSpot instance is by how a Monday-morning pipeline review actually goes. If the numbers prompt a conversation about priorities and next steps, the reporting is doing its job. If the numbers prompt a separate conversation about whether the numbers themselves can be trusted — different people quoting different totals, sales quietly keeping its own spreadsheet because "the CRM doesn’t reflect reality" — that is a hygiene problem wearing a reporting costume.',
    'The clearest early symptom is usually a mismatch between what the dashboard says and what the sales team believes. Marketing reports a healthy number of qualified leads; sales reports that most of them go nowhere. Both can be technically correct according to their own definitions, and the gap between those two truths is exactly the kind of unresolved decision that no additional workflow will close.',
    'A useful diagnostic is to sit two or three senior people from sales and marketing in front of the current dashboard and ask each of them, independently, to explain what a specific number means and where it comes from. If the explanations diverge, the reporting is not yet trustworthy enough to make decisions from, regardless of how sophisticated the dashboard looks.',
    '## Where to start',
    'Before the next HubSpot project is scoped, spend half a day answering the five questions above as a leadership team — marketing and sales in the same room, agreeing out loud rather than assuming alignment. Whatever gaps that conversation exposes are the real project. The platform configuration that follows will be simpler, not more complex, because it will finally be automating something everyone has actually agreed to.',
  ],
  'practical-ai-plan': [
    'The strongest AI opportunities are rarely found by starting with a list of tools. They are found by looking carefully at work.',
    'Find tasks that are repetitive, slow, inconsistent or dependent on information being copied between systems. Then assess the risk, judgement and context each task requires. Some work can be automated. Some can be accelerated. Some should remain deliberately human.',
    '## Why "which AI tool should we use" is the wrong first question',
    'Most AI adoption conversations start backwards. A leadership team hears about a capability — drafting, summarising, coding, forecasting — and asks where in the business it could be applied. That question produces a long list of plausible-sounding use cases and very little clarity about which of them are actually worth doing first.',
    'The more useful question is not "what can this tool do" but "where does our team currently lose time, consistency or quality, and why." Answering that requires looking at the work itself, not the technology. It is slower to start, and it produces a shorter, much more defensible list.',
    '## Four questions that reveal where AI actually helps',
    'Walking through a team’s actual work, four questions tend to surface the opportunities that matter.',
    'Is this task repetitive — done the same way, many times, by more than one person? Repetition is the clearest signal, because it means the task is describable, and a task that can be described can usually be assisted.',
    'Is this task slow relative to the value it produces? Slowness alone is not the problem; slowness on low-value work is. A three-hour task done once a year rarely justifies the investment. A twenty-minute task done fifty times a week often does.',
    'Is the output currently inconsistent between people or between attempts? Inconsistency usually means judgement is being applied where a clearer process or a well-designed prompt could do more of the work reliably.',
    'Does this task depend on moving information between systems that do not talk to each other? This is one of the most common, least glamorous sources of wasted time in B2B operations, and often one of the easiest to meaningfully improve.',
    '> The businesses getting real value from AI right now are rarely the ones with the most sophisticated tools. They are the ones that did the unglamorous work of mapping where their time actually goes.',
    '## Automate, accelerate, or keep human — how to tell the difference',
    'Not every task that clears the four questions above should be handed fully to a machine. It helps to sort candidate tasks into three categories.',
    'Some work can be automated outright: low-risk, well-defined, low-judgement tasks where a consistent output matters more than a bespoke one — routine data entry, first-pass categorisation, standard reporting formats.',
    'Some work can be accelerated rather than automated: a first draft of a proposal, a summary of a long document, an initial structure for a piece of content — work that still benefits enormously from a person reviewing, correcting and adding judgement, but where starting from a draft is faster than starting from nothing.',
    'Some work should stay deliberately human, at least for now: anything where the cost of a confident-sounding but wrong output is high, where the judgement required depends on context a model does not reliably have, or where the relationship itself — a difficult client conversation, a sensitive internal decision — is the point.',
    'Getting this sorting right matters more than the specific tool chosen for any category. A brilliant tool applied to the wrong category creates rework, risk, or both.',
    '## What a practical use case actually contains',
    'A use case is not "let’s use AI for marketing." It is specific enough to test: the exact task, who currently does it, how long it currently takes, what a good outcome looks like, who is accountable for the outcome once AI is involved, and how success will be measured after thirty and ninety days.',
    'Without that level of specificity, adoption tends to stall at the experimentation stage — a few people trying tools informally, no shared measurement, and no clear answer to "did this actually help" six months later.',
    '## Governance: making adoption safe as well as fast',
    'Speed and safety are usually framed as a trade-off, but for AI adoption in a B2B business they are closer to two sides of the same decision. A use case that has not considered data handling, accuracy risk or accountability is not actually ready to move fast — it is ready to create a problem quickly instead of slowly.',
    'Three questions belong in every use case before it goes live, not after. What data does this task touch, and is it the kind of data — client information, financial detail, anything commercially sensitive — that has particular handling requirements? Who checks the output before it reaches a client, a regulator, or a public audience, and how much would a confident-but-wrong answer actually cost in that specific context? And when something does go wrong, is it obvious afterwards which step in the process was AI-assisted, so the team can trace and fix the cause rather than losing confidence in the whole workflow?',
    'None of this requires a heavy governance framework for a business of fifteen or fifty people. It requires a short, written answer to those three questions for each use case, agreed before rollout, and revisited if the task or the tool changes. That is usually enough to catch the genuinely risky applications early, without slowing down the low-risk, high-value ones that make up most of a practical plan.',
    'It is also worth being explicit, inside the business, about where AI-assisted work is disclosed. Clients and partners increasingly expect to know when a document, proposal or piece of content has had significant AI involvement, even where a person reviewed and approved it. Deciding that policy in advance, rather than case by case under time pressure, protects both the relationship and the credibility of the work.',
    'Consider a business piloting AI-assisted first drafts of client proposals. The task clears the four questions from earlier: it is repetitive, moderately slow, prone to inconsistency between team members, and depends on pulling details from several systems. Governance here does not need to be elaborate — a named reviewer for every proposal before it leaves the building, a clear note in the template about the check that has been done, and a simple log of which proposals started as an AI draft, so that if a client ever raises a concern about accuracy, the team can trace exactly what happened rather than guessing after the fact.',
    '## A pattern that shows up often',
    'A recurring pattern in scaling B2B businesses: someone senior tries a general-purpose AI tool, is impressed, and pushes for broader adoption without a specific problem attached. Usage spreads unevenly. A few people find genuinely useful applications on their own initiative; most others try it once or twice and quietly stop, unsure what it is actually for in their role.',
    'Six months later, leadership is left with a monthly subscription cost, a handful of enthusiastic individual users, and no organisation-wide answer to what changed. The tool was rarely the problem. The absence of a small number of clearly scoped, measured use cases was.',
    '## Where to start this quarter',
    'Pick two or three tasks that clear the four questions above — genuinely repetitive, slow relative to their value, inconsistent, or dependent on moving information between systems. Sort each into automate, accelerate or keep human. Define what good looks like and who owns it. Test those few properly before expanding further.',
    'Adoption that lasts is built on a small number of use cases that demonstrably worked, owned by people who can explain why — not on access to a powerful tool and a hope that people will find a use for it.',
  ],
}

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const a = insights.find((x) => x.slug === slug)
  if (!a) return {}
  const title = a.seoTitle ?? a.title
  const description = a.seoDescription ?? a.excerpt
  return {
    title,
    description,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { title, description, type: 'article', url: `/insights/${a.slug}`, siteName: site.name, images: [{ url: a.coverImage, width: 1200, height: 630, alt: a.coverAlt }] },
    twitter: { card: 'summary_large_image', title, description, images: [a.coverImage] },
  }
}

function ArticleBlock({ block, i }: { block: string; i: number }) {
  if (block.startsWith('## ')) {
    return <h2 key={i} className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{block.slice(3)}</h2>
  }
  if (block.startsWith('> ')) {
    return <blockquote key={i} className="border-l-2 border-primary py-1 pl-6 text-xl font-medium italic leading-relaxed text-foreground">{block.slice(2)}</blockquote>
  }
  return <p key={i} className={i === 0 ? 'text-2xl font-medium leading-relaxed text-foreground' : ''}>{block}</p>
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = insights.find((i) => i.slug === slug)
  if (!article) notFound()

  const url = `https://prospertia.com/insights/${article.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    image: `https://prospertia.com${article.coverImage}`,
    datePublished: article.isoDate,
    dateModified: article.isoDate,
    author: { '@type': 'Person', name: article.author.name },
    publisher: { '@type': 'Organization', name: site.name, url: 'https://prospertia.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <article>
        <header className="border-b border-border">
          <div className="mx-auto max-w-4xl px-5 py-20 lg:py-28">
            <Link href="/insights" className="mb-12 flex w-fit items-center gap-2 text-sm font-bold"><ArrowLeft className="size-4" />All insights</Link>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-foreground">{article.category}</p>
            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-.04em] md:text-7xl">{article.title}</h1>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">{article.author.name}</span>, {article.author.role} · {article.date} · {article.read}
              </p>
              <ShareRow url={url} title={article.title} />
            </div>
          </div>
        </header>
        <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl mt-4 md:mt-10">
          <Image src={article.coverImage} alt={article.coverAlt} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
        </div>
        <div className="mx-auto flex max-w-3xl flex-col gap-7 px-5 py-20 text-lg leading-[1.8] text-muted-foreground">
          {articleCopy[slug].map((block, i) => <ArticleBlock key={i} block={block} i={i} />)}
        </div>
      </article>
      <RelatedInsights exclude={article.slug} />
      <CTA />
    </main>
  )
}
