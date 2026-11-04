import { useEffect, useState } from 'react'
import { pinnedRepoSlugs } from '@/data/projects'
import { STATS_FILE } from '@/generated/stats-file'

export interface GithubProfile {
  followers: number
  public_repos: number
  avatar_url: string
  bio: string | null
  html_url: string
}

export interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  language: string | null
  fork: boolean
  updated_at: string
}

export interface ContributionDay {
  date: string
  count: number
}

export interface Contributions {
  totalContributions: number
  days: ContributionDay[]
}

interface GithubStatsFile {
  generatedAt: string | null
  profile: GithubProfile | null
  repos: GithubRepo[]
  contributions?: Contributions
}

interface GithubStatsState {
  profile: GithubProfile | null
  repos: GithubRepo[]
  contributions: Contributions | null
  status: 'loading' | 'success' | 'error'
  refreshedAt: Date | null
}

// Data is fetched hourly by a scheduled GitHub Action (using an
// authenticated token, not subject to the 60/hour anonymous limit) and
// published as a static file — every visitor reads the same snapshot
// same-origin, so no browser ever calls api.github.com directly.
//
// The filename is content-hashed and regenerated on every run (see
// scripts/fetch-github-stats.mjs) and baked into the JS bundle at build
// time via STATS_FILE, so a stale GitHub Pages CDN cache of the old
// filename is never re-requested — the new bundle always points at a
// URL the CDN has never seen before.
const statsUrl = `${import.meta.env.BASE_URL}${STATS_FILE}`

// The stats file is same-origin and written by our own workflow, but links and images
// from it are only used when they point at GitHub over https.
const isGithubUrl = (value: string, hosts: string[]) => {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && hosts.includes(url.hostname)
  } catch {
    return false
  }
}

export function useGithubStats() {
  const [state, setState] = useState<GithubStatsState>({
    profile: null,
    repos: [],
    contributions: null,
    status: 'loading',
    refreshedAt: null,
  })

  useEffect(() => {
    let cancelled = false

    fetch(statsUrl, { cache: 'no-store' })
      .then((r) => (r.ok ? (r.json() as Promise<GithubStatsFile>) : Promise.reject(new Error('stats fetch failed'))))
      .then((data) => {
        if (cancelled) return
        if (!data.profile) {
          setState({ profile: null, repos: [], contributions: null, status: 'error', refreshedAt: null })
          return
        }
        const pinned = pinnedRepoSlugs
          .map((slug) => data.repos.find((r) => r.name === slug))
          .filter((r): r is GithubRepo => r !== undefined && isGithubUrl(r.html_url, ['github.com']))
        const avatarOk = isGithubUrl(data.profile.avatar_url, ['avatars.githubusercontent.com'])
        setState({
          profile: { ...data.profile, avatar_url: avatarOk ? data.profile.avatar_url : '' },
          repos: pinned,
          contributions: data.contributions ?? null,
          status: 'success',
          refreshedAt: data.generatedAt ? new Date(data.generatedAt) : null,
        })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: 'error' }))
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
