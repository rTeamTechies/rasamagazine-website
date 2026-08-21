# Magazine flip-book pipeline

How magazine issues get from the client's Google Drive to the flip-book reader on
rasamagazine.com, what it costs, where the ceilings are, and how to undo it.

Last verified: 21 Aug 2026, with four issues live (April–July 2026).

## How it works

The client uploads each issue as a PDF to Google Drive and sends us a share link.
Nothing else is needed from them.

1. `public/content/magazines/index.json` holds the Drive link for every issue.
2. On deploy, `scripts/sync-magazine-pdfs.mjs` downloads each PDF from Drive.
3. `scripts/render-magazine-pages.mjs` converts every page to a WebP image
   (`pdftoppm` for PDF to JPEG, then `cwebp` for JPEG to WebP).
4. The Angular build ships only those images. The PDFs are excluded.
5. `src/app/pages/magazine-reader/` feeds the images to
   [page-flip](https://github.com/Nodlik/StPageFlip) (MIT, v2.0.7) in HTML mode,
   which gives the page-turning effect.

The reader uses page-flip's **HTML mode**, not canvas mode. Canvas mode sizes its
canvas in CSS pixels without accounting for `devicePixelRatio`, so pages looked
blurry on retina and mobile screens. HTML mode renders each page as a plain `<img>`,
letting the browser use the full device resolution.

## Where the files actually live

| Location | Contains | Notes |
| --- | --- | --- |
| Google Drive | Original PDFs | The only permanent copy. Owned by the client. |
| `public/assets/magazines/pdfs/` | Downloaded PDFs (~528 MB) | Local scratch only. Gitignored, untracked. Safe to delete. |
| `public/assets/magazines/pages/` | Rendered WebP pages (~188 MB) | Build output. Gitignored, untracked. |
| Git history | Old, smaller PDF copies (112 MB) | Committed in `3fc53ee`, removed in `2345256`. Still in history, which is why `.git` is ~316 MB. |
| `gh-pages` branch | The published site | 688 WebP images, zero PDFs. |
| CI runner | Both, temporarily | Downloaded and rendered per build, discarded when the job ends. |

## Adding a new issue

1. Get the Drive share link from the client. It must be set to
   **"Anyone with the link"** or CI cannot download it.
2. Add the cover image to `public/assets/images/magazines/`.
3. Append an entry to `public/content/magazines/index.json`:

```json
{
  "id": "vol-5-august-2026",
  "title": "RASA - VOL. 5 - August 2026",
  "volume": 5,
  "month": "August",
  "year": 2026,
  "cover": "assets/images/magazines/vol-5-august-2026.jpg",
  "driveUrl": "https://drive.google.com/file/d/FILE_ID/view?usp=sharing",
  "published": true
}
```

4. Commit and push to `main`. The deploy fills in `pagesBase`, `pageCount`, and
   `pageExt` automatically and commits nothing back — those fields are written into
   the build output only.

**Verify the link before pushing.** Open the PDF and confirm the cover matches the
month you labelled it. The June and July 2026 links arrived swapped from the client
and would have shipped the wrong issues under the wrong names.

To check locally without a full deploy:

```bash
npm run sync:magazines          # downloads PDFs from Drive
pdfinfo public/assets/magazines/pdfs/vol-5-august-2026.pdf   # page count
npm run render:magazines        # renders pages, ~1 min per 200 pages locally
npm start                       # preview at localhost:4200
```

## Rendering settings

All in `scripts/render-magazine-pages.mjs`:

| Constant | Value | Effect |
| --- | --- | --- |
| `DPI` | 200 | Page resolution. Drives both sharpness and file size. |
| `WEBP_QUALITY` | 80 | Final image quality. |
| `INTERMEDIATE_QUALITY` | 92 | Quality of the throwaway JPEG. Keep well above `WEBP_QUALITY`. |
| `RENDER_VERSION` | 1 | **Bump this after changing any setting above**, or cached pages will not re-render. |

Current output is about 0.25–0.31 MB per page, roughly **47 MB per issue**.

## Caching

Re-rendering every issue on every deploy would get slow as the archive grows, so:

- Each rendered folder gets a `rendered.json` marker recording the Drive file id,
  DPI, quality, render version, and page count.
- If the marker matches, the issue is skipped — the PDF is not even downloaded.
- GitHub Actions caches `public/assets/magazines/pages` between runs.

A cold build (empty cache, four issues) takes about **14 minutes**. A warm build with
one new issue takes about **4 minutes**. GitHub evicts caches untouched for 7 days,
so a deploy after a quiet month will be a cold one.

To force a full re-render, bump `RENDER_VERSION`.

## Capacity and limits

The binding constraint is GitHub Pages' **1 GB hard limit** on the published site.

As of Aug 2026 the site is 358 MB: about 201 MB of magazine pages and 157 MB of
other images and video. At 47 MB per issue that leaves room for roughly
**13 more issues, or a bit over a year** at monthly cadence.

Secondary limits, none of them close:

- **Bandwidth.** Pages soft-limits 100 GB/month. A full read of one issue is ~47 MB,
  so about 2,000 complete read-throughs monthly. Most readers view a few pages, so
  real capacity is much higher, but a popular issue could bite.
- **Build time.** ~3.5 min per issue on a cold cache, against a 6-hour job limit.
  Fine past 50 issues.
- **Actions cache.** 10 GB repo quota, ~47 MB per issue. Not a concern.

## When the 1 GB limit gets close

Cheapest first.

**1. Lower the quality.** Set `WEBP_QUALITY` to 74 or `DPI` to 150, bump
`RENDER_VERSION`, redeploy. Buys 25–40% more room for a two-line change. Check
sharpness at 1440px and 390px widths afterwards.

**2. Archive older issues.** Keep the most recent dozen as flip books; for older
ones drop `pagesBase` from their JSON entry so the listing falls back to the Drive
link. No code change — the reader already handles issues without rendered pages.

**3. Move the images off GitHub Pages.** This removes the cap permanently.

The app is already built for it. `buildPageImages` routes every URL through
`resolveAssetUrl` in `src/app/utils/drive-pdf.ts`, which passes absolute `https://`
URLs through untouched. Pointing `pagesBase` at
`https://cdn.rasamagazine.com/vol-5-august-2026` requires **no Angular changes** —
only a CI step that uploads the rendered pages instead of bundling them.

*Cloudflare R2* is the recommended target. Egress is free with no bandwidth ceiling,
storage is $0.015/GB-month, and the first 10 GB is permanently free — about 210
issues, or seventeen years of monthly editions, at zero cost. Reads are free to 10
million/month, roughly 200,000 full read-throughs.

*A VPS* also works. Hetzner's CX23 is €5.49/month for 2 vCPU, 4 GB RAM, 40 GB NVMe
(~850 issues) and 20 TB traffic (~425,000 full reads). You take on uptime, TLS,
backups, and patching, and a single European server is slow for Indian readers unless
fronted by a CDN. Worth it only if a backend is coming anyway — subscriber accounts,
a paywall, and so on.

Once storage stops being scarce, 300 DPI at quality 85 becomes affordable. That
roughly doubles each issue to ~100 MB and visibly sharpens body text on large
displays.

## Google Drive gotchas

Two problems have already cost us a failed deploy. Both are handled in code now, but
know the symptoms.

**The virus-scan interstitial.** For large files Drive returns an HTML "can't scan
this file for viruses" page — with a `200 OK` status. An earlier version of the sync
script only checked the status code and wrote that HTML into `.pdf` files, so
`pdftoppm` failed with nothing useful to say. The script now resubmits the form's
confirm token to get the real bytes, and both scripts reject anything not starting
with `%PDF`. If you see *"is not a PDF (Drive download likely returned an HTML
page)"*, the link is probably no longer shared publicly.

