# Mega Drum Web

The official Mega Drum website, statically exported with Next.js and published at [megadrum.app](https://megadrum.app).

## Local development

```bash
npm ci
npm run dev
```

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build:production
```

Run `npm run catalog:sync` once before the individual checks in a fresh checkout, or use `npm run check` to execute the complete local verification pipeline.

The production build validates the catalog, all generated routes, SEO indexing rules, internal links, and the small set of legacy Mega Drum URLs kept for compatibility.

## Deployment

GitHub Actions builds the static `out` artifact and deploys it to GitHub Pages. Generated output is intentionally not committed to the source branch.

The custom domain is configured in the repository's GitHub Pages settings. It is transferred here only after the production artifact passes validation; DNS continues to use the GitHub Pages records.
