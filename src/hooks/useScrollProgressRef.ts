import { useEffect, useRef, type RefObject } from 'react'

/**
 * Tracks how far a DOM element has travelled through the viewport as the
 * page scrolls (0 = just entering from the bottom, 1 = fully scrolled past
 * the top). Written to a mutable ref rather than React state so consumers
 * (e.g. an R3F useFrame loop) can read it every frame without re-rendering.
 */
export function useScrollProgressRef(targetRef: RefObject<HTMLElement | null>) {
  const progress = useRef(0)

  useEffect(() => {
    let raf: number

    const update = () => {
      const el = targetRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const raw = (vh - rect.top) / (vh + rect.height)
        progress.current = Math.min(1, Math.max(0, raw))
      }
      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [targetRef])

  return progress
}
