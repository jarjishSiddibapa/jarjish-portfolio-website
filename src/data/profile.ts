import type { SocialLink, StatEntry } from '@/types'

const resumeHref = `${import.meta.env.BASE_URL}resume/Jarjish-Siddibapa-Resume.pdf`

export const profile = {
  name: 'Jarjish Siddibapa',
  initials: 'JS',
  primaryRole: 'Data Analyst & Full-Stack Developer',
  role: 'Data Analyst & Full-Stack Developer | SQL & PL/SQL | Advanced Excel | Python | React & Node.js',
  roles: [
    'SQL & PL/SQL',
    'Advanced Excel',
    'Python & Automation',
    'Full-Stack Web Applications',
    'Oracle EBS Analytics',
  ],
  tagline:
    'I analyse Oracle ERP data across 140+ concrete plants with SQL, Python and advanced Excel, and build the web applications and automation that put reliable numbers in front of the teams who use them.',
  bio: [
    "I'm a Data Analyst (Graduate Engineer Trainee) at RDC Concrete in Thane. Since October 2025, I've worked with SQL, PL/SQL, Oracle EBS, Python and advanced Excel to improve reporting, finance workflows and ERP data quality across 140+ concrete plants.",
    'My work connects analysis with measurable improvements: Accounts Payables reporting replaces about an hour of daily manual work, while validated Balance Confirmation and Payment Reminder workflows turn a 2–3 day process into minutes. Python/OCR document processing has reduced manual handling by approximately 80%.',
    'I also build the applications around the data: Flask, FastAPI and Node/Express back ends with React front ends and MySQL, including role-based access, audit trails, scheduled ERP and ManageEngine syncs, Excel reporting and automated backups. The code for these is on my GitHub.',
  ],
  location: 'Thane, Maharashtra, India',
  openTo: 'Remote, hybrid & on-site across Thane, Navi Mumbai & Mumbai',
  email: 'jarjishsiddibapa@gmail.com',
  phone: '+91 7249550565',
  resumeHref,
  availability: 'Open to Data Analyst & Full-Stack roles',
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
  { id: 'apps', label: 'Applications and tools built for RDC teams', value: 11 },
  { id: 'ocr', label: 'Reduction in manual document handling', value: 80, suffix: '%' },
  { id: 'cgpa', label: 'CGPA in B.E. Computer Science (Hons. AI/ML)', value: 9.54, suffix: '/10' },
]

export const githubUsername = 'jarjishSiddibapa'

export const aboutPillars = [
  { icon: 'BarChart3', title: 'Reporting & analysis', description: 'Production visibility, variance analysis and Excel reporting (SUMIFS, lookups, pivot tables) that help teams act on operational data.' },
  { icon: 'Database', title: 'Reconciliation & data quality', description: 'SQL and PL/SQL checks for complete, consistent ERP data and finance exception reporting.' },
  { icon: 'Code2', title: 'Web applications & automation', description: 'Python, React and Node.js applications, REST APIs and scheduled jobs with role-based access and audit trails, replacing repetitive manual work.' },
]

export const skillMarquee = [
  'SQL', 'PL/SQL', 'Advanced Excel', 'Python', 'pandas', 'Oracle EBS', 'React', 'Node.js', 'Flask', 'FastAPI', 'MySQL', 'REST APIs', 'Reconciliation', 'Data Quality', 'Pivot Tables', 'XLOOKUP',
]
