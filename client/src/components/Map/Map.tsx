import { FC, useCallback, useEffect, useState, useRef, ReactElement, SetStateAction, ChangeEvent, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMediaQuery } from 'react-responsive';
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { 
  GoogleMap,
  Marker,
  Autocomplete
  // InfoWindow
} from "@react-google-maps/api";
import { Form, TextField } from "@react-md/form";
import { Button } from "@react-md/button";
// import { useSelector, useDispatch } from 'react-redux';
// import { saveMarkers, saveBounds, selectMarkers, selectBounds } from "../../store/mapStateSlice";
// import MapComponent from "./Map";
// import MarkerInfoCard from "../markerInfoCard/MarkerInfoCard";
// import { Photo } from '../../types/Photo';
// import { ContainterStyle } from "../../types/ContainerStyle";
import Search from "../Search/Search";
import { Position } from "../../types/Position";
import markerData from "../../data/dummyData";

// Need to use require to avoid weird error on googleMapsApiKey property
const LoadScript = require('@react-google-maps/api').LoadScript;

const apiKey: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const locationColor: any = {
  "google-blue": "#4285F4",
  "white": "#FFF"
};

const Map: FC<{userLocation: Position, searchPlace: Position}> = (userLocation, searchPlace) => {
  // // Query screen size for mobile and tablet
  // const isMobile: boolean = useMediaQuery({ query: '(max-width: 700px)' });
  // const isTablet: boolean = useMediaQuery({ query: '(max-width: 1200px)' })
  // // Set up redirect function
  // const navigate = useNavigate();
  // // Define React Redux functions
  // const savedBounds = useSelector(selectBounds);
  // const dispatch = useDispatch();

  // Set Map State
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any>(null);
  const [center, setCenter] = useState<Position>({ lat: 39.952584, lng: -75.165221 });
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [searchData, setSearchData] = useState<any>({ location: "", radius: "" });
  const [userIcon, setUserIcon] = useState<any>(null);
  const [libraries] = useState<any>(["places"]); 
  // const [activeMarker, setActiveMarker] = useState<string>();
  // const [mapBounds, setMapBounds] = useState<any>();
  const userMarker = useRef<any>(null);
  const onLoad = useCallback((map: any) => setMap(map), []);

  // const onPlaceChanged = () => {
  //   if (searchLocation) {
  //     //variable to store the result
  //     console.log(`Search Location: ${searchLocation}`);
  //     // const place = searchLocation.getPlace();
  //     // //variable to store the name from place details result 
  //     // const name = place.name;
  //     // //variable to store the status from place details result
  //     // const status = place.business_status;
  //     // //variable to store the formatted address from place details result
  //     // const formattedAddress = place.formatted_address;
  //     // // console.log(place);
  //     // //console log all results
  //     // console.log(`Name: ${name}`);
  //     // console.log(`Business Status: ${status}`);
  //     // console.log(`Formatted Address: ${formattedAddress}`);
  //   } else {
  //     console.log("Please enter text");
  //   };
  // };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSearchData({ ...searchData, [name]: value });
  // };

  // Get User Location
  useEffect(() => {
    if (map) {
      if (searchPlace) {
        map.setCenter(searchPlace.searchPlace);
      } else {
        map.setCenter(userLocation.userLocation);
      }
      setMarkers(markerData);
      setUserIcon({
        fillColor: locationColor['google-blue'],
        fillOpacity: 1,
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: locationColor['white'],
        strokeWeight: 2            
      });
      // const location = searchPlace.getLatLng();
      // console.log(location);
      console.log(`place is ${JSON.stringify(searchPlace)}`);
    };

      // if (userMarker.current) {
      //   userMarker.current.setMap(null); 
      // };
      // userMarker.current = new google.maps.Marker({
      //   icon: blueDotUrl,
      //   position: userLocation,
      //   title: 'You are here'
      // });
      // userMarker.current.setMap(map);
  }, [map]);

  // Set User Marker
  // useEffect(() => {
  //   if (map) {

  //   };
  // }, [userMarker]);

  // Set Bounds of Map to contain Markers
  // useEffect(() => {
  //   if (map) {
  //     const bounds: any = new window.google.maps.LatLngBounds();
  //     // if (savedBounds && markers.length > 1) {
  //     //   return map.fitBounds(JSON.parse(savedBounds));
  //     // } else {
  //     //   if (markers) {
  //     //     markers.map((marker) => {
  //     //       return bounds.extend({
  //     //         lat: marker.lat,
  //     //         lng: marker.lng,
  //     //       });
  //     //     });
  //     //     map.setCenter(bounds.getCenter());
  //     //     // Adjust map zoom for screen size or single marker
  //     //     if (markers.length === 1) {
  //     //       map.setZoom(12);
  //     //     } else if (isMobile) {
  //     //       map.setZoom(2);
  //     //     } else if (isTablet) {
  //     //       map.setZoom(3);
  //     //     } else {
  //     //       map.fitBounds(bounds);
  //     //     };
  //     //   };
  //       setMapBounds(bounds);
  //     };      
  //   };
  // }, [
  //   map, 
  //   // markers, 
  //   // isMobile, 
  //   // isTablet, 
  //   // mapBounds
  // ]);

  // // Handle Active Marker change
  // const handleActiveMarker = (markerId: string) => {
  //   setActiveMarker(markerId);
  // };

  // // Record change in bounds
  // const handleBoundsChange = () => {
  //   if (markers.length > 1) {
  //     // setMapBounds(map.GetBounds());
  //     dispatch(saveBounds(JSON.stringify(map.getBounds())));
  //   };
  // };

  return (
    // <Wrapper apiKey={apiKey} render={render}>
    //   <MapComponent />
    // </Wrapper>
    // <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
    //  {/* <Search apiKey={apiKey!}/> */}
      <GoogleMap
        zoom={4.5}
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={center}
        onLoad={onLoad}
        // onBoundsChanged={handleBoundsChange}
        options={{
          gestureHandling: 'greedy',
          mapTypeId: 'hybrid',
          disableDefaultUI: true
        }}
      >
          {/* <Autocomplete
            onPlaceChanged={(autocomplete) => {
              console.log(autocomplete.getPlace());
              console.log("place selected");
            }}
          >
            <input
              id="search-location"
              type="text"
              placeholder="Location"
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            /> */}
            {/* <Form>
              <TextField
                id="location"
                name="location"
                label="Location:"
                value={searchData.location}
                onChange={handleInputChange}
                type="text"
              />
              <TextField
                id="radius"
                name="radius"
                label="Search Radius:"
                value={searchData.radius}
                onChange={handleInputChange}
                type="number"
              />
              <Button
                onClick={handleFormSubmit}
              > 
                Login
              </Button>
            </Form> */}
          {/* </Autocomplete> */}
        {/* Have to use a nested object here for unknown reason */}
        {userIcon
          ? <Marker
              position={userLocation.userLocation}
              icon={userIcon}
            >
            </Marker>
          : null
        }
        {markers ?
          markers.map((marker: any, index: number) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              // onMouseOver={() => handleActiveMarker(marker.id)}
              // onLoad={() => markerDrop(marker)}
              // animation={2}
              // onClick={() => handleActiveMarker(marker.id)}
            >
              {/* {activeMarker === marker.id && markers.length > 1
                ? <InfoWindow
                    key={marker.id} 
                    position={{lat: marker.lat, lng: marker.lng}}
                    >
                    <MarkerInfoCard marker={marker} navigate={navigate} />
                  </InfoWindow>
                : null
              } */}
            </Marker>
          ))
          : null
        }
      </GoogleMap>
    // </LoadScript>
  );
};

export default Map;