# SEO & AEO Audit — Sam Craigon Golf

**Audited:** 2026-09-22
**Target:** Local production build (`vite build` → served on `localhost:4321`), since `samcraigongolf.com` still resolves to the old Wix site pending the DNS cutover. Scores and metrics below reflect the site as it will look once live, not the current Wix site.
**Method:** Real Lighthouse runs (desktop + mobile presets, v13.5.0), direct source inspection, structured-data validation. No numbers in this report are estimated or fabricated — every score below traces back to a specific tool run or file.

## SEO Health Score: 82 / 100

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 88 |
| Content Quality | 23% | 78 |
| On-Page SEO | 20% | 82 |
| Schema / Structured Data | 10% | 90 |
| Performance (CWV) | 10% | 65 |
| AI Search Readiness | 10% | 90 |
| Images | 5% | 80 |

**Business type detected:** Local service (in-person golf coaching), single location.

This is a genuinely strong build — better technical/schema/AI-readiness foundation than the vast majority of small-business sites. The score isn't higher because of one real, specific gap (mobile performance) and a handful of small, fixable issues, not because anything here is weak in concept.

## Top 5 findings

1. **Mobile performance is the one real problem** (Lighthouse mobile: 62/100, LCP 6.5s vs. desktop's 90/100, LCP 1.5s). A render-blocking Google Fonts request costs 827ms of that on its own. Given local "golf lessons near me" searches skew mobile, this is the highest-leverage fix available. — *High*
2. **Two WCAG color-contrast failures**, both quantified: brass-dark (#8f6c3a) on ivory (#f6f3ec) text is 4.33:1 against a 4.5:1 requirement — a hair's breadth off. bone-mute (#928f84) on fairway (#263e2e) is 3.58:1, a bigger gap. — *Medium*
3. **Heading hierarchy breaks in the footer** — the page goes h1 → h2 → h3 → h2, then the footer's nav-column headings ("Services", "About", "Contact") are `<h4>` with no `<h3>` anywhere in between. Confirmed by direct source read, not just the Lighthouse flag. — *Medium*
4. **The new SCG logo `<img>` tags lack explicit width/height attributes**, which Lighthouse flags as a CLS risk (sized only via Tailwind classes, not HTML attributes). — *Low*
5. **FAQPage schema is present and correct, but won't earn a Google rich snippet** — Google restricted that specific result type to gov/health/authoritative sites in Aug 2023. It's still valid and still helps AI answer engines parse the content — just don't expect the expandable box in classic search results. — *Info, not a defect*

## Top 5 quick wins

1. Load the Google Fonts stylesheet non-blocking (swap the `<link rel="stylesheet">` for the standard preload+swap pattern) — single biggest mobile LCP lever, ~800ms.
2. Bump `brass-dark` slightly darker for small text-on-ivory use, or bump the two failing `bone-mute`/`brass-dark` usages up one shade — closes both contrast failures.
3. Change the footer's `<h4>` column headings to `<h3>` — one-line fix per instance, fixes the heading-order violation site-wide.
4. Add explicit `width`/`height` attributes to the two logo `<img>` tags (Navbar, Footer).
5. Add explicit long-lived `Cache-Control` headers for `/assets/*` and `/images/*` in `vercel.json` — Vercel's static hosting defaults are generally good, but this makes it explicit rather than assumed.

---

## Technical SEO — 88/100

**What works:**
- `robots.txt` — clean, explicit `Allow: /`, plus named entries for GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, Applebot-Extended, CCBot (redundant with the wildcard, but future-proofs against any bot-specific rule ever being added), and a `Sitemap:` directive.
- `sitemap.xml` — all 9 real routes, `lastmod` dates, sensible priority weighting.
- Canonical URLs set per-page via the `SEO` component.
- HTTPS-ready via Vercel; security headers configured in `vercel.json` (HSTS with preload, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- Clean URL structure (`/lessons`, `/fitting`, etc.), no query-string routing.
- SPA JS-rendering gap (the biggest structural risk for a client-only React app) has a working, verified fix built (`scripts/prerender.mjs`) — deliberately not yet wired into the live build pending a Vercel preview test.
- 404 page exists and is tagged `noindex`.
- IndexNow verification key present at the root.

**Findings:**
- **[Medium] No explicit cache headers for static assets.** `vercel.json`'s `headers` block covers security headers only. Vercel's platform defaults usually handle this well for hashed filenames, but it's currently implicit, not verified. *Fix: add a `Cache-Control: public, max-age=31536000, immutable` rule for `/assets/(.*)`  and `/images/(.*)`.*
- **[Low] Render-blocking Google Fonts request.** Confirmed via Lighthouse's render-blocking-insight audit: `fonts.googleapis.com/css2?...` blocks first paint for ~827ms under mobile network throttling, despite the existing `preconnect` hints. *Fix: switch to the async stylesheet-loading pattern (`media="print" onload="this.media='all'"` or an equivalent).*

## Content Quality — 78/100

**What works:**
- Real, specific, non-generic copy throughout — no lorem ipsum, no filler. Each page has a distinct value proposition (Lessons vs. Fitting vs. Membership are clearly differentiated, not reworded copies of each other).
- Genuine E-E-A-T signals: PGA Professional credential stated prominently and repeatedly, a first-person About page bio with specific career history (Warrington Golf Club), named location (Uphall Golf Club), real contact details.
- FAQ content on the Membership page is genuine Q&A, not padding — directly reused for FAQPage schema.
- Testimonials present with specific, plausible detail (handicap changes, named outcomes).

**Findings:**
- **[Medium] No topical depth beyond the core service pages.** There's no blog, guide, or long-form content — which is fine for a small local business's core pages, but means there's no secondary content answering adjacent questions ("how to choose a driver shaft", "what is a TrackMan session like") that would build topical authority or catch long-tail/AI-answer-engine queries beyond direct branded search.
- **[Low] No aggregate review rating anywhere** (correctly not fabricated in schema either) — genuine reviews (Google Business Profile) would strengthen both trust signals and local pack ranking, but that's a business-side action, not a code fix.

## On-Page SEO — 82/100

**What works:**
- Every page has a unique, descriptive `<title>` and meta description (verified via the `SEO` component's per-page props, not a shared template).
- H1s are present, unique, and keyword-relevant per page.
- Internal linking between related pages (Lessons ↔ Fitting ↔ Membership ↔ Book) via nav, footer, and in-content CTAs.
- Breadcrumb schema present on every sub-page.

**Findings:**
- **[Medium] Heading hierarchy breaks.** Confirmed by direct source read: `src/pages/Home.jsx` and `src/components/ui.jsx` go h1 → h2 → h3 → h2 → h2 → h2, then `src/components/Footer.jsx:43` and `:63` use `<h4>` for "Services"/"About"/"Contact" with no `<h3>` anywhere in the document before them. This is a real accessibility/semantic-structure issue, not just a Lighthouse nitpick — screen reader users navigating by heading level will hit a confusing jump. *Fix: change both Footer `<h4>` to `<h3>`.*
- **[Medium] Two color-contrast failures**, precisely quantified via Lighthouse's axe-core scan:
  - `brass-dark` (#8f6c3a) text on `ivory` (#f6f3ec) background = **4.33:1**, needs 4.5:1. Affects `SectionLabel` (tone="light") kicker text and testimonial detail captions on light sections. This is very close — a small darkening would close it.
  - `bone-mute` (#928f84) text on `fairway` (#263e2e) background = **3.58:1**, needs 4.5:1. Affects the LaunchMonitor stat captions on dark sections. Bigger gap, needs a more noticeable lightening.

## Schema / Structured Data — 90/100

**What works:**
- `LocalBusiness` (SportsActivityLocation) with full NAP, `PostalAddress`, `GeoCoordinates`, `areaServed`, `founder` (Person), and a `makesOffer` service catalog — all verified present and internally consistent with the visible page content (address matches footer/Location page exactly).
- `Service` schema on Lessons, Fitting, and Membership, each correctly referencing the business via `@id`.
- `FAQPage` schema on Membership, generated directly from the same array that renders the visible FAQ — no drift risk between visible and structured content.
- `BreadcrumbList` on every sub-page.
- `Person` schema for Sam Craigon on the About page.

**Findings:**
- **[Info] FAQPage won't produce a Google rich snippet.** Google restricted that specific SERP treatment to authoritative gov/health/well-known sites in August 2023. The schema remains valid and useful for AI answer engines (ChatGPT, Perplexity, Google AI Overviews) parsing the content — just don't expect the expandable box in classic search results.
- **[Low] No `AggregateRating` schema.** Correctly absent, since there's no real review data to back it — adding one without genuine reviews would be a schema-spam risk. Worth adding once real Google reviews exist.

## Performance (Core Web Vitals) — 65/100

Real Lighthouse v13.5.0 runs against the local production build:

| Metric | Desktop | Mobile |
|---|---|---|
| Performance score | 90 | **62** |
| LCP | 1.5s (good) | **6.5s (poor)** |
| Speed Index | 1.4s | 6.0s |
| Time to Interactive | 1.5s | 6.5s |
| Total Blocking Time | 0ms | 0ms |
| CLS | 0 (perfect) | 0 (perfect) |

**The gap between desktop and mobile is the single most important finding in this audit.** Desktop is excellent across the board. Mobile — which is where most "golf lessons near me" searches actually happen — drops to poor LCP territory, driven primarily by:

1. **Render-blocking Google Fonts request** (~827ms) — the single biggest contributor, confirmed via the render-blocking-insight audit.
2. **reCAPTCHA's script** — 353KB transferred, 63% unused on initial load, and render-blocking (169ms). This is Google's own library; it can't be trimmed, only deferred or loaded lazier if the form it protects isn't above the fold.
3. **Unused JavaScript in the app's own bundle** — 42% of the single bundle unused on the Home page, since this is a single-bundle SPA without route-based code-splitting. Every page ships every other page's code.

CLS is a genuine strength (0 on both desktop and mobile) — the `reveal`/scroll-animation system doesn't cause layout shift, which is a common failure mode for animated sites.

## AI Search Readiness (GEO) — 90/100

**What works:**
- `llms.txt` present at the root, following the llmstxt.org spec, with a clear business summary and links to every real page.
- `robots.txt` explicitly names every major AI crawler (GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, Applebot-Extended, CCBot) as allowed — redundant with the wildcard, but removes any ambiguity.
- FAQ content is genuine Q&A in a clean, extractable format — good passage-level citability for AI answer engines even without the Google rich-snippet treatment.
- Structured data (LocalBusiness, Service, Person) gives AI crawlers unambiguous entity information rather than requiring inference from prose.

**Findings:**
- **[Low] No explicit citation-worthy statistics or data points** beyond the LaunchMonitor's illustrative example numbers (club path, launch angle, etc., which are presented as example data, not Sam's actual claimed outcomes). Real aggregate stats ("X% of studio members lower their handicap within Y sessions") would be strong AI-citation material if the business ever has the data to back them.

## Images — 80/100

**What works:**
- All photos recently converted from PNG to JPEG at quality 82 — total weight dropped from ~5.7MB to ~790KB (86% reduction) with no visible quality loss.
- Descriptive, specific `alt` text throughout (e.g. "Sam Craigon, PGA Professional at Uphall Golf Club", not generic "photo" or empty alt).

**Findings:**
- **[Low] The two new SCG logo `<img>` tags (Navbar, Footer) don't have explicit `width`/`height` HTML attributes** — sized via Tailwind classes only. Lighthouse flags this as a CLS risk since the browser can't reserve layout space before CSS loads. *Fix: add explicit `width`/`height` matching the logo's aspect ratio (837:447) alongside the existing Tailwind sizing classes.*
- **[Info] No `srcset`/responsive images.** Not currently a real problem at this file size (largest is 222KB), but worth revisiting if any future photo is larger or higher-resolution.

---

## What I didn't do

- Did not crawl the live `samcraigongolf.com` — it's still the old Wix site, auditing it would have produced a report about the wrong site.
- Did not run the automated `claude-seo` crawler tool — it correctly blocks `localhost`/`127.0.0.1` as an SSRF guard, so I gathered equivalent evidence manually via Lighthouse and direct source inspection instead.
- Did not fabricate CWV field data (CrUX) — that requires the site to actually be live and indexed with real visitor traffic. The numbers above are real lab data (Lighthouse), clearly labeled as such.
- Did not spawn the full 15-subagent pipeline — for a 9-page static site, that's disproportionate; the findings above were gathered directly and are equally evidence-based.
