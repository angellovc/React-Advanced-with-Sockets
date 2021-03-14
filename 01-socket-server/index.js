// Express server
const express = require('express');

const app = express();

// Socket server
const server = require('http').createServer(app);

// Socket setup
const io = require('socket.io')(server);

// Deply public directory
app.use(express.static(__dirname+"/public"))

io.on('connection', (socket) => {
    socket.emit('welcome-message', {msg: 'Welcome to the server', date: new Date()});
    console.log(`Connected client ${socket.id}`);

    socket.on('message-to-server', (data) => {
        console.log(data);
        io.emit('message-to-client', data)
    })
});


server.listen(8080, () => {
    console.log(`Server running in port: 8080`)
});
