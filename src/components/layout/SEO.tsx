import { Helmet } from 'react-helmet-async'
import { profile } from '@/data/profile'

import { seo } from '@/data/seo'

const { siteUrl } = seo

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.primaryRole,
  url: siteUrl,
  email: profile.email,
  knowsAbout: ['Data Analysis', 'SQL', 'PL/SQL', 'Python', 'Excel', 'Oracle EBS', 'Reporting', 'Reconciliation', 'Data Quality', 'Automation', 'Databricks', 'PySpark'],
  worksFor: { '@type': 'Organization', name: 'RDC Concrete' },
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
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
