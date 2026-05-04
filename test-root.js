const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body length:', body.length, 'First 200 chars:', body.substring(0, 200)));
});

req.on('error', e => console.error('Error:', e.message));
req.end();
