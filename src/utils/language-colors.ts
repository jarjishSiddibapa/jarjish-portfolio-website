export const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  PowerShell: '#012456',
  PLpgSQL: '#336790',
  Shell: '#89e051',
  Dockerfile: '#384d54',
}

export function languageColor(lang: string | null) {
  if (!lang) return '#5c6478'
  return languageColors[lang] ?? '#5b8def'
}
