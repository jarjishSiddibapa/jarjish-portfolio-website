import { Helmet } from 'react-helmet-async'
import { profile } from '@/data/profile'

const siteUrl = 'https://jarjishsiddibapa.github.io/jarjish-portfolio-website/'
const description =
  'Jarjish Siddibapa: Data Analyst with advanced SQL, PySpark, and Databricks skills, backed by Python automation and applied AI/ML. Production ERP data pipelines, self-healing automation, LLM-powered products (Gemini, Claude, RAG), and deep learning systems (ResNet50, 95%+ accuracy). Open to remote, hybrid, and full-time roles across Thane, Mumbai, and beyond.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  email: profile.email,
  knowsAbout: [
    'Data Analysis',
    'SQL',
    'PySpark',
    'Databricks',
    'Python Automation',
    'Machine Learning',
    'Deep Learning',
    'Large Language Models',
    'Oracle EBS',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Thane',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://github.com/jarjishSiddibapa',
    'https://linkedin.com/in/jarjish-siddibapa',
  ],
}

export function SEO() {
  return (
    <Helmet>
      <title>{profile.name} | {profile.role}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${profile.name} | ${profile.role}`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={profile.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${profile.name} | ${profile.role}`} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
