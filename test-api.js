const http = require('http');
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/content/types_of_hackers',
  method: 'GET'
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Status:', res.statusCode);
      console.log('Title:', json.topic.title);
      console.log('Sections count:', json.topic.sections ? json.topic.sections.length : 0);
      if (json.topic.sections && json.topic.sections.length > 0) {
        console.log('First section:', json.topic.sections[0].heading);
        console.log('Second section:', json.topic.sections[1].heading);
        console.log('Third section:', json.topic.sections[2].heading);
      }
    } catch (e) {
      console.log('Parse error:', e.message);
      console.log('Raw:', data.substring(0, 200));
    }
  });
});

req.on('error', err => console.log('Request error:', err.message));
req.end();
