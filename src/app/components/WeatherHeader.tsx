import {fetcher} from "@/app/utils/fetcher"
import { useEffect, useState } from "react";
import useSWR from "swr";
import {debounce} from "lodash";
interface WeatherHeadeProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
    setLatitude:(latitude:number)=>void;
    setLongitude:(longtitude:number)=>void;
    isDay:boolean;
}
function WeatherHeader({latitude,longitude,API_KEY,setLatitude,setLongitude,isDay}:WeatherHeadeProps){
  const [cityNameBuffer,setCityNameBuffer] = useState<string>("南京");
  const [cityName,setCityName] = useState<string>("bei京");
  const {
    data: recentData,
    error: recentError,
    isLoading: recentIsLoading,
    } = useSWR(
    longitude === 0 && latitude === 0 ? null : `/weather-api/v7/weather/3d?key=${API_KEY}&location=${longitude},${latitude}`,
    fetcher,
  );
  const {
    data: nowData,
    error: nowError,
    isLoading: nowIsLoading,
    } = useSWR(
    longitude === 0 && latitude === 0 ? null : `/weather-api/v7/weather/now?key=${API_KEY}&location=${longitude},${latitude}`,
    fetcher,
  );
  const{data:queryCityData,error:queryCityErroe,isLoading:queryIsLoading}=useSWR(
    cityName === "请输入城市名字" ? null : `/city-api/v2/city/lookup?key=${API_KEY}&location=${cityName}`,
    fetcher,
  )
  useEffect(()=>{
      if(!queryCityErroe &&queryCityData&& queryCityData.location&& queryCityData.location.length>0){
        setLatitude(Number(Number.parseFloat(queryCityData.location[0].lat).toFixed(2)));
        setLongitude(Number(Number.parseFloat(queryCityData.location[0].lon).toFixed(2)));
      }
    },[queryCityData,setLatitude,setLongitude]);
  if(!recentData||!nowData){
    return <div>Data is loading</div>;
  }
  return(
      <div>
          <input className="text-2xl text-white bg-transparent text-center" 
          value={cityNameBuffer} 
          onChange={(e)=>setCityNameBuffer(e.target.value)}
          onCompositionEnd={(e)=>{
            setCityName(cityNameBuffer);
          }}
          />
        <p className="text-6xl font-extralight text-white">
          {nowData.now.temp}°C
        </p>
        <div className="flex flex-row space-x-4 justify-center">
          <div className="flex flex-row">
            <text className="text-white" style={{ writingMode: "vertical-lr" }}>
              最高
            </text>
            <p className="text-3xl font-extralight text-white">
              {recentData.daily[0].tempMax}°C
            </p>
          </div>
          <div className="flex flex-row">
            <text className="text-white" style={{ writingMode: "vertical-lr" }}>
              最低
            </text>
            <p className="text-3xl font-extralight text-white">
              {recentData.daily[0].tempMin}°C
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <i
            className={`qi-${
              isDay
                ? recentData.daily[0].iconDay
                : recentData.daily[0].iconNight
            }-fill`}
          ></i>
          <p className="text-md text-gray-200 font-extrabold">
            {isDay
              ? recentData.daily[0].textDay
              : recentData.daily[0].textNight}
          </p>
          </div>
      </div>
  )
}
export {WeatherHeader};