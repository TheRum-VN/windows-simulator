import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, 'public');
const port = Number(process.env.PORT || 5173);

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/') rel = '/index.html';
    let file = path.normalize(path.join(root, rel));
    if (!file.startsWith(root)) throw new Error('Forbidden');
    try {
      const s = await stat(file);
      if (s.isDirectory()) file = path.join(file, 'index.html');
    } catch {
      file = path.join(root, 'index.html');
    }
    const data = await readFile(file);
    res.writeHead(200, {
      'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  } catch (e) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

// Không truyền '0.0.0.0' để Node.js tự động lắng nghe cả IPv4 và IPv6 (giúp truy cập qua hostname không bị lỗi)
server.listen(port, () => {
  const hostname = os.hostname().toLowerCase();
  console.log(`=== Windows Simulator V2.1 đang chạy ===`);
  console.log(`- Trên máy GV:       http://localhost:${port}`);
  console.log(`- Qua tên máy (1):   http://${hostname}:${port}`);
  console.log(`- Qua tên máy (2):   http://${hostname}.local:${port}`);

  // Tự động tìm và in ra địa chỉ IP LAN của máy GV
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        console.log(`- Qua IP LAN (${name}): http://${net.address}:${port}`);
      }
    }
  }
});