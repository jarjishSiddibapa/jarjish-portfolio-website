import type { ProjectEntry } from '@/types'

export const projects: ProjectEntry[] = [
  {
    id: 'daily-volume-tracker',
    title: 'Daily Volume Tracker',
    category: 'Data & Analytics',
    description:
      'A production monitoring dashboard that watches 140+ concrete plants in real time and automatically flags zero-production sites before they become a cost problem.',
    highlights: [
      'Auto-flags zero-production plants across 140+ locations',
      'Emails daily volume and cost-impact reports, including headcount/TM allocation, to the executive committee',
      'Replaced a manual, spreadsheet-driven reporting process',
    ],
    stack: ['Python', 'SQL', 'Oracle EBS', 'pandas', 'Email automation'],
    impact: 'Executive-facing visibility across 140+ plants, delivered automatically every day',
    featured: true,
  },
  {
    id: 'databricks-pyspark-practice',
    title: 'Databricks & PySpark Data Engineering Practice',
    category: 'Data & Analytics',
    description:
      'Notebook-based data engineering workflows built to go deep on the Databricks and PySpark patterns that show up in production pipelines: DataFrame transformations, joins, window functions, and incremental Delta Lake loads.',
    highlights: [
      'DataFrame operations, joins, and window functions in PySpark and Spark SQL',
      'Deduplication and incremental loading patterns',
      'Delta Lake MERGE/upserts and partition-aware processing',
    ],
    stack: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake'],
    impact: 'Hands-on depth across the Databricks/PySpark patterns production pipelines rely on',
    featured: true,
  },
  {
    id: 'digital-signature-app',
    title: 'RDC Digital Signature Application',
    category: 'Automation',
    description:
      'A desktop application built from scratch for hardware-based digital signing, with USB PKCS#11 token integration, hot-plug detection, dual placement modes, and batch processing.',
    highlights: [
      'PKCS#11 USB hardware token integration with hot-plug detection',
      'Dual signature-placement modes and batch document processing',
      'Replaced a paid tool costing ₹20k+ per user with a zero-cost in-house build',
    ],
    stack: ['Python', 'customtkinter', 'PKCS#11', 'PDF processing'],
    impact: '₹20k+ per-user licensing cost eliminated across the organization',
    featured: true,
  },
  {
    id: 'rdc-stamper',
    title: 'RDC Stamper V1 / V2',
    category: 'Automation',
    description:
      'An OCR-based desktop tool for processing and stamping high volumes of PDF documents, with duplicate-detection logic to catch reprocessing errors.',
    highlights: [
      'Tesseract OCR pipeline for automated document reading',
      'Duplicate-detection logic to prevent double-processing',
      'Formally recognized by the CFO for its impact',
    ],
    stack: ['Python', 'Tesseract OCR', 'PyMuPDF', 'customtkinter'],
    impact: '~80% reduction in manual document handling time',
  },
  {
    id: 'so-ageing-pipeline',
    title: 'Self-Auditing SO Ageing Pipeline',
    category: 'Automation',
    description:
      'A scheduled ERP-to-API data pipeline that pushes customer ageing data every 3 hours and, critically, verifies its own delivery with an independent reconciliation report instead of trusting its own success signal.',
    highlights: [
      'Pushes customer ageing data from Oracle ERP every 3 hours',
      'Independent 24-hour reconciliation report verifies delivery integrity',
      'Designed to catch silent failures, not just crash on obvious ones',
    ],
    stack: ['Python', 'PL/SQL', 'Oracle EBS', 'REST APIs', 'Task Scheduler'],
    impact: 'Zero-trust reconciliation across a live enterprise data feed',
  },
  {
    id: 'network-monitoring',
    title: 'Multi-Internet Network Monitoring Dashboard',
    category: 'Data & Analytics',
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
    id: 'bulk-mailer-suite',
    title: 'Bulk Mailer & Payment Reminder Suite',
    category: 'Automation',
    description:
      'A set of three ERP-integrated desktop applications that generate and send balance confirmations and payment reminders, handling PDF generation, templating, and email dispatch across three business entities.',
    highlights: [
      'Deployed across 3 separate business entities',
      'PDF + email generation integrated directly with Oracle ERP R12.2.10',
      'Turned a 2-3 day manual process into a task that finishes in minutes',
    ],
    stack: ['Python', 'Oracle EBS', 'PDF generation', 'Email automation'],
    impact: '2-3 day manual workflow reduced to minutes, across 3 entities',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot for Corporate Website',
    category: 'AI / ML',
    description:
      'An LLM-powered chatbot built for the corporate website, combining Gemini and Claude APIs behind a Flask backend, with architecture documented for a clean handover to stakeholders.',
    highlights: [
      'Backed by Gemini and Claude LLM APIs',
      'Flask backend with a lightweight HTML/CSS/JS front end',
      'Architecture documented for non-technical stakeholder handover',
    ],
    stack: ['Python', 'Flask', 'Gemini API', 'Claude API', 'JavaScript'],
    impact: 'Live AI assistant shipped end-to-end for a corporate website',
    featured: true,
  },
  {
    id: 'lung-disease-classification',
    title: 'Lung Disease Classification (Deep Learning)',
    category: 'AI / ML',
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
    featured: true,
  },
  {
    id: 'vizdoom-rl',
    title: 'VizDoom RL Agent',
    category: 'AI / ML',
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

export const projectCategories = ['All', 'AI / ML', 'Automation', 'Data & Analytics'] as const

export const pinnedRepoSlugs = projects
  .flatMap((p) => p.links ?? [])
  .filter((link) => link.label === 'GitHub')
  .map((link) => link.href.split('/').filter(Boolean).pop() as string)
