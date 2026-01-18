import { createContext, useContext, useEffect, useState } from "react";
import { getISPInfo } from "../utils/getISPInfo";

const LocationContext = createContext();

// Helper to calculate distance in KM between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

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

    const [stats, setStats] = useState({
        distanceTraveled: 0,
        averageSpeed: 0,
    });

    const [error, setError] = useState(null);
    const [gpsLoading, setGpsLoading] = useState(!position);
    const [ispLoading, setIspLoading] = useState(Object.keys(info).length === 0);

    // Calculate stats whenever history changes
    useEffect(() => {
        if (history.length < 2) return;

        let totalDistance = 0;
        let totalSpeed = 0;
        let speedCount = 0;

        for (let i = 1; i < history.length; i++) {
            const p1 = history[i - 1];
            const p2 = history[i];
            totalDistance += calculateDistance(p1.lat, p1.lng, p2.lat, p2.lng);

            if (p2.speed > 0) {
                totalSpeed += p2.speed;
                speedCount++;
            }
        }

        setStats({
            distanceTraveled: totalDistance.toFixed(2),
            averageSpeed: speedCount > 0 ? (totalSpeed / speedCount).toFixed(2) : 0,
        });
    }, [history]);

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
                    timeLabel: new Date(pos.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                };

                setPosition(newPos);
                setGpsLoading(false);
                localStorage.setItem("last_position", JSON.stringify(newPos));

                setHistory((prev) => {
                    // Add point only if it's significantly different to avoid jitter
                    if (prev.length > 0) {
                        const last = prev[prev.length - 1];
                        const dist = calculateDistance(last.lat, last.lng, newPos.lat, newPos.lng);
                        if (dist < 0.005) return prev; // Ignore movements less than 5 meters
                    }

                    const updated = [...prev, newPos].slice(-100); // Keep last 100 points
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
                stats,
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
