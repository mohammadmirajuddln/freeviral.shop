import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://freeviral.shop');
    console.log('Status:', res.status);
    console.log('Server:', res.headers.get('server'));
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
