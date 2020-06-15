const child = require('child_process');
const fp = child.fork('2.js');
setInterval(() => { console.log('1'); }, 3000);

let x = 0;
setInterval(() => { fp.send(`from 1 ${++x}`) }, 6000);