const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.SOCKET_PORT || 3001;

io.on("connection", (socket: any) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => console.log("user disconnected"));
  socket.on("join", (data: any) => {
    console.log("join", data);
    socket.join(data.userId);
    // socket.to(data.userId).emit("join", data);
  });
  socket.on("closUpdate", (data: any) => {
    console.log("closUpdate", data);

    socket.to(data.instructorId).emit("closUpdate", data.courseId);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket server listening on port ${PORT}`);
});

module.exports = io;
