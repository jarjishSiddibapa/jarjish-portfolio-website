import { ArrowUp, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile, socials, skillMarquee } from '@/data/profile'
import { Container } from '@/components/ui/Container'
import { getLenis } from '@/hooks/useLenis'

export function Footer() {
  const year = new Date().getFullYear()

  const scrollTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <footer className="relative border-t border-border pt-16 pb-8">
      <div aria-hidden="true" className="mb-14 overflow-hidden border-y border-border/60 py-4">
        <div className="animate-marquee flex w-max gap-10 text-sm text-ink-faint">
          {[...skillMarquee, ...skillMarquee].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="h-1 w-1 rounded-full bg-accent-3/60" />
            </span>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-2xl font-semibold text-gradient">
              {profile.name}
            </p>
            <p className="mt-2 max-w-sm text-sm text-ink-dim">{profile.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            {socials
              .filter((s) => ['github', 'linkedin', 'mail'].includes(s.icon))
              .map((s) => {
                const Icon = s.icon === 'github' ? FaGithub : s.icon === 'linkedin' ? FaLinkedin : Mail
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === 'mail' ? undefined : '_blank'}
                    rel="noreferrer"
                    data-cursor-hover
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-ink-dim transition hover:border-accent/50 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            <button
              onClick={scrollTop}
              data-cursor-hover
              aria-label="Back to top"
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-bg shadow-soft transition hover:opacity-85"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-border pt-6 text-xs text-ink-faint sm:flex-row">
          <p>© {year} Built by {profile.name} & a lot of coffee.</p>
        </div>
      </Container>
    </footer>
  )
}
