import { GraduationCap, Award, Sparkles } from 'lucide-react'
import { education } from '@/data/experience'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/utils/motion-variants'
import { motion } from 'framer-motion'

const achievements = [
  {
    icon: Award,
    title: 'CFO Recognition',
    detail: 'RDC Stamper formally recognized by the CFO for cutting document handling time by ~80%.',
  },
  {
    icon: Sparkles,
    title: 'Honors in AI/ML',
    detail: 'Graduated with Honors in Artificial Intelligence & Machine Learning, CGPA 9.54/10.',
  },
  {
    icon: GraduationCap,
    title: '₹20k+ Cost Savings',
    detail: 'In-house Digital Signature App replaced a paid tool costing ₹20k+ per user license.',
  },
]

export function Education() {
  return (
    <section id="education" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Education & Achievements"
          title="Foundation and formal recognition"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {education.map((edu, i) => (
              <Reveal key={edu.id} delay={i * 0.08}>
                <div className="glow-border glass rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-3">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{edu.school}</h3>
                      <p className="mt-1 text-sm text-ink-dim">{edu.degree}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                        <span className="rounded-full border border-border px-2.5 py-1">
                          {edu.start} - {edu.end}
                        </span>
                        <span className="font-medium text-accent-3">{edu.detail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-1">
            {achievements.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                className="glass flex items-start gap-4 rounded-2xl p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent-2/20 to-accent-3/20 text-accent-3">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-dim">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  )
}
