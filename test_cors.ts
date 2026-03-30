import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://freeviral.shop',
        'Access-Control-Request-Method': 'POST'
      }
    });
    console.log('CORS Headers:', res.headers.raw());
  } catch (e) {
    console.error(e);
  }
}
test();
