import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'sql', title: 'SQL & Analytics', icon: 'BarChart3',
    description: 'Query, reconcile and explain operational and financial data.',
    skills: ['Advanced SQL', 'PL/SQL', 'Complex joins', 'CTEs', 'Subqueries', 'Window functions', 'Aggregations', 'Stored procedures', 'Query optimization', 'Excel', 'Data reconciliation', 'Data validation', 'Data quality', 'Reporting', 'Anomaly / exception analysis'],
  },
  {
    id: 'python', title: 'Python & Data Analysis', icon: 'Code2',
    description: 'Clean and transform data, then automate repeatable analysis.',
    skills: ['Python', 'pandas', 'NumPy', 'Excel automation', 'Data cleansing', 'Data transformation', 'REST API processing', 'Automated reporting', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'engineering', title: 'Data Engineering', icon: 'Plug',
    description: 'Supporting depth through hands-on Databricks and PySpark practice.',
    skills: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'ETL / ELT', 'Data pipelines', 'Incremental loads', 'MERGE / upserts', 'Deduplication', 'Partitioning', 'Batch processing'],
  },
  {
    id: 'platforms', title: 'Databases & Platforms', icon: 'Database',
    description: 'Enterprise data systems and tools used to investigate and validate results.',
    skills: ['Oracle EBS R12.2.10', 'Oracle SQL / PL/SQL', 'MySQL', 'PostgreSQL', 'Databricks notebooks', 'Jupyter Notebook', 'Git', 'Postman'],
  },
]
