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
      
      console.log('JS contains 12518:', jsText.includes('12518'));
      console.log('JS contains 12551:', jsText.includes('12551'));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
