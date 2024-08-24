import React from "react";
import rainy from "./rainy.png";
import cloudy from "./cloudy.png";
import sunny from "./sunny.png";
import "./App.css";

const WeatherMainCard = ({ data }) => {
    // Function to get the appropriate image based on weather condition
    const getWeatherImage = (weatherMain) => {
        switch (weatherMain.toLowerCase()) {
            case "rain":
                return rainy;
            case "clouds":
                return cloudy;
            case "clear":
                return sunny;
            // Add more cases if you have more images for different weather types
            default:
                return cloudy; // Default to a generic image if no match is found
        }
    };

    return (
        <div className="main-container">
            {data ? (
                <>
                    <div className="sub1">
                        <img
                            src={getWeatherImage(data.weather[0].main)}
                            alt={data.weather[0].main}
                        />
                        <div>{data.weather[0].main}</div>
                    </div>
                    <div className="sub2">
                        <div className="card-topic">Today</div>
                        <div className="card-city">{data.name}</div>
                        <div className="card-temp">{Math.trunc(data.main.temp)}&deg;C</div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WeatherMainCard;
