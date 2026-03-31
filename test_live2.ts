import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: '12212',
        link: 'https://instagram.com/p/123',
        quantity: '15'
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
