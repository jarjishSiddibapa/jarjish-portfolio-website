import { useEffect, useState } from 'react'
import { pinnedRepoSlugs } from '@/data/projects'

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

interface GithubStatsFile {
  generatedAt: string | null
  profile: GithubProfile | null
  repos: GithubRepo[]
}

interface GithubStatsState {
  profile: GithubProfile | null
  repos: GithubRepo[]
  status: 'loading' | 'success' | 'error'
  refreshedAt: Date | null
}

// Data is fetched hourly by a scheduled GitHub Action (using an
// authenticated token, not subject to the 60/hour anonymous limit) and
// published as a static file — every visitor reads the same snapshot
// same-origin, so no browser ever calls api.github.com directly.
const statsUrl = `${import.meta.env.BASE_URL}github-stats.json`

export function useGithubStats() {
  const [state, setState] = useState<GithubStatsState>({
    profile: null,
    repos: [],
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
          setState({ profile: null, repos: [], status: 'error', refreshedAt: null })
          return
        }
        const pinned = pinnedRepoSlugs
          .map((slug) => data.repos.find((r) => r.name === slug))
          .filter((r): r is GithubRepo => Boolean(r))
        setState({
          profile: data.profile,
          repos: pinned,
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
