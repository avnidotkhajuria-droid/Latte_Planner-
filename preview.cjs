const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json' };
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.resolve(__dirname, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(__dirname + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => { if (error) { res.writeHead(404).end('Not found'); return; } res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain', 'Cache-Control': 'no-store' }); res.end(data); });
}).listen(4173, '127.0.0.1', () => console.log('Planner preview: http://127.0.0.1:4173'));
