import renderObject from "../hooks/renderObject";
import useDetailsInfo from "../hooks/useDetailsInfo";
import useGeoLocation from "../hooks/useGeoLocation";
import { useTheme } from "../hooks/useTheme";

export default function LiveTracker() {
  const { position, error } = useGeoLocation();
  const { info } = useDetailsInfo();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  /* ---------- ERROR STATE ---------- */
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

  /* ---------- LOADING STATE ---------- */
  if (!position)
    return (
      <div
        className={`rounded-xl p-5 border animate-pulse tracking-widest uppercase
        ${isDark
            ? "bg-gray-800 text-gray-300 border-gray-700"
            : "bg-white text-gray-600 border-gray-200"
          }`}
      >
        📡 Fetching live location...
      </div>
    );

  /* ---------- MAIN UI ---------- */
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 w-auto md:w-[380px] transition-colors duration-500 border
        ${isDark
          ? "bg-gray-800 border-gray-700 text-white shadow-md"
          : "bg-white border-gray-100 text-gray-800 shadow-md"
        }
      `}
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${isDark ? "bg-darkTextColor" : "bg-lightTextColor"
            }`}
        ></div>
        <h3
          className={`font-semibold tracking-widest text-sm uppercase
            ${isDark ? "text-darkTextColor" : "text-lightTextColor"}
          `}
        >
          Live Tracking
        </h3>
      </div>

      {/* Location Info */}
      <div className="space-y-2 text-sm">{renderObject(info, isDark)}</div>
    </div>
  );
}
