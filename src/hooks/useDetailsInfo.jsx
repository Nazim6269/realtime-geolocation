import { useLocation } from "../context/location-context";

const useDetailsInfo = () => {
  const { info, loading, error } = useLocation();
  return { info, loading, error };
};

export default useDetailsInfo;