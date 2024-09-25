'use client';
export interface hourlyRootObject {
  code: string;
  updateTime: string;
  fxLink: HourlyDate[];
  refer: Refer;
}
import { notFound } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import "qweather-icons/font/qweather-icons.css";
const fetcher = (url: string): Promise<any> => fetch(url).then((response) => response.json());
export default function Home() {
  const[latitude,setLatitude]=useState(0);
  const[longitude,setLongitude]=useState(0);
  if(typeof window !=="undefined"&&navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(Number(position.coords.latitude.toFixed(2)));
      setLongitude(Number(position.coords.latitude.toFixed(2)));
      console.log(latitude,longitude);
    });
  }
    
  const [isDay, setIsDay] = useState(true);
  const weatherAPIKey = process.env.NEXT_PUBLIC_WEATHER_APIKEY;
  const { data: recentData, error: recentError, isLoading: recentIsLoading } = useSWR(`/weather-api/v7/weather/3d?key=${weatherAPIKey}&location=101210101`, fetcher)
  const { data: nowData, error: nowError, isLoading: nowIsLoading } = useSWR(`/weather-api/v7/weather/now?key=${weatherAPIKey}&location=101210101`, fetcher)
  const { data: hourlyData, error: hourlyError, isLoading: hourlyIsLoading } = useSWR(`/weather-api/v7/weather/24h?key=${weatherAPIKey}&location=101210101`, fetcher)
  const { data: aqData, error: aqError, isLoading: aqIsLoading } = useSWR(`/api.qweather/v7/air/now?key=${weatherAPIKey}&location=101210101`, fetcher)
  const background = (isDay ? "from-orange-300 to-yellow-500" : "from-blue-900 to-black");
  if (recentError || nowError || hourlyError) {
  }
  if (recentIsLoading || nowIsLoading || hourlyIsLoading) {
    return (<div>Loading Data</div>)
  }
  if (!recentData || !recentData.daily || recentData.daily.length === 0) {
    return (<div>No Data Available</div>);
  }
  const weatherHourly = hourlyData.hourly;
  return (
    <div className={`h-screen flex flex-col items-center bg-gradient-to-b ${background} pl-32 pr-32 pt-16`}>
      <div className="text-center space-y-2">
        <p className="text-2xl text-white">Hangzhou sunny</p>
        <p className="text-6xl font-extralight text-white">{nowData.now.temp}°C</p>
        <div className="flex flex-row space-x-4 justify-center">
          <div className="flex flex-row">
            <text className="text-white" style={{ writingMode: 'vertical-lr' }}>最高</text>
            <p className="text-3xl font-extralight text-white">{recentData.daily[0].tempMax}°C</p>
          </div>
          <div className="flex flex-row">
            <text className="text-white" style={{ writingMode: 'vertical-lr' }}>最低</text>
            <p className="text-3xl font-extralight text-white">{recentData.daily[0].tempMin}°C</p>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <i className={`qi-${isDay ? recentData.daily[0].iconDay : recentData.daily[0].iconNight}-fill`}></i>
          <p className="text-md text-gray-200 font-extrabold">{isDay ? recentData.daily[0].textDay : recentData.daily[0].textNight}</p>
        </div>
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll w-1/3  bg-opacity-20 bg-gray-50 backdrop-blue-sm p-4rounded-lg">
          <text className="text-sm font-bold text-left">🕓 每小时天气预报</text>
          <div className="flex flex-row space-x-8">
            {
              weatherHourly.map((weather, index) => {
                return (
                  <div key={index} className="flex flex-col space-y-2">
                    <text>{(new Date(Date.now()).getHours() + index) % 24}时</text>
                    <text className="font-medium">{weather.temp}°C</text>
                    <i className={(`qi-${weather.icon}-fill`)}></i>
                  </div>);
              })
            }
          </div>

        </div>
      </div >
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
