import fetch from 'node-fetch';

async function checkFrontend() {
  try {
    const res = await fetch('https://freeviral.shop/');
    const html = await res.text();
    
    const match = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
    if (match) {
      const jsUrl = 'https://freeviral.shop' + match[1];
      const jsRes = await fetch(jsUrl);
      const jsCode = await jsRes.text();
      
      const errorIndex = jsCode.indexOf('ইন্টারনেট কানেকশন');
      if (errorIndex !== -1) {
        console.log('Error message context:', jsCode.substring(errorIndex - 50, errorIndex + 100));
      } else {
        console.log('Error message not found');
      }
    }
  } catch(e) {
    console.error(e);
  }
}
checkFrontend();
