import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const sourceTex = path.join(root, "public/cv/Rishav_Roy_CV.tex");
const publicPdf = path.join(root, "public/cv/Rishav_Roy_CV.pdf");
const buildDir = path.join(root, ".cv-build");
const outputPdf = path.join(buildDir, "Rishav_Roy_CV.pdf");
const statePath = path.join(buildDir, "state.json");
const force = process.argv.includes("--force");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readFile(pathname, label) {
  if (!fs.existsSync(pathname)) fail(`${label} is missing: ${path.relative(root, pathname)}`);
  return fs.readFileSync(pathname);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function readState() {
  if (!fs.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch {
    return null;
  }
}

function isValidPdf(pathname) {
  if (!fs.existsSync(pathname)) return false;
  const stat = fs.statSync(pathname);
  if (!stat.isFile() || stat.size < 10_000) return false;
  const header = fs.readFileSync(pathname).subarray(0, 5).toString("utf8");
  return header === "%PDF-";
}

function commandExists(command) {
  const paths = (process.env.PATH || "").split(path.delimiter);
  const extensions = process.platform === "win32" ? [".cmd", ".exe", ".bat", ""] : [""];

  return paths.some((directory) =>
    extensions.some((extension) => fs.existsSync(path.join(directory, command + extension)))
  );
}

function runLatexmk() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "latexmk",
      [
        "-pdf",
        "-interaction=nonstopmode",
        "-halt-on-error",
        "-file-line-error",
        `-outdir=${buildDir}`,
        sourceTex
      ],
      { stdio: "inherit" }
    );

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`latexmk exited with code ${code}`));
    });
  });
}

const sourceBytes = readFile(sourceTex, "CV TeX source");
const sourceHash = sha256(sourceBytes);
const previousState = readState();
const currentPdfHash = isValidPdf(publicPdf) ? sha256(fs.readFileSync(publicPdf)) : null;

if (
  !force &&
  previousState?.sourceSha256 === sourceHash &&
  previousState?.pdfSha256 === currentPdfHash &&
  isValidPdf(publicPdf)
) {
  console.log("CV PDF is already current: public/cv/Rishav_Roy_CV.pdf");
  process.exit(0);
}

if (!commandExists("latexmk")) {
  fail("latexmk is required to render the CV. Install a LaTeX distribution, then rerun npm run build:cv.");
}

fs.mkdirSync(buildDir, { recursive: true });

try {
  await runLatexmk();
} catch (error) {
  fail(error.message);
}

if (!isValidPdf(outputPdf)) {
  fail(`CV render did not create a valid PDF: ${path.relative(root, outputPdf)}`);
}

fs.mkdirSync(path.dirname(publicPdf), { recursive: true });
fs.copyFileSync(outputPdf, publicPdf);

const renderedPdfHash = sha256(fs.readFileSync(publicPdf));
fs.writeFileSync(
  statePath,
  JSON.stringify(
    {
      source: "public/cv/Rishav_Roy_CV.tex",
      output: "public/cv/Rishav_Roy_CV.pdf",
      sourceSha256: sourceHash,
      pdfSha256: renderedPdfHash
    },
    null,
    2
  ) + "\n"
);

console.log("Rendered public CV PDF: public/cv/Rishav_Roy_CV.pdf");
