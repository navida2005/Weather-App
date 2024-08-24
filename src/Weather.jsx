import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=23d906629198c9b06236917b75168f31`
      );
      setWeatherData(response.data);
      console.log(response.data.weather[0].main);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData("Colombo");
},[]);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetchWeatherData();
//   };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form> */}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}</p>
        </div>
      )}
      {/* <h1>{weatherData.weather[0].description}</h1> */}
    </div>
  );
};

export default Weather;
