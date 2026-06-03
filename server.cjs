const http = require('http');

const port = Number(process.env.PORT || 5000);
const startedAt = new Date().toISOString();

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/healthz' || url.pathname === '/healthz') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      ok: true,
      service: 'crm-cafe24-server',
      mode: 'server-only-validation',
      db: 'disabled',
      startedAt,
      uptimeSec: Math.round(process.uptime())
    }));
    return;
  }

  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CRM Cafe24 Server</title><style>body{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:40px;line-height:1.6}code{background:#f3f4f6;padding:2px 6px;border-radius:6px}</style></head><body><h1>CRM Cafe24 Server is running</h1><p>Node server is online. Database is temporarily disabled.</p><p>Health check: <code>/api/healthz</code></p></body></html>`);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`crm-cafe24 server-only validation listening on ${port}`);
});
