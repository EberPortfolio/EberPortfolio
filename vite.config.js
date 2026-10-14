import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { WORK_PROJECTS, EBER_ART_ITEMS } from './src/data/projects.js'

// Public address of the site: canonical URLs, sitemap, share previews and structured data
const SITE_URL = 'https://eber.ar'
const ogImage = (publicId) =>
  `https://res.cloudinary.com/le59kgwh/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/${publicId}`

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const setMeta = (html, attr, key, value) =>
  html.replace(
    new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`),
    `$1${escapeAttr(value)}$2`
  )

// Each case gets its own static page at /caso/<id> with its title, description,
// canonical URL and share image, so search engines and link previews see the case
// without running JS. The SPA boots the same way and opens the case from the path.
const casePage = (html, project) => {
  const url = `${SITE_URL}/caso/${project.id}`
  const title = `${project.title} · Eber`
  const description = project.tagline || project.summary
  const image = ogImage(project.coverImage || project.thumbnail)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url,
    image,
    genre: project.categoryLabel,
    ...(project.year && { dateCreated: project.year }),
    creator: { '@type': 'Person', name: 'Eber', url: `${SITE_URL}/` }
  }

  let page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace('</head>', `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`)
  page = setMeta(page, 'name', 'description', description)
  page = setMeta(page, 'property', 'og:type', 'article')
  page = setMeta(page, 'property', 'og:url', url)
  page = setMeta(page, 'property', 'og:title', title)
  page = setMeta(page, 'property', 'og:description', description)
  page = setMeta(page, 'property', 'og:image', image)
  page = setMeta(page, 'name', 'twitter:title', title)
  page = setMeta(page, 'name', 'twitter:description', description)
  page = setMeta(page, 'name', 'twitter:image', image)
  return page
}

const seoPages = () => ({
  name: 'seo-pages',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
  async closeBundle() {
    if (this.meta.watchMode) return
    const outDir = 'dist'
    const html = await readFile(join(outDir, 'index.html'), 'utf8')
    const projects = [...WORK_PROJECTS, ...EBER_ART_ITEMS]
    await mkdir(join(outDir, 'caso'), { recursive: true })

    for (const project of projects) {
      // caso/<id>.html is served at /caso/<id> (no trailing-slash redirect)
      await writeFile(join(outDir, 'caso', `${project.id}.html`), casePage(html, project))
    }

    const urls = [`${SITE_URL}/`, ...projects.map((p) => `${SITE_URL}/caso/${p.id}`)]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`
    await writeFile(join(outDir, 'sitemap.xml'), sitemap)
    await writeFile(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
})
