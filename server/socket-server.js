const socketIo = require('socket.io');
const randomColor = require('randomcolor');

const shapes = require('./components/shapes');

let io;

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

const init = (server, sessionMiddleWare) => {
  io = socketIo(server);

  io.engine.use(sessionMiddleWare);

  io.on("connection", (socket) => {
    const session = socket.request.session;
   
    if(!session.color){
      session.color = randomColor();
    }

    if(!sessionActive(session.id)){
      socket.broadcast.emit('user joined', session.id);
    }

    socket.join(sessionToRoom(session));
    socket.emit('init', getActiveSessions());

    console.log(`sessionId: ${session.id}`);

    socket.on('add shape', (shape) => {
      shape.sessionid = session.id;
      shape.color = session.color;
        
      shapes.addShape(shape, (err) => {
        if(err){ return;}	
	io.emit('shape added', shape);
      }); 
    });

    socket.on('disconnect', () => {
      if(!sessionActive(session.id)){
        socket.broadcast.emit('user left', session.id);
      }
    });
  });
};

module.exports = {
  init,
  getActiveSessions,
  getIo: () => io
};
