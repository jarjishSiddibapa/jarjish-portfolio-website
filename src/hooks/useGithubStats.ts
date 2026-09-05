import { useCallback, useEffect, useState } from 'react'
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
  updated_at: string
}

interface GithubStatsState {
  profile: GithubProfile | null
  repos: GithubRepo[]
  status: 'idle' | 'loading' | 'success' | 'error'
  isRefreshing: boolean
  refreshedAt: Date | null
}

export function useGithubStats() {
  const [state, setState] = useState<GithubStatsState>({
    profile: null,
    repos: [],
    status: 'idle',
    isRefreshing: false,
    refreshedAt: null,
  })
  const [refreshKey, setRefreshKey] = useState(0)
  const refresh = useCallback(() => setRefreshKey((key) => key + 1), [])

  useEffect(() => {
    let cancelled = false
    setState((s) => ({
      ...s,
      status: s.profile ? 'success' : 'loading',
      isRefreshing: Boolean(s.profile),
    }))

    Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, {
        cache: 'no-store',
        headers: { Accept: 'application/vnd.github+json', 'Cache-Control': 'no-cache' },
      }).then((r) =>
        r.ok ? r.json() : Promise.reject(new Error('profile fetch failed')),
      ),
      fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
        {
          cache: 'no-store',
          headers: { Accept: 'application/vnd.github+json', 'Cache-Control': 'no-cache' },
        },
      ).then((r) => (r.ok ? r.json() : Promise.reject(new Error('repos fetch failed')))),
    ])
      .then(([profile, repos]: [GithubProfile, GithubRepo[]]) => {
        if (cancelled) return
        const pinned = pinnedRepoSlugs
          .map((slug) => repos.find((r) => r.name === slug))
          .filter((r): r is GithubRepo => Boolean(r))
        setState({ profile, repos: pinned, status: 'success', isRefreshing: false, refreshedAt: new Date() })
      })
      .catch(() => {
        if (!cancelled) setState((s) => ({ ...s, status: 'error', isRefreshing: false }))
      })

    return () => {
      cancelled = true
    }
  }, [refreshKey])

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    const intervalId = window.setInterval(refresh, 5 * 60 * 1000)
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refreshWhenVisible)
    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refreshWhenVisible)
    }
  }, [refresh])

  return { ...state, refresh }
}
