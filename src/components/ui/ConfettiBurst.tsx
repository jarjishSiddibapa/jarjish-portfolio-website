import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COLORS = ['var(--color-accent)', 'var(--color-accent-2)', 'var(--color-accent-3)', 'var(--color-warm)']

interface Piece {
  id: number
  x: number
  y: number
  rotate: number
  color: string
  shape: 'circle' | 'square'
  scale: number
}

export function ConfettiBurst({ active }: { active: boolean }) {
  const pieces = useMemo<Piece[]>(() => {
    if (!active) return []
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 320,
      y: -Math.random() * 220 - 60,
      rotate: (Math.random() - 0.5) * 360,
      color: COLORS[i % COLORS.length],
      shape: Math.random() > 0.5 ? 'circle' : 'square',
      scale: 0.6 + Math.random() * 0.6,
    }))
  }, [active])

  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 h-0 w-0">
      <AnimatePresence>
        {active &&
          pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: p.scale, rotate: p.rotate }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                width: 8,
                height: 8,
                background: p.color,
                borderRadius: p.shape === 'circle' ? '999px' : '2px',
              }}
            />
          ))}
      </AnimatePresence>
    </div>
  )
}
