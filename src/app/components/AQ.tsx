import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface AQHeadeProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
    isDay:boolean;
}
function AQ({latitude,longitude,API_KEY,isDay}:AQHeadeProps){
    const {
        data: aqData,
        error: aqError,
        isLoading: aqIsLoading,
    } = useSWR(
        longitude === 0 && latitude === 0
        ? null
        : `/weather-api/airquality/v1/current/${latitude}/${longitude}?key=${API_KEY}`,
        fetcher
    );
    const textColor = isDay ? "text-black" : "text-gray-300"
    return (<div className="flex-1">
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg">
          <text className={`text-sm font-bold text-left ${textColor}`}>🌍 空气质量</text>
          <div className={`flex flex-col text-left ${textColor}`}> 
            <div className={`${textColor}`}>AQI: { aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].aqi}</div>
            <div className={`${textColor}`}>{aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].category}</div>
            <div className={`${textColor}`}>当前AQI为{aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].aqi}</div>
          </div>
        </div>
    </div>);
}

export{AQ};