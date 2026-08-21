# RASA Magazine Website

Angular static website for **RASA** — *Where Art Meets Culture* — a digital arts & culture magazine by Anjaneya Mulekar.

## Run

```bash
npm install
npm start
```

Open `http://localhost:4200/`

## Build

```bash
npm run build
```

## Content updates (monthly)

See **[CONTENT.md](./CONTENT.md)** for how to add magazines, articles, and videos without touching Angular code.

Content files: `public/content/`  
Images: `public/assets/images/`

## Magazine reader (this branch)

Branch **`main-without-flip`**: PDF.js page viewer. Issues are synced from Google
Drive at deploy time and shipped as PDFs for the in-page reader.

Branch **`main`**: flip-book (WebP + page-flip). Pushing either branch can publish
rasamagazine.com (last push wins).

See **[docs/magazines.md](./docs/magazines.md)**.
