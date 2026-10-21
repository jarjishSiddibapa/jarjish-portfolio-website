import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('group relative', className)}>{children}</div>
}
