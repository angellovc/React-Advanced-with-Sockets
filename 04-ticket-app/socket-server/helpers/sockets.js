const TicketList = require("../models/ticketList");


class Sockets {
    constructor(io) {
        this.io = io;
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            socket.emit('welcome-message', {msg: 'Welcome to the server', date: new Date()});
            console.log(`Connected client ${socket.id}`);
            
            // Events
            socket.on('request-ticket', (data, callback) => {
                const newTicket = this.ticketList.createTicket();
                callback(newTicket);
            });

            socket.on('assign-next-ticket', ({agent, desk}, callback) => {
                const ticket = this.ticketList.assignTicket(agent, desk);
                callback(ticket);

                this.io.emit('ticket-assigned', this.ticketList.lastAssignedTickets(13))

            });
        });
    }
}

module.exports = Sockets;