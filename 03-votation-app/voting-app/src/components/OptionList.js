import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const OptionList = () => {
    const [options, setOptions] = useState([]);
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-options', (options) => {
            setOptions(options)
        })
        return () => socket.off('current-options');
    },[socket]);

    const onChangeName = (event, id) => {
        const newName = event.target.value;
 
        setOptions(options => options.map(
            option => {
                if (option.id === id)
                    option.name = newName;
                return option;
            }
        ));
    };

    const onSubmitName = (event, id, newName) => {
        event.preventDefault();
        socket.emit('change-name-option', {id, newName});
        console.log(id, newName);
    };

    const deleteOption = (id) => {
        socket.emit('delete-option', {id:id});
    };

    const vote = (id) => {
        socket.emit('vote-option', {id:id});
    };

    const createRows = () => {
        return (
            options.map(option => (
                <tr key={option.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => vote(option.id)}
                        
                        > +1 </button>
                    </td>
                    <td>
                        <form onSubmit={(event) => onSubmitName(event, option.id, option.name)}>
                            <input 
                                className="form-control"
                                value={option.name}
                                onChange={(event) => onChangeName(event, option.id)}
                            />
                        </form>
                    </td>
                    <td> <h3>{option.votes}</h3></td>
                    <td>
                        <button 
                            className="btn btn-danger"
                            onClick={(event) => deleteOption(option.id)}
                        >Delete</button>
                    </td>
                </tr>
            ))
        );
    }

    return (
        <>
            <h2>Current options</h2>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}

export default OptionList
