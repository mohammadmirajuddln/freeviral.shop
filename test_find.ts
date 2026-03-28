import fetch from 'node-fetch';

async function findServices() {
  try {
    const params = new URLSearchParams();
    params.append('key', '24585759138d901cbc7cdbab19842cb0');
    params.append('action', 'services');

    const response = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    
    const data = await response.json();
    
    const findBest = (keyword: string, minQty: number) => {
      const matches = data.filter((s: any) => 
        s.name.toLowerCase().includes(keyword.toLowerCase()) && 
        parseInt(s.min) <= minQty
      );
      return matches.length > 0 ? matches[0] : null;
    };

    console.log('--- TikTok ---');
    console.log('Like (15):', findBest('tiktok like', 15));
    console.log('View (300):', findBest('tiktok view', 300));
    console.log('Share (10):', findBest('tiktok share', 10));
    console.log('Report (1):', findBest('tiktok report', 1));

    console.log('--- Instagram ---');
    console.log('Like (15):', findBest('instagram like', 15) || findBest('ig like', 15));
    console.log('View (300):', findBest('instagram view', 300) || findBest('ig view', 300));
    console.log('Share (10):', findBest('instagram share', 10) || findBest('ig share', 10));
    console.log('Report (1):', findBest('instagram report', 1) || findBest('ig report', 1));

    console.log('--- Likee ---');
    console.log('Like (15):', findBest('likee like', 15));
    console.log('View (300):', findBest('likee view', 300));
    console.log('Share (10):', findBest('likee share', 10));
    console.log('Report (1):', findBest('likee report', 1));

  } catch (error) {
    console.error('API Error:', error);
  }
}

findServices();
