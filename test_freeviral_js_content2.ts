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
      
      console.log('JS length:', jsText.length);
      console.log('JS snippet:', jsText.substring(0, 200));
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
