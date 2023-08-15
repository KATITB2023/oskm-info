import { type Dispatch, useState, type SetStateAction, useEffect } from 'react';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
  keyframes,
  useBreakpointValue,
  VStack,
  Heading,
  HStack,
  Box
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
  Marker
} from 'react-map-gl';
import { type MapLocation, type MapPhoto } from '@prisma/client';
import { api } from '~/utils/api';
import { env } from '~/env.cjs';
import 'mapbox-gl/dist/mapbox-gl.css';
import Slider from 'react-slick';
import { Dots } from './about-us/Dots';
import MapModalBackground from './background/MapModalBackground';

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
      fontFamily='SomarRounded-Bold'
      textColor='white'
      fontSize='16px'
      fontWeight='700'
      fontStyle='normal'
      lineHeight='150%'
      onChange={(e) => {
        setSelectedCampus(e.target.value);
      }}
      transition='all 0.2s ease-in-out'
      _hover={{
        opacity: 0.8
      }}
      css={{
        option: {
          background: '#2B0792'
        }
      }}
    >
      {getCampusesQuery.data?.map((map) => (
        <option key={map.id} value={map.campus}>
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
  const scaling = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.2);
    }
`;

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
        _hover={{
          cursor: 'pointer',
          animation: `${scaling} 0.5s ease-in-out infinite alternate`
        }}
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
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLg = useBreakpointValue({ base: false, lg: true });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const getLocationsQuery = api.interactiveMap.getLocations.useQuery({
    campus: selectedCampus
  });

  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    }
  };

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
      mapStyle='mapbox://styles/mapbox/streets-v12'
      style={{
        width: '100%',
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
      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent
          bg='navy.1'
          containerProps={{
            alignItems: 'center',
            justifyContent: isLg ? 'flex-end' : 'center',
            px: isLg ? '2rem' : '1rem'
          }}
          maxH='80vh'
        >
          <ModalBody
            color='white'
            position='relative'
            px={10}
            pt={16}
            pb={6}
            overflowY='scroll'
            sx={{
              '&::-webkit-scrollbar': {
                borderRadius: '144px',
                bg: 'transparent'
              },
              '&::-webkit-scrollbar-track': {
                borderRadius: '144px',
                bg: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '144px'
              }
            }}
          >
            <MapModalBackground />
            {selectedLocation && (
              <VStack spacing={6} zIndex='10' alignItems='flex-start'>
                <VStack spacing={1} alignSelf='center'>
                  <Heading
                    textAlign='center'
                    fontSize='2xl'
                    fontStyle='normal'
                    fontWeight='400'
                    textTransform='uppercase'
                  >
                    {selectedLocation?.title}
                  </Heading>
                  <Text textAlign='center' alignSelf='center' fontSize='sm'>
                    {selectedLocation.subtitle}
                  </Text>
                </VStack>
                {selectedLocation.MapPhoto.length > 1 && (
                  <>
                    <Slider
                      {...settings}
                      autoplay
                      ref={(slider) => setSlider(slider)}
                    >
                      {selectedLocation.MapPhoto.map((photo) => (
                        <VStack
                          spacing={1}
                          key={photo.id}
                          alignItems='center'
                          w='100%'
                        >
                          <Box
                            borderRadius='lg'
                            p={3}
                            bg='yellow.5'
                            w={{ base: '200px', lg: '50%' }}
                          >
                            <Image
                              src={photo.imageUrl}
                              alt=''
                              w='100%'
                              draggable='false'
                              loading='lazy'
                              borderRadius='lg'
                            />
                          </Box>
                          <Text textAlign='center'>{photo.caption}</Text>
                        </VStack>
                      ))}
                    </Slider>
                    <Dots
                      currentSlide={currentSlide}
                      len={selectedLocation.MapPhoto.length}
                    />
                  </>
                )}
                {selectedLocation.MapPhoto.length === 1 && (
                  <VStack spacing={1} alignItems='center' w='100%'>
                    <Box
                      borderRadius='lg'
                      p={3}
                      bg='yellow.5'
                      w={{ base: '200px', lg: '250px' }}
                    >
                      <Image
                        src={selectedLocation.MapPhoto[0]?.imageUrl}
                        alt=''
                        w='100%'
                        draggable='false'
                        loading='lazy'
                        borderRadius='lg'
                      />
                    </Box>
                    <Text textAlign='center'>
                      {selectedLocation.MapPhoto[0]?.caption}
                    </Text>
                  </VStack>
                )}
                <VStack spacing={1} alignItems='center' w='100%'>
                  <Box
                    borderRadius='lg'
                    p={3}
                    bg='yellow.5'
                    w={{ base: '200px', lg: '250px' }}
                  >
                    <Image
                      src='/images/misc/spark3.png'
                      alt=''
                      w='100%'
                      draggable='false'
                      loading='lazy'
                      borderRadius='lg'
                    />
                  </Box>
                  <Text textAlign='center'>asdasd</Text>
                </VStack>
                <Text>{selectedLocation.description}</Text>
                <HStack
                  alignItems='flex-end'
                  justifyContent='flex-end'
                  spacing={1}
                  w='100%'
                  position='sticky'
                  bottom='0'
                >
                  <Button onClick={onCopyButtonClick}>Share Location</Button>
                  <Button variant='outline' onClick={onClose}>
                    Close
                  </Button>
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Map>
  );
};

export default InteractiveMap;
