import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'add');
    params.append('service', '12518');
    params.append('link', 'https://tiktok.com/@test/video/123');
    params.append('quantity', '10');

    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://freeviral.shop'
      },
      body: params
    });
    
    console.log('Status:', res.status);
    console.log('CORS Headers:', res.headers.raw());
    const text = await res.text();
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
