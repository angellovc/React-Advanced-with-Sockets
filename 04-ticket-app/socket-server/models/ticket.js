const {v4: uuid4} = require('uuid');

class Ticket {

    constructor(number) {
        this.id = uuid4();
        this.number = number;
        this.desk = null;
        this.agent = null;
        
    }

}

module.exports = Ticket;