/**
 * Turns the client's phone photos in public/assets/images/Gallery_Homepage into
 * web-sized WebP for the homepage gallery strip, then records the result in
 * site.json.
 *
 * The originals are mostly HEIC, which Chrome and Firefox cannot display at all,
 * and run to well over 100 MB — far too heavy to ship. They stay out of git; the
 * generated WebP files are what gets committed.
 *
 * Requires macOS `sips` (reads HEIC), Python Pillow, and `cwebp`. Re-run after
 * adding photos:
 *   node scripts/optimize-gallery.mjs
 */
import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'public/assets/images/Gallery_Homepage');
const outDir = path.join(rootDir, 'public/assets/images/gallery');
const sitePath = path.join(rootDir, 'public/content/site.json');
const publicPrefix = 'assets/images/gallery';

/** Strip renders around 260px tall, so 520px covers retina without bloating. */
const TARGET_HEIGHT = 520;
const WEBP_QUALITY = 72;
const INTERMEDIATE_QUALITY = 92;
const SOURCE_PATTERN = /\.(heic|jpe?g|png)$/i;
const CONCURRENCY = 4;

function outputName(sourceName) {
  return `${path.basename(sourceName, path.extname(sourceName)).toLowerCase()}.webp`;
}

/**
 * These are iPhone photos, so most carry an EXIF orientation flag rather than
 * rotated pixels. sips keeps the flag but does not apply it, and cwebp drops
 * metadata, so the rotation has to be baked in before the WebP is written or
 * half the gallery ends up sideways.
 */
const BAKE_ORIENTATION = `
import sys
from PIL import Image, ImageOps

source, target, height, quality = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
width = max(1, round(image.width * height / image.height))
image.resize((width, height), Image.LANCZOS).save(target, 'JPEG', quality=quality)
`;

async function convert(sourceName) {
  const source = path.join(sourceDir, sourceName);
  const base = outputName(sourceName);
  const decoded = path.join(outDir, `${base}.src.jpg`);
  const scratch = path.join(outDir, `${base}.jpg`);
  const target = path.join(outDir, base);

  // Pillow cannot read HEIC, so hand those to sips first.
  const readable = /\.heic$/i.test(sourceName) ? decoded : source;
  if (readable === decoded) {
    await execFileAsync('sips', ['-s', 'format', 'jpeg', source, '--out', decoded]);
  }

  await execFileAsync('python3', [
    '-c',
    BAKE_ORIENTATION,
    readable,
    scratch,
    String(TARGET_HEIGHT),
    String(INTERMEDIATE_QUALITY),
  ]);

  await execFileAsync('cwebp', ['-quiet', '-q', String(WEBP_QUALITY), scratch, '-o', target]);
  await rm(decoded, { force: true });
  await rm(scratch, { force: true });
}

async function convertAll(names) {
  let cursor = 0;

  async function worker() {
    while (cursor < names.length) {
      await convert(names[cursor++]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, names.length) }, worker));
}

async function main() {
  const names = (await readdir(sourceDir))
    .filter((name) => SOURCE_PATTERN.test(name))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  if (names.length === 0) {
    throw new Error(`No images found in ${sourceDir}`);
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  process.stdout.write(`Optimizing ${names.length} gallery images… `);
  await convertAll(names);
  console.log('done');

  const site = JSON.parse(await readFile(sitePath, 'utf8'));
  site.home.gallery = names.map((name) => `${publicPrefix}/${outputName(name)}`);
  await writeFile(sitePath, `${JSON.stringify(site, null, 2)}\n`);

  console.log(`Wrote ${site.home.gallery.length} entries to home.gallery in site.json`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
