import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const removablePaths = [
  ".astro",
  ".cv-build",
  "dist",
  "__MACOSX",
  "review.zip",
  "Archive.zip",
  "terminal_output.txt"
];

const cvByproductPattern = /^Rishav_Roy_CV\.(aux|bbl|bcf|blg|fdb_latexmk|fls|log|out|run\.xml|synctex\.gz|toc)$/;

function removePath(relativePath) {
  const target = path.join(root, relativePath);
  if (!fs.existsSync(target)) return false;
  fs.rmSync(target, { recursive: true, force: true });
  return true;
}

function walk(dir, visit) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, visit);
    } else if (entry.isFile()) {
      visit(fullPath, entry.name);
    }
  }
}

const removed = [];

for (const relativePath of removablePaths) {
  if (removePath(relativePath)) removed.push(relativePath);
}

walk(root, (fullPath, name) => {
  if (name !== ".DS_Store") return;
  fs.rmSync(fullPath, { force: true });
  removed.push(path.relative(root, fullPath));
});

const cvDir = path.join(root, "public/cv");
walk(cvDir, (fullPath, name) => {
  if (!cvByproductPattern.test(name)) return;
  fs.rmSync(fullPath, { force: true });
  removed.push(path.relative(root, fullPath));
});

if (removed.length === 0) {
  console.log("No local artifacts found.");
} else {
  console.log(`Removed ${removed.length} local artifact${removed.length === 1 ? "" : "s"}:`);
  for (const item of removed.sort()) {
    console.log(`- ${item}`);
  }
}
