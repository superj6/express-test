const express = require('express');
const path = require('path');

const socketServer = require('../socket-server');
const shapes = require('../components/shapes');

const router = express.Router();

router.get('/socket-stamp/getAllShapes', function(req, res){
  users = ['0', ...socketServer.getActiveSessions()];

  shapes.getUsersShapes(users, (err, rows) => {
    if(err){ res.send('error');}
    res.json(rows);
  });
});

module.exports = router;
