# HDR Media Solutions

Single-page static site. Serve `dist/` with any static HTTP server. No build required.

Black, silver and brand yellow (#FFDB15) design, Bootstrap grid containers, GSAP 3.13 + ScrollTrigger, Splide 4.1.4, GLightbox 3.3.1. Libraries are vendored locally with their original license headers. Supporting scripts load on demand. Native touch scrolling is supported. Motion is always enabled as requested.

Content and assets: supplied pitch deck and logo, plus the existing HDR website and its portfolio stills. All 22 client logos from the deck appear in the expandable client network. Production photographs and all six existing portfolio thumbnails are included. Duplicate logos, the deck's decorative background, stock portrait and QR code are not used as website content. No pricing or performance quantities are shown.

Showreel loads from the existing HDR media URL only when requested. Portfolio stills open in an image lightbox: the source site did not provide individual project video links. Contact actions use the phone number in the deck, with direct calling and WhatsApp. No fake form submission or backend.

Source references:
- https://hdrmediasolutions.co.za/
- https://hdrmediasolutions.co.za/portfolio/
- https://aixor-react.vercel.app/
- https://www.rockermedia.co.za/ (reference could not be fetched reliably)

For public client launch, confirm the supplied client-logo permissions, final portfolio titles, and media availability. Current deployment is owner-private for review.

Revision 2: kinetic hero with rotating orbits, floating photographic collage, cycling headline, oversized HDR wordmark, continuous client and creative marquees, colour photography, scroll parallax and image reveals, accent-colour contact panel and pointer interactions. Motion is always enabled as requested.

Revision 3: brand yellow #FFDB15 throughout the UI, including rings and glows. Search metadata, canonical URL, Open Graph/Twitter previews, Organization/WebSite JSON-LD, robots.txt and sitemap.xml target https://hdrmediasolutions.co.za/. Portfolio and client content are shipped as static HTML. All images have dimensions and async decoding; below-fold images use native lazy loading. The showreel remains click-to-load. GSAP infinite loops pause outside the viewport and in hidden tabs; mobile reveals use transforms and opacity. Motion is always enabled as requested.

## Public launch and search
Upload the contents of `dist/` to the root of hdrmediasolutions.co.za, with HTTPS. The existing WordPress site has not been replaced. The private review deployment requires sign-in and cannot be indexed by Google. The canonical, sitemap and social image URL are configured for the client's domain; update these together if the final domain changes. Verify the domain in Google Search Console, submit `/sitemap.xml`, and inspect the homepage after launch. Rankings or traffic improvements are not guaranteed.

No build needed. For local preview: `python -m http.server 4173 --directory dist` then open http://localhost:4173. The source ZIP includes the static files, locally hosted libraries and README, without hosting credentials or Git metadata.

## Cloudflare Workers (default)
The default `wrangler.jsonc` deploys `dist/` with Workers Static Assets. It supports the existing Workers Builds setup: production branch `main`, root directory `/`, build command blank, deploy command `npx wrangler deploy`. No application secrets or build variables are needed. Cloudflare's build token is managed by the dashboard.

Local commands: `npm ci`, `npm run check`, `npm run deploy:check` (validates without publishing), `npm run preview`, and `npm run deploy` (requires Cloudflare authentication). No Worker JavaScript entry point is needed for this static site. Unknown URLs return the branded 404 page.

## Cloudflare Pages (optional)
Pages configuration is preserved separately in `wrangler.pages.jsonc`. For Git integration: branch `main`, framework None, build command blank, output `dist`. For CLI: `npm run preview:pages` or `npm run deploy:pages`.

`dist/_headers` provides security headers and cache policy for both Workers Static Assets and Pages. Versioned library filenames have immutable caching; media uses bounded caching and HTML is revalidated. `dist/_redirects` redirects legacy multipage routes to single-page sections.

Motion runs by default on desktop and mobile, even when the device requests reduced motion, as requested by the site owner. Continuous animations pause outside their section and when the tab is hidden, then resume automatically. The control to disable motion has been removed. The site works without JavaScript; galleries and animation are progressive enhancements.

Google indexing starts only after public launch on hdrmediasolutions.co.za; the Sites review remains private. Follow the public-launch steps above after Cloudflare DNS/custom-domain setup. No Cloudflare account or DNS changes have been made in this task.

Scroll fix: wheel/touch use native scrolling. Only explicit anchor clicks request smooth movement. Global CSS smooth scrolling and the Lenis controller are disabled, avoiding competing scroll writes during ScrollTrigger layout refreshes and lazy slider initialization. Mobile address-bar resizes do not rebuild scroll effects. Fine photo borders and slightly increased portfolio spacing are included.
