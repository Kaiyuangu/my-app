import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface WeatherHeadeProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
    isDay:boolean;
}
function WeatherHeader({latitude,longitude,API_KEY,isDay}:WeatherHeadeProps){
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
  const {
    data: cityData,
    error: cityError,
    isLoading: cityIsLoading,
    } = useSWR(
    longitude === 0 && latitude === 0 ? null : `/city-api/v2/city/lookup?key=${API_KEY}&location=${longitude},${latitude}`,
    fetcher,
  );
  if(!recentData||!nowData||!cityData){
    return <div>Data is loading</div>;
  }
  return(
      <div>
          <p className="text-2xl text-white">{cityData.location[0].name}</p>
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