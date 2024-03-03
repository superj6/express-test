const db = require('../db');

function getUsersShapes(users, cb){
  placeholder = new Array(users.length).fill('?').join(', ');

  db.all(`SELECT * FROM shapes WHERE sessionid IN (${placeholder})`, [...users], cb); 
}

function addShape(shape, cb){
  db.run('INSERT INTO shapes (sessionid, type, coordx, coordy, color, content) VALUES (?, ?, ?, ?, ?, ?)', [
    shape.sessionid,
    shape.type,
    shape.coordx,
    shape.coordy,
    shape.color,
    shape.content
  ], cb);
}

module.exports = {
  getUsersShapes,
  addShape
}
