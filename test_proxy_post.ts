import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'services');

    const res = await fetch('https://api.codetabs.com/v1/proxy?quest=https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    
    console.log('Codetabs Status:', res.status);
    const text = await res.text();
    console.log('Codetabs Response:', text.substring(0, 100));
  } catch (e) {
    console.error('Codetabs Error:', e);
  }
}
test();
