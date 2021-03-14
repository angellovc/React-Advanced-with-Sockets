// Express server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
 

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        // Http server
        this.server = http.createServer(this.app);
        // Socket setup
        this.io = socketIo(this.server, {
            // Configurations
        });
    }

    middelwares() {
        // Deply public directory
        this.app.use(express.static( path.resolve(__dirname, "../public") ));

    }

    socketSetUp() {
        new Sockets(this.io);
    }

    execute() {
        // Initialize the middlewares
        this.middelwares();
        // Socket setup
        this.socketSetUp();
        // Initialize Server
        this.server.listen(this.port, () =>{
            console.log(`Server is running in port: ${this.port}`);
        });
    }
}

module.exports = Server;