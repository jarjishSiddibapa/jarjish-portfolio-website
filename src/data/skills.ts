import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'sql', title: 'SQL & Analytics', icon: 'BarChart3',
    description: 'Query, reconcile and explain operational and financial data.',
    skills: ['Advanced SQL', 'PL/SQL', 'Complex joins', 'CTEs', 'Subqueries', 'Window functions', 'Aggregations', 'Stored procedures', 'Query optimization', 'Data reconciliation', 'Data validation', 'Data quality', 'Reporting', 'Anomaly / exception analysis'],
  },
  {
    id: 'excel', title: 'Advanced Excel', icon: 'Table2',
    description: 'Summarise, look up, reconcile and report on data in the spreadsheets stakeholders already use.',
    skills: ['Excel', 'SUMIFS / COUNTIFS / AVERAGEIFS', 'Aggregate functions', 'XLOOKUP / VLOOKUP / INDEX-MATCH', 'Pivot tables', 'Data cleaning', 'Excel reconciliation', 'Variance reporting', 'Formatted Excel reports', 'Excel report automation'],
  },
  {
    id: 'python', title: 'Python & Data Analysis', icon: 'Code2',
    description: 'Clean and transform data, then automate repeatable analysis.',
    skills: ['Python', 'pandas', 'NumPy', 'Excel automation', 'OCR & PDF processing', 'Data cleansing', 'Data transformation', 'REST API processing', 'Automated reporting', 'Matplotlib', 'Seaborn'],
  },
  {
    id: 'webdev', title: 'Web Development', icon: 'Globe',
    description: 'Full-stack internal applications, from database and API to a working interface.',
    skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Express', 'Flask', 'FastAPI', 'REST API design', 'HTML & CSS', 'Tailwind CSS', 'Ant Design', 'Recharts / Chart.js', 'Role-based access (JWT)', 'OAuth 2.0', 'Scheduled sync jobs', 'Audit trails'],
  },
  {
    id: 'engineering', title: 'Data Engineering', icon: 'Plug',
    description: 'Supporting depth through hands-on Databricks and PySpark practice.',
    skills: ['Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'ETL / ELT', 'Data pipelines', 'Incremental loads', 'MERGE / upserts', 'Deduplication', 'Partitioning', 'Batch processing'],
  },
  {
    id: 'platforms', title: 'Databases & Platforms', icon: 'Database',
    description: 'Enterprise data systems and tools used to investigate and validate results.',
    skills: ['Oracle EBS R12.2.10', 'Oracle SQL / PL/SQL', 'MySQL', 'PostgreSQL', 'ManageEngine ServiceDesk Plus API', 'Databricks notebooks', 'Jupyter Notebook', 'Git & GitHub Actions', 'Postman', 'pytest'],
  },
]
