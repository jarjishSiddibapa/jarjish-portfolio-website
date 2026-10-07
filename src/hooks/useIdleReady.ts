import { useEffect, useState } from 'react'

/** Flips to true once the browser is idle, so decorative work never competes with first paint. */
export function useIdleReady(timeout = 1500) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 600)
    return () => window.clearTimeout(id)
  }, [timeout])

  return ready
}
