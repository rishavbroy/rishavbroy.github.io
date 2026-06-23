# rishavbroy.github.io

Personal website for Rishav Roy, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Architecture

- `src/pages/` contains routes.
- `src/layouts/` contains page shells.
- `src/components/` contains reusable UI blocks.
- `src/content/projects/` contains structured research project entries.
- `src/data/courses.json` contains structured course entries.
- `src/data/people.ts` contains canonical professor and mentor names/links used by courses and projects.
- `public/` contains static files copied as-is to the deployed site.
- `public/cv/Rishav_Roy_CV.pdf` is the committed CV PDF linked directly from the nav.
- `cv/Rishav_Roy_CV.tex` is the public LaTeX source for the CV.
- `scripts/` contains local review helpers for producing `review.zip`.
- `review.zip` includes the CV source so code review catches CV workflow issues. LaTeX build byproducts in `cv/` are ignored.

The old HugoBlox site should live on the `archive/hugoblox-original` branch.

The homepage contact line uses an obfuscated plain-text email rather than a `mailto:` link to reduce low-effort scraping while keeping the address legible to human readers.

## Local development

Install [Node.js](https://nodejs.org/en/download) before running `npm` commands. The project uses the Node/npm toolchain to install Astro, run the dev server, build the static site, and create review ZIPs.

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Create a review ZIP for ChatGPT:

```bash
npm run review
```

Run a build and create `review.zip` even if the build fails:

```bash
npm run build:review
```

Run the dev server through the review wrapper. A review ZIP is created when the server starts and again when you stop it with Ctrl-C:

```bash
npm run dev:review
```

The review wrappers do not create `terminal_output.txt` by default. To include terminal output in `review.zip` for debugging, run:

```bash
npm run build:review:log
```

or:

```bash
npm run dev:review:log
```

## Content data

Research projects are Markdown entries because they may later grow into project pages with prose bodies. Courses are stored in `src/data/courses.json` because they are structured records rather than essays. Professors and mentors are referenced by stable IDs and resolved through `src/data/people.ts`, so one canonical name/link update flows through all cards that cite that person. Both projects and courses are still Astro content collections with Zod schemas, so they retain build-time validation and typed `getCollection()` access. Course departments are derived from course codes, so codes should begin with the department label shown in filters, such as `ECON 710` or `COMP SCI 639`. Course `types` should contain only level markers and broad subjects, while course `topics` should contain narrower fields, methods, and tools.

Use project mentor fields deliberately: a `Research note` status communicates scope, while the mentor list communicates provenance or advising context. Project date ranges are stored as discrete academic terms, using `YYYY-spring`, `YYYY-summer`, `YYYY-fall`, or `present`.

## Filtering and search

The Research and Courses pages use progressively enhanced client-side filtering. Cards are rendered normally at build time, so all content remains visible if JavaScript is disabled. When JavaScript is available, `CollectionFilters.astro` reads `data-*` attributes on each card and applies search plus multi-select filters. Within a filter group, selected values are combined with OR logic; across filter groups, groups are combined with AND logic. The Research date filter uses native range inputs with integer `step` values mapped to discrete academic-term points.

- Research filters: date, status, topic, skill.
- Course filters: term, department, course type, topic, achievement.
- Search is local to the page and matches the card text stored in `data-search`.

## CV workflow

The site links directly to the committed PDF at `public/cv/Rishav_Roy_CV.pdf`. The navigation link opens the PDF in a new tab; the exact inline-view/download behavior can still depend on the visitor's browser or PDF settings.

To update the CV:

1. Edit `cv/Rishav_Roy_CV.tex`.
2. Compile the PDF locally.
3. Replace `public/cv/Rishav_Roy_CV.pdf`.
4. Validate the assets and site build:

```bash
npm run check:cv
npm run build:review
```

The deployment workflow intentionally does not compile LaTeX. The PDF is a committed static asset so the public CV link stays stable and the website build stays simple.

The checked-in TeX source should preserve all PDF-relevant content from the CV. Large inactive `comment` environments may be omitted to avoid publishing dormant reference/contact blocks, but visible CV content should not be removed as part of website maintenance.

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**.
