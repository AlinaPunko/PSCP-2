const express = require('express');
const fs = require('fs');
const app = express();

let wasmCode = fs.readFileSync('public/p.wasm');
let wasmImports = {};
let wasmModule = new WebAssembly.Module(wasmCode);
let wasmInstants = new WebAssembly.Instance(wasmModule, wasmImports);

app.get('/', (req, res, next) => {
    res.type('html').send(
        `sum(3,4) = ${wasmInstants.exports.sum(3, 4)} ` +
        `sub(3,4) = ${wasmInstants.exports.sub(3, 4)} ` +
        `mul(3,4) = ${wasmInstants.exports.mul(3, 4)} `
    )
});

app.listen(3000);