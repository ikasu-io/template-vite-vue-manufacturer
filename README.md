# Ebersgrund Wärmetechnik — a manufacturer website built with Vite and Vue

> **Ebersgrund Wärmetechnik is fictional.** The company, the town of
> Ebersgrund, the people, products and figures are all made up. The site,
> its content and its images were generated with AI, and it is maintained
> with [Ikasu](https://ikasu.io), an AI content copilot for websites.
> Use it as a starting point for your own company site. The site itself is
> in German.

A one-page website for a family-owned heat pump maker in Germany, built
the way AI app builders such as Bolt build a Vue site: a single-page app
with Vite, Vue 3, TypeScript and Tailwind CSS. Products with a chart that
compares them, key figures, the company's history, sustainability, open
positions and contact, plus imprint and privacy pages.

- [Vite](https://vite.dev) + [Vue](https://vuejs.org) 3 (`<script setup>`, TypeScript) + [Tailwind CSS](https://tailwindcss.com) 4, `vue-router`, [lucide](https://lucide.dev) icons
- Charts drawn with [D3](https://d3js.org) (`d3-scale`, `d3-shape`, `d3-array`) and Vue: efficiency of each model against the outdoor temperature, units built per year and CO₂ saved
- A landscape in SVG layers in the hero that moves in parallax while you scroll, the heat pump drawn in front; switched off for visitors who prefer reduced motion
- Photos turned into responsive WebP files at build time (`vite-imagetools`)
- No cookies, no external fonts, maps or scripts

## Getting started

Needs Node.js 20.19 or newer.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type check, then the site in dist/
```

## Where to change what

| To change … | Edit |
|---|---|
| A product: specs, efficiency curve | its object in `src/data/products.ts` |
| Add a product | a new object in `src/data/products.ts` (copy one) |
| Figures for a new year | add a line to `unitsPerYear` in `src/data/figures.ts`; totals and chart follow |
| Employees, apprentices | `people` in `src/data/figures.ts` |
| Open positions | `src/data/jobs.ts` |
| History | `src/data/history.ts` |
| Name, address, email addresses | `src/data/company.ts`, and the meta tags and JSON-LD in `index.html` |
| Headings and texts of a section | its component in `src/components/` |
| Imprint and privacy policy | `src/views/ImpressumView.vue`, `src/views/DatenschutzView.vue` |
| A photo | put it in `src/assets/` and import it in `src/data/images.ts` with its alt text |
| Colours, fonts | `src/main.css` (tokens at the top) |

The build runs `vue-tsc` first: a missing or misspelt field, or a section
that points at a photo that doesn't exist, stops it with the file and
line named.

**Before you publish a real site,** replace the imprint and privacy pages
with your own: the ones here say the company is fictional and list what a
real one has to contain.

## Deploying

`npm run build` writes the site to `dist/`. Any static host works:
Netlify, Cloudflare Pages, GitHub Pages, your own server. The build
writes a copy of `index.html` for every page (`dist/impressum/`,
`dist/datenschutz/`) and a `dist/404.html`, so no server rules are
needed; add new pages to `pages` in `vite.config.ts`. Change
`ebersgrund-waerme.example` in `index.html`, `public/robots.txt` and
`public/sitemap.xml` to your domain.

## Licence

MIT, see [LICENSE](LICENSE). Images: see [IMAGES.md](IMAGES.md).
