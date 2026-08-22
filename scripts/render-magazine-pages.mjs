import { execFile } from 'node:child_process';
import { mkdir, open, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'public/content/magazines/index.json');
const pagesRoot = path.join(rootDir, 'public/assets/magazines/pages');

/** Bump RENDER_VERSION to force a re-render of every cached issue. */
const RENDER_VERSION = 2;
const DPI = 200;
const WEBP_QUALITY = 80;
const INTERMEDIATE_QUALITY = 92;
const CONVERT_CONCURRENCY = 4;
const PAGE_EXT = 'webp';

function driveFileId(driveUrl = '') {
  return driveUrl.match(/\/file\/d\/([^/?#]+)/i)?.[1] ?? null;
}

function cacheKey(issue) {
  return {
    version: RENDER_VERSION,
    fileId: driveFileId(issue.driveUrl),
    dpi: DPI,
    quality: WEBP_QUALITY,
  };
}

async function readMarker(outDir) {
  try {
    return JSON.parse(await readFile(path.join(outDir, 'rendered.json'), 'utf8'));
  } catch {
    return null;
  }
}

async function countPages(outDir) {
  try {
    const files = await readdir(outDir);
    return files.filter((name) => name.endsWith(`.${PAGE_EXT}`)).length;
  } catch {
    return 0;
  }
}

/** Reuses previously rendered pages so deploys only process new issues. */
async function isCached(issue, outDir) {
  const marker = await readMarker(outDir);
  if (!marker) {
    return false;
  }

  const expected = cacheKey(issue);
  const matches =
    marker.version === expected.version &&
    marker.fileId === expected.fileId &&
    marker.dpi === expected.dpi &&
    marker.quality === expected.quality;

  if (!matches || !marker.pageCount) {
    return false;
  }

  return (await countPages(outDir)) === marker.pageCount;
}

async function assertPdf(pdfPath, issueId) {
  const handle = await open(pdfPath, 'r').catch(() => null);
  if (!handle) {
    throw new Error(`Missing PDF for ${issueId} at ${pdfPath}. Run npm run sync:magazines first.`);
  }

  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(4), 0, 4, 0);
    if (buffer.subarray(0, bytesRead).toString('latin1') !== '%PDF') {
      throw new Error(`${pdfPath} is not a PDF (Drive download likely returned an HTML page).`);
    }
  } finally {
    await handle.close();
  }
}

async function convertAll(outDir, jpegNames) {
  let cursor = 0;

  async function worker() {
    while (cursor < jpegNames.length) {
      const index = cursor++;
      const source = path.join(outDir, jpegNames[index]);
      const target = path.join(outDir, `${String(index + 1).padStart(3, '0')}.${PAGE_EXT}`);

      await execFileAsync('cwebp', ['-quiet', '-q', String(WEBP_QUALITY), source, '-o', target]);
      await rm(source, { force: true });
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONVERT_CONCURRENCY, jpegNames.length) }, worker),
  );
}

async function renderIssue(issue) {
  const outDir = path.join(pagesRoot, issue.id);

  if (await isCached(issue, outDir)) {
    const marker = await readMarker(outDir);
    issue.pagesBase = `assets/magazines/pages/${issue.id}`;
    issue.pageCount = marker.pageCount;
    issue.pageExt = PAGE_EXT;
    console.log(`Reusing cached pages for ${issue.title} (${marker.pageCount} pages)`);
    return;
  }

  const pdfPath = path.join(rootDir, 'public/assets/magazines/pdfs', `${issue.id}.pdf`);
  await assertPdf(pdfPath, issue.id);
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  process.stdout.write(`Rendering ${issue.title}… `);

  await execFileAsync(
    'pdftoppm',
    [
      '-jpeg',
      '-jpegopt',
      `quality=${INTERMEDIATE_QUALITY}`,
      '-r',
      String(DPI),
      pdfPath,
      path.join(outDir, 'page'),
    ],
    { maxBuffer: 1024 * 1024 * 64 },
  );

  const jpegNames = (await readdir(outDir))
    .filter((name) => /^page-?\d+\.jpg$/i.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  if (jpegNames.length === 0) {
    throw new Error(`pdftoppm produced no pages for ${issue.id}`);
  }

  await convertAll(outDir, jpegNames);

  issue.pagesBase = `assets/magazines/pages/${issue.id}`;
  issue.pageCount = jpegNames.length;
  issue.pageExt = PAGE_EXT;

  await writeFile(
    path.join(outDir, 'rendered.json'),
    `${JSON.stringify({ ...cacheKey(issue), pageCount: jpegNames.length }, null, 2)}\n`,
  );

  console.log(`${jpegNames.length} pages`);
}

async function main() {
  const issues = JSON.parse(await readFile(indexPath, 'utf8'));

  await mkdir(pagesRoot, { recursive: true });

  for (const issue of issues) {
    if (!issue.driveUrl?.trim()) {
      console.warn(`Skipping ${issue.id}: no Google Drive link`);
      continue;
    }

    await renderIssue(issue);
  }

  await writeFile(indexPath, `${JSON.stringify(issues, null, 2)}\n`);
  console.log('Magazine page rendering complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
