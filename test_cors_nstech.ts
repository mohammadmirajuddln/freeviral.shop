import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'services');

    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      headers: {
        'Origin': 'https://freeviral.shop'
      },
      body: params
    });
    
    console.log('Status:', res.status);
    console.log('CORS Headers:', res.headers.raw());
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
