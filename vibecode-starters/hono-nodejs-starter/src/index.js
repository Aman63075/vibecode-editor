import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.html(`
    <html>
      <head>
        <title>VibeCode Hono</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 2rem; border-radius: 12px; text-align: center; }
          h1 { color: #f97316; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🔥 VibeCode Hono Starter</h1>
          <p>Super fast web framework running on WebContainers</p>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/info', (c) => {
  return c.json({ framework: 'Hono', runtime: 'Node.js in WebContainers' });
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Hono server running at http://localhost:${info.port}`);
});