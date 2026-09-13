const http = require('http');
const server = http.createServer();
server.listen(5000, () => {
  console.log('HTTP listening on 5000');
});
process.on('exit', (code) => {
  console.log('Process exiting with code:', code);
});
