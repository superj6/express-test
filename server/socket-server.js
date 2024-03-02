const socketIo = require('socket.io');

let io;

const sessionToRoom = (sessionId) => {
  return `session ${sessionId}`;
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

const sessionActive = (sessionId) => {
  return io.sockets.adapter.rooms.has(sessionToRoom(sessionId));
};

const init = (server, sessionMiddleWare) => {
  io = socketIo(server);

  io.engine.use(sessionMiddleWare);

  io.on("connection", (socket) => {
    const sessionId = socket.request.session.id;

    if(!sessionActive(sessionId)){
      socket.broadcast.emit('user join', {user: sessionId});
    }

    socket.join(sessionToRoom(sessionId));

    console.log(`SessionId: ${sessionId}`);

    socket.join(sessionToRoom(sessionId));

    console.log(getActiveSessions());

    socket.emit('init', {users: getActiveSessions()});

    socket.on('disconnect', () => {
      console.log(getActiveSessions());

      if(!sessionActive(sessionId)){
        socket.broadcast.emit('user leave', {user: sessionId});
      }
    });
  });
};

module.exports = {
  init,
  getActiveSessions,
  getIo: () => io
};
