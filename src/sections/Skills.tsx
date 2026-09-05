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
          title="Tools for analysis, reporting and reliable data"
          description="SQL and Python at the core, supported by enterprise platforms and data engineering practice."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
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

                  <p className="mb-5 text-sm text-ink-dim">{category.description}</p>
                  <ul className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        whileHover={{ y: -3, scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.3, delay: skillIndex * 0.025 }}
                        data-cursor-hover
                        className="cursor-default rounded-xl border border-border bg-ink/[0.035] px-3 py-2 text-sm text-ink-dim transition-colors hover:border-accent/50 hover:bg-accent/10 hover:text-ink"
                      >
                        {skill}
                      </motion.li>
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
