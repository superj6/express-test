const express = require('express');
const path = require('path');

const apiHtml = require('./html');
const apiEjs = require('./ejs');

const router = express.Router();

router.use('/html', apiHtml);
router.use('/ejs', apiEjs);

module.exports = router;
