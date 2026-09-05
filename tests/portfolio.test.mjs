import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import test from 'node:test'
import ts from 'typescript'

async function loadData(name) {
  const source = await readFile(new URL(`../src/data/${name}.ts`, import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
}

test('featured projects lead with professional analytics and isolate practice', async () => {
  const { projects, projectCategories, pinnedRepoSlugs } = await loadData('projects')
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length)
  assert.deepEqual(projects.filter(p => p.featured).map(p => p.id), ['daily-volume-tracker', 'accounts-suite', 'so-ageing-pipeline', 'bulk-mailer-suite', 'databricks-pyspark-practice'])
  for (const project of projects) {
    assert.ok(projectCategories.includes(project.category))
    if (project.featured) {
      assert.ok(project.problem && project.description && project.impact && project.context)
      assert.notEqual(project.category, 'Other Projects')
    }
  }
  assert.deepEqual(pinnedRepoSlugs, ['rdc-daily-volume-tracker', 'rdc-accounts-suite'])
  assert.match(projects.find(p => p.id === 'databricks-pyspark-practice').context, /practice \/ learning/)
})

test('skill groups contain unique named competencies without proficiency scores', async () => {
  const { skillCategories } = await loadData('skills')
  assert.equal(skillCategories.length, 4)
  for (const category of skillCategories) {
    assert.equal(new Set(category.skills).size, category.skills.length)
    assert.ok(category.skills.every(skill => typeof skill === 'string' && skill.length > 0))
    assert.doesNotMatch(category.skills.join(' '), /Power BI|AI-Assisted|Claude|Gemini|Codex|\d+%/)
  }
})

test('production HTML exposes shared SEO without JavaScript', async () => {
  const { seo } = await loadData('seo')
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.ok(html.includes(seo.title.replaceAll('&', '&amp;')))
  assert.ok(html.includes(seo.description))
  assert.equal((html.match(/<title>/g) ?? []).length, 1)
  for (const field of ['og:title', 'og:description', 'og:url', 'twitter:title', 'twitter:description']) assert.ok(html.includes(field))
  for (const file of ['sitemap.xml', 'robots.txt']) {
    assert.ok((await readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8')).includes(seo.siteUrl))
  }
})

test('production resume is an unchanged PDF at the existing public path', async () => {
  const path = 'resume/Jarjish-Siddibapa-Resume.pdf'
  const source = await readFile(new URL(`../public/${path}`, import.meta.url))
  const built = await readFile(new URL(`../dist/${path}`, import.meta.url))
  assert.equal(built.subarray(0, 5).toString(), '%PDF-')
  assert.deepEqual(built, source)
})
