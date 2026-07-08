# rishavbroy.github.io

My personal website, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Architecture

- `src/pages/` defines routes.
- `src/layouts/` defines shared page structure.
- `src/components/` defines reusable UI blocks.
- `src/content/projects/` stores research project entries.
- `src/data/courses.json` stores course entries.
- `src/data/people.ts` stores professor and mentor names/links used by courses and projects.
- `public/` stores static files copied to the deployed site.
- `public/cv/Rishav_Roy_CV.tex` is the canonical CV source.
- `public/cv/Rishav_Roy_CV.pdf` is the public PDF served by the site.
- `scripts/` contains local review helpers, artifact cleanup, and CV rendering.

## Local development

Install [Node.js](https://nodejs.org/en/download), then install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Create a review ZIP for external review (e.g., when coding with an LLM without paying extra for an agent):

```bash
npm run review
```

Run a build and create `review.zip` afterwards:

```bash
npm run build:review
```

Run the dev server through the review wrapper. A review ZIP is created when the server starts and again when you stop it with Ctrl-C:

```bash
npm run dev:review
```

Include `terminal_output.txt` in `review.zip` when you need to share terminal output:

```bash
npm run build:review:log
npm run dev:review:log
```

Remove junk (build output, review archives, macOS metadata, and LaTeX byproducts):

```bash
npm run clean
```

## CV

`public/cv/Rishav_Roy_CV.tex` is the source file. `public/cv/Rishav_Roy_CV.pdf` is the file linked from the site at [/cv/Rishav_Roy_CV.pdf](https://rishavbroy.github.io/cv/Rishav_Roy_CV.pdf).

The CV renderer requires a LaTeX installation with `latexmk`. It stores a source hash in `.cv-build/state.json`. If the TeX source and public PDF match the stored hash, `npm run build:cv` exits without rendering. If the TeX source changed or the PDF is missing/invalid, it renders a new PDF.

After editing the CV, run:

```bash
npm run build:cv
npm run check:cv
```

To render regardless of the stored hash, run:

```bash
npm run build:cv:force
```

A normal site build also runs the CV check before Astro builds:

```bash
npm run build
```

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**. The GitHub Action installs LaTeX, restores the CV render cache when available, and then runs the Astro build/upload action.
