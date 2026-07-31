import { useEffect, useState } from 'react'
import { githubUsername } from '@/data/profile'
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
}

interface GithubStatsState {
  profile: GithubProfile | null
  repos: GithubRepo[]
  status: 'idle' | 'loading' | 'success' | 'error'
}

export function useGithubStats() {
  const [state, setState] = useState<GithubStatsState>({
    profile: null,
    repos: [],
    status: 'idle',
  })

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, status: 'loading' }))

    Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`).then((r) =>
        r.ok ? r.json() : Promise.reject(new Error('profile fetch failed')),
      ),
      fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error('repos fetch failed')))),
    ])
      .then(([profile, repos]: [GithubProfile, GithubRepo[]]) => {
        if (cancelled) return
        const pinned = pinnedRepoSlugs
          .map((slug) => repos.find((r) => r.name === slug))
          .filter((r): r is GithubRepo => Boolean(r))
        setState({ profile, repos: pinned, status: 'success' })
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
