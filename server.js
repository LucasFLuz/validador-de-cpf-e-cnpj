const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const publicDir = path.join(__dirname, 'public');
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(publicDir, reqPath);

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`Interface disponível em http://localhost:${port}`);
});
