import fetch from 'node-fetch';

async function testProxy() {
  try {
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: '1',
        link: 'https://example.com',
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

testProxy();
