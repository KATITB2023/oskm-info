import { type Dispatch, useState, type SetStateAction, useEffect } from 'react';
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast
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
import { ExternalLinkIcon } from '@chakra-ui/icons';

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
  placeholder,
  selectedCampus,
  setSelectedCampus
}: {
  placeholder: string | undefined;
  selectedCampus: string;
  setSelectedCampus: Dispatch<SetStateAction<string>>;
}) => {
  const { current: map } = useMap();

  const getCampusesQuery = api.interactiveMap.getCampuses.useQuery();
  const getCampusInfoQuery = api.interactiveMap.getCampusInfo.useQuery({
    campus: selectedCampus
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
      placeholder={placeholder}
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
        src='/images/misc/spark3.png'
        alt='marker'
        w='125px'
        draggable='false'
        loading='lazy'
      />
    </Marker>
  );
};

const InteractiveLocator = ({
  inputSelectedLocationName,
  setSelectedLocation,
  onOpen
}: {
  inputSelectedLocationName: string;
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

  const getLocationInfoQuery = api.interactiveMap.getLocationInfo.useQuery({
    title: inputSelectedLocationName
  });

  useEffect(() => {
    if (!getLocationInfoQuery.data || !map) return;

    // Fly to selected location
    map.flyTo({
      center: [
        getLocationInfoQuery.data.baseLongitude.toNumber(),
        getLocationInfoQuery.data.baseLatitude.toNumber()
      ],
      zoom: 18
    });

    // Set selected location
    setSelectedLocation(getLocationInfoQuery.data);

    // Open Modal
    onOpen();
  }, [map, getLocationInfoQuery.data, onOpen, setSelectedLocation]);

  return null;
};

const InteractiveMap = ({
  inputSelectedCampus,
  inputSelectedLocationName
}: {
  inputSelectedCampus?: string;
  inputSelectedLocationName?: string;
}) => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: 107.610584,
    latitude: -6.891182,
    zoom: 18,
    pitch: 0,
    bearing: 0
  });

  const [selectedCampus, setSelectedCampus] = useState<string>(
    inputSelectedCampus ?? 'Ganesha'
  );
  const [selectedLocation, setSelectedLocation] = useState<
    | (MapLocation & {
        MapPhoto: MapPhoto[];
      })
    | undefined
  >();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getLocationsQuery = api.interactiveMap.getLocations.useQuery({
    campus: selectedCampus
  });

  const onCopyButtonClick = () => {
    if (!selectedLocation) return;

    void navigator.clipboard
      .writeText(
        encodeURI(
          `${env.NEXT_PUBLIC_API_URL}/interactive-map?campus=${selectedCampus}&locationName=${selectedLocation.title}`
        )
      )
      .then(() =>
        toast({
          title: 'Success',
          description: 'Copied to clipboard!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top'
        })
      );
  };

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
      <FullscreenControl
        style={{
          position: 'relative',
          top: '100px',
          right: '20px'
        }}
      />
      <NavigationControl
        style={{ position: 'relative', top: '100px', right: '20px' }}
      />
      <GeolocateControl
        showUserHeading
        trackUserLocation
        style={{ position: 'relative', top: '100px', right: '20px' }}
      />
      <ScaleControl />
      <InteractiveSelect
        placeholder={inputSelectedCampus}
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
      />
      {inputSelectedLocationName && (
        <InteractiveLocator
          inputSelectedLocationName={inputSelectedLocationName}
          setSelectedLocation={setSelectedLocation}
          onOpen={onOpen}
        />
      )}
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
            {selectedLocation && (
              <>
                <Text color='white'>{selectedLocation.subtitle}</Text>
                <Text color='white'>{selectedLocation.description}</Text>
                <Text color='white'>
                  <Link
                    href={encodeURI(
                      `${env.NEXT_PUBLIC_API_URL}/interactive-map?campus=${selectedCampus}&locationName=${selectedLocation.title}`
                    )}
                    isExternal
                  >
                    {encodeURI(
                      `${env.NEXT_PUBLIC_API_URL}/interactive-map?campus=${selectedCampus}&locationName=${selectedLocation.title}`
                    )}{' '}
                    <ExternalLinkIcon mx='2px' />
                  </Link>
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCopyButtonClick} mr={3}>
              Share Location
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Map>
  );
};

export default InteractiveMap;
