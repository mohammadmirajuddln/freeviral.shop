async function test() {
  const params = new URLSearchParams();
  params.append('key', '104aa75459b1cda29f342be919769bac');
  params.append('action', 'add');
  params.append('service', '12600');
  params.append('link', 'https://www.tiktok.com/@user/video/1234567890123456789');
  params.append('quantity', '10');

  const response = await fetch('https://nstechfollows.com/api/v2', {
    method: 'POST',
    body: params
  });
  
  const text = await response.text();
  console.log(text);
}

test();
