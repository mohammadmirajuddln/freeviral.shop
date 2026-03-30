import fetch from 'node-fetch';

async function checkBalance() {
  try {
    const params = new URLSearchParams();
    params.append('key', '24585759138d901cbc7cdbab19842cb0');
    params.append('action', 'balance');

    const response = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    console.log('Balance Data:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

checkBalance();
