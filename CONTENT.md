# Adding content to RASA Magazine

All editable site content lives in `public/content/`. Images live in `public/assets/images/`.

No code changes are needed for normal monthly updates — only JSON + image files.

## Folder map

```
public/
  content/
    site.json                 # home copy, links, brand paths, nav
    partnership.json          # Partnership & Contact page copy
    magazines/
      index.json              # list of magazine issues (newest last)
    articles/
      index.json              # article categories (Archives / Community / Culture)
      manifest.json           # list of article file paths to load
      archives/               # JSON posts for Archives
      community/              # JSON posts for Community
      culture/                # JSON posts for Culture
    videos/
      index.json              # YouTube series
  assets/images/
    brand/                    # logos, icons, about portrait
    magazines/                # cover images
    articles/                 # article covers + thumbs
```

## Add a new magazine issue

1. Drop the cover image into `public/assets/images/magazines/`  
   Example: `vol-5-august-2026.jpg`
2. Append an entry to `public/content/magazines/index.json`:

```json
{
  "id": "vol-5-august-2026",
  "title": "RASA - VOL. 5 - August 2026",
  "volume": 5,
  "month": "August",
  "year": 2026,
  "cover": "assets/images/magazines/vol-5-august-2026.jpg",
  "driveUrl": "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing",
  "published": true
}
```

3. (Optional) Update the home MAGAZINE nav thumbnail in `site.json` → `home.nav` to the newest cover.

## Add a new article

1. Choose category folder: `archives`, `community`, or `culture`
2. Add cover image under `public/assets/images/articles/`
3. Create `public/content/articles/{category}/{slug}.json`:

```json
{
  "slug": "my-new-article-slug",
  "category": "archives",
  "title": "Full article title shown on the page",
  "cardTitle": "Shorter title for category cards",
  "cardSubtitle": "Optional subtitle",
  "date": "2026-08-01",
  "cover": "assets/images/articles/my-cover.jpg",
  "hero": "assets/images/articles/my-hero.jpg",
  "images": [],
  "published": true,
  "paragraphs": [
    "First paragraph...",
    "Second paragraph..."
  ]
}
```

4. Register it in `public/content/articles/manifest.json`:

```json
[
  "archives/spiritual-odyssey.json",
  "archives/my-new-article-slug.json"
]
```

## Add / edit video series

Edit `public/content/videos/index.json` — update titles, descriptions, playlist URLs, and embed URLs.

## Edit landing page copy

Edit `public/content/site.json` → `home.introParagraphs`, nav labels/images, and social links.

## Edit Partnership & Contact page

Edit `public/content/partnership.json` for sponsorship, collaboration, editorial, and contact copy.
Phone / email / Instagram links stay in `site.json` → `links`.

## Publish flag

Set `"published": false` on any magazine or article to hide it without deleting the file.
