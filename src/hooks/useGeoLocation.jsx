import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [position, setPosition] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      }, //this is success callback which in mandatory
      (err) => {
        setError(err.message);
      }, //this is error callback which is optional
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      } //this is also optional
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error };
};

export default useGeoLocation;
