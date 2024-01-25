const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '..', 'client');

app.get('/', function(req, res){
  res.sendFile(path.join(clientPath, 'index.html'));
});
