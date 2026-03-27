import fetch from 'node-fetch';

async function findMoreServices() {
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
    
    console.log("--- TikTok Report ---");
    console.log(data.find(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('report')));
    
    console.log("--- Instagram Report ---");
    console.log(data.find(s => s.name.toLowerCase().includes('instagram') && s.name.toLowerCase().includes('report')));

    console.log("--- Likee ---");
    console.log(data.find(s => s.name.toLowerCase().includes('likee')));

  } catch (error) {
    console.error('Error:', error);
  }
}

findMoreServices();
