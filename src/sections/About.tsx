import { MapPin, GraduationCap, Briefcase, BarChart3, Bot, BrainCircuit } from 'lucide-react'
import { profile, stats } from '@/data/profile'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/utils/motion-variants'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { motion } from 'framer-motion'

const quickFacts = [
  { icon: MapPin, label: profile.location },
  { icon: Briefcase, label: profile.openTo },
  { icon: GraduationCap, label: 'B.E. CSE, Honors in AI/ML, CGPA 9.54/10' },
]

const pillars = [
  {
    icon: BarChart3,
    title: 'Data & Analytics',
    description:
      'SQL/PL-SQL pipelines, Power BI dashboards, and statistical analysis across a 140+ location ERP.',
    tint: 'from-accent/20 to-accent/5 text-accent',
  },
  {
    icon: Bot,
    title: 'Automation Engineering',
    description:
      'Self-healing services, hardware-integrated desktop tools, and zero-touch reporting systems.',
    tint: 'from-accent-3/20 to-accent-3/5 text-accent-3',
  },
  {
    icon: BrainCircuit,
    title: 'AI & ML Engineering',
    description:
      'Production LLM products on Gemini/Claude, AI-assisted development workflows, and independent deep learning work: transfer learning, rigorous model evaluation, not tutorial notebooks.',
    tint: 'from-accent-2/20 to-accent-2/5 text-accent-2',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="One engineer, three problem spaces"
          description="I don't fit neatly into one job title, and that's the point. Here's the range I actually operate in."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={revealItem}
              className="glow-border glass rounded-2xl p-6"
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${pillar.tint}`}
              >
                <pillar.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display mt-4 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{pillar.description}</p>
            </motion.div>
          ))}
        </RevealGroup>

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            {profile.bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-5 text-lg leading-relaxed text-ink-dim">{paragraph}</p>
              </Reveal>
            ))}

            <RevealGroup className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {quickFacts.map((fact) => (
                <motion.div
                  key={fact.label}
                  variants={revealItem}
                  className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-ink-dim"
                >
                  <fact.icon className="h-4 w-4 shrink-0 text-accent-3" />
                  {fact.label}
                </motion.div>
              ))}
            </RevealGroup>
          </div>

          <div className="lg:col-span-2">
            <RevealGroup className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={revealItem}
                  className="glow-border glass rounded-2xl p-6"
                >
                  <div className="font-display text-4xl font-semibold text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-ink-dim">{stat.label}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Container>
    </section>
  )
}
