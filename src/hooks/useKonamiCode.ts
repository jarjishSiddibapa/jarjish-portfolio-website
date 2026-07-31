import { useEffect, useRef } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonamiCode(onActivate: () => void) {
  const progress = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[progress.current]
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        progress.current += 1
        if (progress.current === KONAMI.length) {
          progress.current = 0
          onActivate()
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onActivate])
}
