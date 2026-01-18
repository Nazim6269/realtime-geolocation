import { createContext, useContext, useEffect, useState } from "react";
import { getISPInfo } from "../utils/getISPInfo";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [position, setPosition] = useState(() => {
        const saved = localStorage.getItem("last_position");
        return saved ? JSON.parse(saved) : null;
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("position_history");
        return saved ? JSON.parse(saved) : [];
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
                    speed: pos.coords.speed || 0,
                    timestamp: pos.timestamp,
                    timeLabel: new Date(pos.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                };

                setPosition(newPos);
                setGpsLoading(false);
                localStorage.setItem("last_position", JSON.stringify(newPos));

                // Update history (keep last 20 points)
                setHistory(prev => {
                    const updated = [...prev, newPos].slice(-20);
                    localStorage.setItem("position_history", JSON.stringify(updated));
                    return updated;
                });
            },
            (err) => {
                setError(err.message);
                setGpsLoading(false);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000,
            }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <LocationContext.Provider
            value={{
                position,
                history,
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
