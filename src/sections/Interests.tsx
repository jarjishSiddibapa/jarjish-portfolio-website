import { lazy, Suspense, useRef } from 'react'
import { BookOpen, Gamepad2, Users } from 'lucide-react'
import { useScrollProgressRef } from '@/hooks/useScrollProgressRef'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

const InterestScene = lazy(() => import('@/components/three/InterestScene'))

const interests = [
  {
    id: 'reading',
    variant: 'book' as const,
    icon: BookOpen,
    title: 'Reading',
    blurb:
      "I read a lot about people and decision-making, How to Win Friends and Influence People and Captivate among them. It shows up directly in how I handle stakeholders who don't know what they need yet.",
  },
  {
    id: 'gaming',
    variant: 'controller' as const,
    icon: Gamepad2,
    title: 'Gaming',
    blurb:
      'Narrative and strategy games are my actual off-switch, The Last of Us and Assassin\'s Creed included. I like systems with rules worth learning.',
  },
  {
    id: 'people',
    variant: 'people' as const,
    icon: Users,
    title: 'People',
    blurb:
      "I've led teams, mentored juniors, and worked solo when that's what the problem needed. Comfortable guiding a room or just heads-down executing.",
  },
]

function InterestCard({ interest }: { interest: (typeof interests)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const progressRef = useScrollProgressRef(cardRef)
  const reducedMotion = useReducedMotion()
  const Icon = interest.icon

  return (
    <div
      ref={cardRef}
      className="glow-border glass group overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-0.5deg]"
    >
      <div className="h-44 w-full cursor-grab active:cursor-grabbing" data-cursor-hover>
        {!reducedMotion && (
          <Suspense
            fallback={<div className="h-full w-full animate-pulse bg-ink/[0.025]" />}
          >
            <InterestScene variant={interest.variant} progressRef={progressRef} />
          </Suspense>
        )}
      </div>
      <div className="border-t border-border p-6">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-accent-3 transition-transform duration-300 group-hover:animate-wiggle" />
          <h3 className="font-display text-lg font-semibold">{interest.title}</h3>
        </div>
        <p className="mt-2 text-sm text-ink-dim">{interest.blurb}</p>
      </div>
    </div>
  )
}

export function Interests() {
  return (
    <section id="interests" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Beyond the Resume"
          title="What I'm like off the clock"
          description="The résumé covers the work. This is the rest of it."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, i) => (
            <Reveal key={interest.id} delay={i * 0.08}>
              <InterestCard interest={interest} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
