const db = require('../db');

function getUserShapes(userid, cb){
  db.all(`SELECT userid,type,coordx,coordy,color,content FROM shapes WHERE userid = ?`, [userid], cb); 
}

function getUsersShapes(userids, cb){
  placeholder = new Array(userids.length).fill('?').join(', ');

  db.all(`SELECT userid,type,coordx,coordy,color,content FROM shapes WHERE userid IN (${placeholder})`, [...userids], cb); 
}

function addShape(shape, cb){
  db.run('INSERT INTO shapes (userid, type, coordx, coordy, color, content) VALUES (?, ?, ?, ?, ?, ?)', [
    shape.userid,
    shape.type,
    shape.coordx,
    shape.coordy,
    shape.color,
    shape.content
  ], cb);
}

module.exports = {
  getUserShapes,
  getUsersShapes,
  addShape
}
