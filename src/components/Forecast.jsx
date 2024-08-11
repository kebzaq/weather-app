import React, { useEffect, useState } from "react";

const Forecast = ({ lat, lon }) => {
  const [forecastData, setForecastData] = useState({});
  const getForecast = async (lat, lon) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;
      const response = await fetch(url);
      const data = await response.json();
      setForecastData(data.daily);
    } catch (err) {
      console.error("Failed to fetch forecast data", err);
    }
  };
  useEffect(() => {
    if (lat && lon) {
      getForecast(lat, lon);
    }
  }, [lat, lon]);
  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    forecastData;
  return (
    <div className="forecast-container">
      {time &&
        time.map((date, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-date">{new Date(date).toDateString()}</p>
            <p className="forecast-temp">Max: {temperature_2m_max[index]}°F</p>
            <p className="forecast-temp">Min: {temperature_2m_min[index]}°F</p>
          </div>
        ))}
    </div>
  );
};

export default Forecast;
