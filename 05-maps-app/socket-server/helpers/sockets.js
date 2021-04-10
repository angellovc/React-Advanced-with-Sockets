const Markers = require('../models/markers');


class Sockets {
    constructor(io) {
        this.io = io;
        this.markers = new Markers();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log('conected');
            
            socket.emit('active-markers', this.markers.actives);

            socket.on('new-marker', (marker) => {
                this.markers.addMarker(marker);
                socket.broadcast.emit('new-marker', marker);
            });

            socket.on('update-marker', (marker) => {
                this.markers.updateMarker(marker);;
                socket.broadcast.emit('update-marker', marker);
            });
            
        });
    }
}

module.exports = Sockets;