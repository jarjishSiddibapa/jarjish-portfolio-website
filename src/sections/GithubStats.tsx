import { Star, Users, FolderGit2, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { useGithubStats } from '@/hooks/useGithubStats'
import { githubUsername } from '@/data/profile'
import { languageColor } from '@/utils/language-colors'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealGroup } from '@/components/ui/Reveal'
import { revealItem } from '@/utils/motion-variants'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { motion } from 'framer-motion'

export function GithubStats() {
  const { profile, repos, status } = useGithubStats()

  return (
    <section id="github" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="GitHub"
          title="A few things I've open-sourced"
          description="Public repositories behind the featured reporting and finance projects."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <div className="glow-border glass flex h-full flex-col rounded-2xl p-7">
              <div className="flex items-center gap-4">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${githubUsername} on GitHub`}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-2xl border border-border"
                  />
                ) : (
                  <div className="h-16 w-16 animate-pulse rounded-2xl bg-ink/8" />
                )}
                <div>
                  <p className="font-display break-words font-semibold">@{githubUsername}</p>
                  <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    className="mt-1 inline-flex items-center gap-1 text-sm text-accent-3 hover:underline"
                  >
                    View profile <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>



              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-ink/[0.025] p-4">
                  <Users className="h-4 w-4 text-accent-3" />
                  <p className="font-display mt-2 text-2xl font-semibold">
                    {status === 'success' ? (
                      <AnimatedCounter value={profile?.followers ?? 0} />
                    ) : (
                      '—'
                    )}
                  </p>
                  <p className="text-xs text-ink-faint">Followers</p>
                </div>
                <div className="rounded-xl border border-border bg-ink/[0.025] p-4">
                  <FolderGit2 className="h-4 w-4 text-accent-3" />
                  <p className="font-display mt-2 text-2xl font-semibold">
                    {status === 'success' ? (
                      <AnimatedCounter value={profile?.public_repos ?? 0} />
                    ) : (
                      '—'
                    )}
                  </p>
                  <p className="text-xs text-ink-faint">Repositories</p>
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-4 text-xs text-ink-faint">
                  Stats are taking a moment to load. Visit the profile directly in the meantime.
                </p>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {status === 'loading' &&
                Array.from({ length: 2 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 animate-pulse rounded-2xl border border-border bg-ink/[0.025]"
                  />
                ))}

              {status === 'success' && repos.length === 0 && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass col-span-full flex items-center justify-center gap-2 rounded-2xl p-8 text-sm text-ink-dim hover:text-ink"
                >
                  <FaGithub className="h-4 w-4" /> Browse the full profile{' '}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}

              {status === 'success' &&
                repos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    variants={revealItem}
                    className="glass group rounded-2xl border border-border p-5 transition hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-2 break-words font-medium text-ink">
                        <FaGithub className="h-4 w-4 text-ink-faint" />
                        <span className="min-w-0 break-words">{repo.name}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-ink-faint">
                        <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                      </span>
                    </div>
                    {repo.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-ink-dim">
                        {repo.description}
                      </p>
                    )}
                    {repo.language && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: languageColor(repo.language) }}
                        />
                        {repo.language}
                      </div>
                    )}
                  </motion.a>
                ))}

              {status === 'error' && (
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass col-span-full flex items-center justify-center gap-2 rounded-2xl p-8 text-sm text-ink-dim hover:text-ink"
                >
                  <FaGithub className="h-4 w-4" /> Browse the full profile{' '}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </RevealGroup>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="glass mt-6 overflow-hidden rounded-2xl p-6">
            <img
              src={`https://ghchart.rshah.org/3a5cf0/${githubUsername}`}
              alt={`${githubUsername}'s GitHub contribution graph`}
              className="w-full opacity-90"
              loading="lazy"
              onError={(e) => {
                ;(e.currentTarget.parentElement as HTMLElement).style.display = 'none'
              }}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
