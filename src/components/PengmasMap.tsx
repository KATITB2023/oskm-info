import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import {
  Map,
  type ViewState,
  type ImageSource,
  type RasterLayer,
  FullscreenControl,
  NavigationControl,
  Layer,
  Source,
  useMap,
  Marker
} from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { type MapLocation, type MapPhoto } from "@prisma/client";
import MapModalBackground from "~/components/background/MapModalBackground";
import {
  keyframes,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  useBreakpointValue,
  ModalBody,
  VStack,
  Heading,
  Text,
  Box,
  HStack,
  Button,
  useToast
} from "@chakra-ui/react";
import Slider from "react-slick";
import { api } from "~/utils/api";
import { env } from "~/env.cjs";
import { Dots } from "~/components/about-us/Dots";
import "mapbox-gl/dist/mapbox-gl.css";

const imageSource: ImageSource = {
  type: "image",
  url: "/images/showcase/190_LAYOUT-PENGMAS-A4.png",
  coordinates: [
    [-1754e-3, 1240e-3],
    [1754e-3, 1240e-3],
    [1754e-3, -1240e-3],
    [-1754e-3, -1240e-3]
  ]
};

const rasterLayer: RasterLayer = {
  id: "map-layer",
  type: "raster",
  source: "map-source",
  paint: {
    "raster-fade-duration": 0
  }
};

const PengmasMarker = ({
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
          ]
        });

        // Set selected location
        setSelectedLocation(location);

        // Open modal
        onOpen();
      }}
    >
      <Image
        src={location.logo ?? "/images/misc/spark3.png"}
        alt='marker'
        w='125px'
        draggable='false'
        loading='lazy'
        _hover={{
          cursor: "pointer",
          animation: `${scaling} 0.5s ease-in-out infinite alternate`
        }}
      />
    </Marker>
  );
};

const PengmasLocator = ({
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
      ]
    });

    // Set selected location
    setSelectedLocation(getLocationInfoQuery.data);

    // Open Modal
    onOpen();
  }, [map, getLocationInfoQuery.data, onOpen, setSelectedLocation]);

  return null;
};

const PengmasMap = ({
  inputSelectedLocationName
}: {
  inputSelectedLocationName?: string;
}) => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: 0,
    latitude: 0,
    zoom: 9
  });

  const [selectedLocation, setSelectedLocation] = useState<
    | (MapLocation & {
        MapPhoto: MapPhoto[];
      })
    | undefined
  >();
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getLocationsQuery = api.interactiveMap.getLocations.useQuery({
    campus: "Pengmas"
  });

  const isLg = useBreakpointValue({ base: false, lg: true });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
          `${env.NEXT_PUBLIC_API_URL}/showcase-map/pengmas?locationName=${selectedLocation.title}`
        )
      )
      .then(() =>
        toast({
          title: "Success",
          description: "Copied to clipboard!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        })
      );
  };

  return (
    <Map
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapLib={mapboxgl}
      mapStyle='mapbox://styles/mapbox/streets-v12'
      style={{
        width: "100%",
        height: "100vh"
      }}
      onMove={(e) => setViewState(e.viewState)}
      {...viewState}
      maxBounds={[-1754e-3, -1240e-3, 1754e-3, 1240e-3]}
      pitchWithRotate={false}
    >
      <FullscreenControl
        style={{
          position: "relative",
          top: "100px",
          right: "20px"
        }}
      />
      <NavigationControl
        style={{ position: "relative", top: "100px", right: "20px" }}
      />
      <Source id='map-source' {...imageSource}>
        <Layer {...rasterLayer} />
      </Source>
      {getLocationsQuery.data?.map((location) => (
        <PengmasMarker
          key={location.id}
          location={location}
          setSelectedLocation={setSelectedLocation}
          onOpen={onOpen}
        />
      ))}
      {inputSelectedLocationName && (
        <PengmasLocator
          inputSelectedLocationName={inputSelectedLocationName}
          setSelectedLocation={setSelectedLocation}
          onOpen={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
        <ModalOverlay />
        <ModalContent
          bg='navy.1'
          containerProps={{
            alignItems: "center",
            justifyContent: isLg ? "flex-end" : "center",
            px: isLg ? "2rem" : "1rem"
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
              "&::-webkit-scrollbar": {
                borderRadius: "144px",
                bg: "transparent"
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "144px",
                bg: "transparent"
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "144px"
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
                {/* If multiple map photos */}
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
                            w={{ base: "200px", lg: "50%" }}
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
                {/* If single map photo */}
                {selectedLocation.MapPhoto.length === 1 && (
                  <VStack spacing={1} alignItems='center' w='100%'>
                    <Box
                      borderRadius='lg'
                      p={3}
                      bg='yellow.5'
                      w={{ base: "200px", lg: "250px" }}
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

export default PengmasMap;
