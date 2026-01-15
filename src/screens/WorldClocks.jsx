import { useEffect, useState } from "react";
import { initialClocks } from "../../data";
import AddNew from "../Components/AddNew";
import WeatherInfo from "../Components/WeatherInfo";
import { useTheme } from "../hooks/useTheme";

const WorldClocks = () => {
  const [time, setTime] = useState(new Date());
  const [clocks, setClocks] = useState(initialClocks);
  const [hour24, setHour24] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const addClock = (newClock) => {
    setClocks((prev) => [...prev, newClock]);
  };

  const formatTime = (tz) =>
    time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !hour24,
      timeZone: tz,
    });

  const formatDate = (tz) => time.toLocaleDateString("en-US", { timeZone: tz });

  const removeCity = (id) => {
    setClocks(clocks.filter((c) => c.id !== id));
  };

  return (
    <div
      className={`
    min-h-screen p-8 transition-colors duration-500
    ${
      theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-lightPrimaryBg text-gray-900"
    }
  `}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-start gap-3 items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            World Clocks
          </h1>
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <button
              onClick={() => setHour24(!hour24)}
              className={`
    px-6 py-3
    rounded-xl
     font-semibold
    shadow-md hover:shadow-lg
    hover:brightness-110
    transition-all duration-300
    ${
      theme === "dark"
        ? " border border-gray-500 text-darkTextColor"
        : "border border-purple-500 text-lightPrimaryTextColor"
    }
  `}
            >
              {hour24 ? "12-Hour" : "24-Hour"}
            </button>
          </div>
        </header>

        {/* Add New Clock */}
        <AddNew onAdd={addClock}/>

        {/* Clock Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {clocks.map((clock) => (
            <div
              key={clock.id}
              className={`
            rounded-xl shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg relative
            ${
              isDark
                ? "bg-gray-800 shadow-xl shadow-black/40"
                : "bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-gray-800 shadow-xl shadow-gray-300"
            }
          `}
            >
              <button
                onClick={() => removeCity(clock.id)}
                className="absolute top-3 right-3 text-red-500 font-bold text-lg hover:text-red-400 opacity-75 hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {clock.city}
              </h2>
              <p
                className={`${
                  isDark ? "text-darkTextColor" : "text-lightTextColor"
                } text-2xl font-bold`}
              >
                {formatTime(clock.timezone)}
              </p>
              <p
                className={`text-base mt-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {formatDate(clock.timezone)}
              </p>
            </div>
          ))}
        </div>

        {/* Weather Section */}
        <h2
          className={`text-3xl font-bold my-6 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          World Weathers
        </h2>
        <AddNew onAdd={addClock}/>
        <div className="grid grid-cols-3 gap-y-4 items-center py-7">
          <WeatherInfo city="London" />
          <WeatherInfo city="Bangladesh" />
          <WeatherInfo city="India" />
          <WeatherInfo city="Pakistan" />
        </div>
      </div>
    </div>
  );
};

export default WorldClocks;
