import type { EducationEntry, ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'rdc-concrete',
    role: 'Data Analyst / Automation Engineer (Graduate Engineer Trainee)',
    company: 'RDC Concrete',
    location: 'Thane, India',
    start: 'Oct 2025',
    end: 'Present',
    summary:
      'Own data and automation problems end to end across a 140+ location Oracle EBS R12.2.10 enterprise, from executive dashboards to hardware-integrated desktop tools to LLM-powered internal chatbots, using AI-assisted development to ship faster without compromising reliability.',
    highlights: [
      'Use AI-assisted development (LLM coding tools) across projects to move faster from requirement gathering to deployment, while still validating and testing AI-generated code before it touches production ERP data.',
      'Built and deployed the Daily Volume Tracker, a production monitoring dashboard that auto-flags zero-production plants across 140+ concrete plants and emails daily volume and cost-impact reports to the executive committee.',
      'Designed a self-auditing SO Ageing data pipeline that pushes customer ageing data from Oracle ERP every 3 hours and independently generates a 24-hour reconciliation report to verify delivery integrity.',
      'Built the RDC Digital Signature Application from scratch, with PKCS#11 USB hardware token integration, hot-plug detection, and batch processing, replacing a paid tool costing ₹20k+ per user with a zero-cost in-house solution.',
      'Designed and shipped RDC Stamper V1/V2, an OCR-based (Tesseract) PDF processing tool with duplicate-detection logic; formally recognized by the CFO for cutting document handling time by ~80%.',
      'Automated the Accounts Payables reporting workflow and built 3 automated Bulk Mailer / Payment Reminder desktop apps (PDF + email generation) across 3 business entities, replacing manual invoice workflows.',
      'Developed self-healing server automation (PowerShell + Task Scheduler) for DMS and invoice-server processes, including scheduled restarts and automatic recovery after unplanned reboots.',
      'Built a Multi-Internet Network Monitoring Dashboard (Python, Streamlit, pysnmp, Google OAuth 2.0) across 14+ sites, replacing a legacy tool that failed to retain historical data.',
      'Developed an AI-powered chatbot (Flask, Gemini & Claude LLM APIs) for the corporate website and documented the architecture for stakeholder handover.',
      'Wrote SQL reconciliation queries and PL/SQL packages for audit support, GST/HSN master-data cleanup, and bulk Oracle Autoinvoicing across 140 plants via Oracle Data Loader.',
    ],
    stack: [
      'Python',
      'SQL / PL-SQL',
      'Oracle EBS R12.2.10',
      'PowerShell',
      'Streamlit',
      'Tesseract OCR',
      'Gemini API',
      'Claude API',
      'REST APIs',
    ],
  },
  {
    id: 'aurionpro',
    role: 'Software Engineer Trainee',
    company: 'AurionPro',
    location: 'Navi Mumbai, India',
    start: 'Jun 2025',
    end: 'Oct 2025',
    summary:
      'Full-stack development on enterprise Java applications, building a foundation in clean code and relational data workflows.',
    highlights: [
      'Developed full-stack Java applications using Spring Boot and Angular, applying clean code practices and design patterns.',
      'Worked with relational databases (PostgreSQL, MySQL) and Git for version control, gaining exposure to backend data workflows.',
    ],
    stack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'MySQL', 'Git'],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'apsit',
    school: 'A.P. Shah Institute of Technology',
    degree: 'B.E. in Computer Science Engineering, Honors in AI/ML',
    start: '2022',
    end: '2025',
    detail: 'CGPA: 9.54 / 10',
  },
  {
    id: 'muchhala',
    school: 'Muchhala Polytechnic',
    degree: 'Diploma in Computer Science Engineering',
    start: '2019',
    end: '2022',
    detail: '92.63%',
  },
]
