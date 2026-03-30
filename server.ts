import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Enable CORS for all origins so the frontend on GitHub Pages can call this backend
  app.use(cors({
    origin: '*', // Allow all origins (e.g., https://freeviral.shop)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  app.use(express.json());

  // Secure API Route to hide the API Key
  app.post('/api/order', async (req, res) => {
    const { service, link, quantity } = req.body;
    
    // Using the new API key and provider provided by the user
    const apiKey = process.env.NSTECH_API_KEY || '104aa75459b1cda29f342be919769bac';

    if (!link) {
      return res.status(400).json({ error: 'Link is required' });
    }

    // Override quantities to meet the minimum requirements of nstechfollows.com
    // while keeping the UI showing the smaller numbers (15, 300, 10, 1)
    let actualQuantity = parseInt(quantity, 10) || 0;
    
    // Service 12551 (TikTok/Likee Likes, Shares, Reports) min is 50
    if (service === '12551' && actualQuantity < 50) {
      actualQuantity = 50;
    }
    // Service 12285 (TikTok/Likee Views) min is 100
    else if (service === '12285' && actualQuantity < 100) {
      actualQuantity = 100;
    }
    // Service 12212 (Instagram All) min is 100
    else if (service === '12212' && actualQuantity < 100) {
      actualQuantity = 100;
    }

    try {
      const params = new URLSearchParams();
      params.append('key', apiKey);
      params.append('action', 'add');
      params.append('service', service.toString());
      params.append('link', link);
      params.append('quantity', actualQuantity.toString());

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
