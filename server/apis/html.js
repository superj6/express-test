const express = require('express');
const path = require('path');

const socketServer = require('../socket-server');
const shapes = require('../components/shapes');

const router = express.Router();

router.get('/socket-stamp/getUserShapes', function(req, res){
  shapes.getUserShapes(req.query.userid, (err, rows) => {
    if(err){ res.send('error');}
    res.json(rows);
  });
});

router.get('/socket-stamp/getAllShapes', function(req, res){
  userids = ['0', ...socketServer.getActiveUserIds()];

  shapes.getUsersShapes(userids, (err, rows) => {
    if(err){ res.send('error');}
    res.json(rows);
  });
});

module.exports = router;
