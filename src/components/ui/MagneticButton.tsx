import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  download?: boolean
  'aria-label'?: string
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.35,
  target,
  rel,
  type = 'button',
  disabled,
  download,
  'aria-label': ariaLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el || reducedMotion) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    onClick,
    'aria-label': ariaLabel,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    'data-cursor-hover': true,
    style: reducedMotion ? undefined : { x: springX, y: springY },
    className: cn(className),
    whileTap: disabled || reducedMotion ? undefined : { scale: 0.94 },
    whileHover: disabled || reducedMotion ? undefined : { scale: 1.03 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (href) {
    return (
      <motion.a ref={ref} href={href} download={download} target={target} rel={rel} {...sharedProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button ref={ref} type={type} disabled={disabled} {...sharedProps}>
      {children}
    </motion.button>
  )
}
