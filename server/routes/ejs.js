const express = require('express');
const path = require('path');
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

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
  if(!req.isAuthenticated()){
    return res.render('modal-auth', {error: req.flash('error'), user: req.user, userMessage: "Oops you're not logged in."});
  }
  res.render('modal-auth', {user: req.user, userMessage: 'Meow!'});
});

router.get('/modal-auth/secret', ensureLogIn('/ejs/modal-auth'), function(req, res){
  res.render('modal-auth', {user: req.user, userMessage: 'You found the secret!'});
});

router.get('/session-draw', function(req, res){

});

module.exports = router;
