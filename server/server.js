const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '..', 'client');
const clientEjsPath = path.resolve(clientPath, 'ejs');

app.use(express.static(path.join(clientEjsPath, 'public')));

app.set('views', path.join(clientEjsPath, 'views'));
app.set('view engine', 'ejs');

app.get('/ejs/', function(req, res){
  res.render('index');
});

app.get('/ejs/test/', function(req, res){
  res.render(path.join('test', 'index'));
});
