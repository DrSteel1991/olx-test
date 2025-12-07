## OLX Test – Local Development & E2E Tests

### Run the app locally

1. Install dependencies (first time only):

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the URL shown by Vite (by default `http://localhost:5173/`) in your browser.

### Run Playwright end‑to‑end tests

Make sure the app is running locally (via `npm run dev`), then in another terminal run:

```bash
npm run test:e2e
```

This will execute the Playwright tests defined under the `tests` directory.

### Production deployment

The app is deployed to Vercel and can be accessed here:

`https://olx-test-5b0xmmvwg-drsteel1991s-projects.vercel.app/`

