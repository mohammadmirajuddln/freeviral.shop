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

  const { service, link, quantity, platform } = req.body || {};
  
  // Using the new Peakerr API key provided by the user
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
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
}
