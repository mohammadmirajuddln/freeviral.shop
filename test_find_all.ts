import fetch from 'node-fetch';

async function findAllServices() {
  const apiKey = '49514190f31742df7df997990278043e';
  const url = 'https://bdlikefollower.com/api/v2';

  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('action', 'services');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    
    console.log("--- TikTok ---");
    console.log("Likes:", data.find(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('like')));
    console.log("Views:", data.find(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('view')));
    console.log("Shares:", data.find(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('share')));
    
    console.log("--- Instagram ---");
    console.log("Likes:", data.find(s => s.name.toLowerCase().includes('instagram') && s.name.toLowerCase().includes('like')));
    console.log("Views:", data.find(s => s.name.toLowerCase().includes('instagram') && s.name.toLowerCase().includes('view')));
    console.log("Shares:", data.find(s => s.name.toLowerCase().includes('instagram') && s.name.toLowerCase().includes('share')));

    console.log("--- Facebook ---");
    console.log("Likes:", data.find(s => s.name.toLowerCase().includes('facebook') && s.name.toLowerCase().includes('like')));
    console.log("Views:", data.find(s => s.name.toLowerCase().includes('facebook') && s.name.toLowerCase().includes('view')));
    console.log("Shares:", data.find(s => s.name.toLowerCase().includes('facebook') && s.name.toLowerCase().includes('share')));

  } catch (error) {
    console.error('Error:', error);
  }
}

findAllServices();
