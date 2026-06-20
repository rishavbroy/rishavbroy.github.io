# rishavbroy.github.io

Personal website for Rishav Roy, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Architecture

- `src/pages/` contains routes.
- `src/layouts/` contains page shells.
- `src/components/` contains reusable UI blocks.
- `src/content/projects/` contains structured research project entries.
- `src/content/courses/` contains structured course entries.
- `public/` contains static files copied as-is to the deployed site.
- `public/cv/Rishav_Roy_CV.pdf` is the committed CV PDF linked directly from the nav.
- `cv/Rishav_Roy_CV.tex` is the public LaTeX source for the CV.
- `scripts/` contains local review helpers for producing `review.zip` and `terminal_output.txt`.

The old HugoBlox site should live on the `archive/hugoblox-original` branch.

## Local development

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

## CV workflow

The site links directly to the committed PDF at `public/cv/Rishav_Roy_CV.pdf`.

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

## Deployment

Deployment is handled by `.github/workflows/deploy.yml`. In GitHub repository settings, set Pages source to **GitHub Actions**.
