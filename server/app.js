const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);
const flash = require('connect-flash');

const routes = require('./routes/route');
const apis = require('./api');

const app = express();
const port = 8080;

const clientPath = path.resolve(__dirname, '../client');

app.set('views', path.join(clientPath, 'ejs/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api', apis);
app.use(routes);

app.listen(port, () => {
  console.log(`Express-test app listening on port ${port}`)
});
