import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { profile, socials } from '@/data/profile'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ConfettiBurst } from '@/components/ui/ConfettiBurst'
import { cn } from '@/utils/cn'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

const contactInfo = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, '')}`,
  },
  { icon: MapPin, label: 'Location', value: profile.location, href: undefined },
]

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const isConfigured = Boolean(serviceId && templateId && publicKey)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const message = String(data.get('message') || '').trim()

    const nextErrors: Record<string, string> = {}
    if (name.length < 2) nextErrors.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Enter a valid email.'
    if (message.length < 10) nextErrors.message = 'Message should be at least 10 characters.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (!isConfigured) {
      setStatus('unconfigured')
      return
    }

    try {
      setStatus('sending')
      await emailjs.sendForm(serviceId!, templateId!, form, { publicKey })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          align="center"
          title="Let's build something reliable"
          description="Open to remote, hybrid, and full-time roles across Thane, Mumbai, and beyond, in data, automation, or AI. Reach out directly."
          className="mx-auto"
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {contactInfo.map((item) => {
                const Content = (
                  <div className="glass flex items-center gap-4 rounded-2xl p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-accent-3">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs text-ink-faint uppercase">{item.label}</p>
                      <p className="mt-0.5 text-sm font-medium text-ink">{item.value}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a key={item.label} href={item.href} data-cursor-hover>
                    {Content}
                  </a>
                ) : (
                  <div key={item.label}>{Content}</div>
                )
              })}

              <div className="glass mt-2 flex flex-1 flex-col justify-between rounded-2xl p-5">
                <p className="text-xs text-ink-faint uppercase">Elsewhere</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {socials
                    .filter((s) => s.icon === 'github' || s.icon === 'linkedin')
                    .map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-hover
                        className="rounded-full border border-border px-4 py-2 text-sm text-ink-dim transition hover:border-accent/50 hover:text-ink"
                      >
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative lg:col-span-3">
            <ConfettiBurst active={status === 'success'} />
            <form onSubmit={handleSubmit} noValidate className="glow-border glass rounded-2xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-1.5 block text-sm text-ink-dim">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={cn(
                      'w-full rounded-xl border border-border bg-ink/[0.025] px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50',
                      errors.name && 'border-red-500/60',
                    )}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-1.5 block text-sm text-ink-dim">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={cn(
                      'w-full rounded-xl border border-border bg-ink/[0.025] px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50',
                      errors.email && 'border-red-500/60',
                    )}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm text-ink-dim">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={cn(
                      'w-full resize-none rounded-xl border border-border bg-ink/[0.025] px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/50',
                      errors.message && 'border-red-500/60',
                    )}
                    placeholder="Tell me about the role or project..."
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <MagneticButton
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </MagneticButton>

                {status === 'success' && (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Message sent, thank you!
                  </span>
                )}
                {status === 'error' && (
                  <span className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" /> Something went wrong. Try email instead.
                  </span>
                )}
                {status === 'unconfigured' && (
                  <span className="text-sm text-ink-faint">
                    Form isn't wired up yet. Please email{' '}
                    <a href={`mailto:${profile.email}`} className="text-accent-3 hover:underline">
                      {profile.email}
                    </a>{' '}
                    directly.
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
