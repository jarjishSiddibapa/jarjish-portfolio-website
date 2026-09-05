import type { EducationEntry, ExperienceEntry } from '@/types'

export const experience: ExperienceEntry[] = [
  {
    id: 'rdc-concrete',
    role: 'Data Analyst (Graduate Engineer Trainee)',
    company: 'RDC Concrete', location: 'Thane, Maharashtra', start: 'Oct 2025', end: 'Present',
    summary: 'Analyze operational and finance data using SQL, PL/SQL, Oracle EBS, Python and Excel, with a focus on reporting, reconciliation, data quality and repeatable automation.',
    highlights: [
      'Built and deployed the Daily Volume Tracker for 140+ concrete plants, providing daily production and volume visibility and identifying zero-production locations.',
      'Designed a self-auditing SO Ageing workflow that refreshes Oracle EBS data every three hours and independently reconciles delivery over a 24-hour window.',
      'Automated Accounts Payables exception reporting for unaccounted transactions, pending MRNs and uninvoiced expense POs, replacing approximately one hour of daily manual reporting with a single-click workflow.',
      'Built validated datasets, automated PDF generation and email distribution for Balance Confirmation and Payment Reminder workflows, reducing a 2–3 day process to minutes.',
      'Developed SQL and PL/SQL logic for audit reconciliation, missing IOCL PO / Debit Memo detection, GST invoice checks, HSN/master-data quality and ERP reporting.',
      'Integrated REST API data and built Python/OCR document workflows that reduced manual document handling by approximately 80%.',
    ],
    selectedProjects: [
      {
        title: 'Daily Volume Tracker',
        detail: 'Plant-level production, targets, variance analysis and Excel reporting for 140+ locations.',
        href: 'https://github.com/jarjishSiddibapa/rdc-daily-volume-tracker',
      },
      {
        title: 'SO Ageing Pipeline',
        detail: 'Three-hour ERP refreshes with customer-level reconciliation and delivery acknowledgement checks.',
        href: 'https://github.com/jarjishSiddibapa/rdc-so-ageing-data-push',
      },
      {
        title: 'Accounts Suite',
        detail: 'Finance reporting, data-quality checks, mappings and reconciliation workflows in one workspace.',
        href: 'https://github.com/jarjishSiddibapa/rdc-accounts-suite',
      },
      {
        title: 'Digital Signatures',
        detail: 'Hardware-token PDF signing and batch automation built as an in-house desktop application.',
        href: 'https://github.com/jarjishSiddibapa/rdc-digital-signatures',
      },
    ],
    stack: ['SQL', 'PL/SQL', 'Oracle EBS R12.2.10', 'Python', 'Excel', 'REST APIs', 'Tesseract OCR'],
  },
  {
    id: 'aurionpro', role: 'Software Engineer Trainee', company: 'AurionPro',
    location: 'Navi Mumbai, India', start: 'Jun 2025', end: 'Oct 2025',
    summary: 'Gained enterprise application experience with relational data, REST APIs and debugging.',
    highlights: [
      'Worked with PostgreSQL and MySQL data workflows in enterprise Java applications.',
      'Used Git, investigated application issues and worked with REST APIs in Spring Boot and Angular applications.',
    ],
    stack: ['PostgreSQL', 'MySQL', 'REST APIs', 'Git', 'Java', 'Spring Boot'],
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
