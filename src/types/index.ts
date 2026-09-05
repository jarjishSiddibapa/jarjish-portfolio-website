export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail' | 'phone' | 'twitter' | 'leetcode' | 'resume'
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  description: string
  skills: string[]
}

export interface ExperienceEntry {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  summary: string
  highlights: string[]
  stack: string[]
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  start: string
  end: string
  detail: string
}

export interface ProjectEntry {
  id: string
  title: string
  category: 'Reporting & Automation' | 'Data & Analytics' | 'Data Engineering' | 'Other Projects'
  problem?: string
  context?: string
  description: string
  highlights: string[]
  stack: string[]
  impact: string
  links?: { label: string; href: string }[]
  featured?: boolean
}

export interface CertificationEntry {
  id: string
  title: string
  issuer: string
  date: string
  href?: string
}

export interface StatEntry {
  id: string
  label: string
  value: number
  suffix?: string
}
