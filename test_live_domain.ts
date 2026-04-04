import fetch from 'node-fetch';

async function checkLive() {
  try {
    console.log("Testing https://freeviral.shop/api/order ...");
    const res = await fetch('https://freeviral.shop/api/order', {
      method: 'OPTIONS'
    });
    console.log("Status:", res.status);
    console.log("Headers:", res.headers.raw());
    
    const resPost = await fetch('https://freeviral.shop/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service: '12519', link: 'https://test.com', quantity: '15' })
    });
    console.log("POST Status:", resPost.status);
    const text = await resPost.text();
    console.log("POST Response:", text.substring(0, 200));
  } catch(e) {
    console.error("Error:", e);
  }
}
checkLive();
