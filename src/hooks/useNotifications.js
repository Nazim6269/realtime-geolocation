import { useEffect, useRef, useState } from "react";
import { requestNotificationPermission, sendNotification } from "../utils/notifications";
import { useLocation, calculateDistance } from "../context/location-context";
import fetchQuakesData from "../utils/getQuakesData";
import { ZONES } from "../constants/zones";

export const useNotifications = () => {
    const { position } = useLocation();
    const [lastQuakeId, setLastQuakeId] = useState(null);
    const currentZoneRef = useRef(null);

    // Request permission on mount
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    // Geofencing logic
    useEffect(() => {
        if (!position) return;

        let foundZone = null;
        for (const zone of ZONES) {
            const distance = calculateDistance(position.lat, position.lng, zone.lat, zone.lng);
            if (distance <= zone.radius) {
                foundZone = zone;
                break;
            }
        }

        if (foundZone && currentZoneRef.current?.id !== foundZone.id) {
            // Entered new zone
            sendNotification("📍 Zone Entered", {
                body: `You have entered ${foundZone.name}`,
                icon: "/vite.svg", // Or a better icon if available
            });
            currentZoneRef.current = foundZone;
        } else if (!foundZone && currentZoneRef.current) {
            // Exited zone
            sendNotification("📍 Zone Exited", {
                body: `You have exited ${currentZoneRef.current.name}`,
                icon: "/vite.svg",
            });
            currentZoneRef.current = null;
        }
    }, [position]);

    // Earthquake logic
    useEffect(() => {
        const quackApi = import.meta.env.VITE_EARTHQUAKES_API;

        const checkQuakes = async () => {
            try {
                const quakes = await fetchQuakesData(quackApi);
                if (quakes && quakes.length > 0) {
                    const highMagQuake = quakes.find(q => q.properties.mag >= 6.0);

                    if (highMagQuake && highMagQuake.id !== lastQuakeId) {
                        sendNotification("⚠️ High Magnitude Earthquake Detected", {
                            body: `Magnitude ${highMagQuake.properties.mag} earthquake at ${highMagQuake.properties.place}`,
                            icon: "/vite.svg",
                            tag: "earthquake-alert", // Avoid spamming multiple notifications for the same event
                        });
                        setLastQuakeId(highMagQuake.id);
                    }
                }
            } catch (error) {
                console.error("Error monitoring earthquakes:", error);
            }
        };

        checkQuakes();
        const interval = setInterval(checkQuakes, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [lastQuakeId]);

    return null; // This hook just runs side effects
};
