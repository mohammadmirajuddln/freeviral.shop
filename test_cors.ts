import fetch from 'node-fetch';

async function testCors() {
  const apiKey = '49514190f31742df7df997990278043e';
  const url = 'https://bdlikefollower.com/api/v2';

  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('action', 'balance');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Origin': 'https://freeviral.shop',
        'Referer': 'https://freeviral.shop/'
      },
      body: params
    });
    console.log('Status:', response.status);
    const text = await response.text();
    console.log('Response:', text);
  } catch (error) {
    console.error('Error:', error);
  }
}

testCors();
