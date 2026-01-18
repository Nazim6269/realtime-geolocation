import { useLocation } from "../context/location-context";

const useGeoLocation = () => {
  const { position, error, loading } = useLocation();
  return { position, error, loading };
};

export default useGeoLocation;
