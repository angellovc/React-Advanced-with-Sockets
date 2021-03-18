import { useState, useEffect } from "react";
import io from 'socket.io-client';
import OptionAdd from "./components/OptionAdd";
import OptionList from "./components/OptionList";


const connectSocketServer = () => {
    const socket = io.connect("localhost:8080", {
        transports: ["websocket"]
    });
    return socket;
}

function App() {

    const [socket] = useState(connectSocketServer());
    const [online, setOnline] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOnline(socket.connected)
    }, [socket]);

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false);
        });
    }, [socket]);

    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false);
        });
    }, [socket]);


    useEffect(() => {
        socket.on('current-options', (data) => {
            setOptions(data);
        });
    }, [socket]);

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {
                        online 
                        ? <span className="text-success"> Online </span> 
                        : <span className="text-danger"> Offline </span>
                    }
                </p>
            </div>
            <h1>Options</h1>
            <hr/>
        <div className="row">
            <div className="col-8">
                <OptionList 
                    data={options}
                />
            </div>
            <div className="col-4">
                <OptionAdd/>
            </div>
          </div>
        </div>
    );
}

export default App;
