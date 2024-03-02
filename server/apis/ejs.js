const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const auth = require('../components/auth');

const router = express.Router();

passport.use(new LocalStrategy(auth.verify));

router.post('/modal-auth/login', passport.authenticate('local', {
  successReturnToOrRedirect: '/ejs/modal-auth',
  failureRedirect: '/ejs/modal-auth',
  failureFlash: true,
  keepSessionInfo: true
}));

router.post('/modal-auth/logout', function(req, res, next){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect('/ejs/modal-auth');
  });
});

router.post('/modal-auth/register', function(req, res, next){

  auth.addUser(req.body.username, req.body.password, function(err){
    console.log(err);
    if (err){
      req.flash('error', err.message);
      return res.redirect('/ejs/modal-auth'); 
    }
    var user = {
      id: this.lastID,
      username: req.body.username
    };
    req.login(user, function(err) {
      if (err) { req.flash('error', err.message); }
      res.redirect('/ejs/modal-auth');
    }); 
  });
});

module.exports = router;
