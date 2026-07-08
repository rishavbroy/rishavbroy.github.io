# Repository instructions for agents

These notes are for coding agents and review assistants working on this repository. Keep the user-facing README focused on setup, build, CV, and deployment tasks.

## Content data

Research projects are Markdown entries because they may later grow into project pages with prose bodies. Until a project page route actually renders Markdown bodies, avoid repeated placeholder prose below the frontmatter. Courses are stored in `src/data/courses.json` because they are structured records rather than essays. Professors and mentors are referenced by stable IDs and resolved through `src/data/people.ts`, so one canonical name/link update flows through all cards that cite that person. People without stable public pages may omit `url`; their names render as plain text instead of links. Both projects and courses are Astro content collections with Zod schemas, so they retain build-time validation and typed `getCollection()` access.

Course departments are derived from course codes, so codes should begin with the department label shown in filters, such as `ECON 710` or `COMP SCI 639`. Course `types` should contain only level markers and broad subjects. Course `topics` should contain narrower fields, methods, and tools, including coding tools such as Python, Stata, R, Julia, MATLAB, LaTeX, SQL, and Git. Within each course, order `topics` as the best title-matching topic first, then other substantive topics alphabetically, then coding/software tools alphabetically. Course `highlights` should be reserved for unusually strong evidence such as exact exam scores, percentile comparisons, or other exceptional performance evidence; routine topical content, audit status, and course-load context belong elsewhere or should be omitted.

Use project mentor fields deliberately: a `Research note` status communicates scope, while the mentor list communicates provenance or advising context. Project date ranges are stored as discrete academic terms, using `YYYY-spring`, `YYYY-summer`, `YYYY-fall`, or `present`. Project `topics` should be substantive fields or research areas, while project `skills` should be methods, data practices, and tools. Project tags should be standard, reusable labels; avoid near-duplicates such as `Development` and `Development Economics`, and prefer the more specific shared label when one exists. Project links may use plain URL values or `{ href, label }` objects when a link needs a precise public label such as `Presentation (May 2025)` or `Draft`.

## Site shell, fonts, and icons

Only active fonts should be registered in `astro.config.mjs` and rendered with `<Font />` in `src/layouts/BaseLayout.astro`. Inactive font experiments may remain commented out beside the active font entries, but the active config, layout tags, and `src/styles/tokens.css` values should agree. Social profile icons are local inline SVGs in `src/components/SocialLinks.astro`; do not add an icon dependency for one or two static brand links unless the site grows a broader icon system. The favicon assets live in `public/images/` and are referenced from `BaseLayout.astro`; keep those URLs stable because search engines can use them in search results. The static `public/sitemap.xml` and `public/robots.txt` files list only the public HTML pages that should be discovered from search.

## Filtering and search

The Research and Courses pages use progressively enhanced client-side filtering. Cards are rendered normally at build time, so all content remains visible if JavaScript is disabled. When JavaScript is available, `CollectionFilters.astro` reads `data-*` attributes on each card and applies search plus multi-select filters. Within a filter group, selected values are combined with OR logic; across filter groups, groups are combined with AND logic. The Research date filter uses two overlaid native range inputs with integer `step` values mapped to discrete academic-term points; the visual track highlights the selected interval between the two handles. The `In progress` research status filter is derived from project date ranges ending in `present`, so it can coexist with more specific statuses such as `Research paper`.

- Research filters: date, status, topic, skill.
- Course filters: term, department, course type, topic, achievement.
- Search is local to the page and matches the card text stored in `data-search`.

## Sorting and presentation

Research project cards include a `period` range. The date filter uses discrete academic-term ticks, and project cards render the date beside the status so timing is visible without opening a detail page. Featured projects sort first; non-featured projects sort by descending end term.

Course sorting groups by term first, then puts stronger achievement evidence higher within each term. This keeps the page chronological while surfacing the strongest performances within a given semester or summer term.

## CV source

`public/cv/Rishav_Roy_CV.tex` is the canonical CV source. `scripts/build-cv.sh` renders it to `public/cv/Rishav_Roy_CV.pdf`; `npm run build` runs that render before Astro builds the site, so build environments need `latexmk`. The PDF may be committed when the user wants the repository copy updated, but agents should not maintain a second PDF or source tree under `cv/`. Website patches must not trim, regenerate, or normalize the CV source as incidental cleanup. Change the TeX source only when the user explicitly provides a replacement or asks for a CV edit.

## Review ZIPs

`npm run review` and the review wrappers create `review.zip` for external review. `npm run clean` removes local build output, review archives, macOS metadata, and LaTeX byproducts. Include source files and the public CV source. Exclude dependency directories, build output, local logs unless explicitly requested, and LaTeX byproducts.
