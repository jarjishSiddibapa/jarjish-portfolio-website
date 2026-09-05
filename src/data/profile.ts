import type { SocialLink, StatEntry } from '@/types'

const resumeHref = `${import.meta.env.BASE_URL}resume/Jarjish-Siddibapa-Resume.pdf`

export const profile = {
  name: 'Jarjish Siddibapa',
  initials: 'JS',
  primaryRole: 'Data Analyst',
  role: 'Data Analyst | SQL & PL/SQL | Python | Excel | Oracle EBS',
  toolkit: 'SQL & PL/SQL · Python · Excel · Oracle EBS',
  roles: [
    'SQL & PL/SQL',
    'Python & Data Automation',
    'Reporting & Reconciliation',
    'Oracle EBS Analytics',
    'Databricks & PySpark',
  ],
  tagline:
    'I turn complex operational and ERP data into accurate reports, automated workflows and decision-ready insights using SQL, Python and enterprise data systems.',
  evidence: 'Reporting and automation across 140+ concrete plants',
  bio: [
    "I'm a Data Analyst (Graduate Engineer Trainee) at RDC Concrete in Thane. Since October 2025, I've worked with SQL, PL/SQL, Oracle EBS, Python and Excel to improve operational reporting, finance workflows and ERP data quality across 140+ concrete plants.",
    'My work connects analysis with measurable improvements: Accounts Payables reporting replaces about an hour of daily manual work, while validated Balance Confirmation and Payment Reminder workflows turn a 2–3 day process into minutes. Python/OCR document processing has reduced manual handling by approximately 80%.',
    'I build validation into the workflow, from SQL reconciliation and master-data checks to a self-auditing SO Ageing feed. Alongside this professional work, I am developing hands-on Databricks and PySpark skills in data transformation, incremental loads and Delta Lake.',
  ],
  location: 'Thane, Maharashtra, India',
  openTo: 'Remote, hybrid & on-site across Thane, Navi Mumbai & Mumbai',
  email: 'jarjishsiddibapa@gmail.com',
  phone: '+91 7249550565',
  resumeHref,
  availability: 'Open to Data Analyst roles',
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
  { id: 'reporting', label: 'Daily manual AP reporting automated', value: 1, suffix: ' hr' },
  { id: 'ocr', label: 'Reduction in manual document handling', value: 80, suffix: '%' },
  { id: 'cgpa', label: 'CGPA in B.E. Computer Science (Hons. AI/ML)', value: 9.54, suffix: '/10' },
]

export const githubUsername = 'jarjishSiddibapa'

export const aboutPillars = [
  { icon: 'BarChart3', title: 'Reporting & analysis', description: 'Production visibility, variance analysis and Excel reporting that help teams act on operational data.' },
  { icon: 'Database', title: 'Reconciliation & data quality', description: 'SQL and PL/SQL checks for complete, consistent ERP data and finance exception reporting.' },
  { icon: 'Bot', title: 'Data automation', description: 'Python and REST API workflows that validate data and reduce repetitive reporting work.' },
]

export const skillMarquee = ['SQL', 'PL/SQL', 'Python', 'Excel', 'Oracle EBS', 'Reporting', 'Reconciliation', 'Data Quality', 'pandas', 'REST APIs', 'Databricks', 'PySpark']
