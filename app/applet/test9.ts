import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: '1',
        link: 'https://tiktok.com/test',
        quantity: '100'
      })
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
