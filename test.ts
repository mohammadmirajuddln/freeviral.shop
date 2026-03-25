import fetch from 'node-fetch';

async function test() {
  const params = new URLSearchParams();
  params.append('key', 'a943a437571dc1256018f010bb4d8ab5');
  params.append('action', 'add');
  params.append('service', '1');
  params.append('link', 'https://example.com');
  params.append('quantity', '10');

  try {
    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
