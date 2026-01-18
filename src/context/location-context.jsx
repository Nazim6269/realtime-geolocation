import { createContext, useContext, useEffect, useState } from "react";
import { getISPInfo } from "../utils/getISPInfo";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem("last_position");
        return saved ? JSON.parse(saved) : null;
    });
    const [info, setInfo] = useState(() => {
        const saved = localStorage.getItem("last_info");
        return saved ? JSON.parse(saved) : {};
    });
    const [error, setError] = useState(null);
    const [gpsLoading, setGpsLoading] = useState(!position);
    const [ispLoading, setIspLoading] = useState(Object.keys(info).length === 0);

    useEffect(() => {
        const fetchISPInfo = async () => {
            try {
                const data = await getISPInfo();
                if (data) {
                    setInfo(data);
                    localStorage.setItem("last_info", JSON.stringify(data));
                }
            } catch (err) {
                console.error("Failed to fetch ISP info:", err);
            } finally {
                setIspLoading(false);
            }
        };

        fetchISPInfo();
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            setGpsLoading(false);
            return;
        }

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                    timestamp: pos.timestamp,
                };
                setPosition(newPos);
                setGpsLoading(false);
                localStorage.setItem("last_position", JSON.stringify(newPos));
            },
            (err) => {
                setError(err.message);
                setGpsLoading(false);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 10000, // 10 seconds cache is fine for initial load
                timeout: 15000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LocationContext.Provider
            value={{
                position,
                info,
                error,
                loading: gpsLoading,
                ispLoading,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};
