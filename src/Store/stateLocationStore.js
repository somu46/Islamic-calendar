import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools(
    (set) => ({
      location: { latitude: null, longitude: null },
      latitudeState: null,
      longitudState: null,
      error: null,
      loading: true,
     
      getLocation: async () => {
        try {
          set({ loading: true, error: null ,latitudeState: null, longitudState: null, location:{ latitude: null, longitude: null }});

          if (!navigator.geolocation) {
            throw new Error("Geolocation is not supported by your browser.");
          }

          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          // console.log("LocationTracker getLocation from:  ",latitude,longitude);
          // console.log("position.coords",position.coords);
          
          
          set({
            latitudeState: latitude,
             longitudState: longitude,
            location:{ latitude: latitude, longitude: longitude },
            loading: false,
          });
          // console.log("LocationTracker getLocation from:  ",location);

          // Store in sessionStorage like original component
          sessionStorage.setItem("latitude", latitude);
          sessionStorage.setItem("longitude", longitude);

        } catch (error) {
          set({ 
            error: error.message.includes("denied") 
              ? "Permission to access location was denied" 
              : error.message,
            loading: false
          });
        }
      }
    })
  )
);


const LocationTracker = () => {
  const { getLocation } = useStore();

  // console.log("LocationTracker mounted latitudeState",latitudeState);
  // console.log("LocationTracker mounted longitudState",longitudState);
  
  
  useEffect(() => {
    getLocation();
  }, [getLocation]);
  
 
  return null;
};

export { useStore, LocationTracker };