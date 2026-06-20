import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();

const paths = {
  pdf: resolve(root, "public/cv/Rishav_Roy_CV.pdf"),
  tex: resolve(root, "cv/Rishav_Roy_CV.tex")
};

async function assertReadableFile(path, label) {
  try {
    const fileStat = await stat(path);

    if (!fileStat.isFile()) {
      throw new Error(`${label} exists but is not a file: ${path}`);
    }

    return fileStat;
  } catch (error) {
    throw new Error(`${label} is missing or unreadable: ${path}`);
  }
}

async function main() {
  const pdfStat = await assertReadableFile(paths.pdf, "CV PDF");
  await assertReadableFile(paths.tex, "CV TeX source");

  const pdfHeader = await readFile(paths.pdf).then((contents) => contents.subarray(0, 5).toString("utf8"));

  if (pdfHeader !== "%PDF-") {
    throw new Error("CV PDF does not appear to be a valid PDF: public/cv/Rishav_Roy_CV.pdf");
  }

  if (pdfStat.size < 10_000) {
    throw new Error("CV PDF is suspiciously small. Did the render fail?");
  }

  console.log("CV assets found: public/cv/Rishav_Roy_CV.pdf and cv/Rishav_Roy_CV.tex");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
