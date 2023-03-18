
const express = require("express");
const http = require('http');
const server = http.createServer().listen(3501)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
//test
const app = express();

app.get("/",(req,res)=>{
    res.json("data test")
})

io.on('connection', (socket) => {
  console.log('Client connected');
  const numClients = io.engine.clientsCount;
    console.log(`Number of connected clients: ${numClients}`);
    socket.emit("data",numClients)
    socket.on('message', (data) => {
    socket.emit('message', `${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.listen(3002, () => {
  console.log(`Server listening on port number 3002`);
});