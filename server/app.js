const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);
const flash = require('connect-flash');
const http = require('http');
require('dotenv').config();

const routes = require('./routes/route');
const api = require('./api');
const socketServer = require('./socket-server');

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

const clientPath = path.resolve(__dirname, '../client');

app.set('views', path.join(clientPath, 'ejs/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api', api);
app.use(routes);

socketServer(server);

server.listen(port, () => {
  console.log(`Express-test app listening on port ${port}`)
});
