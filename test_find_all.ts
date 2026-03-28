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
    
    const findBest = (keyword: string) => {
      const matches = data.filter((s: any) => 
        s.name.toLowerCase().includes(keyword.toLowerCase())
      );
      return matches.length > 0 ? matches[0] : null;
    };

    console.log('--- TikTok ---');
    console.log('Like:', findBest('tiktok like'));
    console.log('View:', findBest('tiktok view'));
    console.log('Share:', findBest('tiktok share'));
    console.log('Report:', findBest('tiktok report'));

    console.log('--- Instagram ---');
    console.log('Like:', findBest('instagram like') || findBest('ig like'));
    console.log('View:', findBest('instagram view') || findBest('ig view'));
    console.log('Share:', findBest('instagram share') || findBest('ig share'));
    console.log('Report:', findBest('instagram report') || findBest('ig report'));

    console.log('--- Likee ---');
    console.log('Like:', findBest('likee like'));
    console.log('View:', findBest('likee view'));
    console.log('Share:', findBest('likee share'));
    console.log('Report:', findBest('likee report'));

  } catch (error) {
    console.error('API Error:', error);
  }
}

findServices();
