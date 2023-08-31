import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import {
  Map,
  type ViewState,
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Layer,
  useMap,
  Source
} from "react-map-gl";
import { env } from "~/env.cjs";
import "mapbox-gl/dist/mapbox-gl.css";

const ShowcaseMapImage = () => {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    map.loadImage(
      "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png",
      (error, image) => {
        if (error) throw error;
        if (!map.hasImage("map-pin") && image) map.addImage("map-pin", image);
      }
    );
  }, [map]);

  return null;
};

const ShowcaseMap = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: -77.4144,
    latitude: 25.0759,
    zoom: 18,
    pitch: 0,
    bearing: 0
  });

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
      <GeolocateControl
        showUserHeading
        trackUserLocation
        style={{ position: "relative", top: "100px", right: "20px" }}
      />
      <ScaleControl />
      <ShowcaseMapImage />
      <Source
        id='point'
        type='geojson'
        data={{
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-77.4144, 25.0759]
              }
            }
          ]
        }}
      >
        <Layer
          id='peta'
          type='symbol'
          source='point'
          layout={{
            "icon-image": "map-pin",
            "icon-size": 0.25
          }}
        />
      </Source>
    </Map>
  );
};

export default ShowcaseMap;
