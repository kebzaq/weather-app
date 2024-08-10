import React, { useEffect, useState } from "react";
import search_icon from "../assets/search.png";
import "./Weather.css";

const SearchCity = ({ handleCityInfo }) => {
  const [search, setSearch] = useState("New York");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = () => {
    searchCity(search);
  };
  const searchCity = async (search) => {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1&language=en&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      //   console.log("Search results: ", data);
      if (data.results.length === 0) {
        throw new Error("City or location not found");
      }
      handleCityInfo({
        name: data.results[0].name,
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        admin1: data.results[0].admin1,
        country_code: data.results[0].country_code,
      });
      setSearch("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    searchCity(search);
  }, []);
  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="search..."
          value={search}
          onChange={handleSearchChange}
        />
        <img src={search_icon} alt="Search" onClick={handleClick} />
      </div>
    </>
  );
};

export default SearchCity;
