# rishavbroy.github.io

My personal website, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Architecture

- `src/pages/` contains routes.
- `src/layouts/` contains page shells.
- `src/components/` contains reusable UI blocks.
- `src/content/projects/` contains structured research project entries.
- `src/data/courses.json` contains structured course entries.
- `src/data/people.ts` contains canonical professor and mentor names/links used by courses and projects.
- `public/` contains static files copied as-is to the deployed site.
- `public/cv/Rishav_Roy_CV.tex` is the canonical CV source.
- `public/cv/Rishav_Roy_CV.pdf` is generated from the TeX source.
- `scripts/` contains local review helpers and the CV render script.


## Local development

Make sure to [install Node.js](https://nodejs.org/en/download) before running the following `npm` commands. Builds also require a local LaTeX installation with `latexmk`, because the public CV PDF is rendered before Astro builds the site.

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Create a review ZIP (for coding with an LLM without having to pay for an agent):

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

To include a `terminal_output.txt` in `review.zip` for debugging, run:

```bash
npm run build:review:log
```

or:

```bash
npm run dev:review:log
```

Remove local build output, review archives, macOS metadata, and LaTeX byproducts:

```bash
npm run clean
```

## CV workflow

`public/cv/Rishav_Roy_CV.tex` is the canonical CV source, and `public/cv/Rishav_Roy_CV.pdf` is the public PDF served at `/cv/Rishav_Roy_CV.pdf`.

To update the CV:

1. Edit `public/cv/Rishav_Roy_CV.tex`.
2. Run a normal site build:

```bash
npm run build
```

The `prebuild` step renders `public/cv/Rishav_Roy_CV.pdf` from the TeX source before Astro builds the site. The GitHub Pages workflow installs LaTeX before running the Astro build, so each deployment renders the public PDF from the current TeX source.

For a CV-only render or validation, use:

```bash
npm run build:cv
npm run check:cv
```

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**.