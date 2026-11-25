import type { SocialLink, StatEntry } from '@/types'

const resumeHref = `${import.meta.env.BASE_URL}resume/Jarjish-Siddibapa-Resume.pdf`

export const profile = {
  name: 'Jarjish Siddibapa',
  initials: 'JS',
  primaryRole: 'Python & Full-Stack Developer',
  role: 'Python & Full-Stack Developer | FastAPI & Flask | React & Node.js | SQL & Oracle ERP',
  roles: [
    'Python & FastAPI',
    'React & Node.js',
    'ERP-Integrated Web Apps',
    'SQL & PL/SQL',
    'Automation & Reporting',
  ],
  tagline:
    'I turn business problems into working software: web apps, ERP and API integrations, automation, OCR and AI tools. 12 built and shipped for teams across 140+ concrete plants.',
  footerLine: 'Give me a business problem and a system with data or an API, and I will build the software for it.',
  bio: [
    "I'm a Software Developer (Graduate Engineer Trainee) at RDC Concrete in Thane. Since October 2025 I've built the internal web applications that finance, sales and operations teams use every day: Flask, FastAPI and Node/Express back ends with React front ends on MySQL, with role-based access, audit trails, scheduled ERP and ManageEngine syncs, Excel reporting and automated backups.",
    'They sit on top of strong data foundations: SQL, PL/SQL and Oracle EBS for reconciliation and data quality across 140+ concrete plants. Accounts Payables reporting replaces about an hour of daily manual work, validated Balance Confirmation and Payment Reminder workflows turn a 2 to 3 day process into minutes, and Python/OCR document processing has reduced manual handling by approximately 80%.',
    'I write tests and document what I build, and the code and screenshots are on my GitHub. I also use AI coding assistants in my workflow and can explain and maintain everything I ship.',
  ],
  location: 'Thane, Maharashtra, India',
  openTo: 'Remote, hybrid & on-site across Thane, Navi Mumbai & Mumbai',
  email: 'jarjishsiddibapa@gmail.com',
  phone: '+91 7249550565',
  resumeHref,
  availability: 'Open to Python, backend and full-stack developer roles',
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
  { id: 'apps', label: 'Applications and tools built for RDC teams', value: 12 },
  { id: 'ocr', label: 'Reduction in manual document handling', value: 80, suffix: '%' },
  { id: 'cgpa', label: 'CGPA in B.E. Computer Science (Hons. AI/ML)', value: 9.54, suffix: '/10' },
]

export const githubUsername = 'jarjishSiddibapa'

export const aboutPillars = [
  { icon: 'Code2', title: 'Web applications', description: 'Python, React and Node.js applications with REST APIs, role-based access, audit trails, scheduled syncs and automated tests, replacing repetitive manual work.' },
  { icon: 'Database', title: 'ERP integration & data quality', description: 'Oracle EBS, Tally and ManageEngine integrations, with SQL and PL/SQL checks for complete, consistent ERP data.' },
  { icon: 'BarChart3', title: 'Reporting & automation', description: 'Excel reporting, reconciliation, PDF and email automation that give teams reliable numbers without manual effort.' },
]

export const skillMarquee = [
  'Python', 'FastAPI', 'Flask', 'React', 'Node.js', 'Express', 'REST APIs', 'MySQL', 'SQL', 'PL/SQL', 'Oracle EBS', 'SQLAlchemy', 'pytest', 'pandas', 'Advanced Excel', 'Reconciliation',
]
