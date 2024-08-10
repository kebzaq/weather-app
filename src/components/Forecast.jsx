import React, { useEffect, useState } from "react";

const Forecast = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState({});
  console.log("forecast", lat, lon);
  const getForecast = async (lat, lon) => {
    // console.log("forecast", cityInfo.lat, cityInfo.lon);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;
      const response = await fetch(url);
      const data = await response.json();
      //   console.log("curren", data.current);
      // console.log("temperature: ", data.current.temperature_2m);
      setForecastData(data.daily);
      console.log(data.daily);
    } catch (err) {
      console.error("Failed to fetch forecast data", err);
    }
  };
  useEffect(() => {
    if (lat && lon) {
      getForecast(lat, lon);
    }
  }, [lat, lon]);
  //   console.log("forecast:", forecastData);
  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    forecastData;
  return (
    <div className="forecast-container">
      {time &&
        time.map((date, index) => (
          <div key={index} className="forecast-card">
            <p>{new Date(date).toDateString()}</p>
            {/* <img
            src={`https://example.com/weather-icons/${day.weathercode}.png`}
            alt="weather icon"
          /> */}
            <p>Max: {temperature_2m_max[index]}°F</p>
            <p>Min: {temperature_2m_min[index]}°F</p>
          </div>
        ))}
    </div>
  );
};

export default Forecast;
