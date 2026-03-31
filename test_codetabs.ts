import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'balance');

    const res = await fetch('https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent('https://nstechfollows.com/api/v2'), {
      method: 'POST',
      headers: {
        'Origin': 'https://freeviral.shop',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error(e);
  }
}
test();
