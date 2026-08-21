import { createWriteStream } from 'node:fs';
import { mkdir, open, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'public/content/magazines/index.json');
const pdfDir = path.join(rootDir, 'public/assets/magazines/pdfs');
const pagesRoot = path.join(rootDir, 'public/assets/magazines/pages');

const DRIVE_ENDPOINT = 'https://drive.usercontent.google.com/download';
const PDF_MAGIC = '%PDF';

function driveFileId(driveUrl = '') {
  return driveUrl.match(/\/file\/d\/([^/?#]+)/i)?.[1] ?? null;
}

/**
 * Pages already rendered for this exact Drive file mean the PDF is only needed
 * as a render input, so the download can be skipped entirely.
 */
async function alreadyRendered(issue, fileId) {
  try {
    const marker = JSON.parse(
      await readFile(path.join(pagesRoot, issue.id, 'rendered.json'), 'utf8'),
    );
    return marker.fileId === fileId && marker.pageCount > 0;
  } catch {
    return false;
  }
}

function driveUrl(params) {
  const url = new URL(DRIVE_ENDPOINT);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

/**
 * Drive answers with an HTML "can't scan for viruses" page for large files, so
 * the real bytes only arrive after resubmitting that page's confirm token.
 */
function confirmParams(html, fileId) {
  const form = html.match(/<form[^>]*id="download-form"[\s\S]*?<\/form>/i)?.[0];
  if (!form) {
    return null;
  }

  const params = {};
  for (const input of form.matchAll(/<input[^>]*type="hidden"[^>]*>/gi)) {
    const name = input[0].match(/name="([^"]+)"/i)?.[1];
    if (name) {
      params[name] = input[0].match(/value="([^"]*)"/i)?.[1] ?? '';
    }
  }

  return { id: fileId, export: 'download', confirm: 't', ...params };
}

async function fetchDrive(params) {
  const url = driveUrl(params);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }
  return response;
}

async function assertPdf(destination, fileId) {
  const handle = await open(destination, 'r');
  const size = PDF_MAGIC.length;
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(size), 0, size, 0);
    if (buffer.subarray(0, bytesRead).toString('latin1') !== PDF_MAGIC) {
      throw new Error(
        `Drive file ${fileId} did not return a PDF. Confirm the link is shared with "Anyone with the link".`,
      );
    }
  } finally {
    await handle.close();
  }
}

async function downloadPdf(fileId, destination) {
  let response = await fetchDrive({ id: fileId, export: 'download' });

  if (response.headers.get('content-type')?.includes('text/html')) {
    const params = confirmParams(await response.text(), fileId);
    if (!params) {
      throw new Error(`Drive returned an unexpected page for ${fileId} (no confirm form found)`);
    }
    response = await fetchDrive(params);
  }

  await pipeline(Readable.fromWeb(response.body), createWriteStream(destination));
  await assertPdf(destination, fileId).catch(async (error) => {
    await rm(destination, { force: true });
    throw error;
  });

  return (await stat(destination)).size;
}

async function main() {
  const issues = JSON.parse(await readFile(indexPath, 'utf8'));
  await mkdir(pdfDir, { recursive: true });

  for (const issue of issues) {
    const fileId = driveFileId(issue.driveUrl ?? '');
    if (!fileId) {
      console.warn(`Skipping ${issue.id}: could not parse Google Drive URL`);
      continue;
    }

    if (await alreadyRendered(issue, fileId)) {
      console.log(`Skipping download for ${issue.title} (pages already rendered)`);
      continue;
    }

    process.stdout.write(`Downloading ${issue.title}… `);
    const bytes = await downloadPdf(fileId, path.join(pdfDir, `${issue.id}.pdf`));
    console.log(`${(bytes / (1024 * 1024)).toFixed(1)} MB`);
  }

  console.log('Magazine PDF sync complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
