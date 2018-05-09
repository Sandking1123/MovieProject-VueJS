const express = require('express');
const routes = require('./routes.js');
const app = express();

app.use('/', routes);

app.listen(8080, () => console.log('app listening on port 8080 : http://localhost:8080'));