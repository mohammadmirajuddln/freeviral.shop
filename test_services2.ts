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
    
    // Find TikTok Like services
    const tiktokLikes = data.filter(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('like'));
    console.log('TikTok Like services:', tiktokLikes.slice(0, 3).map(s => ({id: s.service, name: s.name, min: s.min})));
    
    // Find TikTok Share services
    const tiktokShares = data.filter(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('share'));
    console.log('TikTok Share services:', tiktokShares.slice(0, 3).map(s => ({id: s.service, name: s.name, min: s.min})));
    
    // Find TikTok Report services
    const tiktokReports = data.filter(s => s.name.toLowerCase().includes('tiktok') && s.name.toLowerCase().includes('report'));
    console.log('TikTok Report services:', tiktokReports.slice(0, 3).map(s => ({id: s.service, name: s.name, min: s.min})));
    
  } catch (e) {
    console.error('Error:', e);
  }
}
test();
