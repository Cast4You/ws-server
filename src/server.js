const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
   }
});

io.on('connection', (socket) => {
   socket.on('message', (msg, room) => {
      socket.to(room).emit('message', msg)
   })
   socket.on('join', (room) => {
      console.log("room", room, socket.id)
      socket.join(room)
   })
})


httpServer.listen(4000);
