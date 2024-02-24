const express = require('express');
const path = require('path');

const router = express.Router();

const clientPath = path.resolve(__dirname, '../../client/html');
const viewPath = path.join(clientPath, 'views');

router.use('/static', express.static(path.join(clientPath, 'static')));

router.get('/', function(req, res){
  res.sendFile(path.join(viewPath, 'index.html'));
});

router.get('/template-home-1', function(req, res){
  res.sendFile(path.join(viewPath, 'template-home-1.html'));
});

router.get('/socket-stamp', function(req, res){
  res.sendFile(path.join(viewPath, 'socket-stamp.html'));
});

module.exports = router;

