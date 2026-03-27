import fetch from 'node-fetch';

async function testNewApi() {
  const apiKey = '49514190f31742df7df997990278043e';
  const url = 'https://bdlikefollower.com/api/v2';

  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('action', 'balance');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

testNewApi();
