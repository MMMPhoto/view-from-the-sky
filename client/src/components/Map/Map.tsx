import { useState, useRef, useEffect, Children, isValidElement, cloneElement, Dispatch, SetStateAction } from "react";
import { JsxElement, isNoSubstitutionTemplateLiteral } from "typescript";

type LatLng = google.maps.LatLngLiteral;
type GoogleMap = google.maps.Map;

interface MapInterface {
  children: JSX.Element,
  center: LatLng,
  zoom: number
};

const MapTest = ({ children, map, setMap, center, zoom }: {
    children: JSX.Element | JSX.Element[]
    map: GoogleMap,
    setMap: Dispatch<SetStateAction<GoogleMap | undefined >>,
    center: LatLng, 
    zoom: number
  }) => {
  
  const ref = useRef(null);

  useEffect(() => {
    setMap(new google.maps.Map(ref.current!, { 
      center: center, 
      zoom: zoom }))
  }, []);

  useEffect(() => {
    map?.setCenter(center);
  }, [center]);

  return (
    <div 
      ref={ref} 
      style={{ height: "100vh", flexGrow: 1 }} 
      id="map"
    >
      { map
        ? Children.map(children, (child) => {
          if (isValidElement<{map: GoogleMap}>(child)) {
            return cloneElement(child, { map: map } )};
          })
        : null
      }

    </div>
  );
};

export default MapTest;
