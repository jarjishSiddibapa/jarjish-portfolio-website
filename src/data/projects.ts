import type { ProjectEntry } from '@/types'

export const projects: ProjectEntry[] = [
  {
    id: 'daily-volume-tracker', title: 'RDC Daily Volume Tracker', category: 'Data & Analytics',
    context: 'Professional work · RDC Concrete',
    problem: 'Daily production data was spread across Oracle ERP, manual plant updates and spreadsheets.',
    description: 'Combined ERP-synchronized and manually entered volumes in one controlled workflow for daily plant and area reporting.',
    highlights: ['Target tracking, variance analysis and historical comparisons', 'Repeatable Excel reports and Oracle ERP synchronization', 'Zero-volume alerts and audit history for accountable updates'],
    stack: ['SQL', 'Python', 'Oracle EBS', 'pandas', 'Excel'],
    impact: 'Daily production visibility across 140+ concrete plants.',
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-daily-volume-tracker' }],
    featured: true,
    githubFeatured: true,
  },
  {
    id: 'accounts-suite', title: 'RDC Accounts Suite', category: 'Reporting & Automation',
    context: 'Professional work · Finance operations',
    problem: 'Finance teams relied on separate utilities and spreadsheets for reporting, mappings and reconciliation.',
    description: 'Consolidated financial data processing, Excel reporting, Oracle ERP enrichment and scheduled finance communication in a permission-controlled workspace.',
    highlights: ['Data validation and exception detection for finance reporting', 'Shared mappings and reconciliation workflows', 'Controlled Excel processing and scheduled communication'],
    stack: ['Python', 'SQL', 'Excel', 'Oracle ERP', 'MySQL'],
    impact: 'One workspace for repeatable finance reporting and reconciliation, replacing fragmented utilities.',
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-accounts-suite' }],
    featured: true,
    githubFeatured: true,
  },
  {
    id: 'so-ageing-pipeline', title: 'Self-Auditing SO Ageing Pipeline', category: 'Data & Analytics',
    context: 'Professional work · RDC Concrete',
    problem: 'A successful data push alone could not establish that ERP ageing data had been delivered completely.',
    description: 'Built scheduled Oracle EBS refreshes with independent reconciliation to check delivery integrity and expose silent failures.',
    highlights: ['SQL / PL/SQL processing with refreshes every three hours', 'ERP-to-API delivery with an independent 24-hour reconciliation window', 'Completeness checks and failure detection to support data trust'],
    stack: ['SQL', 'PL/SQL', 'Oracle EBS', 'Python', 'REST APIs'],
    impact: 'Independent delivery checks across a 24-hour window, alongside three-hour data refreshes.',
    featured: true,
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-so-ageing-data-push' }],
  },
  {
    id: 'bulk-mailer-suite', title: 'Finance Reporting & Communication Automation', category: 'Reporting & Automation',
    context: 'Professional work · Accounts Payables, Balance Confirmation & Payment Reminder',
    problem: 'Daily AP reports and periodic customer finance communication required repetitive manual preparation.',
    description: 'Used SQL, Python and Excel to prepare validated finance datasets, generate PDFs and automate report and email distribution.',
    highlights: ['AP exception reporting: unaccounted transactions, pending MRNs and uninvoiced expense POs', 'Validated Balance Confirmation and Payment Reminder datasets', 'PDF and email workflows across three business entities'],
    stack: ['SQL', 'Python', 'Excel', 'Oracle EBS', 'PDF generation', 'Email automation'],
    impact: 'About one hour/day of AP reporting automated; a 2–3 day confirmation/reminder process reduced to minutes.',
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-payment-reminder-v2' }],
    featured: true,
    githubFeatured: true,
  },
  {
    id: 'databricks-pyspark-practice',
    title: 'Databricks & PySpark Data Engineering Practice',
    category: 'Data Engineering',
    context: 'Hands-on practice / learning',
    problem: 'Develop practical skills in transforming and incrementally loading larger datasets.',
    description:
      'Notebook-based data engineering workflows built to go deep on the Databricks and PySpark patterns that show up in production pipelines: DataFrame transformations, joins, window functions, and incremental Delta Lake loads.',
    highlights: [
      'DataFrame operations, joins, and window functions in PySpark and Spark SQL',
      'Deduplication and incremental loading patterns',
      'Delta Lake MERGE/upserts and partition-aware processing',
    ],
    stack: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake'],
    featured: true,
    impact: 'Practice in repeatable transformations and incremental loading; a learning project, not an RDC production system',
  },
  {
    id: 'rdc-stamper',
    title: 'RDC Stamper V1 / V2',
    category: 'Reporting & Automation',
    description:
      'A Windows desktop tool that verifies scanned invoice PDFs against an Excel list, stamps only the matching pages and writes an Excel verification report, with an offline OCR fallback and duplicate detection.',
    highlights: [
      'Matches invoice numbers and dates to an Excel list; flags duplicates, date mismatches and missing invoices in a report',
      'Offline Tesseract OCR fallback with parallel page analysis',
      'Formally recognized by the CFO for its impact',
    ],
    stack: ['Python', 'PySide6', 'PyMuPDF', 'Tesseract OCR', 'pandas'],
    impact: '~80% reduction in manual document handling time',
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-stamper-v2' }],
  },
  {
    id: 'pdc-manager',
    title: 'RDC PDC Manager',
    category: 'Reporting & Automation',
    context: 'Professional work · Finance operations',
    description:
      'A role-based Flask application that manages post-dated cheques from collection to clearance, with a 13-status workflow, ERP-synchronised master data, dashboards and an Excel report builder.',
    highlights: [
      'Role-scoped workflow for sales, accounts, HO accounts and credit control, with a full audit trail',
      'Oracle ERP sync of customers and sales representatives on a configurable schedule',
      'Excel report builder with filters, column selection and formatted export',
    ],
    stack: ['Python', 'Flask', 'MySQL', 'Oracle ERP', 'Chart.js'],
    impact: 'One audited workflow for every post-dated cheque, from collection to clearance, bounce or settlement.',
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-pdc-project' }],
  },
  {
    id: 'onboarding-portal',
    title: 'RDC Employee Onboarding Portal',
    category: 'Reporting & Automation',
    context: 'Professional work · HR operations',
    description:
      'A role-based Flask application that takes a new hire from hiring request to registration in the attendance system through a configurable multi-step approval workflow, with a staffing-norms gate that blocks over-norm hiring.',
    highlights: [
      'Approval workflow built as a state machine, with region and company routing and an append-only audit log',
      'Approved employees pushed to the Truein attendance API with validation, retries and a pre-flight check',
      'Headcount reconciled from ZingHR and Truein against plant production volume to enforce staffing norms',
    ],
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'REST APIs', 'pytest'],
    impact: 'One audited route from hiring request to attendance registration, backed by 362 automated tests.',
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc_onboarding' }],
  },
  {
    id: 'digital-signature-app',
    title: 'RDC Digital Signature Application',
    category: 'Other Projects',
    description:
      'A desktop application built from scratch for hardware-based digital signing, with USB PKCS#11 token integration, hot-plug detection, dual placement modes, and batch processing.',
    highlights: [
      'PKCS#11 USB hardware token integration with hot-plug detection',
      'Dual signature-placement modes and batch document processing',
      'Replaced a paid tool costing ₹20k+ per user with a zero-cost in-house build',
    ],
    stack: ['Python', 'customtkinter', 'PKCS#11', 'PDF processing'],
    impact: '₹20k+ per-user licensing cost eliminated across the organization',
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-digital-signatures' }],
  },
  {
    id: 'network-monitoring',
    title: 'Multi-Internet Network Monitoring Dashboard',
    category: 'Other Projects',
    description:
      'A real-time monitoring dashboard tracking network and internet health across 14+ sites, built to replace a legacy tool that silently lost historical data.',
    highlights: [
      'Live monitoring across 14+ sites via SNMP',
      'Google OAuth 2.0 authenticated access',
      'Persists historical trend data the legacy tool used to drop',
    ],
    stack: ['Python', 'Streamlit', 'pysnmp', 'Google OAuth 2.0'],
    impact: 'Replaced a legacy monitoring tool across 14+ business sites',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot for Corporate Website',
    category: 'Other Projects',
    description:
      'A multilingual, voice-enabled chat assistant for the corporate website, built on Gemini with Google Search grounding and Google Cloud Text-to-Speech, behind a Flask API and a lightweight chat widget.',
    highlights: [
      'Text and voice questions, with spoken replies in Hindi, Marathi, Telugu or Indian English',
      'Knowledge base built from scraped website pages and a locations file, with Google Search as a fallback',
      'Architecture documented for non-technical stakeholder handover',
    ],
    stack: ['Python', 'Flask', 'Gemini API', 'Google Cloud TTS', 'JavaScript'],
    impact: 'Live AI assistant shipped end-to-end for a corporate website',
    githubFeatured: true,
    links: [{ label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/rdc-website-chatbot' }],
  },
  {
    id: 'lung-disease-classification',
    title: 'Lung Disease Classification (Deep Learning)',
    category: 'Other Projects',
    description:
      'A deep learning system that classifies chest X-rays into COVID-19, Pneumonia, Tuberculosis, or Normal using transfer learning on ResNet50, deployed behind a Flask web app for real-time image upload and diagnosis.',
    highlights: [
      'ResNet50 transfer learning with a custom classification head',
      'Trained on 6,500+ labeled chest X-ray images across 4 classes',
      'Data augmentation pipeline (rotation, shift, flip, zoom) to reduce overfitting',
      'Flask web interface for image upload and live inference',
    ],
    stack: ['Python', 'TensorFlow', 'ResNet50', 'Transfer Learning', 'Flask', 'NumPy'],
    impact: 'Over 95% validation accuracy across 4 diagnostic classes',
    links: [
      { label: 'GitHub', href: 'https://github.com/jarjishSiddibapa/lung-disease-classification' },
    ],
  },
  {
    id: 'vizdoom-rl',
    title: 'VizDoom RL Agent',
    category: 'Other Projects',
    description:
      'A reinforcement learning research project comparing PPO, DQN, A2C, and DDPG agents inside the VizDoom environment, with a Jupyter pipeline for tracking and visualizing training performance across levels.',
    highlights: [
      'Implemented and compared 4 RL algorithms: PPO, DQN, A2C, DDPG',
      'Custom Jupyter pipelines for training visualization',
      'Benchmarked agent performance across multiple game levels',
    ],
    stack: ['Python', 'VizDoom', 'pandas', 'Matplotlib', 'Reinforcement Learning'],
    impact: 'Comparative benchmark across 4 RL algorithms and multiple environments',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/jarjishSiddibapa/vizdoom-reinforcement-learning',
      },
    ],
  },
]

export const projectCategories = ['All', 'Data & Analytics', 'Reporting & Automation', 'Data Engineering', 'Other Projects'] as const

export const pinnedRepoSlugs = projects
  .filter((project) => project.githubFeatured)
  .flatMap((project) => project.links ?? [])
  .filter((link) => link.label === 'GitHub')
  .map((link) => link.href.split('/').filter(Boolean).pop()!)
