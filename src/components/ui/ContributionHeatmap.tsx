import type { ContributionDay } from '@/hooks/useGithubStats'

interface ContributionHeatmapProps {
  days: ContributionDay[]
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return []
  const leadingEmpty = new Date(days[0].date).getDay()
  const cells: (ContributionDay | null)[] = [...Array.from({ length: leadingEmpty }, () => null), ...days]
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

function levelFor(count: number, max: number): number {
  if (count === 0) return 0
  return Math.min(4, Math.ceil((count / max) * 4))
}

const LEVEL_OPACITY = [0, 0.2, 0.45, 0.7, 1]

export function ContributionHeatmap({ days }: ContributionHeatmapProps) {
  const weeks = buildWeeks(days)
  const max = Math.max(1, ...days.map((d) => d.count))

  const monthLabels = weeks.map((week, i) => {
    const firstDay = week.find((d) => d)
    if (!firstDay) return null
    const date = new Date(firstDay.date)
    const prevWeekFirstDay = i > 0 ? weeks[i - 1].find((d) => d) : null
    const isNewMonth = !prevWeekFirstDay || new Date(prevWeekFirstDay.date).getMonth() !== date.getMonth()
    return isNewMonth ? MONTH_NAMES[date.getMonth()] : null
  })

  return (
    <div className="flex gap-2 overflow-x-auto">
      <div className="grid shrink-0 grid-rows-7 gap-1 pt-5 text-[10px] text-ink-faint">
        {DAY_LABELS.map((label, i) => (
          <span key={i} className="flex h-3 items-center">
            {label}
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            <span className="block h-4 text-[10px] text-ink-faint">{monthLabels[weekIndex] ?? ''}</span>
            {week.map((day, dayIndex) => (
              <span
                key={dayIndex}
                className="block h-3 w-3 rounded-[2px]"
                style={{
                  background: !day
                    ? 'transparent'
                    : day.count === 0
                      ? 'color-mix(in oklab, var(--color-ink) 8%, transparent)'
                      : `color-mix(in oklab, var(--color-accent) ${LEVEL_OPACITY[levelFor(day.count, max)] * 100}%, transparent)`,
                }}
                title={day ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}` : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
