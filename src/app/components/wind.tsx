import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface WindProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
}
function Wind({latitude,longitude,API_KEY}:WindProps){
    const {
        data: windData,
        error: windError,
        isLoading: windIsLoading,
        } = useSWR(
        longitude === 0 && latitude === 0 ? null : `/weather-api/v7/weather/3d?key=${API_KEY}&location=${longitude},${latitude}`,
        fetcher,
      );
    return (<div className="flex-1">
        <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg">
          <text className="text-sm font-bold text-left">风力</text>
          <div className="flex flex-col space-x-8"> 
            <div>风速: { windError||!windError||!windData.now?"数据获取失败":windData.now.windSpeed}km/h</div>
            <div>风力:{windError||!windError||!windData.now?"数据获取失败":windData.now.windScale}级</div>
            <div>风向:{windError||!windError||!windData.now?"数据获取失败":windData.now.windDir}</div>
          </div>
        </div>
    </div>);
}

export {Wind};