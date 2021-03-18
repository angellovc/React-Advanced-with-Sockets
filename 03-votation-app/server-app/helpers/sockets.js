const OptionList = require('../models/option_list');

class Sockets {
    constructor(io) {
        this.io = io;
        this.optionList = new OptionList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            console.log(`Connected client ${socket.id}`);
            
            // Events
            socket.emit('current-options', this.optionList.getOptions());

        });
    }
}

module.exports = Sockets;