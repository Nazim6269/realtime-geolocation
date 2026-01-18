import useDetailsInfo from "../../hooks/useDetailsInfo";
import useGeoLocation from "../../hooks/useGeoLocation";
import { useTheme } from "../../hooks/useTheme";
import LiveTracker from "../LiveTracker";
import Alerts from "./Alerts";
import AnalyticStats from "./AnalyticStats";
import MapComponent from "./Map";
import Timeline from "./TimeLine";
import Zone from "./Zone";

const TrackingComponents = () => {
  const { position, error } = useGeoLocation();
  const { info } = useDetailsInfo();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ------------------ ERROR STATE ------------------ */
  if (error)
    return (
      <div
        className={`rounded-xl p-5 shadow-md border 
        ${isDark
            ? "bg-red-500/10 text-red-400 border-red-500/20"
            : "bg-red-50 text-red-600 border-red-200"
          }`}
      >
        ⚠️ {error}
      </div>
    );

  /* ------------------ LOADING STATE ------------------ */
  if (!position)
    return (
      <div
        className={`rounded-xl p-5 border animate-pulse 
        tracking-widest uppercase text-sm
        ${isDark
            ? "bg-gray-800 text-gray-300 border-gray-700"
            : "bg-white text-gray-600 border-gray-200 shadow-sm"
          }`}
      >
        📡 Fetching live location...
      </div>
    );

  /* ------------------ MAIN UI ------------------ */
  return (
    <div className="w-full transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-extrabold ${isDark ? "text-gray-400" : "text-gray-800"
              }`}
          >
            Your Location
          </h1>
        </header>

        {/* TRACKER + MAP */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-8">
          <LiveTracker />
          <MapComponent
            lat={position.lat}
            lng={position.lng}
            zone={info.city}
          />
        </div>

        {/* ZONE */}
        <div className="mb-8">
          <Zone
            zoneName="Sector A"
            location="Tokyo"
            status="Safe"
            speed={65}
            signal={82}
            progress={72}
          />
        </div>

        {/* ALERTS */}
        <div className="mb-8">
          <Alerts
            alerts={[
              {
                level: "Critical",
                text: "Zone breach detected",
                time: "11:30",
              },
              { level: "Warning", text: "Speed limit exceeded", time: "11:05" },
              { level: "Info", text: "Location updated", time: "10:55" },
            ]}
          />
        </div>

        {/* ANALYTICS */}
        <div className="mb-8">
          <AnalyticStats />
        </div>

        {/* TIMELINE */}
        <div>
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default TrackingComponents;
