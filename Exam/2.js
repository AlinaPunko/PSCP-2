const child = require('child_process');

setInterval(() => { console.log('2'); }, 6000);

process.on('message', (message) => { console.log(message) });