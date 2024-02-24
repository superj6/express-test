const socketServer = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log(`socket connected ${socket.id}`);
  });
};

module.exports = socketServer;
