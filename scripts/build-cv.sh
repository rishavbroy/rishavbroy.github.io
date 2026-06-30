#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_tex="$root/public/cv/Rishav_Roy_CV.tex"
build_dir="$root/.cv-build"
output_pdf="$build_dir/Rishav_Roy_CV.pdf"
public_pdf="$root/public/cv/Rishav_Roy_CV.pdf"

if [[ ! -f "$source_tex" ]]; then
  echo "CV TeX source is missing: $source_tex" >&2
  exit 1
fi

if ! command -v latexmk >/dev/null 2>&1; then
  echo "latexmk is required to render the CV. Install a LaTeX distribution, then rerun npm run build:cv." >&2
  exit 1
fi

rm -rf "$build_dir"
mkdir -p "$build_dir" "$(dirname "$public_pdf")"

latexmk \
  -pdf \
  -interaction=nonstopmode \
  -halt-on-error \
  -file-line-error \
  -outdir="$build_dir" \
  "$source_tex"

if [[ ! -s "$output_pdf" ]]; then
  echo "CV render did not create a non-empty PDF: $output_pdf" >&2
  exit 1
fi

if [[ "$(head -c 5 "$output_pdf")" != "%PDF-" ]]; then
  echo "CV render output does not look like a PDF: $output_pdf" >&2
  exit 1
fi

cp "$output_pdf" "$public_pdf"
rm -rf "$build_dir"

echo "Rendered public CV PDF: public/cv/Rishav_Roy_CV.pdf"
