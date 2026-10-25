const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>VibeCode Express</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 2rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5); }
          h1 { color: #38bdf8; margin-bottom: 0.5rem; }
          p { color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 VibeCode Express Server</h1>
          <p>Server is up and running on port ${port}!</p>
          <p>Try GET <a href="/api/health" style="color: #a78bfa;">/api/health</a></p>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});