**Drive is a single point of failure.** If the client changes sharing settings,
deletes a file, or replaces one with different content, the next cold deploy breaks
or silently ships the wrong pages. Warm builds keep working because cached issues
skip the download entirely. Hosting the PDFs ourselves (option 3 above) removes this
dependency.

## Troubleshooting

**Deploy fails at "Render magazine flip-book pages"** — usually a bad download.
Check the sync step's reported file sizes; an issue measured in kilobytes is the
interstitial. Confirm the Drive link is still public.

**Page counter shows the wrong total** — `pageCount` is written by the render script
from the actual PDF, so a mismatch means the Drive file changed. Bump
`RENDER_VERSION` and redeploy.

**Pages look blurry** — check the reader is still in HTML mode, not canvas mode. See
the note at the top.

**Wrong issue under a month's name** — the Drive links are swapped. Compare page
counts against `index.json` and render page 1 to check the cover:

```bash
pdftoppm -jpeg -r 40 -f 1 -l 1 public/assets/magazines/pdfs/vol-5-august-2026.pdf /tmp/cover
```

## Removing the feature

This was quoted to the client as a paid add-on. If they decline, revert these two
commits, newest first:

- `d802789` — Drive confirm-page fix and the June/July link correction
- `2345256` — the flip-book feature itself

That restores the previous PDF.js reader. Also worth cleaning up afterwards:
`page-flip` in `package.json`, `src/types/page-flip.d.ts`, both scripts, the
magazine steps in `.github/workflows/deploy-pages.yml`, and the `pdfs`/`pages`
entries in `.gitignore`.

Note that `pdfjs-dist` is still a dependency but the reader no longer uses it. If
the feature stays, that can be dropped.
