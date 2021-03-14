class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            socket.emit('welcome-message', {msg: 'Welcome to the server', date: new Date()});
            console.log(`Connected client ${socket.id}`);
            
            // Events
            socket.on('message-to-server', (data) => {
                console.log(data);
                this.io.emit('message-to-client', data)
            })
        });
    }
}

module.exports = Sockets;