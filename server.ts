import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // Secure API Route to hide the API Key
  app.post('/api/order', async (req, res) => {
    const { service, link, quantity } = req.body;
    
    // Fallback key for demo purposes, but it's now hidden from the browser!
    const apiKey = process.env.SNECH_API_KEY || 'a943a437571dc1256018f010bb4d8ab5';

    if (!link) {
      return res.status(400).json({ error: 'Link is required' });
    }

    try {
      const params = new URLSearchParams();
      params.append('key', apiKey);
      params.append('action', 'add');
      params.append('service', service.toString());
      params.append('link', link);
      params.append('quantity', quantity.toString());

      const response = await fetch('https://nstechfollows.com/api/v2', {
        method: 'POST',
        body: params
      });
      
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Failed to process order' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
