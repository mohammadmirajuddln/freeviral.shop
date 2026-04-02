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
      
      if (jsText.includes('12551')) {
        console.log('Vercel is still using the OLD ID: 12551');
      } 
      if (jsText.includes('12518')) {
        console.log('Vercel is using the NEW ID: 12518');
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
