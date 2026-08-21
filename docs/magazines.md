# Magazine PDF reader (PDF.js)

This branch (`main-without-flip`) serves magazines with the in-page **PDF.js**
canvas viewer — not the flip-book experience on `main`.

Last verified: 21 Aug 2026.

## How it works

1. `public/content/magazines/index.json` lists each issue with a Google Drive
   `driveUrl` and a local `pdfUrl` (`assets/magazines/pdfs/<id>.pdf`).
2. On deploy, `scripts/sync-magazine-pdfs.mjs` downloads each PDF from Drive
   (handles the large-file confirm interstitial).
3. The Angular build **includes** those PDFs in the published site.
4. `magazine-reader` loads the PDF with PDF.js and renders one page at a time
   on a canvas (prev/next, keyboard, swipe).

Flip-book WebP rendering (`page-flip`, `render-magazine-pages.mjs`) is **not**
used on this branch. That pipeline lives only on `main`.

## Adding a new issue

1. Cover image → `public/assets/images/magazines/`
2. Drive share link set to **"Anyone with the link"**
3. Append to `index.json`:

```json
{
  "id": "vol-5-august-2026",
  "title": "RASA - VOL. 5 - August 2026",
  "volume": 5,
  "month": "August",
  "year": 2026,
  "cover": "assets/images/magazines/vol-5-august-2026.jpg",
  "pdfUrl": "assets/magazines/pdfs/vol-5-august-2026.pdf",
  "driveUrl": "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  "published": true
}
```

4. Push to `main-without-flip` (or sync locally with `npm run sync:magazines`).

Verify the Drive file matches the month label before shipping.

## Deploy switching

| Branch | Reader | Live site |
| --- | --- | --- |
| `main` | Flip-book (WebP + page-flip) | Push updates rasamagazine.com |
| `main-without-flip` | PDF.js canvas | Push updates rasamagazine.com |

**Last push wins.** To restore the flip-book demo, push `main` again.

## Size note

Drive originals are large (~500 MB for four issues). Shipping them in the site
leaves less headroom under GitHub Pages’ 1 GB limit than the flip-book WebP
pipeline. Prefer `main` for long-term growth; use this branch for client demos
of the non-flip experience.

## Local commands

```bash
npm run sync:magazines   # download PDFs from Drive
npm start                # http://localhost:4200
```

PDFs under `public/assets/magazines/pdfs/` are gitignored.
