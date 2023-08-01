import { useState } from 'react';
import { Image } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import Map, {
  type ViewState,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
  useMap,
  Marker
} from 'react-map-gl';
import { type MapLocation, type MapPhoto } from '@prisma/client';
import { api } from '~/utils/api';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveMarker = ({
  location
}: {
  location: MapLocation & {
    MapPhoto: MapPhoto[];
  };
}) => {
  const { current: map } = useMap();

  return (
    <Marker
      key={location.id}
      longitude={location.baseLongitude.toNumber()}
      latitude={location.baseLatitude.toNumber()}
      onClick={() => {
        map?.flyTo({
          center: [
            location.baseLongitude.toNumber(),
            location.baseLatitude.toNumber()
          ],
          zoom: 18,
          essential: true
        });
      }}
    >
      <Image
        src='/images/spark3.png'
        alt='marker'
        w='125px'
        draggable='false'
        loading='lazy'
      />
    </Marker>
  );
};

const InteractiveMap = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: 107.610584,
    latitude: -6.891182,
    zoom: 18,
    pitch: 0,
    bearing: 0
  });

  const getInteractiveMapQuery = api.interactiveMap.getInteractiveMap.useQuery({
    campus: 'Ganesha'
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
      {getInteractiveMapQuery.data &&
        getInteractiveMapQuery.data.map((location) => (
          <InteractiveMarker key={location.id} location={location} />
        ))}
    </Map>
  );
};

export default InteractiveMap;
