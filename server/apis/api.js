const express = require('express');
const path = require('path');
const passport = require('../auth');

const router = express.Router();

router.post('/ejs/modal-auth/login', passport.authenticate('local', {
  successRedirect: '/ejs/modal-auth',
  failureRedirect: '/ejs/modal-auth/fail'
}));

module.exports = router;
