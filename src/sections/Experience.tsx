import { useEffect, useRef } from 'react'
import { ArrowUpRight, Building2, FolderGit2 } from 'lucide-react'
import { experience } from '@/data/experience'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { gsap } from '@/utils/gsap'

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!timelineRef.current || !lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }, timelineRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built this"
          description="Operational reporting, finance reconciliation and data quality, with automation built around business needs."
        />

        <div ref={timelineRef} className="relative mt-16 pl-10 sm:pl-14">
          <div className="absolute top-1 bottom-1 left-3.5 w-px bg-border sm:left-5" />
          <div
            ref={lineRef}
            className="absolute top-1 bottom-1 left-3.5 w-px motion-safe:scale-y-0 bg-gradient-to-b from-accent via-accent-2 to-accent-3 sm:left-5"
          />

          <div className="flex flex-col gap-14">
            {experience.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute top-1.5 -left-10 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-accent/40 bg-bg-soft text-accent-3 shadow-[0_0_20px_-4px_var(--color-accent)] sm:-left-14">
                    <Building2 className="h-3.5 w-3.5" />
                  </span>

                  <div className="glow-border glass rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold sm:text-2xl">
                          {job.role}
                        </h3>
                        <p className="mt-1 text-ink-dim">
                          {job.company} &middot; {job.location}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium tracking-wide text-ink-dim uppercase">
                        {job.start} - {job.end}
                      </span>
                    </div>

                    <p className="mt-4 text-ink-dim">{job.summary}</p>

                    <ul className="mt-5 space-y-2.5">
                      {job.highlights.map((h, hi) => (
                        <li key={hi} className="flex gap-3 text-sm text-ink-dim">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-3" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {job.selectedProjects && (
                      <div className="mt-7 border-t border-border pt-6">
                        <div className="flex items-center gap-2">
                          <FolderGit2 className="h-4 w-4 text-accent-3" />
                          <p className="text-sm font-medium text-ink">Selected RDC systems</p>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {job.selectedProjects.map((project) => (
                            <a
                              key={project.href}
                              href={project.href}
                              target="_blank"
                              rel="noreferrer"
                              data-cursor-hover
                              className="group rounded-xl border border-border bg-ink/[0.025] p-4 transition hover:border-accent/45 hover:bg-accent/[0.035]"
                            >
                              <span className="flex items-center justify-between gap-3 font-medium text-ink">
                                {project.title}
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-accent-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              </span>
                              <span className="mt-2 block text-sm leading-relaxed text-ink-dim">
                                {project.detail}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border bg-ink/[0.035] px-3 py-1 text-xs text-ink-dim"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
