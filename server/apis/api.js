const express = require('express');
const path = require('path');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const auth = require('../auth');

const router = express.Router();

passport.use(new LocalStrategy(auth.verify));

router.post('/ejs/modal-auth/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/ejs/modal-auth',
  failureRedirect: '/ejs/modal-auth/fail',
  failureFlash: true,
  keepSessionInfo: true
}));

router.post('/ejs/modal-auth/logout', function(req, res, next){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect('/ejs/modal-auth');
  });
});

router.post('/ejs/modal-auth/register', function(req, res, next){
  auth.addUser(req.body.username, req.body.password, function(err){
    if (err) { return next(err); }
    var user = {
      id: this.lastID,
      username: req.body.username
    };
    req.login(user, function(err) {
      if (err) { return next(err); }
      res.redirect('/ejs/modal-auth');
    }); 
  });
});

module.exports = router;
