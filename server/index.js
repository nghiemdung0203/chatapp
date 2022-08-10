const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on('join', (data) => {
        socket.join(data.Room);
        console.log(data);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
    }
    );

    socket.on("sendMessage", (data) => {
        console.log(data);
        socket.to(data.Room).emit('receiveMessage', data);
    })
});

server.listen(3001, () => {
    console.log('listening on port 3001');
});


