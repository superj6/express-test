const express = require('express');
const path = require('path');

const routesHtml = require('./html');
const routesEjs = require('./ejs');
const routesReact = require('./react');

const router = express.Router();

router.get('/', function(req, res){
  res.send('This is my express test page. Look at different rendered pages in /html, /ejs, and /react.');
});

router.use('/html', routesHtml);
router.use('/ejs', routesEjs);
router.use('/react', routesReact);

module.exports = router;
