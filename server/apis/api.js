const express = require('express');
const path = require('path');
const passport = require('../auth');

const router = express.Router();

router.post('/ejs/modal-auth/login', passport.authenticate('local', {
  successRedirect: '/ejs/modal-auth',
  failureRedirect: '/ejs/modal-auth/fail'
}));

router.post('/ejs/modal-auth/logout', function(req, res, next){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect('/ejs/modal-auth');
  });
});

module.exports = router;
