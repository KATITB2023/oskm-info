import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import Map, {
  type ViewState,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
  useMap
} from 'react-map-gl';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveButton = () => {
  const { current: map } = useMap();

  return (
    <Button
      onClick={() => {
        map?.flyTo({
          center: [107.610584, -6.891182],
          zoom: 16,
          pitch: 0,
          bearing: 0
        });
      }}
    >
      Home
    </Button>
  );
};

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
      <FullscreenControl />
      <NavigationControl />
      <ScaleControl />
      <GeolocateControl />
      <InteractiveButton />
    </Map>
  );
};

export default InteractiveMap;
