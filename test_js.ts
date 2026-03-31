import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral-shop.vercel.app/');
    const html = await res.text();
    const match = html.match(/src="([^"]+\.js)"/);
    if (match) {
      const jsUrl = new URL(match[1], 'https://freeviral-shop.vercel.app/').href;
      console.log('Fetching JS:', jsUrl);
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      console.log('JS Status:', jsRes.status);
      console.log('JS Content snippet:', jsText.substring(0, 100));
    } else {
      console.log('No JS file found in HTML');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
