# Jarjish Siddibapa — Portfolio

A premium, animated portfolio built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP, and React Three Fiber — 100% static, deployable to GitHub Pages.

## Stack

- **React 19 + TypeScript + Vite** — build tooling
- **Tailwind CSS v4** — styling (CSS-based theme in `src/index.css`)
- **Framer Motion + GSAP/ScrollTrigger** — animation
- **Lenis** — smooth scrolling
- **React Three Fiber + Drei + Three.js** — 3D hero scene
- **EmailJS** — contact form (no backend required)
- **react-helmet-async** — SEO meta tags

Everything compiles to static HTML/CSS/JS — no server, no API routes, no database — so it works out of the box on GitHub Pages.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
  components/
    layout/     Navbar, Footer, SEO
    three/      3D hero scene (React Three Fiber)
    ui/         Reusable UI primitives (buttons, cards, cursor, reveal animations)
  sections/     One file per page section (Hero, About, Skills, Experience, ...)
  data/         All editable content (profile, skills, experience, projects, education)
  hooks/        Custom hooks (smooth scroll, typewriter, GitHub stats, etc.)
  types/        Shared TypeScript types
  utils/        Small helpers (cn, gsap setup, icon/language maps)
```

## Customizing content

**All content lives in `src/data/`** — no need to touch components:

- `profile.ts` — name, role, bio, contact info, social links, stats
- `skills.ts` — competency groups and skill chips
- `experience.ts` — work experience and education entries
- `projects.ts` — featured case studies, project categories, verified links and impact
- `seo.ts` — shared page title, description and canonical URL (also injected into static HTML)

Update `githubUsername` in `profile.ts` to change which GitHub account the live stats section pulls from.

## Contact form (EmailJS)

The contact form is wired to [EmailJS](https://www.emailjs.com) but needs your own keys to actually send email:

1. Create a free EmailJS account, an email service, and a template with `{{name}}`, `{{email}}`, `{{message}}` variables.
2. Copy `.env.example` to `.env` and fill in `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.
3. For the deployed site, add the same three values as **repository secrets** (Settings → Secrets and variables → Actions) so the GitHub Actions build picks them up.

Until configured, the form still validates input but shows a message pointing visitors to your email directly — it never fails silently.

## Resume

The "Download Resume" button points to `public/resume/Jarjish-Siddibapa-Resume.pdf`. Replace that file to update it (keep the same filename, or update `resumeHref` in `src/data/profile.ts`).

## Deploying to GitHub Pages

This repo is pre-configured for a **project page** at `https://<your-username>.github.io/jarjish-portfolio-website/`.

### Option A — GitHub Actions (recommended)

1. Push this repo to GitHub as `jarjish-portfolio-website` (or update `base` in `vite.config.ts` and `homepage` in `package.json` to match your actual repo name).
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically on every push.
4. (Optional) Add the EmailJS secrets mentioned above so the deployed contact form works.

### Option B — Manual deploy via `gh-pages`

```bash
npm run deploy
```

This builds the site and pushes `dist/` to a `gh-pages` branch. In **Settings → Pages**, set **Source** to the `gh-pages` branch.

### If your repository name is different

Update the `base` path in two places:

- `vite.config.ts` → `base: '/your-repo-name/'`
- `package.json` → `"homepage"`
- `src/data/seo.ts` → `siteUrl`
- `public/robots.txt` and `public/sitemap.xml`

If you deploy to a custom domain or a user/org page (`<username>.github.io`), set `base: '/'` instead.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run oxlint |
| `npm test` | Check content and built SEO/resume contracts (run build first) |
| `npm run deploy` | Build and publish to the `gh-pages` branch |

## Easter egg

Try the Konami code (`↑ ↑ ↓ ↓ ← → ← → b a`) anywhere on the site.

## Career positioning

The permanent headline is **Data Analyst**, supported by SQL/PLSQL, Python, Excel and Oracle EBS. The default project filter features Daily Volume Tracker, Accounts Suite, SO Ageing, finance reporting/communication automation, then Databricks/PySpark learning work. Other projects remain available through filters.

The public resume is the supplied ATS Data Analyst PDF (updated September 5, 2026), copied byte-for-byte to the existing public path. A local source copy named `Jarjish Siddibapa Resume.pdf` is ignored to avoid publishing a duplicate.

Desktop animations and themes are retained. Decorative Three.js scenes load only on desktop near the viewport, with static interest illustrations on smaller screens. Reduced-motion preferences disable decorative scenes, tilt and magnetic movement.
