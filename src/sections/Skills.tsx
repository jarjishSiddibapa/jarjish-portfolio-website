import { motion } from 'framer-motion'
import { skillCategories } from '@/data/skills'
import { iconMap } from '@/utils/icon-map'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="A stack built for data, automation, and AI"
          description="Grouped by the kind of problem each toolset solves, from ERP data plumbing to LLM-powered products."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = iconMap[category.icon]
            return (
              <Reveal key={category.id} delay={(i % 3) * 0.08}>
                <div className="glow-border glass group h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-3">
                      {Icon && <Icon className="h-5 w-5" />}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{category.title}</h3>
                  </div>

                  <ul className="space-y-4">
                    {category.skills.map((skill, si) => (
                      <li key={skill.name}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-ink-dim">{skill.name}</span>
                          <span className="text-ink-faint">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/8">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                              duration: 1,
                              delay: si * 0.06,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
