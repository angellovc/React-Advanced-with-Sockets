const Ticket = require('./ticket');

class TicketList {
    constructor() {
        this.lastNumber = 0;
        this.standby = [];
        this.assigned = [];
    }

    get nextNumber() {
       return ++this.lastNumber;
    }
    
    lastAssignedTickets(number) {
        return this.assigned.slice(0, number);
    }

    createTicket() {
        const newTicket = new Ticket(this.nextNumber);
        this.standby.push(newTicket);
        return newTicket;
    }

    assignTicket(agent, desk) {
        if (this.standby.length === 0)
            return null;
        
        // remove and return the first ticket in the queue
        const ticketToAssign = this.standby.shift();
        ticketToAssign.agent = agent;
        ticketToAssign.desk = desk;
        // insert the ticket in the first place of the queue
        this.assigned.unshift(ticketToAssign);
        return ticketToAssign;
    }
}

module.exports = TicketList;
