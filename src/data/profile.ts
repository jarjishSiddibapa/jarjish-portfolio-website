import type { SocialLink, StatEntry } from '@/types'

const resumeHref = `${import.meta.env.BASE_URL}resume/Jarjish-Siddibapa-Resume.pdf`

export const profile = {
  name: 'Jarjish Siddibapa',
  initials: 'JS',
  role: 'Data Analyst | SQL, PySpark & Databricks',
  roles: [
    'Data Analyst',
    'SQL & PySpark Specialist',
    'Python Developer',
    'AI/ML Engineer',
  ],
  tagline:
    "I build the systems companies wish they already had: SQL and PySpark pipelines that audit themselves, automation that runs unattended, and AI/ML products shipped into real production instead of sitting in a notebook.",
  bio: [
    "I'm a Data Analyst at RDC Concrete, where I own data problems end to end, from a stakeholder's spreadsheet headache to a deployed, self-auditing production system running across 140+ locations.",
    'My work leads with SQL, PySpark, and Databricks for data at scale, backed by Python for automation and applied AI. I write SQL/PL-SQL pipelines that reconcile themselves, build desktop tools with real hardware integrations, and ship LLM-powered chatbots on Gemini and Claude.',
    "Outside of work, I build and ship independent ML and deep learning systems end to end, including a ResNet50 transfer-learning model that classifies chest X-rays across 4 diagnostic classes at 95%+ validation accuracy and runs behind a working web app instead of sitting in a notebook.",
    "I lean on AI-assisted development to move fast, but the habit that actually matters is the same one behind my production pipelines: never trust output, mine or a model's, until it's validated. That's why my automation reconciles itself, and why my ML work gets judged on cross-validated metrics instead of a single lucky score.",
  ],
  location: 'Thane, Maharashtra, India',
  openTo: 'Remote, hybrid & on-site across Thane and Mumbai',
  email: 'jarjishsiddibapa@gmail.com',
  phone: '+91 7249550565',
  resumeHref,
  availability: 'Available for full-time roles',
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/jarjishSiddibapa', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jarjish-siddibapa', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:jarjishsiddibapa@gmail.com', icon: 'mail' },
  { label: 'Phone', href: 'tel:+917249550565', icon: 'phone' },
  { label: 'Resume', href: resumeHref, icon: 'resume' },
]

export const stats: StatEntry[] = [
  { id: 'plants', label: 'Concrete plants covered by automation', value: 140, suffix: '+' },
  { id: 'sites', label: 'Sites on live monitoring dashboard', value: 14, suffix: '+' },
  { id: 'ocr', label: 'Reduction in manual document handling', value: 80, suffix: '%' },
  { id: 'cgpa', label: 'CGPA in B.E. Computer Science (Hons. AI/ML)', value: 9.54, suffix: '/10' },
]

export const githubUsername = 'jarjishSiddibapa'
