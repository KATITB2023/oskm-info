import DeckGL from '@deck.gl/react/typed';
import { LineLayer } from '@deck.gl/layers/typed';
import mapboxgl from 'mapbox-gl';
import Map, {
  NavigationControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 107.610584,
  latitude: -6.891182,
  zoom: 16,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781]
  }
];

const InteractiveMap = () => {
  const layers = [new LineLayer({ id: 'line-layer', data })];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      width={'100vw'}
      height={'100vh'}
    >
      <Map
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapLib={mapboxgl}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <NavigationControl />
        <ScaleControl />
        <GeolocateControl />
      </Map>
    </DeckGL>
  );
};

export default InteractiveMap;
