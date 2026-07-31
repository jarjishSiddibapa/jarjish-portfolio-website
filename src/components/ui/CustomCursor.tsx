import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function CustomCursor() {
  const isFinePointer = useMediaQuery('(pointer: fine)')
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 }
  const cursorX = useSpring(x, springConfig)
  const cursorY = useSpring(y, springConfig)

  useEffect(() => {
    if (!isFinePointer) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(!!target.closest('[data-cursor-hover]'))
    }

    document.body.classList.add('cursor-none')
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
    }
  }, [isFinePointer, isVisible, x, y])

  if (!isFinePointer) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-100 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: isHovering ? 56 : 14,
          height: isHovering ? 56 : 14,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
    </motion.div>
  )
}
