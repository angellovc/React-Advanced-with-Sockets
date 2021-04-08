import mapboxgl from 'mapbox-gl';
import {v4 as uuidV4} from 'uuid';

const createMarker = ({lng, lat}, mapReference) => {
    const marker = new mapboxgl.Marker();
    marker.id = uuidV4();
    marker.setLngLat([lng, lat]).addTo(mapReference).setDraggable(true);
    return marker;
}

export default createMarker;