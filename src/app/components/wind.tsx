import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface WindProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
    isDay:boolean
}
function Wind({latitude,longitude,API_KEY,isDay}:WindProps){
    const {
        data: windData,
        error: windError,
        isLoading: windIsLoading,
        } = useSWR(
        longitude === 0 && latitude === 0 ? null : `/weather-api/v7/weather/now?key=${API_KEY}&location=${longitude},${latitude}`,
        fetcher,
      );
      const textColor = isDay ? "text-black" : "text-gray-300"
    return (<div className="flex-1">
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg">
          <text className={`text-sm font-bold text-left ${textColor}`}>风力</text>
          <div className={`flex flex-col text-left ${textColor}`}> 
            <div className={`${textColor}`}>风速: { windError||!windData||!windData.now
            ?"数据获取失败"
            :windData.now.windSpeed}km/h
            </div>
            <div className={`${textColor}`}>风力:{windError||!windData||!windData.now
            ?"数据获取失败"
            :windData.now.windScale}级
            </div>
            <div className={`${textColor}`}>风向:{windError||!windData||!windData.now
            ?"数据获取失败"
            :windData.now.windDir}
            </div>
          </div>
        </div>
    </div>);
}

export {Wind};