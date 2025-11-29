import L from "leaflet";
import PropTypes from "prop-types";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useTheme } from "../../hooks/useTheme";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ lat, lng, zone }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`
        h-[650px] rounded-3xl overflow-hidden transition-colors duration-500
        ${
          isDark
            ? "bg-gradient-to-br from-slate-800 via-slate-900 to-black shadow-2xl"
            : "bg-white shadow-lg shadow-gray-300/50"
        }
      `}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={2}
        scrollWheelZoom
        className="h-full w-full rounded-3xl"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url={
            isDark
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        <Marker position={[lat, lng]} icon={icon}>
          <Popup>
            <b>{zone}</b> <br />
            Live Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  zone: PropTypes.string,
};

export default MapComponent;
