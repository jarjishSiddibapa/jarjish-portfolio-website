import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useInView } from 'framer-motion'

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1.4,
  decimals = value % 1 !== 0 ? 2 : 0,
}: {
  value: number
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView || reducedMotion) return
    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, reducedMotion])

  return (
    <span ref={ref}>
      {(reducedMotion ? value : display).toFixed(decimals)}
      {suffix}
    </span>
  )
}
