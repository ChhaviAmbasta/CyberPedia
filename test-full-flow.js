const http = require('http');

console.log('=== Test 1: Login via proxy ===');
const loginData = JSON.stringify({ username: 'demo', password: 'student' });
const loginOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};
const loginReq = http.request(loginOptions, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Login Status:', res.statusCode);
    console.log('Login Body:', body);
    
    console.log('\n=== Test 2: Get all topics via proxy ===');
    const topicsOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/content/',
      method: 'GET'
    };
    const topicsReq = http.request(topicsOptions, (res2) => {
      let body2 = '';
      res2.on('data', chunk => body2 += chunk);
      res2.on('end', () => {
        console.log('Topics Status:', res2.statusCode);
        console.log('Topics Body length:', body2.length);
        console.log('First 200 chars:', body2.substring(0,200));
      });
    });
    topicsReq.on('error', e => console.error('Topics Error:', e.message));
    topicsReq.end();
  });
});
loginReq.on('error', e => console.error('Login Error:', e.message));
loginReq.write(loginData);
loginReq.end();
