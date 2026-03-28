import fetch from 'node-fetch';

async function testServices() {
  try {
    const params = new URLSearchParams();
    params.append('key', '24585759138d901cbc7cdbab19842cb0');
    params.append('action', 'services');

    const response = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    
    const data = await response.json();
    console.log('Total services:', data.length);
    console.log('First 5 services:', data.slice(0, 5));
    
    // Find service ID 1
    const s1 = data.find((s: any) => s.service === '1' || s.service === 1);
    console.log('Service 1:', s1);
  } catch (error) {
    console.error('API Error:', error);
  }
}

testServices();
