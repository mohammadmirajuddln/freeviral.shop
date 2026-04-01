import fetch from 'node-fetch';

async function test() {
  try {
    const params = new URLSearchParams();
    params.append('key', '104aa75459b1cda29f342be919769bac');
    params.append('action', 'services');

    const res = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    
    const data = await res.json();
    console.log('Total services:', data.length);
    
    // Find TikTok services
    const tiktokServices = data.filter(s => s.name.toLowerCase().includes('tiktok'));
    console.log('TikTok services:', tiktokServices.slice(0, 5).map(s => ({id: s.service, name: s.name})));
    
    // Check if our IDs exist
    const id12551 = data.find(s => s.service == '12551');
    const id12285 = data.find(s => s.service == '12285');
    const id12212 = data.find(s => s.service == '12212');
    
    console.log('12551 exists:', !!id12551);
    console.log('12285 exists:', !!id12285);
    console.log('12212 exists:', !!id12212);
    
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
