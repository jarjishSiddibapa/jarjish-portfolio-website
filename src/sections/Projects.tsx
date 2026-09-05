import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { projects, projectCategories } from '@/data/projects'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/utils/cn'

type Category = (typeof projectCategories)[number]

export function Projects() {
  const [filter, setFilter] = useState<Category | 'Featured'>('Featured')

  const filtered = useMemo(
    () => (filter === 'Featured' ? projects.filter((p) => p.featured) : filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Data work with a business purpose"
          description="Professional reporting, reconciliation and automation first, followed by hands-on data engineering practice."
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {(['Featured', ...projectCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              aria-controls="project-grid"
              data-cursor-hover
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                filter === cat
                  ? 'border-accent/50 bg-accent/15 text-ink'
                  : 'border-border text-ink-dim hover:border-accent/30 hover:text-ink',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div id="project-grid" layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="min-w-0"
              >
                <TiltCard className="glow-border glass h-full rounded-2xl p-7 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-ink/[0.035] px-3 py-1 text-xs font-medium text-accent-3">
                      {project.featured && <Sparkles className="h-3 w-3" />}
                      {project.category}
                    </span>
                    <div className="flex gap-2">
                      {project.links?.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          data-cursor-hover
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 text-sm text-ink-dim transition hover:border-accent/50 hover:text-ink"
                          aria-label={`${project.title} — ${link.label}`}
                        >
                          {link.label === 'GitHub' ? (
                            <FaGithub className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-display mt-5 text-2xl font-semibold">{project.title}</h3>
                  {project.context && <p className="mt-2 text-xs font-medium text-accent-3">{project.context}</p>}
                  {project.problem && <p className="mt-4 text-sm text-ink-dim"><span className="font-semibold text-ink">Problem. </span>{project.problem}</p>}
                  <p className="mt-3 text-sm text-ink-dim">{project.problem && <span className="font-semibold text-ink">Solution. </span>}{project.description}</p>

                  <ul className="mt-5 space-y-2">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-ink-dim">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-3" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-ink/[0.035] px-3 py-1 text-xs text-ink-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-border pt-5 text-sm font-medium text-accent-3">
                    <span className="font-semibold">Impact. </span>{project.impact}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  )
}
