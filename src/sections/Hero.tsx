import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { profile, socials } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useIdleReady } from '@/hooks/useIdleReady'
import { Container } from '@/components/ui/Container'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { getLenis } from '@/hooks/useLenis'

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const reducedMotion = useReducedMotion()
  const isWide = useMediaQuery('(min-width: 1024px)')
  const idle = useIdleReady()
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
      {!reducedMotion && isWide && idle && (
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
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            {profile.availability} &middot; {profile.openTo}
          </motion.div>

          <motion.h1
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            <span className="text-ink">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 font-display text-2xl font-medium sm:text-3xl"
          >
            <span className="font-semibold text-ink">{profile.primaryRole}</span>
            <span className="text-accent-3"> &middot; SQL &amp; PL/SQL &middot; Python &middot; Excel</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 max-w-2xl text-lg text-ink-dim"
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
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white"
            >
              View Projects <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-accent/50"
            >
              Download Resume
            </MagneticButton>
            <div className="ml-1 flex items-center gap-2">
              {githubLink && (
                <MagneticButton
                  href={githubLink.href}
                  aria-label="GitHub profile"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink-dim transition hover:text-ink"
                >
                  <FaGithub className="h-5 w-5" />
                </MagneticButton>
              )}
              {linkedinLink && (
                <MagneticButton
                  href={linkedinLink.href}
                  aria-label="LinkedIn profile"
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full bg-surface text-ink-dim transition hover:text-ink"
                >
                  <FaLinkedin className="h-5 w-5" />
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      </Container>

    </section>
  )
}
