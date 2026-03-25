async function test() {
  const apiKey = 'a943a437571dc1256018f010bb4d8ab5';
  const apiUrl = `https://nstechfollows.com/api/v2?key=${apiKey}&action=add&service=1&link=${encodeURIComponent('https://example.com')}&quantity=10`;

  try {
    const res = await fetch(apiUrl);
    const text = await res.text();
    console.log('GET Status:', res.status);
    console.log('GET Response:', text);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
