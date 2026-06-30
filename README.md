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

Make sure to [install Node.js](https://nodejs.org/en/download) before running the following `npm` commands.

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

## CV workflow

`public/cv/Rishav_Roy_CV.pdf` renders from `public/cv/Rishav_Roy_CV.tex`. To update the CV locally:

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

Alternatively, after editing `public/cv/Rishav_Roy_CV.tex`, you can simply run `npm run build` or `npm run build:review`.

The GitHub Pages workflow renders `public/cv/Rishav_Roy_CV.pdf` from `public/cv/Rishav_Roy_CV.tex` during deployment, before Astro builds the site.

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**.