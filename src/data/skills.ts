import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: 'Sparkles',
    skills: [
      { name: 'AI-Assisted Development (shipping & validating AI-generated code)', level: 85 },
      { name: 'LLM APIs (Gemini, Claude)', level: 82 },
      { name: 'Prompt Engineering & RAG concepts', level: 70 },
      { name: 'Deep Learning (TensorFlow, ResNet50, transfer learning)', level: 68 },
      { name: 'scikit-learn (classification & regression)', level: 78 },
      { name: 'Model evaluation (cross-val, GridSearchCV, ROC/RMSLE)', level: 75 },
      { name: 'Hugging Face Ecosystem', level: 60 },
    ],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: 'BarChart3',
    skills: [
      { name: 'SQL / PL-SQL', level: 92 },
      { name: 'Oracle EBS R12.2.10', level: 85 },
      { name: 'Power BI', level: 78 },
      { name: 'Advanced Excel', level: 88 },
      { name: 'pandas / NumPy', level: 85 },
      { name: 'Statistical Analysis', level: 72 },
    ],
  },
  {
    id: 'automation',
    title: 'Python & Automation',
    icon: 'Bot',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'PowerShell', level: 80 },
      { name: 'Windows Task Scheduler', level: 85 },
      { name: 'Streamlit', level: 80 },
      { name: 'Tesseract OCR / PyMuPDF', level: 82 },
      { name: 'Self-healing service automation', level: 80 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & ERP',
    icon: 'Database',
    skills: [
      { name: 'Oracle EBS (ERP)', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MySQL', level: 78 },
      { name: 'SQLite', level: 80 },
      { name: 'Data Warehousing concepts', level: 70 },
    ],
  },
  {
    id: 'integration',
    title: 'Integration & APIs',
    icon: 'Plug',
    skills: [
      { name: 'REST APIs', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'Google OAuth 2.0', level: 75 },
      { name: 'Third-party integrations (Truein, ZingHR, DMS)', level: 78 },
      { name: 'PKCS#11 hardware signing', level: 70 },
    ],
  },
  {
    id: 'web',
    title: 'Web, Tools & Platforms',
    icon: 'Code2',
    skills: [
      { name: 'Flask', level: 78 },
      { name: 'HTML / CSS / JavaScript', level: 75 },
      { name: 'Java (Spring Boot, Angular)', level: 65 },
      { name: 'Git', level: 85 },
      { name: 'Docker (basics)', level: 50 },
      { name: 'React (basics)', level: 55 },
    ],
  },
]
