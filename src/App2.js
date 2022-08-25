import React, { useCallback, useRef, useState } from 'react'
import {
  GoogleMap, 
  useJsApiLoader, 
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 36.3665211,
  lng: 127.3837135
};

const libraries=['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  })

  const [map, setMap]=useState(/** @type google.maps.Map */(null));
  const [directionsResponse, setDirectionsResponse]=useState(null);
  const [distance, setDistance]=useState("");
  const [duration, setDuration]=useState("");
  
  /** @type React.MutableRefObject<HTMLInputElment> */
  const originRef=useRef();
  /** @type React.MutableRefObject<HTMLInputElment> */
  const destinationRef=useRef();
  // console.log(originRef.current.value,'---', destinationRef.current.value);

  const onToggleClick=()=>{
    originRef.current.value=destinationRef.current.value;
    destinationRef.current.value=originRef.current.value;
  };
  
  const calculateRoute=async()=>{
    if(originRef.current.value==="" || destinationRef.current.value===""){
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService=new google.maps.DirectionsService();
    const results=await directionService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode:google.maps.TravelMode.TRANSIT,
    })
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const clearRoute=()=>{
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value="";
    destinationRef.current.value="";
  };

  return isLoaded ? (
    <div>
      <div style={{
        position:'absolute',
        top:0, 
        left:0, 
        zIndex:1, 
        padding:'2rem', 
        background:'white',
        // transform:'translate(-50%,-50%)'
      }}
      >
        <Autocomplete>
          <input ref={originRef} placeholder="Origin" type="text"/>
        </Autocomplete>
        <Autocomplete>
          <input ref={destinationRef} placeholder="Destination" type="text"/>
        </Autocomplete>
        <button onClick={onToggleClick}>Reverse</button>
        <button onClick={calculateRoute} type="submit" style={{color:'white',backgroundColor:'tomato',border:'none',padding:'0.2rem',cursor:'pointer'}}
          >Calculate Route</button>
        <button onClick={clearRoute}>X</button>
        <div>
          <span>distance: {distance}</span>
          <span>duration: {duration}</span>
        </div>
        <button onClick={()=>map.panTo(center)}>Back</button>
      </div>
      <GoogleMap
        zoom={16}
        center={center}
        mapContainerStyle={containerStyle}
        options={{
          mapTypeControl:false,
          streetViewControl:false,
          // zoomControl:
          // fullscreenControl:
        }}
        onLoad={(map)=>setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && 
        <DirectionsRenderer directions={directionsResponse}/>}
      </GoogleMap>
    </div>
  ) : <div>loading..</div>
}



export default App;