"use client";
import { WeatherHeader } from "./components/WeatherHeader";
import React, { useState } from "react";
import {AQ} from "./components/AQ"
import "qweather-icons/font/qweather-icons.css";
import { HourlyWeather } from "./components/HourlyWeather";
import {Wind} from "./components/Wind";
export default function Home() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  if (typeof window !== "undefined" && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let _latitude=Number(position.coords.latitude.toFixed(2));
      if(_latitude === 0){
        _latitude = 1.27;
      }      
      let _longitude=Number(position.coords.longitude.toFixed(2));
      if(longitude === 0){
        _longitude = 103.84;
      }     
      setLatitude(_latitude);
      setLongitude(_longitude);
      console.log(latitude, longitude);
    });
  }
  const [isDay, setIsDay] = useState(true);
  const weatherAPIKey = process.env.NEXT_PUBLIC_WEATHER_APIKEY;
  const background = isDay
    ? "from-orange-300 to-yellow-500"
    : "from-blue-900 to-black";
  return (
    <div className={`h-screen flex flex-col items-center bg-gradient-to-b ${background} pl-32 pr-32 pt-16`}>
      <div className="text-center space-y-2">
        <WeatherHeader
          latitude={latitude}
          longitude={longitude}
          API_KEY={weatherAPIKey}
          isDay={isDay}
        />
        <HourlyWeather
          latitude={latitude}
          longitude={longitude}
          API_KEY={weatherAPIKey}
        />
        <div className="flex flex-row w-1/3 m-auto space-x-2">
            <AQ
              latitude={latitude}
              longitude={longitude}
              API_KEY={weatherAPIKey}
            />
            <Wind
              latitude={latitude}
              longitude={longitude}
              API_KEY={weatherAPIKey}
            />
        </div>
        
      </div>

      <div className="mt-8">
        <button
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          onClick={() => setIsDay(!isDay)}
        >
          Toggle Day/Night
        </button>
      </div>
    </div>
  );
}
