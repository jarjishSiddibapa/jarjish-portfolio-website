import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { getLenis } from '@/hooks/useLenis'
import { useActiveSection } from '@/hooks/useActiveSection'
import { profile } from '@/data/profile'
import { cn } from '@/utils/cn'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map((l) => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-6',
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500',
            scrolled && 'glass',
          )}
        >
          <button
            onClick={() => scrollTo('hero')}
            data-cursor-hover
            className="font-display flex items-center gap-2 text-lg font-semibold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white shadow-lg shadow-accent/30">
              {profile.initials}
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                data-cursor-hover
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink',
                  active === link.id && 'text-ink',
                )}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink/6"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <MagneticButton
              href={profile.resumeHref}
              className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg shadow-soft transition hover:opacity-85 sm:inline-flex"
            >
              Resume <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor-hover
              className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="glass mx-4 mt-2 rounded-2xl p-4 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-dim transition hover:bg-ink/5 hover:text-ink',
                    active === link.id && 'bg-ink/5 text-ink',
                  )}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={profile.resumeHref}
                className="mt-2 rounded-xl bg-ink px-4 py-3 text-center text-sm font-semibold text-bg"
              >
                Download Resume
              </a>
              <div className="mt-2 flex justify-center sm:hidden">
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
