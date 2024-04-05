const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);
const flash = require('connect-flash');
const http = require('http');
require('dotenv').config();

const routes = require('./routes');
const api = require('./apis');
const socketServer = require('./socket-server');

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const sessionMiddleWare = session({
  secret: process.env.SESSION_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
});

const clientPath = path.resolve(__dirname, '../client');

app.set('views', path.join(clientPath, 'ejs/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleWare);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/api', api);
app.use(routes);

socketServer.init(server, sessionMiddleWare);

server.listen(port, () => {
  console.log(`Express-test app listening on port ${port}`)
});
