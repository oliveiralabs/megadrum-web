import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outDir = path.join(root, "out");

const protectedPaths = [
  "ads.txt",
  "app-ads.txt",
  "googlefb0aa4cac85edf36.html",
  "megadrum-marketing.html",
  "megadrum-support.html",
  "privacy-policy-megadrum.html",
  "privacy-policy.html",
  "assets/css/megadrum-pages.css",
  "assets/img/megadrum-audio-center.webp",
  "assets/img/megadrum-ios.png",
  "assets/img/megadrum-kit-center.webp",
  "assets/img/megadrum-showcase.webp",
];

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

const errors = [];
for (const relative of protectedPaths) {
  const source = path.join(publicDir, relative);
  const target = path.join(outDir, relative);
  try {
    const [sourceInfo, sourceBytes, targetBytes] = await Promise.all([
      stat(source),
      readFile(source),
      readFile(target),
    ]);
    if (!sourceInfo.isFile() || sourceInfo.size === 0) {
      errors.push(`Invalid compatibility source: ${relative}`);
    } else if (hash(sourceBytes) !== hash(targetBytes)) {
      errors.push(`Compatibility output changed: ${relative}`);
    }
  } catch {
    errors.push(`Missing compatibility path: ${relative}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Mega Drum compatibility contract verified: ${protectedPaths.length} paths preserved byte-for-byte.`);
