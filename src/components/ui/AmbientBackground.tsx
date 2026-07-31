function Squiggle({ className }: { className?: string }) {
  return (
    <svg className={className} width="90" height="34" viewBox="0 0 90 34" fill="none" aria-hidden>
      <path
        d="M2 24C12 6 22 6 32 18C42 30 52 30 62 14C68 4 76 2 88 10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path
        d="M17 1C17 10 19 15 24 17C19 19 17 24 17 33C17 24 15 19 10 17C15 15 17 10 17 1Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DashedCircle({ className }: { className?: string }) {
  return (
    <svg className={className} width="56" height="56" viewBox="0 0 60 60" fill="none" aria-hidden>
      <circle
        cx="30"
        cy="30"
        r="26"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray="7 9"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="66" height="46" viewBox="0 0 70 50" fill="none" aria-hidden>
      <path d="M4 8C24 4 44 6 58 26" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M44 20C50 22 55 24 58 26C57 21 57 16 58 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CodeBrackets({ className }: { className?: string }) {
  return (
    <svg className={className} width="58" height="34" viewBox="0 0 58 34" fill="none" aria-hidden>
      <path
        d="M20 4C12 4 8 8 8 17C8 26 4 30 4 30M8 17C8 8 4 4 4 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0 -0)"
      />
      <path
        d="M38 4C46 4 50 8 50 17C50 26 54 30 54 30M50 17C50 8 54 4 54 4"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BarChart({ className }: { className?: string }) {
  return (
    <svg className={className} width="46" height="38" viewBox="0 0 46 38" fill="none" aria-hidden>
      <rect x="2" y="20" width="9" height="16" rx="2.5" fill="currentColor" />
      <rect x="18.5" y="8" width="9" height="28" rx="2.5" fill="currentColor" opacity="0.75" />
      <rect x="35" y="14" width="9" height="22" rx="2.5" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklab, var(--color-ink) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-ink) 6%, transparent) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      <Squiggle className="text-accent-2/30 animate-float absolute top-[13%] left-[6%] hidden -rotate-6 sm:block" />
      <Sparkle className="text-warm/50 animate-glow absolute top-[24%] right-[9%] hidden rotate-12 sm:block" />
      <BarChart className="text-accent/30 animate-float absolute top-[38%] left-[3%] hidden rotate-3 [animation-delay:-2s] lg:block" />
      <DashedCircle className="text-accent/25 animate-float absolute top-[62%] left-[7%] hidden [animation-delay:-3s] sm:block" />
      <CodeBrackets className="text-accent-3/30 animate-float absolute top-[52%] right-[6%] hidden rotate-2 [animation-delay:-1.5s] lg:block" />
      <Arrow className="text-accent-3/30 animate-float absolute top-[45%] right-[16%] hidden [animation-delay:-1s] xl:block" />
      <Sparkle className="text-accent-2/35 animate-glow absolute top-[78%] left-[22%] hidden -rotate-6 sm:block" />
      <Squiggle className="text-warm/35 animate-float absolute top-[85%] right-[14%] hidden rotate-3 [animation-delay:-2.5s] lg:block" />

      <div className="noise absolute inset-0" />
    </div>
  )
}
