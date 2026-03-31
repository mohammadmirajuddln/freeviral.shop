import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/');
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response snippet:', text.substring(0, 200));
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
