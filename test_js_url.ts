import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/');
    const html = await res.text();
    const match = html.match(/src="([^"]+\.js)"/);
    if (match) {
      const jsUrl = new URL(match[1], 'https://freeviral-shop.vercel.app/').href;
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      
      // Check what URL it fetches
      if (jsText.includes('ais-pre-ppwebzkzzz65h2bh4hjygb')) {
        console.log('Found old AI Studio proxy URL in JS!');
      } else if (jsText.includes('/api/order')) {
        console.log('Found /api/order in JS!');
      } else {
        console.log('Could not find fetch URL in JS.');
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
