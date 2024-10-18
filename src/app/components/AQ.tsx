import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface AQHeadeProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
}
function AQ({latitude,longitude,API_KEY}:AQHeadeProps){
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
    return <div>
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll w-1/6 bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg">
          <text className="text-sm font-bold text-left">🌍 空气质量</text>
          <div className="flex flex-col space-x-8"> 
            <div>AQI: { aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].aqi}</div>
            <div>{aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].category}</div>
            <div>当前AQI为{aqError||!aqData||!aqData.indexes?"数据获取失败":aqData.indexes[0].aqi}</div>
          </div>
        </div>
    </div>
}

export{AQ};