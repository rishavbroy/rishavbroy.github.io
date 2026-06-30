import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outFile = path.join(root, "review.zip");

const includeRoots = [
  "src",
  "public",
  "scripts",
  ".gitignore",
  ".github/workflows",
  "astro.config.mjs",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "README.md",
  "AGENTS.md"
];

if (process.env.INCLUDE_TERMINAL_OUTPUT === "1") {
  includeRoots.push("terminal_output.txt");
}

const excludeNames = new Set([
  "node_modules",
  "dist",
  ".astro",
  ".git",
  ".DS_Store",
  "Thumbs.db",
  "review.zip",
  ".cv-build"
]);

const cvBuildByproducts = [
  ".aux",
  ".bbl",
  ".bcf",
  ".blg",
  ".fdb_latexmk",
  ".fls",
  ".log",
  ".out",
  ".pdf",
  ".run.xml",
  ".synctex.gz",
  ".toc"
];

function isCvBuildByproduct(relativePath) {
  return (
    (relativePath.startsWith("cv/") || relativePath.startsWith("public/cv/")) &&
    relativePath !== "public/cv/Rishav_Roy_CV.pdf" &&
    cvBuildByproducts.some((suffix) => relativePath.endsWith(suffix))
  );
}

function shouldSkip(fullPath) {
  const relativePath = path.relative(root, fullPath).replaceAll(path.sep, "/");
  if (isCvBuildByproduct(relativePath)) return true;
  const parts = relativePath.split("/");
  return parts.some((part) => excludeNames.has(part));
}

function collectFiles(entryPath, files = []) {
  if (!fs.existsSync(entryPath) || shouldSkip(entryPath)) return files;
  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath).sort()) {
      collectFiles(path.join(entryPath, child), files);
    }
  } else if (stat.isFile()) {
    files.push(entryPath);
  }
  return files;
}

// CRC32 implementation for ZIP local headers. No external dependencies.
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();
  return { dosTime, dosDate };
}

function u16(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(value);
  return b;
}

function u32(value) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(value >>> 0);
  return b;
}

function createZip(filePaths) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const fullPath of filePaths) {
    const relPath = path.relative(root, fullPath).replaceAll(path.sep, "/");
    const name = Buffer.from(relPath, "utf8");
    const data = fs.readFileSync(fullPath);
    const stat = fs.statSync(fullPath);
    const { dosTime, dosDate } = dosDateTime(stat.mtime);
    const crc = crc32(data);

    const localHeader = Buffer.concat([
      u32(0x04034b50), // local file header signature
      u16(20),         // version needed
      u16(0x0800),     // UTF-8 names
      u16(0),          // compression method: store
      u16(dosTime),
      u16(dosDate),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),          // extra length
      name
    ]);

    localParts.push(localHeader, data);

    const centralHeader = Buffer.concat([
      u32(0x02014b50), // central directory signature
      u16(20),         // version made by
      u16(20),         // version needed
      u16(0x0800),     // UTF-8 names
      u16(0),          // compression method: store
      u16(dosTime),
      u16(dosDate),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),          // extra length
      u16(0),          // comment length
      u16(0),          // disk number
      u16(0),          // internal attrs
      u32(0),          // external attrs
      u32(offset),
      name
    ]);

    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const centralOffset = offset;
  const end = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(filePaths.length),
    u16(filePaths.length),
    u32(centralDirectory.length),
    u32(centralOffset),
    u16(0)
  ]);

  return Buffer.concat([...localParts, centralDirectory, end]);
}

const files = includeRoots.flatMap((item) => collectFiles(path.join(root, item)));
const uniqueFiles = [...new Set(files)].sort();
const zip = createZip(uniqueFiles);
fs.writeFileSync(outFile, zip);

console.log(`Created review.zip with ${uniqueFiles.length} files.`);
