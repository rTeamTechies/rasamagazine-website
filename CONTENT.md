# Adding content to RASA Magazine

Magazines, videos, home, and partnership still use JSON under `public/content/`.  
**Articles are Angular components with raw HTML** — each piece has its own page you can edit freely.

## Folder map

```
public/
  content/
    site.json                 # home copy, links, brand paths, nav
    partnership.json          # Partnership & Contact page copy
    magazines/
      index.json              # list of magazine issues
    videos/
      index.json              # YouTube series
  assets/images/
    brand/
    magazines/
    articles/                 # covers / heroes / gallery images
  assets/magazines/pdfs/

src/app/pages/
  articles/                   # Articles hub
  archives/                   # Archives listing + each archive article
  community/                  # Community listing + each community article
  culture/                    # Culture listing + each culture article
```

## Add a new magazine issue

1. Drop the cover image into `public/assets/images/magazines/`
2. Drop the PDF into `public/assets/magazines/pdfs/` (prefer under ~25MB)
3. Append an entry to `public/content/magazines/index.json`
4. Optional: update home MAGAZINE nav thumb in `site.json`

## Add a new article

Articles are **not** JSON. Create a component under the right category folder.

Example — new Archives piece at `/archives/my-piece`:

1. Add images under `public/assets/images/articles/`
2. Create folder `src/app/pages/archives/my-piece/` with:
   - `my-piece.ts` — empty component class
   - `my-piece.html` — raw HTML (title, paragraphs, images, layout)
   - `my-piece.scss` — `@use '../../shared/article-page' as *;` (plus any page-specific tweaks)
3. Register the route in `src/app/app.routes.ts`
4. Add a card link on the category listing (`archives.html` / `community.html` / `culture.html`)

Shared article look lives in `src/app/pages/shared/_article-page.scss`.  
Shared category listing look lives in `src/app/pages/shared/_category-page.scss`.

You can rearrange layout per article freely in that page’s HTML — no shared `paragraphs[]` mapping.

## Add / edit video series

Edit `public/content/videos/index.json`.

## Edit landing page / partnership

- Home: `public/content/site.json`
- Partnership: `public/content/partnership.json`
