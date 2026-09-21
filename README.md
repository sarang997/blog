# Sarang's blog

An editorial portfolio and technical notebook covering data engineering,
statistics and first-principles machine learning.

Pushes to `main` publish the site at `https://sarang997.github.io/blog/`
through GitHub Pages.

## Publishing a note

Add an `.mdx` file under `content/writing`, import it in `lib/content.ts`, and
include the required frontmatter fields: `title`, `description`, `publishedAt`,
`topics`, and `featured`. The site derives the slug from the source registry and
calculates reading time automatically.

Notes support fenced code, tables, footnotes and KaTeX equations.

## Local work

Run `npm run dev` while writing. Run `npm run build:pages` to create the same
static files that GitHub Pages deploys.
