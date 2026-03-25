import fetch from 'node-fetch';

async function test() {
  const payload = {
    key: 'a943a437571dc1256018f010bb4d8ab5',
    action: 'balance'
  };

  try {
    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
