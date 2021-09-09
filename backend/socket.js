let io;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      cors: {
        origin: "https://newtokenscanner.com",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling", "flashsocket"],
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
