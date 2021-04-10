import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import {v4 as uuidV4} from 'uuid';
import { Subject } from 'rxjs';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXZjMTIzIiwiYSI6ImNrbjIwZGdxNzEzM3gybm1mZWg2ZjVhNnYifQ.boBQKHFUiu-nsDosXAdRJg';

const useMapbox = (initialValue) => {
    const initialPoint = useRef();
    initialPoint.current = useMemo(() => ({...initialValue}), [initialValue]);
    const map = useRef();
    const mapContainer = useRef();

    //observables rxjs
    const movementMarker = useRef( new Subject());
    const newMarker = useRef( new Subject());

    const [coords, setCoords] = useState(initialValue);
    const setMapReference = useCallback((node) => {
        mapContainer.current = node;
    }, []); 
    const markers = useRef({});

    const addMarker = useCallback((event, id) => {
        const {lng, lat} = event.lngLat || event;
        const marker = new mapboxgl.Marker();
        marker.id = id ?? uuidV4();
        marker.setLngLat([lng, lat]).addTo(map.current).setDraggable(true);
        markers.current[marker.id] = marker;

        if (!id) {
            newMarker.current.next({
                id: marker.id,
                lng,
                lat
            });
        }
        //listening marker movements
        marker.on('drag', ({target}) => {
            const {id} = target;
            const {lng, lat} = target.getLngLat();
            movementMarker.current.next({id, lng, lat})
        })
    }, []);

    // Update marker location function
    const updateMarkerLocation = useCallback(({id, lng, lat}) => {
        console.log(id, lng, lat);
        markers.current[id].setLngLat([lng, lat]);
    }, []);

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
        map.current.on('click', addMarker);
    }, [addMarker]);

    return {
        addMarker,
        updateMarkerLocation,
        coords,
        setMapReference,
        newMarker$: newMarker.current,
        movementMarker$: movementMarker.current
    }
}

export default useMapbox;