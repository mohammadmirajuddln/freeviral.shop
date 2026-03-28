import fetch from 'node-fetch';

async function testCorsProxy() {
  const apiKey = '49514190f31742df7df997990278043e';
  const targetUrl = encodeURIComponent('https://bdlikefollower.com/api/v2');
  const url = `https://corsproxy.io/?${targetUrl}`;

  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('action', 'add');
  params.append('service', '3639'); // TikTok Like
  params.append('link', 'https://www.tiktok.com/@user/video/1234567890');
  params.append('quantity', '15'); // Too low

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: params
    });
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testCorsProxy();
