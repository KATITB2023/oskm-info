import { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Map, {
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  type ViewState
} from 'react-map-gl';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveMap = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: 107.610584,
    latitude: -6.891182,
    zoom: 16,
    pitch: 0,
    bearing: 0
  });

  return (
    <Map
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapLib={mapboxgl}
      mapStyle='mapbox://styles/mapbox/streets-v9'
      style={{
        width: '100vw',
        height: '100vh'
      }}
      onMove={(e) => setViewState(e.viewState)}
      {...viewState}
    >
      <NavigationControl />
      <ScaleControl />
      <GeolocateControl />
    </Map>
  );
};

export default InteractiveMap;
