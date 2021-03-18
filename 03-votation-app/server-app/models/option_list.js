const Option = require('./option');

class OptionList {

    constructor() {
        this.options = [
            new Option('Hooola'),
            new Option('Mundo'),
        ];
    }

    addOption(name) {
        const newOption = new Option(name);
        this.options.push(newOption);
        return this.options;
    }

    removeOption(id) {
        this.options = this.options.filter(option => option.id !== id);
    }

    getOptions() {
        return this.options;
    }

    icreaseVotes(id) {
        this.options = this.options.map(option => {
            if (option.id === id)
                option.votes += 1;
            return option;
        });
    }

    changeName(id, newName) {
        this.options = this.options.map(option => {
            if (option.id === id)
                option.name = newName;
            return option;
        });
    }

}


module.exports = OptionList;