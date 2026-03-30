const apiKey = '104aa75459b1cda29f342be919769bac';
const params = new URLSearchParams();
params.append('key', apiKey);
params.append('action', 'balance');

fetch('https://nstechfollows.com/api/v2', {
  method: 'POST',
  body: params
}).then(res => res.json()).then(console.log).catch(console.error);
