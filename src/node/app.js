const express = require('express');
const routes = require('./routes.js');
const app = express();

app.use('/', routes);

app.listen(8000, () => console.log('app listening on port 8000'));