const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

mkdirp.sync('./var/db');
const db = new sqlite3.Database('./var/db/todos.db');

db.serialize(function(){
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB \
  )");

  const salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'kek',
    crypto.pbkdf2Sync('uwu', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db;
