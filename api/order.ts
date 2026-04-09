import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { service, link, quantity } = req.body || {};
  
  // Using the API key provided by the user
  const apiKey = process.env.NSTECH_API_KEY || '104aa75459b1cda29f342be919769bac';

  if (!link) {
    return res.status(400).json({ error: 'Link is required' });
  }

  // Override quantities to meet the minimum requirements of nstechfollows.com
  let actualQuantity = parseInt(quantity, 10) || 0;
  
  // Service 12600 (TikTok Likes) min is 10
  if (service === '12600' && actualQuantity < 10) {
    actualQuantity = 10;
  }
  // Service 12494 (TikTok Shares) min is 100
  else if (service === '12494' && actualQuantity < 100) {
    actualQuantity = 100;
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
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
}
