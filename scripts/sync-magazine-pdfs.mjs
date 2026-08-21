import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const indexPath = path.join(rootDir, 'public/content/magazines/index.json');
const pdfDir = path.join(rootDir, 'public/assets/magazines/pdfs');
const pagesRoot = path.join(rootDir, 'public/assets/magazines/pages');

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

async function downloadPdf(fileId, destination) {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, buffer);
  return buffer.length;
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
