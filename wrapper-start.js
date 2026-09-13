const { spawn } = require('child_process');
const server = spawn('node', ['index.js']);
server.stdout.on('data', data => process.stdout.write(`STDOUT: ${data}`));
server.stderr.on('data', data => process.stdout.write(`STDERR: ${data}`));
server.on('close', code => console.log(`Child process exited with code ${code}`));
