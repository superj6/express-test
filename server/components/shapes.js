const db = require('../db');
const socketServer = require('../socket-server');

function getAllActiveShapes(cb){
  activeSessions = ['0', ...socketServer.getActiveSessions()]

  placeholder = new Array(activeSessions.length).fill('?').join(', ');

  db.all(`SELECT * FROM shapes WHERE sessionid IN (${placeholder})`, [...activeSessions], cb); 
}

function getUserShapes(sessionId, cb){
  db.all('Select * FROM shapes where sessionid in ?', [sessionId], cb);
}

module.exports = {
  getAllActiveShapes,
  getUserShapes
}
