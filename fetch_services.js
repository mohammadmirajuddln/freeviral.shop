async function getServices() {
  const params = new URLSearchParams();
  params.append('key', '104aa75459b1cda29f342be919769bac');
  params.append('action', 'services');

  const response = await fetch('https://nstechfollows.com/api/v2', {
    method: 'POST',
    body: params
  });
  
  const services = await response.json();
  
  if (Array.isArray(services)) {
    const igLikes = services.filter(s => 
      s.name.toLowerCase().includes('instagram') && 
      s.name.toLowerCase().includes('like')
    );
    console.log("IG Likes:", igLikes[0]);
  }
}
getServices();
