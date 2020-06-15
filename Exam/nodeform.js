const http = require('http');

const server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        let result = '';
        request.on('data', (data) => { result += data });
        request.on('end', () => {
            console.log(request.body);
            response.end('111');
        })
    }
}).listen(3000);