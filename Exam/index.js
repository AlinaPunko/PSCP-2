const express = require('express');
const bodyparser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const xmlbuider = require('xmlbuilder');
const multer = require('multer');
const cookieparser = require('cookie-parser');
const fs = require('fs');
const { request } = require('express');
const { exec } = require('child_process');

const cookieSecret = '1234567890';

const app = express();
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: cookieSecret
});
app.use(session);

app.use((request, response, next) => {
    console.log('middleware');
    next();
})

// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(express.json());
app.use(cookieparser(cookieSecret));
app.use(xmlparser());

app.get('/get', (request, response) => {
    console.log('/get');
    response.send('/get')
});

app.get('/:parm1/:parm2', (request, response) => {
    console.log('/get with uri parms');
    response.send(request.params.parm1 + ' ' + request.params.parm2)
});

app.get('/getquery', (request, response) => {
    console.log('/get with query parms');
    response.send(request.query.parm1 + ' ' + request.query.parm2)
});

app.post('/form', (request, response) => {
    console.log('/post body form');
    response.send(request.body.name + ' ' + request.body.surname)
});

app.post('/json', (request, response) => {
    console.log('/post body json');
    console.log(request.body);
    response.send(JSON.stringify(request.body))
});

app.post('/xml', (request, response) => {
    console.log('/post body xml');
    const x = request.body.body.x;
    const y = request.body.body.y;

    const result = xmlbuider.create('result');
    result.ele('sum', { value: x + y });
    response.send(result.toString({ pretty: true }));
});

app.get('/download', (request, response) => {
    console.log('download');
    response.download('./test.jpg', 'test.jpg');
});

app.get('/attachment', (request, response) => {
    console.log('attachment');
    response.attachment('./test.jpg');
    const rs = fs.ReadStream('./test.jpg');
    rs.pipe(response);
});

const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), (request, response) => {
    console.log('upload');
    response.type('txt').send(request.file.originalname);
});

app.get('/cookie', (request, response) => {
    let id = request.signedCookies.id;
    if (isFinite(id)) ++id;
    else id = 0;
    console.log(id);
    response.cookie('id', id, { signed: true }).send(id.toString());
})

app.get('/session', (request, response) => {
    let id = request.session.mysesval;
    if (isFinite(request.session.mysesval)) ++request.session.mysesval;
    else request.session.mysesval = 0;
    console.log(request.session.mysesval);
    response.send(request.session.mysesval.toString());
})

app.listen(3000);

// const spawn = require('child_process').spawn;
// const dir = spawn('cmd.exe', ['/U', '/C', 'dir']);
// const findstr = spawn('findstr');

// dir.stdout.setEncoding('utf16le');
// dir.stdout.pipe(findstr.stdin);
// dir.stdout.on('data', (data) => {
//     console.log(data.toString());
// })
// dir.on('close', (code) => {
//     console.log(code);
// })

const execfile = require('child_process').execFile;
const conapp = execfile('ConsoleApplication1', { cwd: 'D:\\лабы\\ПСКП 6 семестр\\Exam\\' },
    (err, stdout, stderr) => {
        if (stderr) console.log(stderr);
        else console.log(stdout);
    });
conapp.stdin.write('test');
conapp.stdin.end();