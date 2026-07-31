import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { profile } from '@/data/profile'

const LINES = [
  '$ whoami',
  profile.name,
  '$ cat status.txt',
  profile.availability + ' | ' + profile.openTo,
  '$ ./run_hiring_pipeline.sh',
  'Compiling experience......... done',
  'Loading automations.......... done (140+ plants online)',
  'Checking AI/LLM stack........ Gemini, Claude, RAG, HuggingFace [OK]',
  '',
  'You found the Konami code. Nice instinct, that\'s exactly the',
  'kind of curiosity I look for in the people I work with.',
  '',
  `$ open mailto:${profile.email}`,
]

export function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  const activate = useCallback(() => {
    setOpen(true)
    setVisibleLines(0)
  }, [])

  useKonamiCode(activate)

  useEffect(() => {
    if (!open) return
    if (visibleLines >= LINES.length) return
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), 90)
    return () => clearTimeout(timeout)
  }, [open, visibleLines])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-200 grid place-items-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-accent-3/30 bg-[#05070c] font-mono text-sm shadow-[0_0_60px_-10px_var(--color-accent-3)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs text-ink-faint">secret-terminal</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-ink-faint hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-[280px] p-5 text-emerald-400">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <p key={i} className="leading-relaxed whitespace-pre-wrap">
                  {line || ' '}
                </p>
              ))}
              {visibleLines < LINES.length && (
                <span className="inline-block h-4 w-2 animate-pulse bg-emerald-400 align-middle" />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
