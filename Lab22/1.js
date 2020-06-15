let app = require('express')();
let https = require('https');
let fs = require('fs');

let options = {
    key: fs.readFileSync('LAB.key').toString(),
    cert: fs.readFileSync('LAB.crt').toString()
}

https.createServer(options, app).listen(3443);

app.get('/', (req, res, next) => {
    res.end('hello from https');
})