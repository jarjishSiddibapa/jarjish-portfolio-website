import { useEffect, useRef, useState } from 'react'

/** True once the element has come within `rootMargin` of the viewport; never flips back. */
export function useInViewOnce<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [seen, rootMargin])

  return [ref, seen] as const
}
