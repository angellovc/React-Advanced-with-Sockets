import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const OptionAdd = () => {

    const [name, setName] = useState("");
    const {socket} = useContext(SocketContext);

    const createOption = (name) => {
        socket.emit('create-option', {name:name})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (name.trim().length > 0) {
            createOption(name);
        }
        setName("");
    };

    return (
        <>
            <h3>Add new option</h3>
            <form onSubmit={(event) => onSubmit(event)} >
                <input
                    className="form-control"
                    placeholder="New option name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                >
                </input>
            </form>
        </>
    );
}

export default OptionAdd;