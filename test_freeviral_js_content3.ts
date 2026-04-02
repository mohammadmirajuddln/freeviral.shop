import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral.shop/');
    const html = await res.text();
    const match = html.match(/src="([^"]+\.js)"/);
    if (match) {
      const jsUrl = new URL(match[1], 'https://freeviral.shop/').href;
      const jsRes = await fetch(jsUrl);
      const jsText = await jsRes.text();
      
      const idx = jsText.indexOf('TikTok');
      if (idx !== -1) {
        console.log('Found TikTok at', idx);
        console.log(jsText.substring(idx - 50, idx + 200));
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
