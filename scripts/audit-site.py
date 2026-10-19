"""Check agreed content, internal assets, search metadata and HTTP behavior."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.error import HTTPError
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, build_opener, HTTPRedirectHandler
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
checks = []

def check(condition, label):
    checks.append({'check': label, 'passed': bool(condition)})

class Document(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.text = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
    def handle_data(self, data):
        self.text.append(data)

documents = {p: Document(p.read_text(encoding='utf-8')) for p in DIST.rglob('*.html')}
home = documents[DIST / 'index.html']
source = (DIST / 'index.html').read_text(encoding='utf-8')
expected_order = ['home', 'showreel', 'films', 'services', 'clients', 'testimonials', 'google-reviews', 'contact']
check([a['id'] for t, a in home.tags if t == 'section' and 'id' in a] == expected_order, 'Approved section order')
check(sum(t == 'h1' for t, a in home.tags) == 1, 'One homepage H1')
logos = [a for t, a in home.tags if t == 'img' and a.get('src', '').startswith('assets/client-')]
check(len(logos) == 30, '30 approved brand logos')
removed = ['Reaction Unit', 'Mr Price Sport', 'Comrades', 'Afribiz', 'Unilever', 'Cuba Lounge', 'KwaZulu']
check(not any(word.lower() in a.get('alt', '').lower() for word in removed for a in logos), 'Requested brands removed')
check(sum('Micro Derma' in a.get('alt', '') for a in logos) == 1, 'Micro Derma appears once')
check(sum(t == 'details' and 'open' in a for t, a in home.tags) == 3, 'Three expertise panels start expanded')
videos = [a for t, a in home.tags if t == 'a' and 'video-launch' in a.get('class', '')]
check([urlsplit(a['href']).query for a in videos] == ['v=5U7ygcrb9pI', 'v=EiTtkqJ-HmE', 'v=v0iINz1Yh5Y', 'v=JTeRM4_ejz8', 'v=Q6M0mRqoHoE'], 'Only supplied showreel and four films')
check('data-video' not in videos[-1], 'Unavailable Gala Dinner embed opens YouTube directly')
check(not any(t == 'iframe' for t, a in home.tags), 'No YouTube iframe at startup')
check(not re.search(r'tel:|wa\.me|api\.whatsapp|\+27\s*\d', source, re.I), 'No public phone or WhatsApp link')
check('Hiresh.Ravjee@hdrmediasolutions.co.za' not in ' '.join(home.text).split('</script>')[-1].split('LET’S MAKE YOUR NEXT MOVE MATTER')[-1], 'Email address hidden in contact display')
check('Contact us today' in source, 'Approved email button wording')
check('https://share.google/ksGmENGItvW04hnzn' in source and 'https://g.page/r/CVqk3GzH32XREAI/review' in source, 'Supplied Google profile/review URLs')
check('Coming soon' not in source and 'Updated showreel coming soon' not in source, 'No stale showreel/privacy placeholders')
check(not any('privacy' in a.get('href', '').lower() for t, a in home.tags if t == 'a'), 'Removed privacy footer placeholder stays absent')
terms = documents[DIST / 'terms-of-service' / 'index.html']
check(sum(t == 'h2' and a.get('id', '').startswith('terms-') for t, a in terms.tags) == 22, 'All 22 supplied Terms sections')

assets = set()
for file, doc in documents.items():
    relative = file.relative_to(DIST).as_posix()
    ids = [a['id'] for t, a in doc.tags if 'id' in a]
    check(len(ids) == len(set(ids)), f'{relative}: unique IDs')
    check(all('width' in a and 'height' in a and 'alt' in a for t, a in doc.tags if t == 'img'), f'{relative}: images have dimensions and alt attributes')
    check('\ufffd' not in file.read_text(encoding='utf-8'), f'{relative}: valid text encoding')
    for tag, attrs in doc.tags:
        for key in ('src', 'href'):
            ref = attrs.get(key, '')
            if not ref or urlsplit(ref).scheme or ref.startswith('//'):
                continue
            url = urlsplit(urljoin('https://local.test/' + relative, ref))
            path = DIST / unquote(url.path).lstrip('/')
            if path.is_dir():
                path /= 'index.html'
            check(path.is_file(), f'{relative}: {ref} resolves')
            if path.is_file():
                assets.add('/' + path.relative_to(DIST).as_posix())
                if url.fragment and path in documents:
                    check(any(a.get('id') == url.fragment for t, a in documents[path].tags), f'{relative}: #{url.fragment} exists')
    if file.name != '404.html':
        check(any(t == 'meta' and a.get('name') == 'description' and a.get('content') for t, a in doc.tags), f'{relative}: search description')
        check(any(t == 'link' and a.get('rel') == 'canonical' and a.get('href', '').startswith('https://hdrmediasolutions.co.za/') for t, a in doc.tags), f'{relative}: production canonical')

for css in DIST.glob('*.css'):
    for ref in re.findall(r'url\([\'"]?([^\)\'\"]+)', css.read_text(encoding='utf-8')):
        if not urlsplit(ref).scheme:
            path = css.parent / ref
            check(path.is_file(), f'{css.name}: local font/asset exists')
            assets.add('/' + path.relative_to(DIST).as_posix())
check('fonts.googleapis.com' not in source + (DIST / 'style.css').read_text(encoding='utf-8'), 'Fonts self-hosted; no Google stylesheet dependency')
for script in [DIST / 'app.js', DIST / 'legal.js']:
    for ref in re.findall(r'[\'\"](vendor/[^\'\"]+\.(?:js|css))[\'\"]', script.read_text(encoding='utf-8')):
        check((DIST / ref).is_file(), f'{script.name}: dynamic library exists: {ref}')
        assets.add('/' + ref)
for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', source, re.S):
    data = json.loads(raw)
    check(data.get('@context') == 'https://schema.org' and len(data.get('@graph', [])) == 2, 'Organization and Website JSON-LD parses')
sitemap = ElementTree.fromstring((DIST / 'sitemap.xml').read_text(encoding='utf-8'))
check(len(sitemap) == 2, 'Sitemap has homepage and Terms only')

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None

def response(base, path, extra=None):
    req = Request(base.rstrip('/') + path, headers=extra or {})
    try:
        result = build_opener(NoRedirect).open(req, timeout=20)
    except HTTPError as error:
        result = error
    return result.status, dict(result.headers), result.read()

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--base', help='Optional preview/live origin for HTTP checks')
args = parser.parse_args()
if args.base:
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(lambda p: (p, response(args.base, p)), sorted(assets)))
    for path, (status, headers, body) in results:
        # Cloudflare redirects explicit index URLs to their clean canonical path.
        check(status == 200 or (path.endswith('/index.html') and status in (301, 307, 308)), f'HTTP asset {path}: {status}')
    for path, fragment in [('/portfolio/', '#films'), ('/clients/', '#clients'), ('/services/', '#services'), ('/about-us/', '#services'), ('/contact-us/', '#contact'), ('/under-construction/', '')]:
        status, headers, body = response(args.base, path)
        check(status == 301 and headers.get('Location', '').endswith('/' + fragment), f'HTTP legacy redirect {path}')
    status, headers, body = response(args.base, '/audit-deliberately-missing-20261019')
    check(status == 404 and b'This frame' in body, 'Unknown URL returns branded HTTP 404')
    status, headers, body = response(args.base, '/')
    check(status == 200 and b'data-video="5U7ygcrb9pI"' in body, 'HTTP homepage is the approved release')
    check('must-revalidate' in headers.get('Cache-Control', ''), 'HTML revalidates on subsequent visits')
    if urlsplit(args.base).hostname == 'hdr-media-solutions.mohammedfarhaanbuckas.workers.dev':
        check(any(key.lower() == 'x-robots-tag' and 'noindex' in value for key, value in headers.items()), 'Cloudflare preview is noindex')
    etag = headers.get('ETag') or headers.get('Etag')
    check(bool(etag) and response(args.base, '/', {'If-None-Match': etag})[0] == 304, 'Unchanged HTML supports conditional 304 responses')

failed = [item for item in checks if not item['passed']]
print(json.dumps({'origin': args.base, 'passed': len(checks) - len(failed), 'failed': failed, 'checks': len(checks)}, indent=2))
raise SystemExit(bool(failed))
