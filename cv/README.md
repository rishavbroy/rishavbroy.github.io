# CV source workflow

The public website links directly to the committed PDF at:

```text
public/cv/Rishav_Roy_CV.pdf
```

The LaTeX source lives here:

```text
cv/Rishav_Roy_CV.tex
```

## Update workflow

1. Edit `cv/Rishav_Roy_CV.tex`.
2. Compile the PDF locally using your preferred LaTeX tool.
3. Replace `public/cv/Rishav_Roy_CV.pdf` with the rendered PDF.
4. Run:

```bash
npm run check:cv
npm run build:review
```

5. Commit both the `.tex` source and the committed PDF.

This repository intentionally does **not** compile the CV during website deployment. The website keeps a stable link to the committed PDF, and the source file is stored so you can migrate away from Overleaf without making the deployed site depend on a LaTeX build.
