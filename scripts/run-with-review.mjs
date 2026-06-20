import fs from "node:fs";
import { spawn, spawnSync } from "node:child_process";

const requested = process.argv[2];
const allowed = new Set(["dev", "build"]);

if (!allowed.has(requested)) {
  console.error("Usage: node scripts/run-with-review.mjs <dev|build>");
  process.exit(1);
}

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const logPath = "terminal_output.txt";
const log = fs.createWriteStream(logPath, { flags: "w" });

function write(line) {
  process.stdout.write(line);
  log.write(line);
}

function makeReviewZip() {
  const result = spawnSync(process.execPath, ["scripts/make-review-zip.mjs"], {
    stdio: "inherit"
  });
  return result.status ?? 0;
}

write(`$ npm run ${requested}\n\n`);

if (requested === "dev") {
  write("Creating an initial review.zip before starting the dev server...\n");
  makeReviewZip();
}

const child = spawn(npmCommand, ["run", requested], {
  stdio: ["inherit", "pipe", "pipe"],
  env: process.env
});

child.stdout.on("data", (chunk) => write(chunk.toString()));
child.stderr.on("data", (chunk) => write(chunk.toString()));

let exiting = false;
function finish(code) {
  if (exiting) return;
  exiting = true;
  write(`\nCommand exited with code ${code ?? "unknown"}. Creating review.zip...\n`);
  log.end(() => {
    makeReviewZip();
    process.exit(code ?? 0);
  });
}

process.on("SIGINT", () => {
  write("\nReceived Ctrl-C. Stopping command...\n");
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  write("\nReceived SIGTERM. Stopping command...\n");
  child.kill("SIGTERM");
});

child.on("exit", finish);
child.on("error", (error) => {
  write(`\nFailed to run command: ${error.message}\n`);
  finish(1);
});
