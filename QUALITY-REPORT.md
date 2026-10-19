# HDR Media Solutions quality review

Reviewed on **19 October 2026** against the supplied chat and the final approved showreel. Scope: the public GitHub/Cloudflare release and a prepared Afrihost upload package. No changes were made to the client's current WordPress hosting or DNS.

## Agreed requirements

| Requirement | Result |
| --- | --- |
| One scrolling homepage; black/yellow `#FFDB15`; no red or price amounts in marketing sections | Retained. Terms are a separate legal document. |
| Existing animated opening; no additional hero/image/banner | Retained. No unapproved replacement photography was introduced. |
| Finished showreel and four approved films before expertise and brands | Correct order: opening → showreel → four films → expertise → service strip → brands → testimonials → Google → contact. |
| Larger header logo, titles and readable text | Retained; checked from 320 to 1440 px. The smallest phone's contact button was adjusted to avoid wrapping. |
| Strategy, Create and Amplify expanded initially | All three start open and can individually collapse and reopen. |
| Approved logos; compact, uniform presentation with yellow borders and mouse effects | 30 marks remain. Transparent source PNGs are displayed on matching dark cards with hover lift, glow and image zoom. |
| Requested logo removals | Duplicate Micro Derma removed (one remains); Reaction Unit, combined GDLFA/Mr Price Sport, standalone Mr Price Sport, Comrades, Afribiz, Unilever, Cuba Lounge and KwaZulu-Natal Province absent. Distinct Mr Price Foundation Cup remains. |
| Remove unwanted portfolio videos, alcohol imagery and studio claims/photos | Previous material remains removed; only supplied video IDs are published. |
| Showreel and video links | Supplied 2026 reel plus DP World, Kahil/Ronelle, CAO and Masti Productions Gala Dinner. No arbitrary playlist was substituted. |
| Contact button and email | “Contact us today” opens an email addressed to the supplied Hiresh inbox. Address is not printed in the contact section. WhatsApp and public phone links remain removed. |
| Google/social links | Supplied Google Business Profile and review links, Instagram and Facebook retained. No invented rating/review count. |
| Legal pages | Full supplied Terms contains all 22 sections. The Privacy Policy “Coming soon” footer placeholder remains removed as subsequently approved; no complete Privacy Policy was supplied or published. The supplied Terms' privacy reference is preserved. |
| Motion and scrolling | GSAP/ScrollTrigger motion remains enabled as requested. Wheel/touch scrolling stays native; only explicit anchor clicks request smooth scrolling. Off-screen/hidden-tab animation governors remain in place. |

## Fixes made during this pass

- Added Afrihost-specific Apache configuration and a flat upload ZIP, with a separate backup, staging, launch and rollback guide. Cloudflare's `_headers`/`_redirects` files do not configure an Apache server.
- Corrected `/portfolio/` to `/#films` and `/clients/` to `/#clients`. Added a homepage redirect for the old site's `/under-construction/` route, found in its public WordPress page index. Existing services/about/contact routes are preserved.
- Self-hosted DM Sans and Manrope variable WOFF2 fonts, about **62 KB combined**, with homepage preloads and `font-display: swap`. This removes the external Google Fonts stylesheet chain and leaves a system-font fallback.
- Added host-specific `noindex` to the Cloudflare preview so it does not compete with the intended canonical production domain. The production-domain pages remain indexable.
- Preserved visible mobile navigation and both testimonials when the application script is unavailable. Native expertise disclosures and direct YouTube links remain usable.
- Added Escape dismissal/focus return for the mobile menu and prevented the small-phone contact button from wrapping.
- Added repeatable content/HTTP checks and a local-only server for deliberate failure tests. Neither diagnostic server is part of the deployed website.

## Verification performed

- **223 automated assertions passed locally and 224 passed against the deployed Cloudflare origin**, with zero failures: content/order, approved video IDs, logo removals, image dimensions/alt attributes, unique IDs, internal links/anchors, local/dynamic assets, metadata, parsed JSON-LD, sitemap, HTTP resources, legacy 301s, genuine branded 404 and ETag/304 asset reuse. The public run also checks the preview's host-specific `noindex` header. Cloudflare Workers Builds completed successfully for the functional release.
- `npm run check`, `npm run deploy:check` and `git diff --check` passed. Terms were regenerated from the supplied Markdown with all 22 sections.
- Browser layouts checked at **320, 390, 768, 1024 and 1440 px**. Content/control bounds fit the viewport, brand columns adapt and video frames retain 16:9 dimensions. The original review checked content bounds but missed animated decorative overflow beyond the root width. This was subsequently reported on a real phone; see the corrective mobile-scroll review below.
- Mobile menu opens, its links navigate, and Escape closes it and focuses its button. Expertise disclosures were all collapsed and reopened successfully.
- Showreel and the first three films each produced usable embedded-player controls. Switching kept **one player** and unchanged document height. The Gala Dinner direct link removed the active player, while its accessible YouTube destination remained available.
- The testimonial Next control advanced to the second quotation and updated its enabled/disabled controls.
- All loaded images on the normal page were valid; the normal-page console had no captured errors/warnings during the checked interactions.
- After the lazy testimonial slider initialized, keyboard navigation reached the footer and repeated downward scrolling stayed there. No return to the opening was observed.
- Terms contents opens/collapses on phones, its 22 links reach the matching headings, and the contents sidebar opens on desktop. No restored privacy placeholder appears in either footer.
- Isolated failure fixtures deliberately removed the app script and failed font/vendor/thumbnail requests. Navigation/content/native disclosures remained available without the app. With vendor scripts unavailable, the app menu worked, both testimonials were shown and bottom scrolling stayed stable. External thumbnail failure retained fixed video frames, labels and direct watch links.
- The Afrihost ZIP is checked for archive integrity, flat root layout and presence of `.htaccess`, homepage, Terms and 404 page. It excludes source files, credentials, Git metadata, Node dependencies and Cloudflare-only configuration.
- Cloudflare's browser-integrity check rejected the default Python-urllib user agent (1010). The repeatable audit identifies browser-compatible QA requests; normal browser/curl delivery was checked and no edge protection was disabled. Live HTML revalidates with a fresh 200 response where its edge response omits an ETag; application JS/CSS/fonts support ETag/304 reuse. The public audit checks the actual asset-cache behavior rather than assuming an HTML validator.

