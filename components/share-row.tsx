'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Share</span>
      <a
        href={linkedInHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.24 8.25h4.5V23H.24V8.25ZM8.5 8.25h4.31v2.01h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.5v-6.66c0-1.59-.03-3.63-2.22-3.63-2.22 0-2.56 1.73-2.56 3.52V23H8.5V8.25Z" />
        </svg>
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on X"
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
          <path d="M18.9 2H22l-7.5 8.6L23 22h-6.9l-5.4-7-6.2 7H1.2l8-9.2L1 2h7l4.9 6.5L18.9 2Zm-2.4 18h1.9L7.6 4h-2l11 16Z" />
        </svg>
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  )
}
