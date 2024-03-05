const socketIo = require('socket.io');
const randomColor = require('randomcolor');
const crypto = require('crypto');

const shapes = require('./components/shapes');

let io;
let activeUsers = new Map();

const sessionToRoom = (session) => {
  return `session ${session.id}`;
};

const getActiveSessions = () => {
  rooms = io.sockets.adapter.rooms;

  let activeSessions = [];
  rooms.forEach((_, room) => {
    s = room.split(' ');
    if(s[0] === 'session'){
      activeSessions.push(s[1]);
    }
  });
  return activeSessions;
};

const sessionActive = (session) => {
  return io.sockets.adapter.rooms.has(sessionToRoom(session));
};

const getActiveUsers = () => {
  return Array.from(activeUsers.values());
}

const getActiveUserIds = () => {
  return getActiveUsers().map((user) => user.id);
};

const init = (server, sessionMiddleWare) => {
  io = socketIo(server);

  io.engine.use(sessionMiddleWare);

  io.use((socket, next) => {
    const req = socket.request;

    if(!req.session.stampuser){
      req.session.stampuser = {
        id: crypto.randomBytes(10).toString('hex'),
	name: crypto.randomBytes(5).toString('hex'),
	color: randomColor()
      };
      req.session.save();
    }
    next();
  });

  io.on("connection", (socket) => {
    const req = socket.request; 

    if(!sessionActive(req.session)){
      activeUsers.set(req.session.id, req.session.stampuser);
      socket.broadcast.emit('user joined', req.session.stampuser);
    }

    socket.join(sessionToRoom(req.session));
    socket.emit('init', req.session.stampuser, getActiveUsers());

    console.log(`sessionId: ${req.session.id}`);

    socket.on('add shape', (shape) => {
      shape.userid = req.session.stampuser.id;
      shape.color = req.session.stampuser.color;
       
      shapes.addShape(shape, (err) => {
        if(err){ return;}
	io.emit('shape added', shape);
      }); 
    });

    socket.on('disconnect', () => {
      if(!sessionActive(req.session)){
	activeUsers.delete(req.session.id);
        socket.broadcast.emit('user left', req.session.stampuser.id);
      }
    });
  });
};

module.exports = {
  init,
  getActiveUserIds,
  getIo: () => io
};
