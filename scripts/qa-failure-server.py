"""Local-only failure fixtures. Never include this server in a public deployment."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re

DIST = Path(__file__).resolve().parents[1] / 'dist'

class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/__qa/'):
            html = (DIST / 'index.html').read_text(encoding='utf-8')
            html = html.replace('<head>', '<head><base href="/">')
            if self.path.startswith('/__qa/no-script/'):
                html = re.sub(r'<script defer src="app\.js[^\"]*"></script>', '', html)
            html = re.sub(r'src="https://i\.ytimg\.com/[^\"]+"', 'src="/__missing-poster.jpg"', html)
            data = html.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        elif self.path.split('?')[0].endswith('.woff2') or (self.path.startswith('/vendor/') and self.path.endswith('.js')):
            self.send_error(503, 'Deliberately unavailable for QA')
        else:
            super().do_GET()
    def log_message(self, *args):
        pass

print('QA fixtures on http://127.0.0.1:4184/__qa/no-script/ and /__qa/no-vendor/', flush=True)
ThreadingHTTPServer(('127.0.0.1', 4184), partial(Handler, directory=str(DIST))).serve_forever()
