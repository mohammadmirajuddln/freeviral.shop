import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'balance');

    const res = await fetch('https://corsproxy.io/?https://nstechfollows.com/api/v2', {
      method: 'POST',
      headers: {
        'Origin': 'https://freeviral.shop',
        'Referer': 'https://freeviral.shop/'
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
