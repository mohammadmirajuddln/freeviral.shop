import fetch from 'node-fetch';

async function findFollowers() {
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
    
    console.log("--- TikTok Followers ---");
    console.log(data.find(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('follow')));
    
    console.log("--- Instagram Followers ---");
    console.log(data.find(s => s.name.toLowerCase().includes('instagram') && s.name.toLowerCase().includes('follow')));

    console.log("--- Facebook Followers ---");
    console.log(data.find(s => s.name.toLowerCase().includes('facebook') && s.name.toLowerCase().includes('follow')));

  } catch (error) {
    console.error('Error:', error);
  }
}

findFollowers();
