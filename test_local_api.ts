import fetch from 'node-fetch';

async function testLocalApi() {
  try {
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: '12551',
        link: 'https://www.tiktok.com/@example/video/123456789',
        quantity: '15'
      })
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testLocalApi();
