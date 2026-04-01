const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SERVER_DIR = path.join(__dirname, '.next', 'server');
const STANDALONE_DIR = path.join(__dirname, '.next', 'standalone');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

function sendFile(res, filePath, statusCode = 200, extraHeaders = {}) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      ...extraHeaders,
    };
    res.writeHead(statusCode, headers);
    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

function handler(req, res) {
  res.setHeader('Connection', 'close');

  let url = (req.url || '/').split('?')[0].split('#')[0];
  url = '/' + url.replace(/^\/+/, '').replace(/\/+/g, '/');

  try {
    // Static assets
    if (url.startsWith('/_next/static/') || url.startsWith('/_next/')) {
      const fp = path.join(STANDALONE_DIR, url);
      if (sendFile(res, fp, 200, { 'Cache-Control': 'public, max-age=31536000, immutable' })) return;
    }

    // Public images
    if (url.startsWith('/images/')) {
      const fp = path.join(STANDALONE_DIR, 'public', url);
      if (sendFile(res, fp, 200)) return;
    }

    // Next.js image proxy
    if (url.startsWith('/_next/image')) {
      const qIndex = req.url.indexOf('?');
      if (qIndex > -1) {
        const qs = req.url.substring(qIndex + 1);
        const params = qs.split('&').reduce((acc, p) => {
          const [k, v] = p.split('=');
          if (k && v) acc[k] = decodeURIComponent(v.replace(/\+/g, ' '));
          return acc;
        }, {});
        if (params.url) {
          const fp = path.join(STANDALONE_DIR, 'public', params.url);
          if (sendFile(res, fp, 200)) return;
        }
      }
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    // Favicon
    if (url === '/favicon.ico' || url === '/favicon.svg') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Pages
    if (url === '/' || url === '') {
      const fp = path.join(SERVER_DIR, 'app', 'index.html');
      if (sendFile(res, fp, 200)) return;
    } else {
      let fp = path.join(SERVER_DIR, 'app', url, 'index.html');
      if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
        if (sendFile(res, fp, 200)) return;
      }
      fp = path.join(SERVER_DIR, 'app', url + '.html');
      if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
        if (sendFile(res, fp, 200)) return;
      }
    }

    // 404
    const notFound = path.join(SERVER_DIR, 'app', '_not-found.html');
    if (fs.existsSync(notFound)) {
      if (sendFile(res, notFound, 404)) return;
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (e) {
    res.writeHead(500);
    res.end('Internal Error');
  }
}

const server = http.createServer(handler);
server.keepAliveTimeout = 0;
server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.on('clientError', () => {});

// Keep-alive: check every 2s, restart if dead
setInterval(() => {
  if (!server.listening) {
    console.log('[keepalive] Server died, restarting...');
    server.close();
    server.listen(PORT, '0.0.0.0');
  }
}, 2000);

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`[keepalive] Port ${PORT} in use, waiting...`);
    setTimeout(() => {
      server.listen(PORT, '0.0.0.0');
    }, 1000);
  } else {
    console.error('[keepalive] Error:', err.message);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[keepalive] Server running on http://0.0.0.0:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('[keepalive] Uncaught:', err.message);
});
