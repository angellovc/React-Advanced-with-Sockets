import React, { useEffect, useState } from 'react'

const OptionList = ({data}) => {
    const [options, setOptions] = useState(data);

    useEffect(() => {
        setOptions(data);
    },[data]);

    const createRows = () => {
        return (
            options.map(option => (
                <tr key={option.id}>
                    <td>
                        <button className="btn btn-primary"> +1 </button>
                    </td>
                    <td>
                        <input className="form-control" value={option.name}/>
                    </td>
                    <td> <h3>15</h3></td>
                    <td>
                        <button className="btn btn-danger">Delete</button>
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
