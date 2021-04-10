import React from 'react'
import { SocketProvider } from './context/socketContext'
import MapPage from './pages/MapPage'

const MapApp = () => {
    return (
        <SocketProvider>
            <MapPage />
        </SocketProvider>
    )
}

export default MapApp
