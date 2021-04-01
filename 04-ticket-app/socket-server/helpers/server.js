// Express server
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

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
        // Initialize sockets
        this.sockets = new Sockets(this.io);
    }

    middelwares() {
        // Deply public directory
        this.app.use(express.static( path.resolve(__dirname, "../public") ));
        // Cors
        this.app.use(cors());

        this.app.get('/lastest', (request, response) => {
            response.json({
                ok: true,
                lastest: this.sockets.ticketList.lastAssignedTickets(13)
            });
        });
    }


    execute() {
        // Initialize the middlewares
        this.middelwares();
        // Initialize Server
        this.server.listen(this.port, () =>{
            console.log(`Server is running in port: ${this.port}`);
        });
    }
}

module.exports = Server;