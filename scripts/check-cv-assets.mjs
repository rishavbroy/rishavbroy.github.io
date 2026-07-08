import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();

const paths = {
  tex: resolve(root, "public/cv/Rishav_Roy_CV.tex"),
  pdf: resolve(root, "public/cv/Rishav_Roy_CV.pdf")
};

async function assertReadableFile(path, label) {
  try {
    const fileStat = await stat(path);

    if (!fileStat.isFile()) {
      throw new Error(`${label} exists but is not a file: ${path}`);
    }

    return fileStat;
  } catch {
    throw new Error(`${label} is missing or unreadable: ${path}`);
  }
}

async function main() {
  await assertReadableFile(paths.tex, "CV TeX source");
  const pdfStat = await assertReadableFile(paths.pdf, "CV PDF");

  const pdfHeader = await readFile(paths.pdf).then((contents) =>
    contents.subarray(0, 5).toString("utf8")
  );

  if (pdfHeader !== "%PDF-") {
    throw new Error("CV PDF does not appear to be a valid PDF: public/cv/Rishav_Roy_CV.pdf");
  }

  if (pdfStat.size < 10_000) {
    throw new Error("CV PDF is suspiciously small. Did the render fail?");
  }

  console.log("CV assets found: public/cv/Rishav_Roy_CV.tex and public/cv/Rishav_Roy_CV.pdf");
}

main().catch((error) => {
  console.error(error.message);
  console.error("Run npm run build:cv to render the public CV PDF when the TeX source has changed. Use npm run build:cv:force to render it regardless of the cache.");
  process.exit(1);
});
