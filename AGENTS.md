# AGENTS.md

## Project overview

Gianluca Marcon's personal website — a static site built with [Eleventy (11ty) v3](https://www.11ty.dev/), Nunjucks templates, and Markdown. Styled with plain CSS including dark/light theme support.

- **Live site:** https://gianlucamarcon.com
- **Repo:** https://github.com/geeanlooca/personal-website
- **Output directory:** `public/` (git-ignored)

## Project structure

```
src/
  _data/
    meta.js             Global site metadata (site name, URL, author)
  _includes/
    base.njk            Root HTML layout (head, nav, footer, theme init)
    page.njk            Generic page layout (wraps content in <main>/<article>)
    post.njk            Blog post layout (title, date, tags, back link)
    notes.njk           Notes listing page (iterates collections.posts)
    nav.njk             Navigation bar (iterates collections.nav, sorted by navOrder)
    theme-switch.njk    Dark/light theme toggle button + inline JS
  css/
    style.css           All site styles (361 lines, passthrough copy)
  index.md              Homepage
  pages/
    pages.json          Directory data — default layout "page.njk", tags "pages", permalink
    01-resume.md
    02-publications.md
    03-projects.md
    04-contacts.md
    05-notes.md
  notes/
    notes.json          Directory data — default layout "post.njk", tags "posts", permalink
.eleventy.js            Eleventy config (input, output, passthrough, shortcodes)
.github/workflows/
  build-and-deploy.yml  CI/CD: build + SCP deploy on push to main
oc-box/                 OpenCode AI Docker dev environment (separate from the site)
```

## Common commands

```bash
npm start          # Dev server with hot reload (eleventy --serve)
npm run build      # Production build to public/
```

Dependencies are installed with `npm ci`. Node version in CI is 20 (LTS), enforced locally via `.nvmrc` and in `package.json` `engines`.

## Layout chain

```
base.njk (HTML shell, nav, footer, theme flash guard)
  └── page.njk (wraps content in <main><article>)
        ├── post.njk (adds header with title/date/tags + back-link nav)
        └── notes.njk (lists all posts from collections.posts)
```

## How to add content

### Adding a page

Create a `.md` file in `src/pages/`. Front matter:

```yaml
---
layout: page.njk
title: My Page
tags: nav              # required to appear in navigation
navOrder: 6            # sort position (lower = first)
permalink: "/my-page/"
---
```

Then add your Markdown content. The file prefix (e.g. `06-`) is only for the author's own ordering; Eleventy uses `page.fileSlug` for the permalink.

### Adding a blog post / note

Create a `.md` file in `src/notes/`. Front matter:

```yaml
---
layout: post.njk       # or omit — notes.json sets this as default
title: My Note Title
date: 2026-07-10
excerpt: Optional excerpt shown on listing page
tags:
  - posts              # required to appear in the notes collection
  - topic-name         # additional tags shown on the post
---
```

### Changing the navigation

Pages appear in the nav when their front matter includes `tags: nav`. They are sorted by `navOrder`. The home page link is hardcoded first in `nav.njk`. To change navigation behavior, edit `src/_includes/nav.njk`.

### Changing styling

All styles live in `src/css/style.css`. It's a passthrough copy — Eleventy does not process it. CSS custom properties on `[data-theme="dark"]` and `[data-theme="light"]` control theming. To change a theme variable, edit the `--color-*` properties in both `[data-theme]` blocks.

### Changing site metadata

Edit `src/_data/meta.js`. Values are available in all templates as `{{ meta.url }}`, `{{ meta.siteName }}`, `{{ meta.authorName }}`, and `{{ meta.siteDescription }}`.

## Front matter reference

| Field | Used in | Purpose |
|-------|---------|---------|
| `layout` | all `.md` | Template to use (`page.njk`, `post.njk`, `notes.njk`) |
| `title` | all `.md` | Rendered as `<h1>` and `<title>` |
| `tags` | pages, notes | `nav` for nav pages; `posts` for blog collection |
| `navOrder` | nav pages | Sort order in navigation |
| `permalink` | all | URL path (e.g. `"/resume/"`) |
| `date` | notes | Publication date |
| `excerpt` | notes | Summary shown on notes listing page |

## Deployment

Push to `main` triggers the GitHub Actions workflow in `.github/workflows/build-and-deploy.yml`:

1. Checkout + install Node 20 (LTS)
2. `npm ci && npm run build`
3. SCP `public/` to `~/public_html` on the remote host

Secrets used: `HOST`, `USERNAME`, `PASSWORD` (set in GitHub repo settings).

## Constraints

- **No TypeScript.** The `package.json` explicitly sets `"type": "commonjs"`.
- **No linters or formatters configured.** There is no ESLint, Prettier, or stylelint config.
- **No test framework.** There are no tests in this project.
- **No CSS processing.** `style.css` is plain CSS copied as-is to the output (passthrough copy). Do not add PostCSS, Sass, or other CSS preprocessors without updating `.eleventy.js`.
- **Build output is git-ignored.** Never commit `public/` or `_site/`.
- **The `oc-box/` directory** is a separate Docker-based OpenCode AI development environment. Changes there are independent from the site itself.
- **Keep content in Markdown, templates in Nunjucks.** Don't port content to pure HTML or introduce other templating languages without updating the Eleventy config.
