import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ErrorCard from "./ErrorCard";
import { Info } from "./Info";
import LoadingCard from "./LoadingCard";




const WeatherInfo = ({city}) => {
 const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getWeather() {
      try {
        setLoading(true);
        setError("");
        const API_KEY = '59b035978079d5cae0be0afcae8e6911';

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch weather data");

        const json = await res.json();

        setData({
          temp: Math.round(json.main.temp),
          feels_like: Math.round(json.main.feels_like),
          humidity: json.main.humidity,
          pressure: json.main.pressure,
          wind: json.wind.speed,
          visibility: Math.round(json.visibility / 1000),
          sunrise: json.sys.sunrise,
          sunset: json.sys.sunset,
          condition: json.weather[0].main,
          icon: json.weather[0].icon,
        });
      } catch {
        setError("Unable to load weather");
      } finally {
        setLoading(false);
      }
    }

    getWeather();
  }, [city]);

const formatTime = (unix) =>
    new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (loading) return <LoadingCard />;
  if (error) return <ErrorCard message={error} />;
  return (
    <div className="bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-600 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-3xl shadow-2xl p-6 w-full max-w-sm text-white space-y-4 hover:scale-105 transition">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{city}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt="weather icon"
          className="w-12 h-12"
        />
      </div>

      {/* Temp */}
      <p className="text-5xl font-bold">{data.temp}°</p>
      <p className="text-sm opacity-80">Feels like {data.feels_like}°</p>

      {/* Condition */}
      <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm">
        {data.condition}
      </span>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-3">
        <Info label="Humidity" value={`${data.humidity}%`} />
        <Info label="Wind" value={`${data.wind} m/s`} />
        <Info label="Pressure" value={`${data.pressure} hPa`} />
        <Info label="Visibility" value={`${data.visibility} km`} />
      </div>

      {/* Sunrise / Sunset */}
      <div className="flex justify-between text-xs opacity-80 mt-4">
        <span>🌅 {formatTime(data.sunrise)}</span>
        <span>🌇 {formatTime(data.sunset)}</span>
      </div>
    </div>
  )
}

export default WeatherInfo


//defining proptypes
WeatherInfo.propTypes={
city:PropTypes.string
}