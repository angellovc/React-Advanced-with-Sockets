import React from 'react';
import HomePage from './HomePage';
import { SocketProvider } from './context/SocketContext';

const VoteApp = () => {
    return (
        <SocketProvider>
            <HomePage />
        </SocketProvider>
    )
}
export default VoteApp
