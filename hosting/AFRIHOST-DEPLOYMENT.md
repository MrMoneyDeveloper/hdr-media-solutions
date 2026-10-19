# Afrihost release and rollback

This is a static site: no Node, npm, database, build command or Cloudflare Worker is needed on the hosting account. Use the domain's Linux Apache 2.4 / compatible LiteSpeed web hosting. Confirm the actual server and document root before publishing; the account has not been provided or tested yet.

Generate the upload archive with `python scripts/package-afrihost.py`. The ZIP contains the **contents** of the website at its root, including `.htaccess`, not an enclosing `dist` folder. `_headers` and `_redirects` are Cloudflare-only and excluded; their applicable rules are provided in the Apache configuration. Font licence notices are included.

## Before switching the live site

1. In Afrihost File Manager or FTP, confirm the document root for **hdrmediasolutions.co.za** (usually `public_html`). Follow [Afrihost's upload guide](https://help.afrihost.com/entry/how-to-publish-or-upload-your-website-files-to-the-internet-and-make-your-website-live/).
2. Download a complete backup of the existing website, hidden files and WordPress database. Keep the backup **outside the public web folder** and retain the original `.htaccess`. Record the current settings so restoration is possible.
3. Test the archive in a separate staging document root with its own valid HTTPS certificate. Enable hidden-file display so `.htaccess` is extracted. Verify that the host permits these directives and has `mod_rewrite`, `mod_headers` and compression available. If the account uses a different web server, translate those rules before launch; uploading the HTML alone does not install redirects or cache rules there.
4. Confirm the site's HTTPS certificate and canonical domain. Keep existing MX, SPF, DKIM and other email DNS records. Publishing this static site does not require moving nameservers or changing email hosting.

## Publish and verify

1. After the backup is verified, replace the old application's web files and old WordPress rewrite rules with the release. Preserve account-managed verification paths such as `.well-known` as required by the host. Do not leave a public backup archive, duplicate WordPress home page or the old `index.php` route alongside the replacement.
2. Extract the archive into the confirmed document root. `index.html`, `.htaccess`, `assets/`, `vendor/` and `terms-of-service/` must be directly inside it. Do not upload the source ZIP, Git metadata, environment files or `node_modules`.
3. Check HTTPS homepage, `www` redirect to the apex domain, `/terms-of-service/`, `/robots.txt`, `/sitemap.xml`, the social-preview image and a deliberate unknown URL (must return **404**, not 200).
4. Verify `/portfolio/` → `/#films`, `/clients/` → `/#clients`, `/services/` and `/about-us/` → `/#services`, and `/contact-us/` → `/#contact`, using 301 responses with intact fragments. HTML/CSS/application JS must revalidate; versioned libraries/fonts may be cached. Check compression on text responses.
5. Test the showreel, three embedded films, fourth film's direct YouTube fallback, email button, Google links, mobile menu, collapsed expertise items, Terms contents and footer scrolling on a phone and desktop. Email opens the visitor's mail app; it is not server-side delivery.
6. Purge any Afrihost/site-level cache left from WordPress. After launch, verify the domain in Google Search Console, submit `https://hdrmediasolutions.co.za/sitemap.xml`, and inspect the homepage and Terms page. Canonical and social metadata already use that domain. The Cloudflare preview has a host-specific `noindex` header; it must not be copied onto the production domain.

## Rollback

If production checks fail, restore the original web files and `.htaccess` from the verified backup, restore the database only if it was changed, and purge the relevant host cache. Keep the new release ZIP and Git commit for a corrected redeploy. Restoring is a manual hosting action; **automatic failover between Afrihost and Cloudflare has not been configured**. Keeping both copies does not create DNS health checks or automatic traffic switching.

The original domain is still running the old website until this release is actually uploaded. Cloudflare's successful build verifies the Cloudflare deployment only, not Afrihost's server configuration or certificate.
