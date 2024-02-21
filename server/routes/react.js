const express = require('express');
const path = require('path');

const router = express.Router();

const clientPath = path.resolve(__dirname, '../../client/react');
const distPath = path.join(clientPath, 'dist');

router.use('/dist', express.static(distPath));
router.use('/static', express.static(path.join(clientPath, 'src', 'static')));

router.get('/*', function(req, res){
  res.sendFile(path.join(distPath, 'index.html'));
});

module.exports = router;

