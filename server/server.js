const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '..', 'client');

//serve pages text

app.get('/', function(req, res){
  res.send('This is my express test page. Look at different rendered pages in /html, /ejs, and /react.');
});

//serve pages html

const clientHtmlPath = path.join(clientPath, 'html')
const htmlViewPath = path.join(clientHtmlPath, 'views')

app.use('/html/static/', express.static(path.join(clientHtmlPath, 'static')))

app.get('/html/', function(req, res){
  res.sendFile(path.join(htmlViewPath, 'index.html'));
});

//serve pages with ejs

const clientEjsPath = path.join(clientPath, 'ejs');

app.use('/ejs/static/', express.static(path.join(clientEjsPath, 'static')));

app.set('views', path.join(clientEjsPath, 'views'));
app.set('view engine', 'ejs');

app.get('/ejs/', function(req, res){
  res.render('index');
});

app.get('/ejs/test/', function(req, res){
  res.render('test/index');
});

//serve pages with react router

const clientReactPath = path.join(clientPath, 'react');
const reactDistPath = path.join(clientReactPath, 'dist');

app.use('/react/dist/', express.static(reactDistPath));
app.use('/react/static/', express.static(path.join(clientReactPath, 'src', 'static')));

app.get('/react/*', function(req, res){
  res.sendFile(path.join(reactDistPath, 'index.html'));
});
