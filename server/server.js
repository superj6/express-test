const express = require('express');
const path = require('path');

const routes = require('./routes/route');
const apis = require('./apis/api');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '../client');

app.set('views', path.join(clientPath, 'ejs/views'));
app.set('view engine', 'ejs');

app.use('/api', apis);
app.use(routes);
