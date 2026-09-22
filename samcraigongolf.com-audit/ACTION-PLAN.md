# Action Plan — Sam Craigon Golf SEO/AEO Audit

## Phase 1: Critical Fixes (before/at launch)
*Nothing here.* No indexing blockers, no penalty risks, no broken crawlability. This phase is empty because the technical foundation is already solid.

## Phase 2: High-Impact Improvements (this week)
1. **Fix mobile LCP (6.5s → target under 2.5s).** Load Google Fonts non-blocking. This single change addresses the largest render-blocking cost (~827ms) identified.
2. **Wire the prerendering script into the live Vercel build**, once verified on a preview deploy — closes the JS-rendering gap for crawlers that don't execute JavaScript, and likely improves mobile FCP/LCP further since prerendered HTML paints before the JS bundle even loads.

## Phase 3: Content & Authority (this month)
1. Fix the two color-contrast failures (brass-dark on ivory: 4.33→4.5+; bone-mute on fairway: 3.58→4.5+).
2. Fix footer heading hierarchy (`<h4>` → `<h3>` for the two nav-column headings).
3. Add explicit `width`/`height` to the two logo `<img>` tags.
4. Add explicit `Cache-Control` headers for `/assets/*` and `/images/*` in `vercel.json`.
5. Consider route-based code-splitting (`React.lazy`) if the JS bundle grows further — currently 42% unused per-page, worth watching rather than urgent at this size.

## Phase 4: Monitoring & Iteration (ongoing)
1. Once live: claim/optimize the Google Business Profile — this is what actually drives local pack ranking; the on-site schema supports it but doesn't replace it.
2. Once real reviews exist: add `AggregateRating` schema.
3. Re-run this audit after the prerendering + font-loading fixes land, to confirm the mobile score improvement.
4. Consider adding secondary content (buying-guide style pages) if organic traffic growth beyond branded search becomes a goal — current content is strong on-page but has no long-tail depth.

## Summary table

| Item | Severity | Effort | Phase |
|---|---|---|---|
| Mobile LCP / render-blocking fonts | High | Low | 2 |
| Wire up prerendering | High | Medium | 2 |
| Color contrast (2 instances) | Medium | Low | 3 |
| Footer heading hierarchy | Medium | Low | 3 |
| Logo image dimensions | Low | Low | 3 |
| Explicit cache headers | Low | Low | 3 |
| Route-based code-splitting | Low | Medium | 3 |
| Google Business Profile | High | External | 4 |
| AggregateRating schema | Low | External | 4 |
