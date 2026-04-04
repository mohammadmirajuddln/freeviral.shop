import fetch from 'node-fetch';

async function checkFrontend() {
  try {
    const res = await fetch('https://freeviral.shop/');
    const html = await res.text();
    
    // Find the JS file
    const match = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
    if (match) {
      const jsUrl = 'https://freeviral.shop' + match[1];
      console.log('JS URL:', jsUrl);
      
      const jsRes = await fetch(jsUrl);
      const jsCode = await jsRes.text();
      
      if (jsCode.includes('/api/order')) {
        console.log('Frontend is using /api/order');
      } else if (jsCode.includes('nstechfollows.com')) {
        console.log('Frontend is using nstechfollows.com directly!');
      }
      
      if (jsCode.includes('ইন্টারনেট কানেকশন চেক করুন।')) {
        console.log('Found old error message');
      }
    } else {
      console.log('Could not find JS file in HTML');
    }
  } catch(e) {
    console.error(e);
  }
}
checkFrontend();
