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

  // Balance check endpoint
  app.get('/api/balance', async (req, res) => {
    const apiKey = process.env.PEAKERR_API_KEY || '8335e0e97998e7f8e74b87b48c48355f';
    try {
      const params = new URLSearchParams();
      params.append('key', apiKey);
      params.append('action', 'balance');
      const response = await fetch('https://peakerr.com/api/v2', {
        method: 'POST',
        body: params
      });
      const data = await response.json();
      res.json(data);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Secure API Route to hide the API Key
  app.post('/api/order', async (req, res) => {
    const { service, link, quantity, platform } = req.body;
    
    // Using the new Peakerr API key and provider provided by the user
    const apiKey = process.env.PEAKERR_API_KEY || '8335e0e97998e7f8e74b87b48c48355f';
    const apiUrl = process.env.PEAKERR_API_URL || 'https://peakerr.com/api/v2';

    if (!link) {
      return res.status(400).json({ error: 'Link is required' });
    }

    // Map service ID if using old IDs or specific platform mappings
    let targetService = service ? service.toString() : '14888';
    
    // Backward compatibility mapping for old service IDs
    if (targetService === '12600' || targetService === '30163') {
      targetService = platform === 'instagram' ? '29528' : '14888'; // Like
    } else if (targetService === '12285' || targetService === '24779') {
      targetService = platform === 'instagram' ? '31766' : '3231'; // View
    } else if (targetService === '12494') {
      targetService = platform === 'instagram' ? '36223' : '29452'; // Share
    } else if (targetService === '12212' || targetService === '12551') {
      targetService = platform === 'instagram' ? '29528' : '14888';
    }

    // Minimum quantity enforcement for Peakerr services
    let actualQuantity = parseInt(quantity, 10) || 10;
    
    // Services requiring min 100 (Views, Shares, Saves):
    // 3231 (TikTok Fast Views), 24779 (TikTok Views), 31766 (Instagram Views), 32803 (IG Views), 36223 (IG Shares), 27953 (TikTok Saves)
    if (['3231', '24779', '31766', '32803', '36223', '27953'].includes(targetService) && actualQuantity < 100) {
      actualQuantity = 100;
    }
    // Services requiring min 10 (Likes, Shares):
    // 14888 (TikTok Instant Likes), 30163 (TikTok Likes), 29452 (TikTok Shares), 29528 (Instagram Likes), 36344 (Instagram Saves)
    else if (['14888', '30163', '29452', '29528', '36344'].includes(targetService) && actualQuantity < 10) {
      actualQuantity = 10;
    } else if (actualQuantity < 10) {
      actualQuantity = 10;
    }

    try {
      const params = new URLSearchParams();
      params.append('key', apiKey);
      params.append('action', 'add');
      params.append('service', targetService);
      params.append('link', link.trim());
      params.append('quantity', actualQuantity.toString());

      const response = await fetch(apiUrl, {
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
