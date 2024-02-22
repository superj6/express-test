const express = require('express');
const path = require('path');

const passport = require('../auth');

const router = express.Router();

const clientPath = path.resolve(__dirname, '../../client/ejs');
const viewPath = path.join(clientPath, 'views');

router.use('/static', express.static(path.join(clientPath, 'static')));

router.get('/', function(req, res){
  res.render('index');
});

router.get('/test', function(req, res){
  res.render('test/index');
});

router.get('/modal-auth', function(req, res){
  res.render('modal-auth');
});

module.exports = router;
