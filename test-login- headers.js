const http = require('http');

const data = JSON.stringify({ username: 'demo', password: 'student' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:');
  for (const [key, value] of Object.entries(res.headers)) {
    console.log(`  ${key}: ${value}`);
  }
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Body:', body));
});

req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();
