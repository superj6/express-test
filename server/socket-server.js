const socketIo = require('socket.io');

const shapes = require('./components/shapes');

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
      socket.broadcast.emit('user joined', sessionId);
    }

    socket.join(sessionToRoom(sessionId));
    socket.emit('init', getActiveSessions());

    console.log(`sessionId: ${sessionId}`);

    socket.on('add shape', (shape) => {
      shape.sessionid = sessionId;
      shape.color = 'red';
        
      shapes.addShape(shape, (err) => {
        if(err){ return;}	
	io.emit('shape added', shape);
      }); 
    });

    socket.on('disconnect', () => {
      if(!sessionActive(sessionId)){
        socket.broadcast.emit('user left', sessionId);
      }
    });
  });
};

module.exports = {
  init,
  getActiveSessions,
  getIo: () => io
};
