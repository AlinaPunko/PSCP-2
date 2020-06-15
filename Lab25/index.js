const JsonRPCServer = require('jsonrpc-server-http-nats');

const server = new JsonRPCServer();

let bin_validator = (param) => {
    if (!Array.isArray(param))
        throw new Error('Ожидается массив');
    if (param.length < 2)
        throw new Error('Ожидалось как минимум 2 элемента')
    if (param.some((p => !isFinite(p))))
        throw new Error('Ожидался массив чисел');
    return param;
}

server.on('sum', bin_validator, (params, channel, response) => {
    let sum = 0;
    params.forEach(element => {
        sum += element;
    });
    response(null, sum);
});
server.on('mul', bin_validator, (params, channel, response) => {
    let mul = 1;
    params.forEach(element => {
        mul *= element;
    });
    response(null, mul);
});
server.on('div', bin_validator, (params, channel, response) => {
    response(null, params[0] / params[1]);
});
server.on('proc', bin_validator, (params, channel, response) => {
    response(null, (params[0] / params[1]) * 100);
})

server.listenHttp({ host: '127.0.0.1', port: 3000 });