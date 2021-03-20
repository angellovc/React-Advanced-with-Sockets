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

            socket.on('vote-option', ({id}) => {
                this.optionList.icreaseVotes(id);
                this.io.emit('current-options', this.optionList.getOptions());
            })

            socket.on('delete-option', ({id}) => {
                this.optionList.removeOption(id);
                this.io.emit('current-options', this.optionList.getOptions());
            });

            socket.on('change-name-option', ({id, newName}) => {
                this.optionList.changeName(id, newName);
                this.io.emit('current-options', this.optionList.getOptions());
            });

            socket.on('create-option', ({name}) => {
                this.optionList.addOption(name);
                this.io.emit('current-options', this.optionList.getOptions());
            });
        });
    }
}

module.exports = Sockets;