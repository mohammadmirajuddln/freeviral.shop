import fetch from 'node-fetch';

async function testServices() {
  const params = new URLSearchParams();
  params.append('key', '104aa75459b1cda29f342be919769bac');
  params.append('action', 'services');

  try {
    const response = await fetch('https://nstechfollows.com/api/v2', {
      method: 'POST',
      body: params
    });
    const data = await response.json();
    
    if (Array.isArray(data)) {
      console.log(`Total services available: ${data.length}`);
      
      // Check the specific services we are using
      const ourServices = ['12518', '12494', '12285', '12212'];
      
      for (const id of ourServices) {
        const service = data.find(s => s.service === id || s.service === parseInt(id));
        if (service) {
          console.log(`Service ${id} is AVAILABLE:`, service.name);
        } else {
          console.log(`Service ${id} is NOT FOUND or DISABLED in the API`);
        }
      }
      
      // Print a few TikTok services that ARE available
      console.log("\nSome available TikTok services:");
      const tiktokServices = data.filter(s => s.name.toLowerCase().includes('tiktok')).slice(0, 5);
      tiktokServices.forEach(s => console.log(`ID: ${s.service} - ${s.name}`));
      
    } else {
      console.log('Unexpected response format:', data);
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
testServices();
