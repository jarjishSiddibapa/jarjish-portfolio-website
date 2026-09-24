import { useState } from 'react'
import type { ContributionDay } from '@/hooks/useGithubStats'

interface ContributionHeatmapProps {
  days: ContributionDay[]
}

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const CELL_SIZE = 16
const LEVEL_OPACITY = [0, 0.2, 0.45, 0.7, 1]

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return []
  const leadingEmpty = new Date(days[0].date).getDay()
  const cells: (ContributionDay | null)[] = [...Array.from({ length: leadingEmpty }, () => null), ...days]
  const trailingEmpty = (7 - (cells.length % 7)) % 7
  cells.push(...Array.from({ length: trailingEmpty }, () => null))
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

function swatchBackground(level: number): string {
  return level === 0
    ? 'color-mix(in oklab, var(--color-ink) 8%, transparent)'
    : `color-mix(in oklab, var(--color-accent) ${LEVEL_OPACITY[level] * 100}%, transparent)`
}

function formatDate(dateStr: string): string {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ContributionLegend() {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-ink-faint">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((level) => (
        <span
          key={level}
          className="block h-2.5 w-2.5 rounded-[2px]"
          style={{ background: swatchBackground(level) }}
        />
      ))}
      <span>More</span>
    </div>
  )
}

export function ContributionHeatmap({ days }: ContributionHeatmapProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const weeks = buildWeeks(days)
  const max = Math.max(1, ...days.map((d) => d.count))
  const columns = `repeat(${weeks.length}, ${CELL_SIZE}px)`

  const monthLabels = weeks.map((week, i) => {
    const firstDay = week.find((d) => d)
    if (!firstDay) return null
    const date = new Date(`${firstDay.date}T00:00:00`)
    const prevWeekFirstDay = i > 0 ? weeks[i - 1].find((d) => d) : null
    const isNewMonth =
      !prevWeekFirstDay || new Date(`${prevWeekFirstDay.date}T00:00:00`).getMonth() !== date.getMonth()
    return isNewMonth ? MONTH_NAMES[date.getMonth()] : null
  })

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <div className="grid shrink-0 grid-rows-7 gap-1 pt-5 text-[10px] text-ink-faint">
        {DAY_LABELS.map((label, i) => (
          <span key={i} className="flex items-center" style={{ height: CELL_SIZE }}>
            {label}
          </span>
        ))}
      </div>

      <div className="shrink-0">
        <div className="grid gap-1" style={{ gridTemplateColumns: columns }}>
          {monthLabels.map((label, i) => (
            <span key={i} className="block h-4 text-[10px] text-ink-faint">
              {label ?? ''}
            </span>
          ))}
        </div>

        <div className="grid grid-flow-col grid-rows-7 gap-1" style={{ gridTemplateColumns: columns }}>
          {weeks.flatMap((week, weekIndex) =>
            week.map((day, dayIndex) => {
              const key = `${weekIndex}-${dayIndex}`
              return (
                <span key={key} className="relative">
                  <span
                    onMouseEnter={() => day && setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => day && setHovered((h) => (h === key ? null : key))}
                    className="block rounded-[2px]"
                    style={{
                      width: CELL_SIZE,
                      height: CELL_SIZE,
                      background: day ? swatchBackground(levelFor(day.count, max)) : 'transparent',
                    }}
                  />
                  {day && hovered === key && (
                    <span className="glass pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink shadow-lg">
                      {day.count} contribution{day.count === 1 ? '' : 's'} on {formatDate(day.date)}
                    </span>
                  )}
                </span>
              )
            }),
          )}
        </div>
      </div>
    </div>
  )
}
