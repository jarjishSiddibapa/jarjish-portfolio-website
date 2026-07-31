import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile, socials } from '@/data/profile'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Container } from '@/components/ui/Container'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { getLenis } from '@/hooks/useLenis'

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const role = useTypewriter(profile.roles)
  const reducedMotion = useReducedMotion()
  const githubLink = socials.find((s) => s.icon === 'github')
  const linkedinLink = socials.find((s) => s.icon === 'linkedin')

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -80 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 -z-0 opacity-90 [mask-image:radial-gradient(ellipse_38%_42%_at_84%_42%,black,transparent)]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex items-center gap-2 text-sm text-ink-dim"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {profile.availability} &middot; {profile.openTo}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            <span className="text-ink">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative mt-6 inline-block"
          >
            <p className="flex h-9 items-center font-display text-2xl font-medium text-ink-dim sm:text-3xl">
              {role}
              <span className="ml-1 inline-block h-7 w-[2px] animate-pulse bg-accent-3" />
            </p>
            <motion.svg
              width="90"
              height="10"
              viewBox="0 0 90 10"
              fill="none"
              className="absolute -bottom-1 left-0 text-accent-3/70"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: 'easeInOut' }}
            >
              <path
                d="M2 7C16 2 28 2 40 6C52 9 64 3 88 4"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 max-w-2xl text-lg text-ink-dim"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition hover:shadow-accent/50"
            >
              View Projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={profile.resumeHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/50"
            >
              Download Resume
            </MagneticButton>
            <div className="ml-1 flex items-center gap-2">
              {githubLink && (
                <MagneticButton
                  href={githubLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-border text-ink-dim transition hover:border-accent/50 hover:text-ink"
                >
                  <FaGithub className="h-5 w-5" />
                </MagneticButton>
              )}
              {linkedinLink && (
                <MagneticButton
                  href={linkedinLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-border text-ink-dim transition hover:border-accent/50 hover:text-ink"
                >
                  <FaLinkedin className="h-5 w-5" />
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.button
        onClick={scrollToProjects}
        data-cursor-hover
        aria-label="Scroll to projects"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-faint"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
