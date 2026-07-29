import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let target = normalize(join(root, pathname));
  if (!target.startsWith(root)) { response.writeHead(403).end('Forbidden'); return; }
  if (pathname.endsWith('/') || (existsSync(target) && statSync(target).isDirectory())) target = join(target, 'index.html');
  if (!existsSync(target) || statSync(target).isDirectory()) { response.writeHead(404).end('Not found'); return; }
  response.writeHead(200, { 'Content-Type': mime[extname(target)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(target).pipe(response);
}).listen(4173, '127.0.0.1', () => console.log('Preview available at http://127.0.0.1:4173/'));
