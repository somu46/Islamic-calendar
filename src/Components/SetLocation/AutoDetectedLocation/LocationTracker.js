import  { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";



// Create a custom marker icon
const LocationTracker = () => {
  const [locationObject, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

 useEffect(()=>{
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            },
            (err) => {
              setError(err.message);
              console.log("error",error);
              
            }
          );
        } else {
          setError("Geolocation is not supported by your browser.");
        }
      };
      getLocation();
    },[])
    
    console.log("location location Tracker : ",locationObject);

    useEffect(()=>{
      const setSessionData=()=>{
        sessionStorage.setItem*("latitude",locationObject.latitude)
        sessionStorage.setItem*("longitude",locationObject.longitude)
      };
      setSessionData();
    },[locationObject])
  
//    return locationObject;
   
};

export default LocationTracker;