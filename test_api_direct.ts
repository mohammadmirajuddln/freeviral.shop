import fetch from 'node-fetch';

async function test() {
  const params = new URLSearchParams();
  params.append('key', '104aa75459b1cda29f342be919769bac');
  params.append('action', 'services');

  try {
    const response = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    console.log('Success:', Array.isArray(data) ? `Got ${data.length} services` : data);
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
