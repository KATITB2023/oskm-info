import mapboxgl from "mapbox-gl";
import { useState } from "react";
import {
  Map,
  type ViewState,
  type ImageSource,
  type RasterLayer,
  FullscreenControl,
  NavigationControl,
  Layer,
  Source
} from "react-map-gl";
import { env } from "~/env.cjs";
import "mapbox-gl/dist/mapbox-gl.css";

const imageSource: ImageSource = {
  type: "image",
  url: "/images/showcase/190_LAYOUT-FESTIVAL-A4.png",
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

const ShowcaseMap = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    longitude: 0,
    latitude: 0,
    zoom: 9
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
    </Map>
  );
};

export default ShowcaseMap;
