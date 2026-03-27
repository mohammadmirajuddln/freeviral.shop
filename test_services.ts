import fetch from 'node-fetch';

async function testServices() {
  const apiKey = '49514190f31742df7df997990278043e';
  const url = 'https://bdlikefollower.com/api/v2';

  const params = new URLSearchParams();
  params.append('key', apiKey);
  params.append('action', 'services');

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    console.log('Total services:', data.length);
    // Print first 5 services to see the structure
    console.log(data.slice(0, 5));
  } catch (error) {
    console.error('Error:', error);
  }
}

testServices();
