import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherMainCard from "./WeatherMainCard";
import WeatherSubCard from "./WeatherSubCard";
import searchIcon from "./search.png";
import "./App.css";

// You can store your API key in a variable to reuse it
const API_KEY = "23d906629198c9b06236917b75168f31";

const App = () => {
    const [weatherData, setWeather] = useState(null); // Use null to represent 'no data'
    const [searchTerm, setSearchTerm] = useState("");

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            console.log(response.data.weather[0].main);
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        fetchWeatherData("Arizona");
    }, []);

    // Function to handle search when Enter key is pressed
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeatherData(searchTerm);
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input 
                    placeholder="Enter The Location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress} // Add onKeyPress event listener
                />
                <img 
                    className="search-icon"
                    src={searchIcon} 
                    alt="search"
                    onClick={() => fetchWeatherData(searchTerm)}
                />
            </div>
            <WeatherMainCard data={weatherData} />
            <WeatherSubCard data={weatherData} />
        </div>
    );
}

export default App;

