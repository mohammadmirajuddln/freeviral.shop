import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/');
    const html = await res.text();
    console.log(html.substring(0, 500));
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
