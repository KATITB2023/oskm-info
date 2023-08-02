import { type Dispatch, useState, type SetStateAction } from 'react';
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
  Text,
  useDisclosure
} from '@chakra-ui/react';
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
  const [selectedLocation, setSelectedLocation] = useState<
    MapLocation & {
      MapPhoto: MapPhoto[];
    }
  >();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getInteractiveMapQuery = api.interactiveMap.getInteractiveMap.useQuery({
    campus: 'Ganesha'
  });

  return (
    <>
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
        {getInteractiveMapQuery.data?.map((location) => (
          <InteractiveMarker
            key={location.id}
            location={location}
            setSelectedLocation={setSelectedLocation}
            onOpen={onOpen}
          />
        ))}
      </Map>
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
    </>
  );
};

export default InteractiveMap;
