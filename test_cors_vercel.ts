import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/api/order', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://freeviral.shop',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    console.log('OPTIONS Status:', res.status);
    console.log('CORS Headers:', res.headers.raw());
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
