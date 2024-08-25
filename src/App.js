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
    const [error, setError] = useState("");
    const [dayTime, setDayTime] = useState(true);

    const fetchWeatherData = async (city) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            CheckTime(response.data.timezone);
            setWeather(response.data);
            setError("");
            console.log(response.data.weather[0].main);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("City not found. Please try a different location.");
            } else {
                setError("An error occurred. Please try again.");
            }
            setWeather(null);
        }
    };

    useEffect(() => {
        fetchWeatherData("Paris");
        // eslint-disable-next-line
    }, []);

    const CheckTime = (timezoneOffset) => {
        const utcOffsetInMilliseconds = timezoneOffset * 1000;
        const localTime = new Date(new Date().getTime() + utcOffsetInMilliseconds);
        const currentHour = localTime.getUTCHours();
        setDayTime(currentHour >= 6 && currentHour < 18);
    };

    // Function to handle search when Enter key is pressed
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            fetchWeatherData(searchTerm);
        }
    };

    return (
        <div className={`app ${dayTime ? "day" : "night"}`}>
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
            {error && <div className="error-message">{error}</div>}
            {weatherData && (
                <>
                    <WeatherMainCard data={weatherData} />
                    <WeatherSubCard data={weatherData} />
                </>
            )}
        </div>
    );
}

export default App;
