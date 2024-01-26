const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '..', 'client');

//serve pages

app.get('/', function(req, res){
  res.send('This is my express test page. Look at different rendered pages in /html, /ejs, and /react.');
});

//serve pages html

const clientHtmlPath = path.resolve(clientPath, 'html')

app.use('/html/static', express.static(path.join(clientHtmlPath, 'public')))

app.get('/html/', function(req, res){
  
});

//serve pages with ejs

const clientEjsPath = path.resolve(clientPath, 'ejs');

app.use('/ejs/static', express.static(path.join(clientEjsPath, 'public')));

app.set('views', path.join(clientEjsPath, 'views'));
app.set('view engine', 'ejs');

app.get('/ejs/', function(req, res){
  res.render('index');
});

app.get('/ejs/test/', function(req, res){
  res.render(path.join('test', 'index'));
});

//serve pages with react router


