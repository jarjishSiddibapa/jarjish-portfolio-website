import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { seo } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig({
  base: '/jarjish-portfolio-website/',
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
      return html.replace('<!-- portfolio-seo -->', `
    <title>${escape(seo.title)}</title>
    <meta data-rh="true" name="description" content="${escape(seo.description)}" />
    <link data-rh="true" rel="canonical" href="${seo.siteUrl}" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:title" content="${escape(seo.title)}" />
    <meta data-rh="true" property="og:description" content="${escape(seo.description)}" />
    <meta data-rh="true" property="og:url" content="${seo.siteUrl}" />
    <meta data-rh="true" name="twitter:card" content="summary" />
    <meta data-rh="true" name="twitter:title" content="${escape(seo.title)}" />
    <meta data-rh="true" name="twitter:description" content="${escape(seo.description)}" />`)
    },
  }],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
})
