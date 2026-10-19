"""Build a flat, static upload ZIP; no Node runtime is needed on Afrihost."""
from hashlib import sha256
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import argparse

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT.parent / 'HDR-Media-Solutions-afrihost.zip')
args = parser.parse_args()
output = args.output.resolve()
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted((ROOT / 'dist').rglob('*')):
        if file.is_file() and file.name not in {'_headers', '_redirects'}:
            archive.write(file, file.relative_to(ROOT / 'dist').as_posix())
    archive.write(ROOT / 'hosting' / 'afrihost.htaccess', '.htaccess')
    for file in sorted((ROOT / 'licenses').glob('*.txt')):
        archive.write(file, f'licenses/{file.name}')
with ZipFile(output) as archive:
    assert archive.testzip() is None, 'ZIP integrity check failed'
    names = set(archive.namelist())
    assert {'index.html', '.htaccess', 'terms-of-service/index.html', '404.html'} <= names
    assert not any(name.startswith(('dist/', '.git/', 'node_modules/')) for name in names)
digest = sha256(output.read_bytes()).hexdigest()
output.with_suffix('.zip.sha256').write_text(f'{digest}  {output.name}\n', encoding='utf-8')
print(f'{output}\n{len(names)} files; {output.stat().st_size:,} bytes\nSHA-256 {digest}')
