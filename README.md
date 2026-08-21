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

## Magazine flip-book

Issues live as PDFs in the client's Google Drive. The deploy downloads them and
renders every page to WebP for the flip-book reader — no PDFs are committed or
published.

See **[docs/magazines.md](./docs/magazines.md)** for the pipeline, rendering
settings, capacity limits, and troubleshooting.
