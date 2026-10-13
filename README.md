# HDR Media Solutions

Static, single-page website. Serve `dist/`; no frontend build is required.

Brand accent: #FFDB15. Motion runs on desktop and mobile. Wheel and touch scrolling are native; only navigation clicks request smooth scrolling. Continuous animation pauses off-screen and in hidden tabs to save processing.

## Content status
The current layout is Hero → Expertise → animated service strip → expanded Brands showcase → Showreel placeholder → Testimonials → Contact → Footer. Header branding, navigation and body type are larger for readability. The hero uses an abstract animated graphic until the owner supplies approved imagery.

The old portfolio, client list/logos, production photographs, showreel and all studio claims have been removed. The new Brands showcase contains all 39 brand-logo files from the owner-supplied logo PNG.zip; its HDR logo is used for site branding. Logos retain their colours, are trimmed to remove empty transparent padding, encoded losslessly to WebP, and lazy-loaded on contrasting cards. Unapproved media files are also absent from the deployed assets. Existing testimonial text remains, without client-logo images. No phone number is published in the HTML, structured data, or contact links.

WhatsApp, email, social channels, Privacy Policy and Terms of Service are clearly marked placeholders. Contact buttons are disabled; no email address, link or legal text has been invented. Awaiting the owner's approved hero imagery, project media/links, showreel, contact URLs and policy content. The updated showreel remains a clearly marked placeholder until its approved replacement arrives.

Locally hosted libraries include GSAP with ScrollTrigger and a lazy-loaded Splide testimonial slider. Unused gallery/scroll libraries are retained as optional assets, but are not loaded by the page.

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
