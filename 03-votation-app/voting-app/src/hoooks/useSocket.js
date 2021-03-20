import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (endPoint) => {
    const socket = useMemo(() => io.connect(endPoint, {
        transports: ["websocket"]
    }), [endPoint]); 

    const [online, setOnline] = useState(false);

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



    return {socket, online};
}

export default useSocket;
