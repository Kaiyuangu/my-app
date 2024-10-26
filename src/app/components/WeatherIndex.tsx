import {fetcher} from "@/app/utils/fetcher"
import useSWR from "swr";
interface WeatherIndexProps{
    latitude:number;
    longitude:number;
    API_KEY:string;
}
interface Daily{
    date:string;
    type:string;
    name:string;
    level:string;
    catrgory:string;
    text:string;
}
interface WeatherIndexData{
    code:string;
    updateTime:string;
    fxLink:string;
    daily:Daily[];
}
function WeatherIndex({longitude,latitude,API_KEY}:WeatherIndexProps){
    const {
        data,error,isLoading
    } = useSWR<WeatherIndexData>(
        longitude === 0 && latitude === 0
        ? null
        : `/weather-api/v7/indices/1d?type=1&location=${longitude},${latitude}&key=${API_KEY}`,
        fetcher
    );
    if(!data){
        return(
            <div>
                Loading.....
            </div>
        )
    }
    return(
        <div>
            <div className="flex-1">
                <div className="flex flex-col space-y-2 m-auto overflow-x-scroll bg-opacity-20 bg-gray-50 backdrop-blur-sm p-4 rounded-lg">
                <span className="text-sm font-bold text-left">{data.daily[0].name}</span>
                    <div className="flex flex-col text-left">
                          <div>{data.daily[0].text}</div>
                          <div>{data.daily[0].level}</div>
                          <div>{data.daily[0].catrgory}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export{WeatherIndex};