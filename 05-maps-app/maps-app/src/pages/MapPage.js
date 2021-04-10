import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socketContext';
import useMapbox from '../hooks/useMapbox';

const MapPage = () => {

    const {coords, setMapReference, addMarker, updateMarkerLocation, newMarker$, movementMarker$} = useMapbox({
        lenght: 4,
        latitude: 34,
        zoom: 2
    });
    const {socket} = useContext(SocketContext);


    // Active markers
    useEffect(() => {
        socket.on('active-markers', (markers) => {
            Object.keys(markers).forEach(id => addMarker(markers[id], id));
        });
    }, [socket, addMarker]);

    // New marker
    useEffect(() => {
        newMarker$.subscribe(marker => {
            socket.emit('new-marker', marker);
        });
    }, [newMarker$, socket]);

    // Marker movement
    useEffect(() => {
        movementMarker$.subscribe(marker => {
            socket.emit('update-marker', marker);
        });
    }, [movementMarker$, socket]);

    useEffect(() => {
        socket.on('update-marker', (marker) => {
            updateMarkerLocation(marker);
        });
    }, [socket, updateMarkerLocation]);

    // Listen markers
    useEffect(() => {
        socket.on('new-marker', (marker) => {
            addMarker(marker, marker.id);
        });
    }, [socket, addMarker]);

    return (
        <>
            <div className="infoContainer">
                Lenght: {coords.lenght} | Latitude: {coords.latitude} | zoom: {coords.zoom}
            </div>
            <div
                className="mapContainer"
                ref={setMapReference}
            >
            </div>
        </>
    )
}

export default MapPage
