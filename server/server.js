const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '..', 'client');

app.use(express.static(path.join(clientPath, 'public')));

app.set('views', path.join(clientPath, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});
