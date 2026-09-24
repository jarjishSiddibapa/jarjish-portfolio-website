// Fetches GitHub profile + repo data with an authenticated request (5,000/hour)
// and writes a static JSON file the deployed site reads same-origin, so no
// visitor's browser ever calls api.github.com directly (which is capped at
// 60 requests/hour per IP and gets exhausted almost immediately).
import { writeFile } from 'node:fs/promises'

const username = 'jarjishSiddibapa'
const token = process.env.GITHUB_TOKEN
const headers = {
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

const to = new Date()
const from = new Date(to)
from.setMonth(from.getMonth() - 3)

const contributionsQuery = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

const [profileRes, reposRes, contributionsRes] = await Promise.all([
  fetch(`https://api.github.com/users/${username}`, { headers }),
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers }),
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: contributionsQuery,
      variables: { login: username, from: from.toISOString(), to: to.toISOString() },
    }),
  }),
])

if (!profileRes.ok || !reposRes.ok || !contributionsRes.ok) {
  throw new Error(
    `GitHub API request failed: profile=${profileRes.status} repos=${reposRes.status} contributions=${contributionsRes.status}`,
  )
}

const profile = await profileRes.json()
const repos = await reposRes.json()
const contributionsBody = await contributionsRes.json()
if (contributionsBody.errors) {
  throw new Error(`GitHub GraphQL error: ${JSON.stringify(contributionsBody.errors)}`)
}
const calendar = contributionsBody.data.user.contributionsCollection.contributionCalendar

const output = {
  generatedAt: new Date().toISOString(),
  profile: {
    followers: profile.followers,
    public_repos: profile.public_repos,
    avatar_url: profile.avatar_url,
    bio: profile.bio,
    html_url: profile.html_url,
  },
  repos: repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    fork: repo.fork,
    updated_at: repo.updated_at,
  })),
  contributions: {
    totalContributions: calendar.totalContributions,
    days: calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
    ),
  },
}

await writeFile('public/github-stats.json', JSON.stringify(output, null, 2) + '\n')
console.log(`Wrote public/github-stats.json (${output.repos.length} repos)`)
