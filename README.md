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
- `public/cv/Rishav_Roy_CV.tex` is the canonical CV source.
- `public/cv/Rishav_Roy_CV.pdf` is generated from the TeX source before deployment and is not committed.
- `scripts/` contains local review helpers and the CV render script.

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

## CV workflow

The public site links directly to:

```text
/cv/Rishav_Roy_CV.pdf
```

The canonical source is:

```text
public/cv/Rishav_Roy_CV.tex
```

To update the CV locally:

1. Edit `public/cv/Rishav_Roy_CV.tex`.
2. Render the generated PDF:

```bash
npm run build:cv
```

3. Validate the assets and site build:

```bash
npm run check:cv
npm run build:review
```

4. Commit the TeX source. Do not commit `public/cv/Rishav_Roy_CV.pdf`; it is generated during deployment.

The GitHub Pages workflow renders `public/cv/Rishav_Roy_CV.pdf` from `public/cv/Rishav_Roy_CV.tex` before Astro builds the site, so a pushed TeX update is reflected in the deployed public PDF without keeping a second PDF in the repository.

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**.

Agent-facing editing conventions live in `AGENTS.md` rather than this README.
