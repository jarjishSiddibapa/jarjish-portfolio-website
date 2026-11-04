import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { createHash } from 'node:crypto'
import { seo } from './src/data/seo.js'

// https://vite.dev/config/
export default defineConfig({
  base: '/jarjish-portfolio-website/',
  plugins: [react(), tailwindcss(), {
    name: 'portfolio-seo',
    transformIndexHtml(html, ctx) {
      const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
      const sha = (text: string) => `'sha256-${createHash('sha256').update(text).digest('base64')}'`
      const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => sha(m[1]))
      const handlers = [...html.matchAll(/\sonload="([^"]*)"/g)].map((m) => sha(m[1]))
      // Production only: the dev server needs inline and eval'd scripts for hot reload.
      const csp = ctx.server
        ? ''
        : `
    <meta http-equiv="Content-Security-Policy" content="${[
      "default-src 'self'",
      `script-src 'self' ${inlineScripts.join(' ')}`,
      `script-src-attr 'unsafe-hashes' ${handlers.join(' ')}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://avatars.githubusercontent.com",
      "connect-src 'self' https://api.emailjs.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')}" />
    <meta name="referrer" content="strict-origin-when-cross-origin" />`
      return html.replace('<!-- portfolio-seo -->', `${csp}
    <title>${escape(seo.title)}</title>
    <meta data-rh="true" name="description" content="${escape(seo.description)}" />
    <link data-rh="true" rel="canonical" href="${seo.siteUrl}" />
    <meta data-rh="true" property="og:type" content="website" />
    <meta data-rh="true" property="og:title" content="${escape(seo.title)}" />
    <meta data-rh="true" property="og:description" content="${escape(seo.description)}" />
    <meta data-rh="true" property="og:url" content="${seo.siteUrl}" />
    <meta data-rh="true" property="og:site_name" content="Jarjish Siddibapa" />
    <meta data-rh="true" property="og:locale" content="en_IN" />
    <meta data-rh="true" property="og:image" content="${seo.siteUrl}${seo.imagePath}" />
    <meta data-rh="true" property="og:image:width" content="1200" />
    <meta data-rh="true" property="og:image:height" content="630" />
    <meta data-rh="true" property="og:image:alt" content="${escape(seo.imageAlt)}" />
    <meta data-rh="true" name="twitter:card" content="summary_large_image" />
    <meta data-rh="true" name="twitter:image" content="${seo.siteUrl}${seo.imagePath}" />
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
