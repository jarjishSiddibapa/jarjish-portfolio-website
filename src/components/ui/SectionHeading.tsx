import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Reveal>
        <div
          className={cn(
            'mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-accent-3 uppercase',
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-3 shadow-[0_0_8px_var(--color-accent-3)]" />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.14}>
          <p
            className={cn(
              'mt-4 max-w-2xl text-lg text-ink-dim',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
