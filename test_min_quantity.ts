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
      const ourServices = ['12587', '12494', '12285', '12212'];
      
      for (const id of ourServices) {
        const service = data.find(s => s.service === id || s.service === parseInt(id));
        if (service) {
          console.log(`Service ${id} (${service.name}): MIN = ${service.min}, MAX = ${service.max}`);
        } else {
          console.log(`Service ${id} is NOT FOUND`);
        }
      }
    }
  } catch (e) {
    console.error('Error:', e);
  }
}
testServices();
