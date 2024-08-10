import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import SearchCity from "./SearchCity";

const Weather = () => {
  // City data to get weather info:
  const [cityInfo, setCityInfo] = useState({});
  // Weather data to display:
  const [weatherData, setWeatherData] = useState({});
  // console.log("cityInfo", cityInfo);
  const getWeather = async () => {
    console.log(cityInfo.lat, cityInfo.lon);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityInfo.lat}&longitude=${cityInfo.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("curren", data.current);
      // console.log("temperature: ", data.current.temperature_2m);
      setWeatherData({
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
      });
    } catch (err) {
      console.error("Failed to fetch weather data", err);
    }
  };
  useEffect(() => {
    getWeather(cityInfo.lat, cityInfo.lon);
  }, [cityInfo]);
  // callback function to update the getCityInfo state
  const handleCityInfo = (cityInfo) => {
    setCityInfo(cityInfo);
    getWeather();
  };
  return (
    <div className="weather">
      {/* <div className="search-bar">
        <input type="text" placeholder="search..." />
        <img src={search_icon} alt="Search" />
      </div> */}
      <SearchCity handleCityInfo={handleCityInfo} />
      <img src={clear_icon} alt="clear" className="weather-icon" />
      <p className="temperature">
        {weatherData.temp} <span style={{ fontSize: "40px" }}>°F</span>
      </p>
      <p className="location">{cityInfo.name}</p>
      <h6>{}</h6>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.windSpeed} Mph</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
