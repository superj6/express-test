const express = require('express');
const path = require('path');

const shapes = require('../components/shapes.js');

const router = express.Router();


router.get('/socket-stamp/getShapes', function(req, res){
  shapes.getAllActiveShapes((err, rows) => {
    if(err){ res.send('error');}
    res.json(rows);
  });
});

module.exports = router;