## Search and loading preparation

Homepage/Terms have titles, descriptions, language, production canonicals and a sitemap. Homepage includes Organization/WebSite JSON-LD and social-preview metadata. Removed/legacy routes use 301s; unknown URLs return 404 rather than duplicate homepage content. The production-domain social image, canonical responses and sitemap must be verified on Afrihost after upload because that domain still serves the old site.

No video iframe is loaded at startup. Posters/logos use native lazy loading and declared dimensions; the showreel has a high-resolution poster. Bootstrap and animation assets are local, the slider loads near its section, and unused gallery/scroll libraries are not requested. Animation work pauses outside its section or in hidden tabs, and only one requested video player is retained. HTML/application CSS/JS revalidate; fingerprinted libraries and fonts can be cached longer. Cloudflare serves compressed text; the Apache package requests text compression where its module is available.

This is functional, content, responsive and HTTP verification, **not a measured Lighthouse score, field Core Web Vitals certification, ranking guarantee or a test on every physical device/browser**. Current browser tests use Chromium-based emulation; final real-phone/Safari and Afrihost-origin checks belong to the hosting launch.

## Remaining external requirements

1. **Afrihost access and actual upload:** confirm the domain document root/server, make and verify the existing website/database backup, stage the release, verify Apache module/override support and TLS, then upload and repeat the documented launch checks. No local Apache installation is available to execute `.htaccess`; it has been prepared against Apache documentation but is not claimed as host-tested.
2. **Production-domain SEO:** verify HTTPS/canonical/redirects/social image on the final domain, retain the client's mail DNS, submit the sitemap and inspect indexing in the owner's Google Search Console after publication.
3. **Automatic hosting failover:** not configured. Cloudflare build deployment, manual rollback instructions and direct watch links are not automatic Afrihost/Cloudflare traffic switching. That needs hosting/DNS access and an explicit routing/health-check setup.
4. **Email delivery:** current contact is `mailto`, as previously communicated. A server-side form that delivers directly to the inbox requires a configured email provider/backend and is not silently represented as complete.
5. **Third-party services:** YouTube and Google availability/embedding permissions remain outside the site's control. The watch links are fallbacks for embedding problems, not an independent copy of the videos. No original video file or separate video host was supplied for provider-level failover.

References used for the hosting/search rules: [Afrihost upload guide](https://help.afrihost.com/entry/how-to-publish-or-upload-your-website-files-to-the-internet-and-make-your-website-live/), [Apache rewrite rules](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html), [Apache response headers](https://httpd.apache.org/docs/2.4/mod/mod_headers.html), [Cloudflare static asset headers](https://developers.cloudflare.com/workers/static-assets/headers/) and [Google Search Central SEO guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Font notices are in `licenses/`.

## Follow-up: mobile sideways-scroll correction (19 October 2026)

The owner reported sideways scrolling on a physical phone after the original review. The tilted marquee was wider than the document, and rotated orbit artwork could also extend outside the viewport. Root-only `overflow-x: clip` was insufficient. The fix contains the opening artwork inside its section, clips the marquee inside an untransformed full-width wrapper, permits the two-column opening grid to shrink, and applies horizontal containment to both HTML and body with a `hidden` fallback for browsers without `clip`. Native vertical scrolling, zoom, video controls and slider gestures are not intercepted with JavaScript.

The CSS cache version was advanced on the homepage and generated Terms page. Responsive regression checks now compare **both document and body scroll widths with the document client width**, rather than treating off-screen decorative bounds as acceptable. The preview was checked at phone/tablet/desktop widths from 320 to 1440 px, during animation and at the strip, testimonial slider and footer, with horizontal input attempts. The browser used is Chromium; the owner can confirm the physical-phone result after the deployed fix.

## iPhone icon rendering correction — 19 October 2026

Client iPhone screenshots exposed Apple colour-emoji substitution for Unicode arrows, play triangles and the eight-spoked star. The contact background used the star as a 400px text glyph, so its opaque green emoji covered the copy. Previous Chromium checks did not detect this platform difference.

Replaced every such homepage and Terms icon with inline, currentColor SVG paths (decorative and hidden from accessibility). Replaced the contact pseudo-element glyph with a local SVG background at 7% opacity. Existing GSAP targets and motion remain intact. Direction CSS cache version is now v14. The Terms generator preserves the same SVG treatment. The content audit now rejects these emoji-prone text characters in generated pages.

Validated responsive widths 320, 390, 430, 768 and 1440: document and body scroll widths match the root client width. Visually checked the opening, star, play button, contact and footer. Browser verification uses Chromium, not a physical iPhone; the glyphs no longer rely on any operating-system font renderer.
