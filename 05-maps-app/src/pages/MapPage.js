import React from 'react';
import useMapbox from '../hooks/useMapbox';

const MapPage = () => {

    const {coords, setMapReference} = useMapbox({
        lenght: 4,
        latitude: 34,
        zoom: 2
    });

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
