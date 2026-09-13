const http = require('http');
const fs = require('fs');

const data = JSON.stringify({ email: 'admin@example.com', password: 'password123' });

const req = http.request({
  hostname: 'localhost', port: 5000, path: '/api/auth/login', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': data.length }
}, (res) => {
  let chunks = '';
  res.on('data', d => chunks += d);
  res.on('end', () => fs.writeFileSync('response.html', chunks));
});

req.write(data);
req.end();
