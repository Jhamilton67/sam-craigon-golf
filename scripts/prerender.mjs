// Prerenders each known route to static HTML after `vite build`, so
// crawlers that don't execute JavaScript still see real per-page content
// (title, meta tags, and body markup) instead of an empty <div id="root">.
//
// Not wired into the `build` script — run manually with `npm run prerender`
// after `npm run build`. Uses a real headless Chrome (via Puppeteer) against
// `vite preview`, so React Router's BrowserRouter works exactly as it does
// for a real visitor — no app code changes needed.
//
// NOTE: not yet wired into the Vercel build command. Verify the output
// locally first; only add `&& npm run prerender` to package.json's `build`
// script once confirmed safe for production.

import { preview } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'node:path';

const routes = [
  '/',
  '/lessons',
  '/fitting',
  '/membership',
  '/about',
  '/location',
  '/book',
  '/privacy-policy',
  '/terms',
];

async function run() {
  const server = await preview({ preview: { port: 4173, host: '127.0.0.1' } });
  const baseUrl = server.resolvedUrls.local[0];
  console.log(`Preview server running at ${baseUrl}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    for (const route of routes) {
      const url = new URL(route, baseUrl).href;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // SEO.jsx sets title/meta/JSON-LD in a useEffect after mount — give
      // React a couple of animation frames to commit before capturing.
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      );

      // Chrome injects its own origin-trial meta tag when the live
      // reCAPTCHA script runs — that's a Google/browser artifact, not our
      // content, so strip it before saving the static snapshot.
      await page.evaluate(() => {
        document.querySelectorAll('meta[http-equiv="origin-trial"]').forEach((el) => el.remove());
      });

      const html = await page.content();
      const outDir = route === '/' ? 'dist' : path.join('dist', route.slice(1));
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf-8');

      const title = await page.title();
      console.log(`✓ ${route.padEnd(16)} -> ${path.join(outDir, 'index.html')}  ("${title}")`);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
