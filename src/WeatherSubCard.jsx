import React from "react";
import "./App.css";

const WeatherSubCard = ({data}) => {
    return(
        <div className="sub-container">
            {data ? (
                <>
                    <div className="sub-temp">
                        <div className="title">{Math.trunc(data.main.feels_like)}&deg;C</div>
                        <div className="desc">Feels Like</div>
                    </div>
                    <div className="sub-hum">
                        <div className="title">{data.main.humidity}%</div>
                        <div className="desc">Humidity</div>
                    </div>
                    <div className="sub-wind">
                        <div className="title">{data.wind.speed}km/h</div>
                        <div className="desc">Wind Speed</div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default WeatherSubCard;