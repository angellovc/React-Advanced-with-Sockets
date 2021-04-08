import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import createMarker from '../helpers/createMapboxMarker';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZjMTIzIiwiYSI6ImNrbjIwZGdxNzEzM3gybm1mZWg2ZjVhNnYifQ.boBQKHFUiu-nsDosXAdRJg';

const useMapbox = (initialValue) => {
    const initialPoint = useRef();
    initialPoint.current = useMemo(() => ({...initialValue}), [initialValue]);
    const map = useRef();
    const mapContainer = useRef();
    const [coords, setCoords] = useState(initialValue);
    const setMapReference = useCallback((node) => {
        mapContainer.current = node;
    }, []); 
    const markers = useRef({});

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [initialPoint.current.lenght, initialPoint.current.latitude],
            zoom: initialPoint.current.zoom
        });
    },[]);

    // Map moving
    useEffect(() => {
        map.current?.on('move', () => {
            const {lng, lat} = map.current.getCenter();
            setCoords({
                lenght: lng.toFixed(4),
                latitude: lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(2),
            })
        })
        return map.current?.off('move');
    }, [])

    // add marks
    useEffect(() => {
        map.current.on('click', (event) => {
            const marker = createMarker(event.lngLat, map.current);
            markers.current[marker.id] = marker;
        });
    }, []);

    return {
        coords,
        setMapReference
    }
}

export default useMapbox;