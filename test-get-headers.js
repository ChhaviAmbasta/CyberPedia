const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/content/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body length:', body.length));
});

req.on('error', e => console.error('Error:', e.message));
req.end();
