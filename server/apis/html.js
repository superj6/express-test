const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/socket-stamp/getShapes', function(req, res){
  res.send('hi');
});

module.exports = router;
