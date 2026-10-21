import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/utils/cn'

export function SectionHeading({
  title,
  description,
  align = 'left',
  className,
}: {
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
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
