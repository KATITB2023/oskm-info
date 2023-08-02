import { type Dispatch, useState, type SetStateAction, useEffect } from 'react';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
import {
  Map,
  type ViewState,
  NavigationControl,
  ScaleControl,
  GeolocateControl,
  FullscreenControl,
  useMap,
  Marker,
  Layer,
  type FillExtrusionLayer
} from 'react-map-gl';
import { type MapLocation, type MapPhoto } from '@prisma/client';
import { api } from '~/utils/api';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';

const tileLayer: FillExtrusionLayer = {
  id: 'add-3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 15,
  paint: {
    'fill-extrusion-color': '#aaa',

    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height']
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
  }
};

const InteractiveSelect = ({
  selectedCampus,
  setSelectedCampus
}: {
  selectedCampus: string | undefined;
  setSelectedCampus: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { current: map } = useMap();

  const getCampusesQuery = api.interactiveMap.getCampuses.useQuery();
  const getCampusInfoQuery = api.interactiveMap.getCampusInfo.useQuery({
    campus: selectedCampus ?? 'Ganesha'
  });

  useEffect(() => {
    if (!getCampusInfoQuery.data || !map) return;

    // Fly to selected location
    map.flyTo({
      center: [
        getCampusInfoQuery.data.baseLongitude.toNumber(),
        getCampusInfoQuery.data.baseLatitude.toNumber()
      ],
      zoom: 18
    });
  }, [map, getCampusInfoQuery.data]);

  return (
    <Select
      width='164px'
      height='40px'
      bg='navy.2'
      color='white'
      position='absolute'
      top='125px'
      left='25px'
      onChange={(e) => {
        setSelectedCampus(e.target.value);
      }}
      transition='all 0.2s ease-in-out'
      _hover={{
        opacity: 0.8
      }}
      css={{
        option: {
          background: '#2F2E2E'
        }
      }}
    >
      {getCampusesQuery.data?.map((map) => (
        <option
          key={map.id}
          value={map.campus}
          style={{
            background: 'gray.600',
            color: 'white'
          }}
        >
          {map.campus}
        </option>
      ))}
    </Select>
  );
};

const InteractiveMarker = ({
  location,
  setSelectedLocation,
  onOpen
}: {
  location: MapLocation & {
    MapPhoto: MapPhoto[];
  };
  setSelectedLocation: Dispatch<
    SetStateAction<
      | (MapLocation & {
          MapPhoto: MapPhoto[];
        })
      | undefined
    >
  >;
  onOpen: () => void;
}) => {
  const { current: map } = useMap();

  return (
    <Marker
      longitude={location.baseLongitude.toNumber()}
      latitude={location.baseLatitude.toNumber()}
      onClick={() => {
        // Fly to selected location
        map?.flyTo({
          center: [
            location.baseLongitude.toNumber(),
            location.baseLatitude.toNumber()
          ],
          zoom: 18
        });

        // Set selected location
        setSelectedLocation(location);

        // Open modal
        onOpen();
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
  const [selectedCampus, setSelectedCampus] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation & {
      MapPhoto: MapPhoto[];
    }
  >();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLocationsQuery = api.interactiveMap.getLocations.useQuery({
    campus: selectedCampus ?? 'Ganesha'
  });

  return (
    <Map
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapLib={mapboxgl}
      mapStyle='mapbox://styles/mapbox/light-v11'
      style={{
        width: '100vw',
        height: '100vh'
      }}
      onMove={(e) => setViewState(e.viewState)}
      {...viewState}
    >
      <InteractiveSelect
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
      />
      <FullscreenControl />
      <NavigationControl />
      <ScaleControl />
      <GeolocateControl />
      {getLocationsQuery.data?.map((location) => (
        <InteractiveMarker
          key={location.id}
          location={location}
          setSelectedLocation={setSelectedLocation}
          onOpen={onOpen}
        />
      ))}
      <Layer {...tileLayer} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgGradient='linear(to-br, navy.3, purple.1)'>
          <ModalHeader color='white'>{selectedLocation?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color='white'>{selectedLocation?.subtitle}</Text>
            <Text color='white'>{selectedLocation?.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Map>
  );
};

export default InteractiveMap;
