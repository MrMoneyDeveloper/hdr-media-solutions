# HDR Media Solutions

Static, single-page website. Serve `dist/`; no frontend build is required.

Brand accent: #FFDB15. Motion runs on desktop and mobile. Wheel and touch scrolling are native; only navigation clicks request smooth scrolling. Continuous animation pauses off-screen and in hidden tabs to save processing.

## Content status
The current layout is Hero → Expertise → animated service strip → compact Brands showcase → Showreel placeholder → four approved films → Testimonials → Google profile/reviews placeholders → Contact → Footer. Header branding, navigation and body type are larger for readability. The hero uses an abstract animated graphic until the owner supplies approved imagery. Move the showreel to the top when its approved replacement is supplied; the pending reel has not been promoted prematurely.

The old portfolio, client list/logos, production photographs, showreel and studio wording have been removed. The Brands showcase uses 30 marks from the owner-supplied logo PNG.zip; its HDR logo is used for site branding. The duplicate Micro Derma mark, Reaction Unit South Africa, combined GDLFA/Mr Price Sport partner mark, standalone Mr Price Sport mark and Comrades mark were removed as requested on 14 October 2026. The subsequent client request also removed Afribiz Connect, Unilever, Cuba Lounge and KwaZulu-Natal Province. One Micro Derma mark and the distinct Mr Price Foundation Cup mark remain. Logos are trimmed to remove empty transparent padding, optimized as transparent PNGs, and lazy-loaded on uniform dark cards with a consistent monochrome display treatment; the PNG files retain their original colours. The grid has six columns on wide screens and two on phones, fine #FFDB15 borders, hover lift/shine/zoom, and scroll reveals. Existing testimonial text remains, without client-logo images. No phone number is published in the HTML, structured data, or contact links.

WhatsApp has been removed. The contact area displays only a “Contact us today” button, linking to Hiresh.Ravjee@hdrmediasolutions.co.za; the address and explanatory text are not displayed there. The button opens the visitor's email app. This is not a server-side email form and no message is sent automatically. Instagram and Facebook URLs are linked from the footer and were recovered from the old site.

The owner supplied four approved YouTube videos on 14 October 2026: EiTtkqJ-HmE (DP World), v0iINz1Yh5Y (Kahil and Ronelle Cinematic Aftermovie), JTeRM4_ejz8 (CAO Career Exhibition), and Q6M0mRqoHoE (Masti Productions Gala Dinner). Titles were checked on YouTube. Thumbnails are lazy-loaded from i.ytimg.com. For the first three films, a youtube-nocookie.com player is created only when selected; selecting another removes the previous player. The Gala Dinner embedded player reported “This video is unavailable” during QA, while its YouTube watch page loaded normally. That card opens directly on YouTube and stops the previous embedded player. Poster/player frames retain a 16:9 aspect ratio so loading cannot change page height. Direct YouTube links work without JavaScript. The pending footer playlist has been replaced with a link to these selected films.

The complete, owner-supplied Terms of Service (effective 14 October 2026) is published at /terms-of-service/ with all 22 sections, including the supplied privacy@hdrmediasolutions.co.za contact. Its source is content/terms-of-service.md; run `node scripts/render-terms.mjs` after source changes. No legal content was invented. The Privacy Policy supplied so far ends midway through section 4 and is not published as a complete document. The owner confirmed removal of its Coming soon footer placeholder on 14 October 2026; no separate Privacy Policy page has been published. The Google section links to the owner-supplied Business Profile (https://share.google/ksGmENGItvW04hnzn) and review page (https://g.page/r/CVqk3GzH32XREAI/review). Both links were verified to resolve to HDR Media Solutions on 14 October 2026. No rating or review count is displayed. The Privacy Policy placeholder has been removed from both the homepage and Terms page footers as requested. Approved hero imagery and the updated showreel also remain pending.

Locally hosted libraries include GSAP with ScrollTrigger and a lazy-loaded Splide testimonial slider. Unused gallery/scroll libraries are retained as optional assets, but are not loaded by the page.

## Public launch and search
Production preview is public at https://hdr-media-solutions.mohammedfarhaanbuckas.workers.dev/. The existing WordPress site at hdrmediasolutions.co.za has not been replaced. The canonical, sitemap and social image URLs are configured for the client's intended domain; update these together if the final domain changes. After connecting that domain, verify it in Google Search Console, submit /sitemap.xml, and inspect the homepage. Rankings or traffic improvements are not guaranteed.

No build needed. For local preview: `python -m http.server 4173 --directory dist` then open http://localhost:4173. The source ZIP includes the static files, locally hosted libraries and README, without hosting credentials or Git metadata.

## Cloudflare Workers (default)
The default `wrangler.jsonc` deploys `dist/` with Workers Static Assets. It supports the existing Workers Builds setup: production branch `main`, root directory `/`, build command blank, deploy command `npx wrangler deploy`. No application secrets or build variables are needed. Cloudflare's build token is managed by the dashboard.

Local commands: `npm ci`, `npm run check`, `npm run deploy:check` (validates without publishing), `npm run preview`, and `npm run deploy` (requires Cloudflare authentication). No Worker JavaScript entry point is needed for this static site. Unknown URLs return the branded 404 page.

## Cloudflare Pages (optional)
Pages configuration is preserved separately in `wrangler.pages.jsonc`. For Git integration: branch `main`, framework None, build command blank, output `dist`. For CLI: `npm run preview:pages` or `npm run deploy:pages`.

`dist/_headers` provides security headers and cache policy for both Workers Static Assets and Pages. Versioned library filenames have immutable caching; media uses bounded caching and HTML is revalidated. `dist/_redirects` redirects legacy multipage routes to single-page sections.

Motion runs by default on desktop and mobile, even when the device requests reduced motion, as requested by the site owner. Continuous animations pause outside their section and when the tab is hidden, then resume automatically. The control to disable motion has been removed. The site works without JavaScript; galleries and animation are progressive enhancements.

The GitHub main branch drives Cloudflare Workers Builds. No Cloudflare DNS/custom-domain changes have been made in this task.

Scroll fix: wheel/touch use native scrolling. Only explicit anchor clicks request smooth movement. Global CSS smooth scrolling and the Lenis controller are disabled, avoiding competing scroll writes during ScrollTrigger layout refreshes and lazy slider initialization. Mobile address-bar resizes do not rebuild scroll effects. Film thumbnails and players have fixed dimensions. Additional showreel waveform, film graphic and contact motion pause off-screen and in hidden tabs.

Verified old-site social URLs:
- https://www.instagram.com/hdrmediasolutions/
- https://www.facebook.com/hdrmediasolutions

The old homepage's outgoing links and WordPress public page index did not contain Privacy Policy or Terms of Service pages when checked on 2026-10-13. The subsequently supplied Terms are now published. The supplied Google profile and review URLs are now live. Do not restore the removed Privacy Policy placeholder without a new owner request. Do not add arbitrary YouTube videos or old portfolio links. Direct form-to-inbox delivery would require a mail provider or configured backend.
