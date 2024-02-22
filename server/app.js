const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);

const routes = require('./routes/route');
const apis = require('./apis/api');

const app = express();
const port = 8080;

app.listen(port);
console.log(`Server started at http://localhost:${port}`);

const clientPath = path.resolve(__dirname, '../client');

app.set('views', path.join(clientPath, 'ejs/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));

app.use('/api', apis);
app.use(routes);
