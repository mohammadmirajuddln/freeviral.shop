import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: '12494',
        link: 'https://tiktok.com/@test/video/123',
        quantity: '10'
      })
    });
    const text = await res.text();
    console.log('Status 12494:', res.status);
    console.log('Response 12494:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
