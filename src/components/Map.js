import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const libraries = ["places"];


function Map() {
  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({ lat: 54.3781, lng: -2.2137 });
  const [zoom, setZoom] = useState(6);
  const [places, setPlaces] = useState([]);

  const onLoad = (autocomplete) => {
    setSearchBox(autocomplete);
  }

  const onPlaceChanged = () => {
    if (searchBox !== null) {
      const place = searchBox.getPlace();
      if (place.geometry) {
        setCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setZoom(15);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDm2wAUZtbatfRxowbpWSgRmMh_2Xq3iXY"
      libraries={libraries}
    >
     <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          const service = new window.google.maps.places.PlacesService(map);
    
          service.nearbySearch({
            location: center,
            radius: 1000, // 1 kilometer
            type: ['restaurant', 'lodging', 'tourist_attraction']
          }, (results, status) => {
            if (status === 'OK') {
              setPlaces(results);
            }
          });
        }}
      >
        <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
      >
        <input type="text" 
        placeholder="Enter location..."
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
        }} />
      </Autocomplete>
      {places.map(place => (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
