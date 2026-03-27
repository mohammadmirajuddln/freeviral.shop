import fetch from 'node-fetch';

async function findLowMinServices() {
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
    
    console.log("TikTok services with min <= 100:");
    console.log(data.filter(s => s.name.toLowerCase().includes('tiktok') && s.min <= 100).map(s => ({id: s.service, name: s.name, min: s.min})));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

findLowMinServices();
