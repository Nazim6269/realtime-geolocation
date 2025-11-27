import { useEffect, useState } from "react";
import { initialClocks } from "../../data";
import AddNew from "./AddNew";
import WeatherInfo from "./WeatherInfo";



const WorldClocks = () => {
  const [time, setTime] = useState(new Date());
  const [clocks, setClocks] = useState(initialClocks);
  const [darkMode, setDarkMode] = useState(true);
  const [hour24, setHour24] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (tz) =>
    time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: !hour24,
      timeZone: tz,
    });

  const formatDate = (tz) =>
    time.toLocaleDateString("en-US", { timeZone: tz });

  const removeCity = (id) => {
    setClocks(clocks.filter((c) => c.id !== id));
  };

  return (
    <div className={`${darkMode 
    ? "bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white" 
    : "bg-gray-100 text-gray-900"} 
    min-h-screen p-8 transition-colors duration-500`}
>
  {/* --- START--- */}
  <div className="max-w-7xl mx-auto"> 

    <header className="flex flex-col md:flex-row justify-between items-center mb-4">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          World Clocks
      </h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-5 py-2 border-2 border-indigo-500/50 bg-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-indigo-700 transition-all duration-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={() => setHour24(!hour24)}
          className="px-5 py-2 border-2 border-teal-500/50 bg-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:bg-teal-700 transition-all duration-300"
        >
          {hour24 ? "12-Hour" : "24-Hour"}
        </button>
      </div>
    </header>

    <AddNew />

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {clocks.map((clock) => (
        
        <div
          key={clock.id}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg shadow-gray-300/50 dark:shadow-black/70 p-6 flex flex-col items-center transition-all duration-300 hover:shadow-2xl relative"
        >
          <button
            onClick={() => removeCity(clock.id)}
            className="absolute top-3 right-3 text-red-500 font-bold text-lg hover:text-red-400 opacity-75 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{clock.city}</h2>
          <p className="text-4xl font-mono text-blue-600 dark:text-teal-400">{formatTime(clock.timezone)}</p>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-1">{formatDate(clock.timezone)}</p>
        </div>
      ))}
    </div>
    
    {/* Weathre info component */}
    <h2 className="text-3xl font-extrabold my-4  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          World Weathers
      </h2>
      <AddNew />
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
