const express = require('express');
const app = express();

app.use((req, res, next) => { console.log('2'); next(); });
app.use('/', express.static('public'));

app.listen(3000);