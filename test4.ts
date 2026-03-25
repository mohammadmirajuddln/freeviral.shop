import fetch from 'node-fetch';

async function test() {
  try {
    const res = await fetch('https://nstechfollow.com/api/v2', { method: 'POST' });
    console.log('nstechfollow.com Status:', res.status);
  } catch (e) {
    console.error('nstechfollow.com Error:', e.message);
  }
}

test();
